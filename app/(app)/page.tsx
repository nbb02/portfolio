import { db } from "@/src"
import { profiles } from "@/src/db/schema"
import { createClient } from "@/utils/supabase/server"
import Image from "next/image"
import Link from "next/link"

export default async function Page() {
  const all_profiles = await db.select().from(profiles)

  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  const hasProfile = all_profiles?.find((item) => item.user_id === user?.id)

  return (
    <div className="flex flex-col min-h-screen  w-full">
      <main className="flex flex-1 flex-col h-full ">
        <main
          className="flex-1 flex gap-2 py-2 px-5 flex-wrap content-center 
      justify-center"
        >
          {!hasProfile && user && (
            <a
              href="/create-profile"
              className="w-full flex-none flex justify-center"
            >
              <button
                className=" border-fuchsia-300 border-2 border-solid p-1 font-bold  hover:bg-violet-300 hover:text-white rounded-lg self-start"
                disabled={user === null}
              >
                Create Your Profile
              </button>
            </a>
          )}
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
    <div
      className="relative flex flex-col p-2 items-center max-w-[20em] min-w-[20em] h-[20em] flex-1 neumorphic 
     bg-white "
    >
      <Image
        className="h-[10em] w-full object-cover rounded-sm"
        src={userData?.cover_photo ?? "/placeholder.png"}
        alt="cover photo"
        width={160}
        height={160}
      />
      <Image
        src={userData?.avatar_image ?? "/placeholder.png"}
        alt="avatar_image"
        width={800}
        height={500}
        className="top-24 absolute rounded-full block h-[8em] w-[8em] object-cover bg-white border-white border-2 border-solid"
      />
      <p className="pt-16 text-xl font-semibold">
        {userData.first_name} {userData.last_name}
      </p>
      <p className="text-md text-gray-400 font-semibold">{userData.role}</p>
      <Link
        href={"/profile/" + userData.id}
        className="border-solid border-2 border-violet-500 rounded-sm hover:bg-violet-400 hover:text-white px-2 text-violet-500 font-bold"
      >
        View
      </Link>
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
