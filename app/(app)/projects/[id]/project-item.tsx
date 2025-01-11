"use client"

import Media from "@/components/media"
import { MediaItem, Project } from "@/types/types"
import { RefreshCcw, Save, Trash2 } from "lucide-react"
import React, { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Modal from "@/components/modal"

export default function ProjectItem({ project }: { project: Project }) {
  const searchParams = useSearchParams()
  const router = useRouter()
  const media = project.media as MediaItem[]

  const [editing, setEditing] = useState(!!searchParams.get("edit"))
  const [adding, setAdding] = useState(false)
  const [deleteId, setDeleteId] = useState<number | null>(null)
  const [descriptionChange, setDescriptionChange] = useState<{
    [key: number]: boolean
  }>({})

  const handleDescriptionChange = (
    index: number,
    newValue: string,
    originalValue: string
  ) => {
    setDescriptionChange((prev) => ({
      ...prev,
      [index]: newValue !== originalValue,
    }))
  }

  async function handleUpdate(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)

    try {
      await fetch(`/api/media/${project.id}`, {
        method: "PUT",
        body: formData,
      })
      router.refresh()
    } catch (error) {
      console.log(error)
    }
  }

  async function handleDelete(index: number) {
    try {
      await fetch(`/api/media/${project.id}?index=${index}`, {
        method: "DELETE",
      })
      setDeleteId(null)
      router.refresh()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="p-5 relative">
      <button
        className="absolute right-5 top-5 border-2 border-solid border-green-500 text-green-500 py-1 px-2 rounded-md"
        onClick={() => setEditing(!editing)}
      >
        {editing ? "Done" : "Edit"}
      </button>
      {editing ? (
        <>
          <span className="block mb-2">
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              name="name"
              className="border-2 border-solid border-black p-1"
              defaultValue={project.name}
            />
          </span>
          <span className="block mb-2">
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              name="description"
              className="border-2 border-solid border-black p-1"
              defaultValue={project.description}
            />
          </span>
          <span className="block mb-2">
            <label className="block text-sm font-medium text-gray-700">
              URL
            </label>
            <input
              type="text"
              name="url"
              className="border-2 border-solid border-black p-1"
              defaultValue={project.url}
            />
          </span>
        </>
      ) : (
        <>
          <h1 className="text-3xl font-bold">{project.name}</h1>
          <p className="text-lg">{project.description}</p>
          <p>Visit @ {project.url}</p>
        </>
      )}
      <div className="flex flex-wrap gap-2">
        {media.map((item, index) => {
          return editing ? (
            <div
              key={index}
              className="p-2 border-2 border-solid border-black max-w-[20em] flex flex-col rounded-lg gap-2 overflow-hidden relative h-[20em]"
            >
              <Media media={item} className="flex-1 object-cover" />
              <div className=" absolute top-1 right-1 flex gap-1">
                <form onSubmit={handleUpdate} className="z-50">
                  <label>
                    <RefreshCcw
                      className="dark:text-red-500 bg-white  rounded-lg border-2 border-solid border-red-500 text-red-500 font-bold p-1 hover:bg-red-500 hover:!text-white"
                      size={35}
                    />
                    <input
                      type="file"
                      name="media"
                      className="hidden"
                      onChange={(e) => {
                        if (e.target.files?.[0]) {
                          e.target.form?.requestSubmit()
                        }
                      }}
                    />
                  </label>
                  <input type="hidden" name="index" value={index} />
                </form>
                <button
                  className="border-2 border-solid text-red-500 p-1 rounded-lg border-red-500 hover:bg-red-500 hover:text-white bg-white"
                  onClick={() => setDeleteId(index)}
                >
                  <Trash2 />
                </button>
                {deleteId != null && (
                  <Modal
                    title="Are you sure you want to delete this project?"
                    description={"This action cannot be undone."}
                    confirmFn={() => handleDelete(deleteId)}
                    closeFn={() => setDeleteId(null)}
                  />
                )}
              </div>
              <form className="flex gap-1 items-center">
                <span className="flex-1">
                  <label className="block text-sm font-medium text-gray-700">
                    Description
                  </label>
                  <textarea
                    name="description"
                    className="border-2 border-solid border-black p-1 w-full"
                    style={{ resize: "none" }}
                    defaultValue={item.description}
                    onChange={(e) =>
                      handleDescriptionChange(
                        index,
                        e.target.value,
                        item.description
                      )
                    }
                  />
                </span>
                {descriptionChange[index] && (
                  <button className="w-max bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600">
                    <Save />
                  </button>
                )}
              </form>
            </div>
          ) : (
            <div
              key={index}
              className="p-2 border-2 border-solid border-black max-w-[20em] flex flex-col rounded-lg gap-2"
            >
              <Media media={item} index={index} />
            </div>
          )
        })}
        <div className="border-2 flex-1 max-w-[20em] border-solid border-green-500 p-2 rounded-lg flex justify-center items-center text-green-500 font-bold">
          <button
            onClick={() => {
              setAdding(true)
            }}
          >
            Add Media +
          </button>
        </div>
      </div>
      {adding && (
        <NewMediaForm
          project_id={project.id}
          close={() => setAdding(false)}
          refresh={() => router.refresh()}
        />
      )}
    </div>
  )
}

function NewMediaForm({
  project_id,
  close,
  refresh,
}: {
  project_id: number
  close: () => void
  refresh: () => void
}) {
  const [file, setFile] = useState<null | File>(null)
  const [error, setError] = useState<null | string>(null)

  function onChange(event: any) {
    const file = event?.target?.files?.[0]
    if (!file) return

    const MAX_FILE_SIZE = 10 * 1024 * 1024

    const ALLOWED_TYPES = [
      "image/jpeg",
      "image/png",
      "image/gif",
      "image/webp",
      "video/mp4",
      "video/webm",
      "video/quicktime",
    ]

    if (!ALLOWED_TYPES.includes(file.type)) {
      setError("Error: Only image and video files are allowed.")
      event.target.value = ""
      return
    }

    if (file.size > MAX_FILE_SIZE) {
      setError(
        `Error: File size must be less than ${MAX_FILE_SIZE / (1024 * 1024)}MB.`
      )
      event.target.value = ""
      return
    }

    setFile(file)
  }

  async function handleSubmit(event: any) {
    event.preventDefault()

    const formData = new FormData(event.target)

    await fetch(`/api/media/${project_id}`, {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok")
        }
        refresh()

        return response.json()
      })
      .then((data) => {
        if (data?.success) {
          close()
        }
        if (data?.error) {
          setError(data?.message ?? "An error Occured")
        }
      })
      .catch((error) => {
        setError(error?.message ?? "An error Occured")
        console.error("Error:", error)
      })
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div>
        <h1 className="text-white text-xl">Add New Media</h1>
        <form
          onSubmit={handleSubmit}
          className="border-2 border-solid border-green-500 max-w-[20em] flex flex-col rounded-lg gap-2 h-[20em] overflow-auto flex-1 min-w-[20em] bg-white p-4"
        >
          <div className="flex-1 bg-blue-300 relative">
            {file && (
              <div className="mt-4 max-w-lg">
                {file?.type.startsWith("image/") ? (
                  <img
                    src={URL.createObjectURL(file)}
                    alt="Preview"
                    className="max-w-full h-auto rounded-lg shadow-md"
                  />
                ) : (
                  <video
                    src={URL.createObjectURL(file)}
                    controls
                    className="max-w-full h-auto rounded-lg shadow-md"
                  >
                    Your browser does not support the video tag.
                  </video>
                )}
              </div>
            )}
            <label className="p-1 border-blue-500 rounded-md border-2 border-solid bg-blue-500 text-white hover:bg-blue-600 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer">
              {file ? "Change" : "Select File"}
              <input
                type="file"
                className="hidden"
                name="media"
                onChange={onChange}
                accept="image/*,video/*"
              />
            </label>
          </div>
          <span>
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              name={"description"}
              className="border-2 border-solid border-black p-1 w-full  "
              style={{ resize: "none" }}
            />
          </span>
          <input type="hidden" name="project_id" value={project_id} />
          <button
            type="submit"
            className="ml-auto border-solid border-2 border-green-500 p-2 rounded-md
            text-green-500 hover:text-white hover:bg-green-500"
          >
            <Save />
          </button>
          {error && (
            <Modal
              confirmFn={() => setError(null)}
              title="Error"
              description={error}
            />
          )}
        </form>
      </div>
    </div>
  )
}
