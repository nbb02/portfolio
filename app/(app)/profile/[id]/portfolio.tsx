"use client"
import React, { useActionState, useEffect, useState } from "react"
import { add_technology, deleteProject, deleteTechnology } from "./actions"
import { ArrowUpRight, CircleX } from "lucide-react"
import Link from "next/link"
import WithToolTip from "@/components/with-tooltip"

export default function Portfolio({
  profile_id,
  technologies,
  projects,
}: PortfolioProps) {
  const [editing, setEditing] = useState(false)

  return (
    <div>
      {editing ? (
        <button
          className="text-lg fixed top-1 right-1 overflow-hidden border-2 border-solid border-orange-500 px-2 rounded-md"
          onClick={() => setEditing(false)}
        >
          <span className="bg-blur"></span>
          Done Editing
        </button>
      ) : (
        <button
          className="text-lg fixed top-1 overflow-hidden right-1 border-2 border-solid border-emerald-500 px-2 rounded-md"
          onClick={() => setEditing(true)}
        >
          <span className="bg-blur"></span>
          Edit
        </button>
      )}

      <h1>Portfolio</h1>
      <Techs
        profile_id={profile_id}
        technologies={technologies}
        editing={editing}
        projects={projects}
      />
      <Projects editing={editing} id={profile_id} projects={projects} />
    </div>
  )
}

function Techs({
  profile_id,
  technologies,
  editing,
}: TechProps & PortfolioProps) {
  const [adding, setAdding] = useState(false)

  return (
    <div className="py-5">
      <h1 className="text-center text-2xl">Technologies</h1>
      <main className="flex flex-wrap justify-center gap-2">
        {technologies?.map((item) => (
          <Technology
            id={item.id}
            key={item.id}
            name={item.name}
            img_url={item.img_url}
            editing={editing}
          />
        ))}
        {adding && (
          <TechForm close={() => setAdding(false)} profile_id={profile_id} />
        )}
        {editing && <button onClick={() => setAdding(true)}>Add +</button>}
      </main>
    </div>
  )
}

function Technology({
  id,
  name,
  img_url,
  editing,
}: {
  editing: boolean
  id: number
  name: string
  img_url: string
}) {
  const deleteTechnologyWithId = deleteTechnology.bind(null, id)

  return (
    <WithToolTip
      text={name}
      children={
        <div className="max-w-[5em] relative p-2 h-[5em] w-[5em] border-2 border-solid rounded-sm overflow-hidden">
          <img
            className="h-full w-full object-contain"
            src={img_url == "" ? "/placeholder" : img_url}
            alt={name}
          />
          {editing && (
            <form
              action={deleteTechnologyWithId}
              className="border-none text-red-500 absolute top-1 right-1"
            >
              <button className="border-none" type="submit">
                <CircleX />
              </button>
            </form>
          )}
        </div>
      }
    />
  )
}

function TechForm({
  close,
  profile_id,
}: {
  close: () => void
  profile_id: number
}) {
  const [state, action, pending] = useActionState(add_technology, null)

  useEffect(() => {
    if (state?.success) {
      close()
    }
  }, [state])
  return (
    <form
      action={action}
      className="fixed top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] p-5 border-2 border-solid border-violet-500 flex flex-col gap-5  bg-opacity-50 rounded-md overflow-hidden"
    >
      <div className="absolute h-full w-full top-0 left-0 z-[-1] bg-white bg-opacity-30 backdrop-blur-sm "></div>
      <input type="hidden" name="user_id" value={profile_id} />
      {state?.error && <p>{state.message}</p>}
      <label htmlFor="">Technology Name</label>
      <input type="text" name="name" />
      <label htmlFor="">Image Url</label>
      <input type="text" name="img_url" />
      <button type="submit" disabled={pending}>
        Add
      </button>
      <button onClick={close}>Close </button>
    </form>
  )
}

function Projects({
  editing,
  id,
  projects,
}: {
  editing: boolean
  id: number
  projects: Projects[]
}) {
  return (
    <div className="">
      <h1 className="text-center text-2xl p-2">Projects</h1>
      <main className="flex flex-wrap gap-2 justify-center">
        {projects.map((project) => (
          <Project
            key={project.id}
            editing={editing}
            project_id={project.id}
            project={project}
          />
        ))}
        {editing && (
          <div className="p-2 border-2 border-solid border-fuchsia-500 rounded-md flex-1 min-w-[20em] max-w-[30em] h-[20em] overflow-auto flex justify-center items-center">
            <Link href={"/profile/" + id + "/add-project"}>Add Project</Link>
          </div>
        )}
      </main>
    </div>
  )
}

function Project({
  editing,
  project_id,
  project,
}: {
  editing: boolean
  project_id: number
  project: Projects
}) {
  const deleteProjectWithId = deleteProject.bind(null, project_id)

  const media = project.media as MediaItem[]
  return (
    <div className="flex flex-row relative p-2 border-2 border-solid border-fuchsia-500 rounded-xl flex-1 min-w-[25em] max-w-[100%] h-[20em] overflow-auto">
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
            className="text-sm flex p-2 border-2 border-solid border-white bg-orange-400 rounded-lg text-white
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

type TechProps = {
  editing: boolean
}

type PortfolioProps = {
  profile_id: number
  technologies: Technologies[]
  projects: Projects[]
}

type Technologies = {
  id: number
  name: string
  user_id: number
  img_url: string
}

type Projects = {
  id: number
  user_id: number
  name: string
  description: string
  url: string
  media: unknown
}

type MediaItem = {
  description: string
  url: string
  type: string
}
