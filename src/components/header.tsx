import Link from 'next/link';
import { ModeToggle } from '@/components/modeToggle';

export function Header() {
  return (
    <header className={'flex justify-around py-4'}>
      <Link href="/">Home</Link>
      <Link href="/login">Login</Link>
      <Link href="/users">Users</Link>
      <ModeToggle />
    </header>
  );
}
