import Link from 'next/link';

export default function Navigation({ data, options: { resolvedUrl } }) {
  const pathname = resolvedUrl;

  return (
    <nav className="sticky top-0 z-10 mb-4 bg-white p-4 shadow shadow-xl">
      <ul className="flex gap-3">
        {data.map(({ id, title, href, exact }) => (
          <li key={id}>
            <Link href={href}>
              <a
                className={`font-bold text-blue-600 hover:text-blue-800 ${
                  (exact ? href === pathname : pathname.includes(href)) &&
                  'font-black'
                }`}
              >
                {title}
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
