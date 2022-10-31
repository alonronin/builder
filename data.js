const Navigation = {
  type: 'Navigation',
  data: [
    {
      title: 'Home',
      href: '/',
    },
    {
      title: 'Posts',
      href: '/posts',
    },
    {
      title: 'Users',
      href: '/users',
    },
  ],
};

export default {
  '/': {
    items: [
      Navigation,
      {
        type: 'CustomComponent',
        component: '() => <div className="p-4"><h1>Home</h1></div>',
      },
    ],
  },
  '/posts': {
    items: [
      Navigation,
      {
        type: 'Repeater',
        data: 'https://jsonplaceholder.typicode.com/posts',
        tag: 'ul',
        className: 'p-4 flex flex-col gap-4',
        element: {
          type: 'Item',
          tag: 'li',
          link: 'posts',
        },
      },
    ],
  },
  '/posts/:postId': {
    items: [
      Navigation,
      {
        type: 'Page',
        data: 'https://jsonplaceholder.typicode.com/posts/{{ postId }}',
        link: 'users',
      },
    ],
  },
  '/users': {
    items: [
      Navigation,
      {
        type: 'Repeater',
        data: 'https://jsonplaceholder.typicode.com/users',
        tag: 'ul',
        className: 'p-4 flex flex-col gap-4',
        transform: {
          '{{#each $root}}': {
            id: '{{id}}',
            title: '{{name}}',
          },
        },
        element: {
          type: 'Item',
          tag: 'li',
          link: 'users',
        },
      },
    ],
  },
  '/users/:userId': {
    items: [
      Navigation,
      {
        type: 'Page',
        data: 'https://jsonplaceholder.typicode.com/users/{{ userId }}',
        link: 'users',
        transform: {
          id: '{{id}}',
          title: '{{name}}',
          body: '{{email}}',
        },
      },
    ],
  },
};
