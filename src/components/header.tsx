import Link from 'next/link';

import { getUserCurrent } from '@/api';
import AuthLink from '@/components/auth-link';
import { ModeToggle } from '@/components/mode-toggle';

export async function Header() {
  const user = await getUserCurrent();
  return (
    <header className={'flex items-center justify-around py-4'}>
      <Link href="/">Home</Link>
      <Link href="/users">Users</Link>
      <AuthLink user={user} />
      <ModeToggle />
    </header>
  );
}
