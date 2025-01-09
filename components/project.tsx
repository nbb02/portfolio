"use client"
import { deleteProject } from "@/app/(app)/profile/[id]/actions"
import { ArrowUpRight, CircleX } from "lucide-react"
import { useEffect, useRef, useState } from "react"

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

  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const [hoovered, setHoovered] = useState(false)

  const media = project.media as MediaItem[]

  useEffect(() => {
    let interval: any

    if (!paused) {
      interval = setInterval(() => {
        setIndex((prevIndex) => (prevIndex + 1) % media.length)
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
    <div className="text-black flex flex-row relative p-2 border-2 border-solid rounded-xl flex-1 min-w-[25em] max-w-[50em] h-[20em] overflow-auto neumorphic">
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
          <button className="text-sm flex p-2  bg-orange-400 rounded-lg text-white border-[1px] border-solid hover:text-orange-500 border-orange-400 hover:bg-orange-50 hover:font-bold">
            Visit @ {project.url} <ArrowUpRight />
          </button>
        </a>
      </div>
      <div className="flex-1 p-2 overflow-hidden relative top-0 left-0 ">
        {media.map((item, i) =>
          item?.type?.includes("image") ? (
            <img
              key={i}
              src={item.url}
              alt={item.description}
              className={`absolute top-0 left-0 h-full w-full object-cover rounded-md ${
                index === i ? "slide-in z-20" : ""
              }`}
              onMouseEnter={() => setHoovered(true)}
              onMouseLeave={() => setHoovered(false)}
            />
          ) : (
            <video
              key={i}
              src={item.url}
              controls
              className={`absolute top-0 left-0 h-full w-full object-cover rounded-md ${
                index === i ? "slide-in z-20" : ""
              }`}
              onMouseEnter={() => setHoovered(true)}
              onMouseLeave={() => setHoovered(false)}
            />
          )
        )}
        {/* {media[index]?.type?.includes("image") ? (
          <img
            key={index}
            src={media[index].url}
            alt={media[index].description}
            className="absolute top-0 left-0 h-full w-full object-cover rounded-md slide-in z-10"
          />
        ) : (
          <video
            key={index}
            src={media[index].url}
            controls
            className="absolute top-0 left-0 h-full w-full object-cover rounded-md slide-in z-10"
          />
        )} */}
        <div className="flex gap-1 absolute bottom-0 left-1/2 -translate-x-1/2 bg-white p-1 bg-opacity-50 z-20">
          {media.length > 1 &&
            media.map((_, i) => (
              <button
                className={` rounded-full h-3 w-3 hover:bg-gray-500 ${
                  i === index ? "bg-black" : "bg-gray-400"
                }`}
                key={i}
                onClick={() => {
                  setIndex(i)
                  setPaused(true)
                }}
              ></button>
            ))}
        </div>
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
