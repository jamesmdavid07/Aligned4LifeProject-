import { redirect } from 'next/navigation';
import { getSession, isOwner } from '@/lib/auth';
import AdminAccountsClient from '@/app/admin/_components/AdminAccounts';

export default async function AdminAccountsPage() {
  const session = await getSession();
  if (!isOwner(session)) {
    redirect('/admin/devotionals');
  }

  return <AdminAccountsClient />;
}
