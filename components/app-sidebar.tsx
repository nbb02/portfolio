import { Home, Inbox, LogIn, LogOut } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import getUser from "@/app/auth"
import { signOut } from "@/app/login/actions"
import Dialog from "./dialog"
import { Button } from "./ui/button"
import { cookies, headers } from "next/headers"
import ThemeSwitch from "./theme-switch"
import { cn } from "@/lib/utils"

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

  const cookieStore = await cookies()

  const theme = cookieStore.get("theme")

  const headersList = await headers()
  const path = headersList.get("x-pathname")

  return (
    <Sidebar>
      <SidebarContent className="mt-20 ">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem
                  key={item.title}
                  className={cn(
                    "p-1 rounded-lg border-[1px] border-solid hover:border-indigo-300 hover:text-indigo-500 dark:hover:text-white",
                    {
                      "!bg-indigo-300 text-white":
                        item.url === "/"
                          ? path == item.url
                          : path?.startsWith(item.url),
                    }
                  )}
                >
                  <SidebarMenuButton
                    asChild
                    className={cn(
                      item.url === "/"
                        ? path == item.url
                          ? "!bg-indigo-300 !text-white"
                          : "hover:text-indigo-500 dark:hover:text-white"
                        : path?.startsWith(item.url)
                        ? "!bg-indigo-300 !text-white"
                        : "hover:text-indigo-500 dark:text-white"
                    )}
                  >
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
      <SidebarFooter className="flex gap-5 ">
        {user !== null && (
          <div className="flex flex-col gap-2">
            <div className="flex gap-1 items-center w-full overflow-hidden">
              <img
                className="h-10 w-10 rounded-md"
                src={user.user_metadata.avatar_url}
                alt="avatar"
              />
              <span className="text-md flex-1">{user.email}</span>
            </div>
          </div>
        )}

        <div className="flex justify-between items-center gap-2">
          {user !== null ? (
            <Dialog
              className="flex gap-2 text-s font-semibold border-2 border-solid border-violet-500 px-2 py-1 rounded-sm hover:bg-violet-400 hover:text-white w-max"
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
          ) : (
            <a href="/login">
              <button className="flex gap-2 text-s font-semibold border-2 border-solid border-violet-500 px-2 py-1 rounded-sm hover:bg-violet-400 hover:text-white">
                <LogIn />
                Log In
              </button>
            </a>
          )}
          <ThemeSwitch theme={theme?.value ?? "light"} />
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
