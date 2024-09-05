'use server';

import { deleteCookies } from '@/actions/delete-cookies.action';
import { deleteTokens } from '@/api';

export async function logOut() {
  await deleteTokens();
  await deleteCookies();
}
