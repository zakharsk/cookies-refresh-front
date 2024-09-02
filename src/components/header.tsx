import Link from 'next/link';
import { ModeToggle } from '@/components/mode-toggle';

export function Header() {
  return (
    <header className={'flex items-center justify-around py-4'}>
      <Link href="/">Home</Link>
      <Link href="/users">Users</Link>
      <Link href="/login">Login</Link>
      <ModeToggle />
    </header>
  );
}
