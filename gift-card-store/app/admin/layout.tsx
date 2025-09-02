import { AdminSidebar } from '@/components/admin/admin-sidebar'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen bg-muted/10">
      {/* Sidebar */}
      <aside className="hidden lg:block fixed inset-y-0 z-50 w-64 bg-background border-r">
        <AdminSidebar />
      </aside>

      {/* Main Content */}
      <div className="lg:ml-64 flex-1 flex flex-col">
        <main className="flex-1 overflow-auto p-6">
          {children}
        </main>
      </div>
    </div>
  )
}