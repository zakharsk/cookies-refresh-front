import { ExclamationTriangleIcon } from '@radix-ui/react-icons';
import { RedirectType, redirect } from 'next/navigation';
import { ReactNode } from 'react';

import { getUserCurrent } from '@/api';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export default async function ProtectedLayout({
  children,
}: {
  children: ReactNode;
}) {
  const user = await getUserCurrent();
  if (!user) {
    redirect('/login', RedirectType.replace);
  }
  return (
    <section>
      <Alert variant="destructive" className={'mb-4'}>
        <ExclamationTriangleIcon className="size-4" />
        <AlertTitle>Protected layout</AlertTitle>
        <AlertDescription>
          This page is rendered in a protected layout. It requires a valid
          AccessToken cookie to be shown.
        </AlertDescription>
      </Alert>
      {children}
    </section>
  );
}
