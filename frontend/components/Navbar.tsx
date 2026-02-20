import Link from 'next/link';
import { NavItem } from './NavItem';

export function Navbar() {
  return (
    <nav className="flex w-full justify-center p-[8px] bg-gray-800 text-white">
      <ul className="flex gap-[12px] text-xl">
        <Link href="/">
          <NavItem name="products" />
        </Link>
        <Link href="/Commodities">
          <NavItem name="commodities" />
        </Link>
      </ul>
    </nav>
  );
}
