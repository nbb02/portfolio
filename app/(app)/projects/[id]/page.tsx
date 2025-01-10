import { db } from "@/src"
import { projects } from "@/src/db/schema"
import { eq } from "drizzle-orm"
import ProjectItem from "./project-item"

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

  return <ProjectItem project={project} />
}
