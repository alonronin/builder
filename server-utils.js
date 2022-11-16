import { transformAsync } from '@babel/core';
import { match } from 'path-to-regexp';
import compile from 'lodash.template';
import { select } from 'stjs';

export async function transpile(input) {
  const { code } = await transformAsync(input, {
    presets: [['@babel/preset-react', { runtime: 'classic' }]],
    ast: false,
    sourceType: 'script',
    minified: true,
    comments: false,
  });

  return code;
}

export function transform(input, template) {
  return select(input).transformWith(template).root();
}

export const matchRoute = (pathname, routes = []) => {
  const route = routes.find((route) => match(route)(pathname));

  if (!route) {
    throw new Error('Route not found');
  }

  const { params } = match(route)(pathname);
  return {
    route,
    params,
  };
};

export function getCompiled(template, params) {
  const fn = compile(template, {
    interpolate: /{{([\s\S]+?)}}/g,
  });

  return fn(params);
}

export function compileObjectProps(obj, params) {
  const newObj = Object.entries(obj).map(([key, value]) => {
    return [
      key,
      typeof value === 'string'
        ? getCompiled(value, params)
        : compileObjectProps(value, params),
    ];
  });

  return Object.fromEntries(newObj);
}

const cache = new Map();

export async function getData({ items, params, session }) {
  return await Promise.all(
    items?.map(async (item) => {
      if (item.type === 'CustomComponent') {
        if (!cache.has(item.component)) {
          cache.set(item.component, await transpile(item.component));
        }
        item.component = cache.get(item.component);
      }

      let data = item.data || null;

      if (typeof item.data === 'string') {
        data = {
          fetch: {
            url: item.data,
            method: 'get',
          },
        };
      }

      if (data?.fetch) {
        let { url, method, ...rest } = data.fetch;
        url = getCompiled(url, params);
        rest = compileObjectProps(rest, { ...params, session });

        if (!cache.has(url)) {
          let response = await fetch(url, {
            method: method.toUpperCase(),
            ...rest,
          }).then((r) => r.json());
          if (item.transform) {
            response = transform(response, item.transform);
          }

          cache.set(url, response);
        }

        data = cache.get(url);
      }

      return {
        ...item,
        data,
      };
    }) ?? []
  );
}
