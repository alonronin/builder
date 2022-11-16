const Navigation = {
  type: 'Navigation',
  data: [
    {
      title: 'Home',
      href: '/',
      exact: true,
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
        component: `() => { 
        const [state, setState] = React.useState("Hello");
        
        return <div className="p-4 flex flex-col gap-4">
    <h1 className="font-bold text-2xl text-blue-600">Home</h1>
    
    <input type="text" value={state} onChange={e => setState(e.target.value)} />
    <p>{state}</p>
    <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. 
        Asperiores beatae blanditiis dolorem excepturi iure, 
        quaerat, quis similique tempore unde veritatis vero voluptatum. 
        A deleniti eaque error expedita fugit perspiciatis, ratione?
    </p>
</div> }`,
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
        link: 'posts',
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
          body: 'Email: {{email}} - Address: {{address.street}}, {{address.suite}}, {{address.city}}, {{address.zipcode}}',
        },
      },
    ],
  },
  '/policies/:policyId/overview': {
    items: [
      Navigation,
      {
        type: 'CustomComponent',
        component: `function Customer({ data: { customer, insights, ...rest } }) {
  return (
    <div className="grid-cols-3 grid gap-4 p-8">
    <pre>{JSON.stringify({ customer, insights, rest }, null, 2)}</pre>
      <div className="overflow-hidden rounded-md shadow-md">
        <h1 className="bg-blue-600 p-2 text-2xl font-bold text-white">
          {customer.firstName} {customer.lastName}
        </h1>

        <p className="p-4">{customer.contactId}</p>
      </div>

      <div className="overflow-hidden rounded-md shadow-md">
        <h1 className="bg-blue-600 p-2 text-2xl font-bold text-white">
          {insights.product.id}
        </h1>

        <p className="p-4">{insights.product.description}</p>
      </div>
    </div>
  );
}
`,
        data: {
          fetch: {
            url: 'https://dev.portal-foundation-ace-runtime.sapienspaas.com/api/v1/agent/default/policies/{{ policyId }}/overview',
            method: 'post',
            headers: {
              Authorization: 'Bearer {{ session.token }}',
            },
          },
        },
      },
    ],
  },
};
