"use client"

import Dialog from "@/components/dialog"
import Media from "@/components/media"
import { Button } from "@/components/ui/button"
import { MediaItem, Project } from "@/types/types"
import { RefreshCcw, Save, Trash2 } from "lucide-react"
import { useState } from "react"
import { useSearchParams } from "next/navigation"

export default function ProjectItem({ project }: { project: Project }) {
  const searchParams = useSearchParams()
  const media = project.media as MediaItem[]

  const [editing, setEditing] = useState(searchParams.get("edit"))
  const [descriptionChange, setDescriptionChange] = useState<{
    [key: number]: boolean
  }>({})
  const [newMedia, setNewMedia] = useState<NewMedia[]>([])

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
              className="p-2 border-2 border-solid border-black max-w-[20em] flex flex-col rounded-lg gap-2 overflow-hidden relative"
            >
              <Media media={item} className="flex-1" />
              <div className=" absolute top-1 right-1 flex gap-1">
                <form className="flex items-center gap-1 bg-white px-2 rounded-lg py-1 border-2 border-solid border-red-500 text-red-500 font-bold z-50 text-sm hover:bg-red-500 hover:text-white">
                  <label>
                    <RefreshCcw />
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
                  <input type="hidden" name="project_id" value={project.id} />
                </form>
                <form className="flex items-center gap-1 bg-white px-2 rounded-lg py-1 border-2 border-solid border-red-500 text-red-500 font-bold z-50 text-sm hover:bg-red-500 hover:text-white">
                  <Dialog
                    title="Are you sure you want to delete this project?"
                    description="This action cannot be undone."
                    trigger={<Trash2 />}
                    children={
                      <Button
                        variant="destructive"
                        type="submit"
                        className="flex gap-1"
                      >
                        <Trash2 />
                        Delete
                      </Button>
                    }
                  />
                  <input type="hidden" name="project_id" value={project.id} />
                </form>
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
        {newMedia.map((item, index) => {
          return (
            <div
              key={"new" + index}
              className="p-2 border-2 border-solid border-green-500 max-w-[20em] flex flex-col rounded-lg gap-2 h-[18em] overflow-auto flex-1 min-w-[20em] relative"
            >
              <Dialog
                title="Are you sure you want to delete this project?"
                description="This action cannot be undone."
                className="px-2 py-1 flex items-center gap-1 bg-white rounded-lg border-2 border-solid border-red-500 text-red-500 font-bold z-50 text-sm hover:bg-red-500 hover:text-white w-max absolute top-1 right-1"
                trigger={<Trash2 />}
                children={
                  <Button
                    variant="destructive"
                    className="flex gap-1"
                    onClick={() => {
                      setNewMedia((prev) => prev.filter((_, i) => i !== index))
                    }}
                  >
                    <Trash2 />
                    Delete
                  </Button>
                }
              />
              <div className="flex-1 bg-blue-300 relative">
                {item.file ? (
                  <img
                    src={URL.createObjectURL(item.file)}
                    alt="Preview"
                    className="max-h-full max-w-full object-cover"
                  />
                ) : null}
                <label className="p-1 border-blue-500 rounded-md border-2 border-solid bg-blue-500 text-white hover:bg-blue-600 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer">
                  {item.file ? "Change" : "Select File"}
                  <input
                    type="file"
                    className="hidden"
                    name={"new_media_" + index}
                    onChange={(e) =>
                      setNewMedia((prev) => {
                        const newMedia = [...prev]
                        newMedia[index].file = e.target.files?.[0] ?? null
                        return newMedia
                      })
                    }
                  />
                </label>
              </div>
              <span>
                <label className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  name={"new_description_" + index}
                  className="border-2 border-solid border-black p-1 w-full"
                  style={{ resize: "none" }}
                  value={newMedia[index].description}
                  onChange={(e) =>
                    setNewMedia((prev) => {
                      const newMedia = [...prev]
                      newMedia[index].description = e.target.value
                      return newMedia
                    })
                  }
                />
              </span>
            </div>
          )
        })}
        <div className="border-2 flex-1 max-w-[20em] border-solid border-green-500 p-2 rounded-lg flex justify-center items-center text-green-500 font-bold">
          <button
            onClick={() => {
              setNewMedia((prev) => [
                ...(prev ?? []),
                { file: null, description: "" },
              ])
            }}
          >
            Add Media +
          </button>
        </div>
      </div>
    </div>
  )
}

type NewMedia = {
  file: File | null
  description: string
}
