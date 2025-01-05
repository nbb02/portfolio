import { db } from "@/src"
import { projects } from "@/src/db/schema"
import React from "react"

export default async function Page() {
  const allProjects: Project[] = await db.select().from(projects)

  return (
    <div>
      <h1>Projects</h1>
      <div className="flex flex-wrap gap-5">
        {allProjects.map((project) => {
          const media = project.media as MediaItem[]

          return (
            <div
              key={project.id}
              className="border-2 border-solid border-violet-500 flex-1 max-w-[20em] min-w-[10em] rounded-md p-2"
            >
              <h2>{project.name}</h2>
              <p>{project.description}</p>
              {media && (
                <div>
                  {media.map((mediaItem, index) => (
                    <div key={index}>
                      <p>{mediaItem.description}</p>
                      {mediaItem?.type?.includes("image") ? (
                        <img
                          src={mediaItem.url}
                          alt={mediaItem.description}
                          className="h-[5em]"
                        />
                      ) : (
                        <video
                          src={mediaItem.url}
                          controls
                          className="h-[5em]"
                        />
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

interface MediaItem {
  description: string
  url: string
  type: string
}

interface Project {
  id: number
  name: string
  description: string
  media: unknown
}
