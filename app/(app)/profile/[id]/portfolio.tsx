"use client"
import React, { useActionState, useEffect, useState } from "react"
import { add_technology, changeAvatar, deleteTechnology } from "./actions"
import { type InferSelectModel } from "drizzle-orm"
import { CircleX, Edit } from "lucide-react"
import Link from "next/link"
import Project from "@/components/project"
import { profiles } from "@/src/db/schema"

export default function Portfolio({
  profile_id,
  technologies,
  projects,
  profile,
}: PortfolioProps) {
  const [editing, setEditing] = useState(false)

  const {
    id,
    first_name,
    middle_name,
    last_name,
    cover_photo,
    avatar_image,
    role,
    email,
    about,
    country,
    province,
    city,
  } = profile

  return (
    <div className="p-2 relative">
      <header className="relative flex justify-center">
        <div className="relative w-full h-[20em] overflow-hidden">
          <img
            className="w-full h-full object-cover cover-photo"
            src={cover_photo ?? "/placeholder"}
            alt=""
          />
          <button className="absolute bottom-1 right-1 bg-white px-2 rounded-lg py-1 border-2 border-solid border-green-500 text-green-500 font-bold z-50 text-sm hover:bg-green-500 hover:text-white">
            Change cover Photo
          </button>
        </div>
        <div className="block absolute top-[60%] left-1/2 -translate-x-1/2 h-[10em] w-[10em] bg-white border-solid border-2 border-black rounded-full mx-auto overflow-hidden">
          <img
            className="w-full h-full object-cover"
            src={avatar_image ?? "/placeholder"}
            alt="avatar"
          />
          <form
            action={changeAvatar}
            className="absolute bottom-0 left-1/2 -translate-x-1/2 bg-white px-2 rounded-lg py-1 border-t-2 border-solid border-green-500 text-green-500 font-bold z-50 text-sm hover:bg-green-500 hover:text-white w-full"
          >
            <label className="text-center block">
              Change
              <input
                type="file"
                name="avatar_image"
                className="hidden"
                onChange={(e) => {
                  if (e.target.files?.[0]) {
                    e.target.form?.requestSubmit()
                  }
                }}
              />
            </label>
            <input type="hidden" name="profile_id" value={id} />
          </form>
        </div>
      </header>
      <main className="mt-10 px-10">
        <p className="text-4xl font-bold">
          {last_name}, {first_name} {middle_name}
        </p>
        <p className="text-lg">{email}</p>
        <p className="text-lg">{role}</p>
        <p className="text-lg">{about}</p>
        <p className="text-lg">
          {city}, {province}, {country}
        </p>
      </main>
      <hr className="my-10 w-[90%] mx-auto" />
      <div>
        {editing ? (
          <button
            className="z-50 text-lg fixed top-1 right-1 overflow-hidden border-2 border-solid border-orange-500 px-2 rounded-md"
            onClick={() => setEditing(false)}
          >
            <span className="bg-blur"></span>
            Done Editing
          </button>
        ) : (
          <button
            className="z-50 text-lg fixed top-1 overflow-hidden right-1 border-2 border-solid border-emerald-500 px-2 rounded-md"
            onClick={() => setEditing(true)}
          >
            <span className="bg-blur"></span>
            Edit
          </button>
        )}
        <Techs
          profile_id={profile_id}
          technologies={technologies}
          editing={editing}
          projects={projects}
        />
        <Projects editing={editing} id={profile_id} projects={projects} />
      </div>
    </div>
  )
}

function Techs({ profile_id, technologies, editing }: TechProps) {
  const [adding, setAdding] = useState(false)
  const [editId, setEditId] = useState<number | null>(null)

  function close() {
    if (adding) {
      setAdding(false)
    }
    if (editId) {
      setEditId(null)
    }
  }

  return (
    <div className="py-5">
      <main className="flex flex-wrap justify-center gap-5 ">
        {technologies?.map((item) => (
          <Technology
            id={item.id}
            key={item.id}
            name={item.name}
            img_url={item.img_url}
            editing={editing}
            setEditId={setEditId}
          />
        ))}
        {(adding || editId) && (
          <TechForm
            close={close}
            profile_id={profile_id}
            id={editId}
            data={technologies.find((tech) => tech.id == editId)}
          />
        )}
        {editing && (
          <button
            className="font-semibold bg-gray-300 border-2 border-solid border-black rounded-md h-max w-max self-center p-2 hover:bg-gray-400 hover:border-gray-500"
            onClick={() => setAdding(true)}
          >
            Add +
          </button>
        )}
      </main>
    </div>
  )
}

function Technology({
  id,
  name,
  img_url,
  editing,
  setEditId,
}: {
  editing: boolean
  id: number
  name: string
  img_url: string
  setEditId: (id: number | null) => void
}) {
  const deleteTechnologyWithId = deleteTechnology.bind(null, id)

  return (
    <div className=" neumorphic with-tooltip max-w-[5em] relative p-2 h-[5em] w-[5em]">
      <img
        className="h-full w-full object-contain "
        src={img_url == "" ? "/placeholder" : img_url}
        alt={name}
      />
      {editing && (
        <div className="absolute top-1 right-1 flex items-center gap-1 bg-white bg-opacity-70 rounded-md">
          <form
            action={deleteTechnologyWithId}
            className="border-none text-red-500 flex"
          >
            <button className="border-none" type="submit">
              <CircleX />
            </button>
          </form>

          <button
            className="border-none text-green-500"
            onClick={() => setEditId(id)}
          >
            <Edit />
          </button>
        </div>
      )}
      <span>{name}</span>
    </div>
  )
}

function TechForm({
  close,
  profile_id,
  id,
  data,
}: {
  close: () => void
  profile_id: number
  id?: number | null
  data?: {
    name: string
    img_url: string
  }
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
      className="fixed top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] p-10 border-2 border-solid border-violet-500 flex flex-col gap-2  bg-opacity-50 rounded-md overflow-hidden z-50"
    >
      <div className="absolute h-full w-full top-0 left-0 z-[-1] bg-white bg-opacity-30 backdrop-blur-sm "></div>
      <h1>{id ? "Add" : "Update"} Technology</h1>
      <input type="hidden" name="user_id" value={profile_id} />
      {id && <input type="hidden" name="id" value={id} />}
      {state?.error && <p>{state.message}</p>}
      <label htmlFor="">Technology Name</label>
      <input
        className="border-2 border-solid border-violet-500 p-1 rounded-md"
        type="text"
        name="name"
        defaultValue={data?.name}
      />
      <label htmlFor="">Image Url</label>
      <input
        className="border-2 border-solid border-violet-500 p-1 rounded-md"
        type="text"
        name="img_url"
        defaultValue={data?.img_url}
      />
      <footer className="flex justify-between px-5">
        <button
          className="border-solid border-2 border-red-500 px-2 rounded-md text-red-500 font-bold hover:bg-red-500 hover:text-white"
          onClick={close}
        >
          Close
        </button>
        <button
          className="border-solid border-2 border-green-500 px-2 rounded-md text-green-500 font-bold hover:bg-green-500 hover:text-white"
          type="submit"
          disabled={pending}
        >
          {id ? "Update" : "Add"}
        </button>
      </footer>
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
    <div className="p-10">
      <main className="flex flex-wrap gap-10 justify-center">
        {projects.map((project) => (
          <Project
            key={project.id}
            editing={editing}
            project_id={project.id}
            project={project}
          />
        ))}
        {editing && (
          <div className="font-semibold bg-gray-300 border-2 border-solid border-black rounded-md self-center p-2 flex-1 min-w-[20em] max-w-[30em] h-[20em] overflow-auto flex justify-center items-center hover:bg-gray-400 hover:border-gray-500">
            <Link href={"/profile/" + id + "/add-project"}>Add Project</Link>
          </div>
        )}
      </main>
    </div>
  )
}

type TechProps = {
  editing: boolean
  profile_id: number
  technologies: Technologies[]
  projects: Projects[]
}

type PortfolioProps = {
  profile_id: number
  technologies: Technologies[]
  projects: Projects[]
  profile: InferSelectModel<typeof profiles>
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
