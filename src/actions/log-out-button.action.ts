'use server';

import { deleteCookies } from '@/actions/delete-cookies.action';
import { deleteTokens } from '@/api/delete-tokens.api';

export async function logOut() {
  await deleteTokens();
  await deleteCookies();
}
