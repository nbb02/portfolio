import { AppSidebar } from "@/components/app-sibebar"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full relative">
        <SidebarTrigger className="absolute top-0 z-50" />
        {children}
      </main>
    </SidebarProvider>
  )
}
