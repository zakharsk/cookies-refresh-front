import Link from 'next/link';

import { TCurrentUser } from '@/types';

type TAuthLinkProps = {
  user: TCurrentUser | undefined;
};

export default async function AuthLink(props: TAuthLinkProps) {
  return props.user ? (
    <Link href="/account">Account</Link>
  ) : (
    <Link href="/login">Login</Link>
  );
}
