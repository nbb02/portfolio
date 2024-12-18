import { LogIn, LogOut } from "lucide-react"
import { signOut } from "../login/actions"
import { db } from "@/src"
import { profiles } from "@/src/db/schema"
import { createClient } from "@/utils/supabase/server"
import { redirect } from "next/navigation"
import Link from "next/link"

export default async function Home() {
  const all_profiles = await db.select().from(profiles)

  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  const hasProfile = all_profiles?.find((item) => item.user_id === user?.id)

  return (
    <div className="flex-1 flex flex-col min-h-screen  w-full border-2 border-violet-600 border-solid">
      <nav className="flex gap-2 p-2 justify-end">
        {user !== null ? (
          <form action={signOut}>
            <button
              type="submit"
              className="flex gap-2 text-s font-semibold border-2 border-solid border-violet-500 px-2 py-1 rounded-sm hover:bg-violet-400 hover:text-white"
            >
              <LogOut />
              Log Out
            </button>
          </form>
        ) : (
          <a href="/login">
            <button className="flex gap-2 text-s font-semibold border-2 border-solid border-violet-500 px-2 py-1 rounded-sm hover:bg-violet-400 hover:text-white">
              <LogIn />
              Log In
            </button>
          </a>
        )}
      </nav>
      <main className="flex flex-1 flex-col h-full bg-violet-200">
        <header className="p-2 flex justify-center">
          {!hasProfile && (
            <a href="/create-profile">
              <button
                className=" border-fuchsia-500 border-2 border-solid p-1 font-bold  hover:bg-violet-400 hover:text-white rounded-lg self-start"
                disabled={user === null}
              >
                Create Your Profile {user === null && "Must Be Logged In First"}
              </button>
            </a>
          )}
        </header>
        <main className=" flex-1 flex gap-2 py-2 px-5 flex-wrap content-center bg-fuchsia-200">
          {all_profiles.map((userData) => (
            <UserBox key={userData.id} userData={userData} />
          ))}
        </main>
      </main>
    </div>
  )
}

function UserBox({ userData }: { userData: UserData }) {
  return (
    <div className="min-w-[20em] h-[20em] flex-1 border-blue-400 border-solid border-2 rounded-lg">
      <img src={userData?.avatar_image ?? ""} alt="" />
      <img
        className="h-[10em] w-[15em] object-cover"
        src={userData?.cover_photo ?? ""}
        alt=""
      />
      <h2>{userData.first_name}</h2>
      <h3>{userData.last_name}</h3>
      <p>{userData.role}</p>
      <Link href={"/" + userData.user_id}>View</Link>
    </div>
  )
}

type UserData = {
  user_id: string
  id: number
  first_name: string
  middle_name?: string | null
  last_name: string
  email: string
  avatar_image: string | null
  cover_photo: string | null
  role: string | null
  about: string | null
  country: string | null
  province: string | null
  city: string | null
  created_at: Date
}
