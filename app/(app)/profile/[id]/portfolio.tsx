"use client"
import React, { useActionState, useEffect, useState } from "react"
import { add_technology, deleteProject, deleteTechnology } from "./actions"
import { CircleX } from "lucide-react"
import Link from "next/link"

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
          className="fixed top-1 right-1 border-2 border-solid border-orange-500 px-2 rounded-md"
          onClick={() => setEditing(false)}
        >
          Done Editing
        </button>
      ) : (
        <button
          className="absolute top-1 right-1 border-2 border-solid border-emerald-500 px-2 rounded-md"
          onClick={() => setEditing(true)}
        >
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
      <main className="flex flex-wrap justify-center gap-10 ">
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
    <div className="relative p-2">
      <p>{name}</p>
      <img src={img_url == "" ? "/placeholder" : img_url} alt={name} />
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
  const project_id = 0
  return (
    <div>
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
    <div className="relative p-2 border-2 border-solid border-fuchsia-500 rounded-md flex-1 min-w-[20em] max-w-[30em] h-[20em] overflow-auto">
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
      <h2>Project Title : {project.name}</h2>
      <p>Project Description : {project.description}</p>
      <p>Project Link : {project.url}</p>
      <div>
        {media.map((item, index) =>
          item?.type?.includes("image") ? (
            <img
              key={index}
              src={item.url}
              alt={item.description}
              className="h-[5em]"
            />
          ) : (
            <video key={index} src={item.url} controls className="h-[5em]" />
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
