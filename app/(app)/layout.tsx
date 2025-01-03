import { AppSidebar } from "@/components/app-sibebar"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full relative">
        <SidebarTrigger className="sticky top-0" />
        {children}
      </main>
    </SidebarProvider>
  )
}
