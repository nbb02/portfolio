import { AppSidebar } from "@/components/app-sidebar"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full relative">
        <SidebarTrigger className="fixed top-0 z-50" />
        {children}
      </main>
    </SidebarProvider>
  )
}
