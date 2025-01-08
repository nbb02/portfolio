import Project from "@/components/project"
import { db } from "@/src"
import { projects } from "@/src/db/schema"
import React from "react"

export default async function Page() {
  const allProjects: Project[] = await db.select().from(projects)

  return (
    <div className="mt-6 p-10">
      <div className="flex flex-wrap gap-10">
        {allProjects.map((project) => (
          <Project key={project.id} project_id={project.id} project={project} />
        ))}
      </div>
    </div>
  )
}

interface Project {
  user_id: number
  url: string
  id: number
  name: string
  description: string
  media: unknown
}
