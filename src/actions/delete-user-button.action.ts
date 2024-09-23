'use server';

import { deleteCookies } from '@/actions/delete-cookies.action';
import { deleteUserCurrent } from '@/api/delete-user-current.api';

export async function deleteUser() {
  await deleteUserCurrent();
  await deleteCookies();
}
