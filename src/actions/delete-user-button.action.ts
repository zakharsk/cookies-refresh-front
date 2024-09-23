'use server';

import { deleteTokensCookie } from '@/actions/delete-tokens-cookie.action';
import { deleteUserCurrent } from '@/api/delete-user-current.api';

export async function deleteUser() {
  await deleteUserCurrent();
  await deleteTokensCookie();
}
