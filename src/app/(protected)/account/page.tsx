import CookiesPanel from '@/components/cookies-panel';
import UserCard from '@/components/user-card';

export default async function AccountPage() {
  return (
    <section className={'flex min-w-96 flex-col gap-4'}>
      <CookiesPanel />
      <UserCard />
    </section>
  );
}
