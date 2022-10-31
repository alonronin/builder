import { getComponent } from '../client-utils';

export default function Engine({ items, options }) {
  const elements = [];

  for (const { type, data, component, ...props } of items) {
    const Component = getComponent(type, component);

    elements.push(<Component data={data} options={options} {...props} />);
  }

  return elements;
}
