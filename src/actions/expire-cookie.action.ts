'use server';

import { cookies } from 'next/headers';

export async function expireCookie(cookieName: string) {
  const cookieStore = cookies();
  cookieStore.delete(cookieName);
}
