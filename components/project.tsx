"use client"
import { deleteProject } from "@/app/(app)/profile/[id]/actions"
import { MediaItem, Projects } from "@/types/types"
import { ArrowUpRight, CircleX, Edit } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"

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
    <div className=" text-black flex flex-row relative p-2 border-2 border-solid rounded-xl flex-1 min-w-[25em] max-w-[40em] h-[20em] overflow-auto neumorphic">
      {editing && (
        <div className="absolute top-1 right-1 flex items-center gap-1 bg-white bg-opacity-70 rounded-md z-50">
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
      <div className="flex flex-1 flex-col gap-5 justify-center p-2">
        <h2 className="text-3xl">{project.name}</h2>
        <p>{project.description}</p>
        <a href={project.url}>
          <button className="gap-1  flex p-2  bg-orange-400 rounded-lg text-white border-[1px] border-solid hover:text-orange-500 border-orange-400 hover:bg-orange-50 hover:font-bold">
            Visit
            <ArrowUpRight />
          </button>
        </a>
      </div>
      <div className="flex-1 p-2 overflow-hidden relative top-0 left-0 ">
        {media.map((item, i) =>
          item?.type?.includes("image") ? (
            <Image
              key={i}
              src={item.url ?? "/placeholder.png"}
              alt={item.description}
              className={`absolute top-0 left-0 h-full w-full object-cover rounded-md ${
                index === i ? "slide-in z-20" : ""
              }`}
              height={500}
              width={500}
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
        <div className="flex gap-1 absolute bottom-0 left-1/2 -translate-x-1/2 bg-white p-1 bg-opacity-50 z-20 rounded-lg">
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
