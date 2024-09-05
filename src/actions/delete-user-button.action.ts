'use server';

import { deleteCookies } from '@/actions/delete-cookies.action';
import { deleteUserCurrent } from '@/api';

export async function deleteUser() {
  await deleteUserCurrent();
  await deleteCookies();
}
