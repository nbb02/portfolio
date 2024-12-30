import {
  Calendar,
  Home,
  Inbox,
  LogIn,
  LogOut,
  Search,
  Settings,
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import getUser from "@/app/auth"
import { signOut } from "@/app/login/actions"
import Dialog from "./dialog"
import { Button } from "./ui/button"

const items = [
  {
    title: "Profiles",
    url: "/",
    icon: Home,
  },
  {
    title: "Projects",
    url: "/projects",
    icon: Inbox,
  },
]

export async function AppSidebar() {
  const user = await getUser()

  return (
    <Sidebar>
      <SidebarContent className="mt-20">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span className="text-lg">{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        {user !== null ? (
          <div>
            <img
              className="h-10 w-10"
              src={user.user_metadata.avatar_url}
              alt="avatar"
            />
            <span className="text-mdg">{user.email}</span>
            <Dialog
              className="flex gap-2 text-s font-semibold border-2 border-solid border-violet-500 px-2 py-1 rounded-sm hover:bg-violet-400 hover:text-white"
              children={
                <form action={signOut}>
                  <Button type="submit" variant="destructive">
                    <LogOut />
                    Log Out
                  </Button>
                </form>
              }
              trigger="Log out"
              title="Are you sure you want to Log Out?"
              description=""
            />
          </div>
        ) : (
          <a href="/login">
            <button className="flex gap-2 text-s font-semibold border-2 border-solid border-violet-500 px-2 py-1 rounded-sm hover:bg-violet-400 hover:text-white">
              <LogIn />
              Log In
            </button>
          </a>
        )}
      </SidebarFooter>
    </Sidebar>
  )
}
