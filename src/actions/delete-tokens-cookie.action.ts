'use server';

import { cookies } from 'next/headers';

import {
  accessTokenCookieName,
  refreshTokenCookieName,
} from '@/constants/cookies';

export async function deleteTokensCookie() {
  const cookieStore = cookies();
  cookieStore.delete(refreshTokenCookieName);
  cookieStore.delete(accessTokenCookieName);
}
