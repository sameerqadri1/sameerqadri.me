import { AdminGuard } from './AdminGuard';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminGuard>
      <div className="min-h-screen bg-background">{children}</div>
    </AdminGuard>
  );
}
