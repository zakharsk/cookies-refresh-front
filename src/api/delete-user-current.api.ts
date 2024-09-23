import { readTokensData } from '@/actions/read-tokens-data';
import { apiRequest } from '@/api/request.api';

export async function deleteUserCurrent() {
  const { userId } = await readTokensData();
  return apiRequest<null>({
    method: 'DELETE',
    path: `/users/${userId}`,
    includeAccessToken: true,
  });
}
