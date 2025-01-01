import { db } from "@/src"
import { profiles, technologies } from "@/src/db/schema"
import { eq } from "drizzle-orm"
import Portfolio from "./portfolio"

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  if (!Number(id))
    return (
      <h1>
        Profile Not Found. <a href="/">Go Back to home</a>
      </h1>
    )

  const profile = await db
    .select()
    .from(profiles)
    .where(eq(profiles.id, Number(id)))
    .limit(1)

  if (!profile)
    return (
      <h1>
        Profile Not Found. <a href="/">Go Back to home</a>
      </h1>
    )

  const allTechnologies = await db
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
    <div className="p-2 relative">
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
      <Portfolio profile_id={profile[0].id} technologies={allTechnologies} />
    </div>
  )
}
