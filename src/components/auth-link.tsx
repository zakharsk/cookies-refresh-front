import { TUser } from '@/types';
import Link from 'next/link';

type TAuthLinkProps = {
  user: TUser | undefined;
};

export default async function AuthLink(props: TAuthLinkProps) {
  return props.user ? (
    <Link href="/account">Account</Link>
  ) : (
    <Link href="/login">Login</Link>
  );
}
