import { deleteProject } from "@/app/(app)/profile/[id]/actions"
import { ArrowUpRight, CircleX } from "lucide-react"

export default function Project({
  editing,
  project_id,
  project,
}: {
  editing?: boolean
  project_id: number
  project: Projects
}) {
  const deleteProjectWithId = deleteProject.bind(null, project_id)

  const media = project.media as MediaItem[]
  return (
    <div className="text-black flex flex-row relative p-2 border-2 border-solid rounded-xl flex-1 min-w-[25em] max-w-[100%] h-[20em] overflow-auto neumorphic">
      {editing && (
        <form
          action={deleteProjectWithId}
          className="border-none text-red-500 absolute top-1 right-1"
        >
          <button className="border-none" type="submit">
            <CircleX />
          </button>
        </form>
      )}
      <div className="flex flex-1 flex-col gap-5 justify-center">
        <h2 className="text-3xl">{project.name}</h2>
        <p>{project.description}</p>
        <a href={project.url}>
          <button
            className="text-sm flex p-2  bg-orange-400 rounded-lg text-white
            hover:bg-white hover:text-orange-500 hover:border-orange-500"
          >
            Visit @ {project.url} <ArrowUpRight />
          </button>
        </a>
      </div>
      <div className="flex-1 p-2 ">
        {media.map((item, index) =>
          item?.type?.includes("image") ? (
            <img
              key={index}
              src={item.url}
              alt={item.description}
              className="h-full w-full object-cover rounded-md"
            />
          ) : (
            <video
              key={index}
              src={item.url}
              controls
              className="h-full w-full object-cover rounded-md"
            />
          )
        )}
      </div>
    </div>
  )
}

type MediaItem = {
  description: string
  url: string
  type: string
}

type Projects = {
  id: number
  user_id: number
  name: string
  description: string
  url: string
  media: unknown
}
