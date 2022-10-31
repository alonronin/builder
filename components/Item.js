import Link from 'next/link';

export default function Item({ data: { id, title }, tag: T = 'div', link }) {
  return (
    <T key={id}>
      <h2>
        <Link href={`/${link}/${id}`}>
          <a className="font-bold text-blue-500 hover:text-blue-600">{title}</a>
        </Link>
      </h2>
    </T>
  );
}
