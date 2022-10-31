import { getComponent } from '../client-utils';

export default function Repeater({
  element: { type, ...props },
  data,
  tag: T = 'div',
  ...rest
}) {
  const Component = getComponent(type, props.component);
  return (
    <T {...rest}>
      {data.map((data) => (
        <Component data={data} {...props} />
      ))}
    </T>
  );
}
