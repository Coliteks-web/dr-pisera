import Link from 'next/link';

export default function MegaLink({
  href,
  label,
}: {
  href: string;
  label: string;
}) {
  return (
    <Link
      href={href}
      className="block text-sm text-neutral-600 transition hover:translate-x-1 hover:text-black"
    >
      {label}
    </Link>
  );
}