import { cookies } from 'next/headers';
import { Fragment } from 'react';

import CookiesPanel from '@/components/cookies-panel';

export default async function AccountPage() {
  const cookieStore = cookies();

  return (
    <Fragment>
      <CookiesPanel />
    </Fragment>
  );
}
