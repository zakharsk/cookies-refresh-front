'use server';

import { cookies } from 'next/headers';

import { deleteTokens } from '@/api';
import { accessTokenCookieName, refreshTokenCookieName } from '@/constants';

export async function logOut() {
  await deleteTokens();
  const cookieStore = cookies();
  cookieStore.delete(refreshTokenCookieName);
  cookieStore.delete(accessTokenCookieName);
}
