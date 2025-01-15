import { db } from "@/src"
import { profiles, projects } from "@/src/db/schema"
import { eq } from "drizzle-orm"
import ProjectItem from "./project-item"
import getUser from "@/app/auth"

export default async function Page({
  params,
}: {
  params: Promise<{
    id: number
  }>
}) {
  const project_id = (await params).id
  const [project] = await db
    .select()
    .from(projects)
    .where(eq(projects.id, project_id))
    .limit(1)

  const profile_id = project?.user_id
  const [profile] = await db
    .select({ user_id: profiles.user_id })
    .from(profiles)
    .where(eq(profiles.id, profile_id))
    .limit(1)

  const user_id = (await getUser())?.id
  const canEdit = user_id ? profile?.user_id === user_id : false

  return <ProjectItem project={project} canEdit={canEdit} />
}
