"use client"
import { deleteProject } from "@/app/(app)/profile/[id]/actions"
import { MediaItem, Project as ProjectType } from "@/types/types"
import { ArrowUpRight, CircleX, Edit } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"
import Media from "./media"
import { cn } from "@/lib/utils"

export default function Project({
  editing,
  project_id,
  project,
}: {
  editing?: boolean
  project_id: number
  project: ProjectType
}) {
  const deleteProjectWithId = deleteProject.bind(null, project_id)

  const [index, setIndex] = useState(0)
  const [oldIndex, setOldIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const [hoovered, setHoovered] = useState(false)

  const media = project.media as MediaItem[]

  useEffect(() => {
    let interval: any

    if (!paused) {
      interval = setInterval(() => {
        setIndex((prevIndex) => {
          setOldIndex(prevIndex)
          return (prevIndex + 1) % media.length
        })
      }, 5000)
    } else {
      clearInterval(interval)
      setTimeout(() => {
        setPaused(false)
      }, 5000)
    }
    if (hoovered) {
      clearInterval(interval)
    }

    return () => {
      clearInterval(interval)
    }
  }, [media.length, paused, hoovered])

  return (
    <div className=" text-black flex flex-row relative p-2 border-2 border-solid rounded-xl flex-1 min-w-[25em] max-w-[40em] h-[20em] overflow-auto neumorphic">
      {editing && (
        <div className="absolute top-1 right-1 flex items-center gap-1 bg-white bg-opacity-70 rounded-md z-30">
          <form
            action={deleteProjectWithId}
            className="border-none text-red-500 flex"
          >
            <button className="border-none" type="submit">
              <CircleX />
            </button>
          </form>
          <Link
            className="border-none text-green-500"
            href={"/projects/" + project_id + "?edit=true"}
          >
            <Edit />
          </Link>
        </div>
      )}
      <div className="flex flex-1 flex-col gap-2 justify-center p-2">
        <h2 className="text-lg font-medium h-[5em] overflow-auto">
          {project.name}
        </h2>
        <p className="flex-1 overflow-auto text-sm">{project.description}</p>
        <p>
          <Link
            className="gap-1  flex px-5 py-1  bg-orange-400 rounded-sm text-white border-[1px] border-solid hover:text-orange-500 border-orange-400 hover:bg-orange-50 hover:font-bold w-max"
            href={"/projects/" + project_id}
          >
            View
          </Link>
        </p>
        <a
          href={project.url}
          className="justify-self-end mt-auto text-sm text-gray-400 border-[1px] border-solid border-gray-300 w-max px-2 py-1 rounded-sm hover:text-white hover:bg-gray-500 flex items-center"
        >
          Visit @ {project.url}
          <ArrowUpRight />
        </a>
      </div>
      <div className="flex-1 p-2 overflow-hidden relative top-0 left-0 ">
        {media.map((item, i) => (
          <Media
            key={i}
            media={item}
            index={i}
            onMouseEnter={() => setHoovered(true)}
            onMouseLeave={() => setHoovered(false)}
            className={cn(
              "absolute top-0 left-0 h-full w-full object-cover rounded-md",
              i === index ? "slide-in z-20" : "",
              i === oldIndex ? "z-[19]" : ""
            )}
          />
        ))}
        {media.length > 1 && (
          <div className="flex gap-1 absolute bottom-0 left-1/2 -translate-x-1/2 bg-white p-1 bg-opacity-50 z-20 rounded-lg">
            {media.map((_, i) => (
              <button
                className={cn(
                  "rounded-full h-3 w-3 hover:bg-gray-500 ",
                  i === index ? "bg-black" : "bg-gray-400"
                )}
                key={i}
                onClick={() => {
                  setIndex(i)
                  setOldIndex(index)
                  setPaused(true)
                }}
              ></button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
