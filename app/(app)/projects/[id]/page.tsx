import Project from "@/components/project"
import { db } from "@/src"
import { projects } from "@/src/db/schema"
import { Projects } from "@/types/types"
import { eq } from "drizzle-orm"

export default async function Page({
  params,
}: {
  params: {
    id: number
  }
}) {
  const [project]: Projects[] = await db
    .select()
    .from(projects)
    .where(eq(projects.id, params.id))
    .limit(1)

  return (
    <div>
      {params.id}
      <Project project_id={project.id} project={project} />
    </div>
  )
}
