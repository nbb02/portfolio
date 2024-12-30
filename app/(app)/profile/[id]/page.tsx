import { db } from "@/src"
import { profiles, technologies } from "@/src/db/schema"
import { eq } from "drizzle-orm"
import Technologies from "./technologies"

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  if (!isUuid(id)) {
    return (
      <h1>
        Profile Not Found. <a href="/">Go Back to home</a>
      </h1>
    )
  }

  const profile = await db
    .select()
    .from(profiles)
    .where(eq(profiles.user_id, id))
    .limit(1)

  if (!profile)
    return (
      <h1>
        Profile Not Found. <a href="/">Go Back to home</a>
      </h1>
    )

  const techs = await db
    .select()
    .from(technologies)
    .where(eq(technologies.user_id, profile[0].id))

  const {
    first_name,
    middle_name,
    last_name,
    cover_photo,
    avatar_image,
    role,
    email,
    about,
    country,
    province,
    city,
  } = profile[0]

  return (
    <div className="p-2">
      <header className="flex justify-center">
        <img
          className="w-[50em] h-[20em] max-w-full object-cover"
          src={cover_photo ?? "/placeholder"}
          alt=""
        />
      </header>
      <main>
        <h2>Profile</h2>
        <img src={avatar_image ?? "/placeholder"} alt="" />
        <p>
          {last_name}, {first_name} {middle_name}
        </p>
        <p>{email}</p>
        <p>{role}</p>
        <p>{about}</p>
        <p>
          {city}, {province}, {country}
        </p>
      </main>
      <hr className="my-16" />
      <Technologies profile_id={profile[0].id} technologies={techs} />
      <Projects />
    </div>
  )
}

function Projects() {
  return (
    <div>
      <h1 className="text-center text-2xl p-2">Projects</h1>
      <main className="flex flex-wrap gap-2 justify-center">
        <Project />
        <Project />
        <Project />
        <Project />
      </main>
    </div>
  )
}

function Project() {
  return (
    <div className="p-2 border-2 border-solid border-fuchsia-500 rounded-md flex-1 min-w-[20em] max-w-[30em] h-[20em] overflow-auto">
      <h2>Project Title</h2>
      <p>Project Description</p>
      <p>Project Link</p>
      <div>
        <img src="https://via.placeholder.com/150" alt="" />
        <img src="https://via.placeholder.com/150" alt="" />
      </div>
    </div>
  )
}

const isUuid = (input: string): boolean => {
  const uuidRegex =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
  return uuidRegex.test(input)
}
