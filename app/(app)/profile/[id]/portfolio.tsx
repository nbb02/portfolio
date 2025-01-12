"use client"
import React, { useActionState, useEffect, useRef, useState } from "react"
import {
  add_technology,
  changeAvatar,
  changeCover,
  deleteTechnology,
  updateProfile,
} from "./actions"
import { type InferSelectModel } from "drizzle-orm"
import { CircleX, Edit, Save } from "lucide-react"
import Link from "next/link"
import Project from "@/components/project"
import { profiles } from "@/src/db/schema"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import Dialog from "@/components/dialog"

export default function Portfolio({
  profile_id,
  technologies,
  projects,
  profile,
  user_id,
}: PortfolioProps) {
  const [editing, setEditing] = useState(false)
  const [error, setError] = useState("")

  const formRef = useRef(null)

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

  function handleSaveChanges() {
    if (formRef.current) {
      const formData = new FormData(formRef.current as HTMLFormElement)

      const details = [
        "first_name",
        "middle_name",
        "last_name",
        "email",
        "role",
        "about",
        "country",
        "province",
        "city",
      ]

      const changed_values = []
      for (const item of details) {
        if (item === "about") {
          const about1 = formData.get(item) as string
          const about2 = profile?.[item as keyof typeof profile]

          if (
            normalizeText(about1 ?? "") !==
            normalizeText((about2 as string) ?? "")
          ) {
            changed_values.push(item)
          }

          continue
        }
        if (formData.get(item) != profile?.[item as keyof typeof profile]) {
          changed_values.push(item)
        }
      }

      if (changed_values.length > 0) {
        setError(
          "You have unsaved changes. " +
            changed_values
              .map((item) =>
                item
                  .split("_")
                  .map((str) => str[0].toUpperCase() + str.slice(1))
                  .join(" ")
              )
              .join(" | ") +
            " changed"
        )
        return
      }
    }
    setEditing(false)
  }

  function discard() {
    setError("")
    setEditing(false)
  }

  return (
    <div className="p-2 relative">
      <header className="relative flex justify-center">
        <div className="relative w-full h-[20em] overflow-hidden">
          <Image
            className="w-full h-full object-cover cover-photo"
            src={cover_photo ?? "/placeholder.png"}
            alt="cover photo"
            height={500}
            width={800}
          />
          {editing && (
            <form
              action={changeCover}
              className="flex items-center gap-1 absolute bottom-1 right-1 bg-white px-2 rounded-lg py-1 border-2 border-solid border-green-500 text-green-500 font-bold z-50 text-sm hover:bg-green-500 hover:text-white"
            >
              <label className="text-center flex gap-1 items-center justify-center">
                Edit <Edit />
                <input
                  type="file"
                  name="cover_photo"
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
          )}
        </div>
        <div className="block absolute top-[60%] left-1/2 -translate-x-1/2 h-[10em] w-[10em] bg-white border-solid border-2 border-black rounded-full mx-auto overflow-hidden">
          <Image
            className="w-full h-full object-cover"
            src={avatar_image ?? "/placeholder.png"}
            height={200}
            width={200}
            alt="avatar"
          />
          {editing && (
            <form
              action={changeAvatar}
              className="absolute bottom-0 left-1/2 -translate-x-1/2 bg-white px-2 rounded-lg py-1 border-t-2 border-solid border-green-500 text-green-500 font-bold z-50 text-sm hover:bg-green-500 hover:text-white w-full"
            >
              <label className="text-center flex gap-1 items-center justify-center">
                Edit <Edit />
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
          )}
        </div>
      </header>
      {editing ? (
        <form
          action={updateProfile}
          className="profile-inputs mt-10 px-10"
          ref={formRef}
        >
          <input type="hidden" name="profile_id" value={id} />
          <span>
            <label>First Name</label>
            <input
              type="text"
              name="first_name"
              defaultValue={first_name}
              required
            />
          </span>
          <span>
            <label>Middle Name</label>
            <input
              type="text"
              name="middle_name"
              defaultValue={middle_name ?? ""}
            />
          </span>
          <span>
            <label>Last Name</label>
            <input
              type="text"
              name="last_name"
              defaultValue={last_name}
              required
            />
          </span>
          <span>
            <label>Email</label>
            <input type="text" name="email" defaultValue={email} required />
          </span>
          <span>
            <label>Role</label>
            <input type="text" name="role" defaultValue={role ?? ""} required />
          </span>
          <span>
            <label>About</label>
            <textarea
              name="about"
              defaultValue={about ?? ""}
              required
            ></textarea>
          </span>
          <span>
            <label>Country</label>
            <input
              type="text"
              name="country"
              defaultValue={country ?? ""}
              required
            />
          </span>
          <span>
            <label>Province</label>
            <input
              type="text"
              name="province"
              defaultValue={province ?? ""}
              required
            />
          </span>
          <span>
            <label>City</label>
            <input type="text" name="city" defaultValue={city ?? ""} required />
          </span>
          <button
            type="submit"
            className="col-span-full flex bg-white w-max p-2 border-solid border-2 border-green-500 rounded-md text-green-500 font-bold hover:bg-green-500 hover:text-white justify-self-end"
          >
            Save <Save />
          </button>
        </form>
      ) : (
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
      )}
      <hr className="my-10 w-[90%] mx-auto" />
      <div>
        {user_id === profile.user_id &&
          (editing ? (
            <button
              className="z-50 text-lg fixed top-1 right-1 overflow-hidden border-2 border-solid border-orange-700 px-2 py-1 rounded-md hover:text-white hover:bg-orange-500"
              onClick={handleSaveChanges}
            >
              <span className="bg-blur"></span>
              <Save className="text-orange-800" />
            </button>
          ) : (
            <button
              className="z-50 text-lg fixed top-1 overflow-hidden right-1 border-2 border-solid border-green-800 px-2 py-1 rounded-md hover:text-white hover:bg-green-500"
              onClick={() => setEditing(true)}
            >
              <span className="bg-blur"></span>
              <Edit className="text-green-800" />
            </button>
          ))}
        <Techs
          profile_id={profile_id}
          technologies={technologies}
          editing={editing}
          projects={projects}
        />
        <Projects editing={editing} id={profile_id} projects={projects} />
      </div>
      {error && (
        <Dialog
          open={true}
          close={() => setError("")}
          className="flex gap-2 text-s font-semibold border-2 border-solid border-violet-500 px-2 py-1 rounded-sm hover:bg-violet-400 hover:text-white"
          children={
            <Button variant="destructive" onClick={discard}>
              Discard
            </Button>
          }
          trigger="Discard"
          title="Confirm"
          description={error}
        />
      )}
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
            className="font-semibold bg-gray-300 border-2 border-solid border-black rounded-md h-max w-max self-center p-2 hover:!bg-gray-400 hover:border-gray-500 dark:bg-gray-700 dark:border-white"
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
      <Image
        className="h-full w-full object-contain "
        src={img_url ?? "/placeholder"}
        alt={name}
        height={200}
        width={200}
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
      className="fixed top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] p-10 border-2 border-solid border-violet-500 flex flex-col gap-2 !bg-opacity-50 rounded-md overflow-hidden shadow-lg shadow-gray-400 z-50"
    >
      <div className="absolute h-full w-full top-0 left-0 z-[-1] bg-white dark:dark:bg-gray-700 bg-opacity-30 backdrop-blur-sm "></div>
      <h1 className="text-lg font-bold">{id ? "Add" : "Update"} Technology</h1>
      <input type="hidden" name="user_id" value={profile_id} />
      {id && <input type="hidden" name="id" value={id} />}
      {state?.error && <p>{state.message}</p>}
      <label htmlFor="">Technology Name</label>
      <input
        className="border-2 border-solid border-violet-500 p-1 px-2 rounded-md dark:bg-gray-700 "
        type="text"
        name="name"
        defaultValue={data?.name}
      />
      <label htmlFor="">Image Url</label>
      <input
        className="border-2 border-solid border-violet-500 p-1 px-2 rounded-md dark:bg-gray-700 "
        type="text"
        name="img_url"
        defaultValue={data?.img_url}
      />
      <footer className="flex justify-between pt-10">
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
          <div
            className="font-semibold bg-gray-300 border-2 border-solid border-black rounded-md self-center p-2 flex-1 min-w-[20em] max-w-[30em] h-[20em] overflow-auto flex justify-center items-center
           hover:!bg-gray-400 hover:border-gray-500 dark:bg-gray-700 dark:border-white"
          >
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
  user_id: string | undefined
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

function normalizeText(text: string) {
  return text
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase()
    .replace(/\n|\r\n/g, " ")
}
