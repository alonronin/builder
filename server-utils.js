import { transformAsync } from '@babel/core';
import { match } from 'path-to-regexp';
import compile from 'lodash.template';

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

export function getUrl(url, params) {
  const template = compile(url, {
    interpolate: /{{([\s\S]+?)}}/g,
  });

  return template(params);
}

const cache = new Map();

export async function getData({ items, params }) {
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
        const url = getUrl(item.data, params);

        if (!cache.has(url)) {
          const response = await fetch(url).then((r) => r.json());
          cache.set(url, response);
        }

        data = cache.get(url);
      }

      console.log(data);

      return {
        ...item,
        data,
      };
    }) ?? []
  );
}
