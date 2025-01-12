import { db } from "@/src"
import { profiles, projects, technologies } from "@/src/db/schema"
import { eq } from "drizzle-orm"
import Portfolio from "./portfolio"
import getUser from "@/app/auth"

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

  const allProjects = await db
    .select()
    .from(projects)
    .where(eq(projects.user_id, profile[0].id))

  const user_id = (await getUser())?.id

  return (
    <Portfolio
      profile={profile[0]}
      profile_id={profile[0].id}
      technologies={allTechnologies}
      projects={allProjects}
      user_id={user_id}
    />
  )
}
