import Link from 'next/link';

export default function MobileLink({
  href,
  label,
}: {
  href: string;
  label: string;
}) {
  return (
    <Link
      href={href}
      className="text-lg font-medium text-neutral-800 transition hover:text-black"
    >
      {label}
    </Link>
  );
}