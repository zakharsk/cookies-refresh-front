import { getUserCurrent } from '@/api';
import CookiesPanel from '@/components/cookies-panel';
import UserCard from '@/components/user-card';

export default async function AccountPage() {
  const user = await getUserCurrent();
  if (!user) return null;
  return (
    <section className={'flex min-w-96 flex-col gap-4'}>
      <CookiesPanel />
      <UserCard user={user} />
    </section>
  );
}
