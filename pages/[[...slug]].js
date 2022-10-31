import data from '../data.js';
import { getData, matchRoute } from '../server-utils';
import Engine from '../components/Engine';

export default Engine;

export async function getServerSideProps({ resolvedUrl }) {
  try {
    const { route, params } = matchRoute(resolvedUrl, Object.keys(data));

    let { items } = data[route];

    items = await getData({ items, params });

    return {
      props: {
        items,
        options: { resolvedUrl },
      },
    };
  } catch (e) {
    console.error(e);
    return {
      notFound: true,
    };
  }
}
