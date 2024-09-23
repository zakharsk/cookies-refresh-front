import { ExclamationTriangleIcon } from '@radix-ui/react-icons';
import { RedirectType, redirect } from 'next/navigation';
import { ReactNode } from 'react';

import { readTokensData } from '@/actions/read-tokens-data';
import { getUserById } from '@/api/get-user-by-id.api';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export default async function ProtectedLayout({
  children,
}: {
  children: ReactNode;
}) {
  const { userId } = await readTokensData();
  const user = await getUserById(userId);

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
