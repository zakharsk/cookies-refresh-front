import { RedirectType, redirect } from 'next/navigation';
import { Fragment, ReactNode } from 'react';

import { getUserCurrent } from '@/api';

export default async function ProtectedLayout({
  children,
}: {
  children: ReactNode;
}) {
  const user = await getUserCurrent();
  if (!user) {
    redirect('/login', RedirectType.replace);
  }
  return <Fragment>{children}</Fragment>;
}
