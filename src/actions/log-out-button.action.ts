'use server';

import { deleteTokensCookie } from '@/actions/delete-tokens-cookie.action';
import { deleteTokens } from '@/api/delete-tokens.api';

export async function logOut() {
  await deleteTokens();
  await deleteTokensCookie();
}
