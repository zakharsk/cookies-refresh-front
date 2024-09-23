import { readTokensData } from '@/actions/read-tokens-data';
import { getUserById } from '@/api/get-user-by-id.api';
import CookiesPanel from '@/components/cookies-panel';
import UserCard from '@/components/user-card';

export default async function AccountPage() {
  const { userId } = await readTokensData();
  const user = await getUserById(userId);

  if (!user) return null;

  return (
    <section className={'flex min-w-96 flex-col gap-4'}>
      <CookiesPanel />
      <UserCard user={user} />
    </section>
  );
}
