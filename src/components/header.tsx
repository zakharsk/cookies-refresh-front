import Link from 'next/link';

import { readTokensData } from '@/actions/read-tokens-data';
import { getUserById } from '@/api/get-user-by-id.api';
import AuthLink from '@/components/auth-link';
import { ModeToggle } from '@/components/mode-toggle';

export async function Header() {
  const { userId } = await readTokensData();
  const user = await getUserById(userId);

  return (
    <header className={'flex items-center justify-around py-4'}>
      <Link href="/">Home</Link>
      <Link href="/users">Users</Link>
      <AuthLink user={user} />
      <ModeToggle />
    </header>
  );
}
