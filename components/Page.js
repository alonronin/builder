import Link from 'next/link';

export default function Page({ data: { id, title, body } }) {
  return (
    <div key={id} className="flex flex-col gap-4 p-4">
      <nav>
        <Link href="/posts">
          <a className="text-sm text-blue-500">Back</a>
        </Link>
      </nav>
      <h2 className="text-2xl font-bold">{title}</h2>

      <p>{body}</p>
    </div>
  );
}
