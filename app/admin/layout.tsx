import { getSession } from '@/lib/auth';
import AdminBar from '@/app/admin/_components/AdminBar';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  return (
    <>
      {session ? <AdminBar email={session.email} role={session.role} /> : null}
      {children}
    </>
  );
}
