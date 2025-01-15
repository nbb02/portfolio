"use client"
import { cn } from "@/lib/utils"
import { ArrowLeft, Cross, Plus, X } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function MediaForm({ id }: { id: string }) {
  const [media, setMedia] = useState<Media[]>([
    {
      description: "",
      file: null,
      preview: null,
    },
  ])
  const [error, setError] = useState<null | string>(null)

  function handleChange(e: any, index: number) {
    const { name: _name, value } = e.target
    const name = _name.split("_")[0]

    setMedia((prev) => {
      const newMedia = [...prev]
      newMedia[index] = {
        ...newMedia[index],
        [name]: value,
      }
      return newMedia
    })
  }

  const router = useRouter()

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)

    await fetch(`/api/project/${id}`, {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok")
        }
        return response.json()
      })
      .then((data) => {
        if (data?.success) {
          router.push("/profile/" + id)
        }
        if (data?.error) {
          alert("An Error Occured")
        }
      })
      .catch((error) => {
        console.error("Error:", error)
      })
  }

  return (
    <div className="pt-10 px-5 flex justify-center flex-col items-center relative p-2">
      <Link
        href={"/profile/" + id}
        className="text-blue-500 border-2 border-solid border-blue-500 hover:bg-blue-500 hover:text-white p-1 rounded-md absolute left-5 top-10"
      >
        <ArrowLeft />
      </Link>
      <h1 className="text-2xl font-bold">Add Project</h1>
      <form
        className="flex flex-col gap-5 pt-1"
        onSubmit={handleSubmit}
        method="POST"
      >
        <div className="overflow-hidden self-center w-[40em] max-w-full">
          <div className="input-box">
            <label
              htmlFor="project_title"
              className="block text-sm/6 font-medium text-gray-900"
            >
              Project Name
            </label>
            <div className="mt-2">
              <input type="text" name="name" />
            </div>
          </div>
          <div className="input-box">
            <label
              htmlFor="url"
              className="block text-sm/6 font-medium text-gray-900"
            >
              Project Url
            </label>
            <div className="mt-2">
              <input type="text" name="url" />
            </div>
          </div>
          <div className="input-box">
            <label
              htmlFor="description"
              className="block text-sm/6 font-medium text-gray-900"
            >
              Project Description
            </label>
            <div className="mt-2">
              <textarea name="description" className="h-[8em]" />
            </div>
          </div>
        </div>
        <div className="p-5 border-[1px] border-gray-500 border-solid  rounded-md flex flex-wrap gap-5 justify-center items-center">
          {media.map((med, index) => (
            <div
              key={index}
              className="flex flex-col p-2 border-black border-[1px] border-solid dark:border-gray-200 rounded-md relative w-[30em]"
            >
              <div className="relative bg-blue-50 h-[10em]">
                {media[index].file &&
                  media[index].file.type.startsWith("image/") && (
                    <img
                      src={media[index].preview ?? undefined}
                      alt="preview"
                      className="object-cover h-full w-full"
                    />
                  )}
                {media[index].file &&
                  media[index].file.type.startsWith("video/") && (
                    <video controls className="object-cover h-full w-full">
                      <source
                        src={media[index].preview ?? undefined}
                        type={media[index].file.type}
                      />
                      Your browser does not support the video tag.
                    </video>
                  )}
                <label
                  className={cn(
                    "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-blue-500 text-white p-1 rounded-md cursor-pointer hover:bg-white hover:text-blue-500 px-2 max-w-[50%] h-[2em] overflow-hidden"
                  )}
                >
                  {media[index].file ? media[index].file.name : "Select File"}
                  <input
                    className="hidden"
                    type="file"
                    name={"media_" + index}
                    onChange={(e) => {
                      const file = e.target.files?.[0]
                      if (!file) return
                      setMedia((prev) => {
                        const newMedia = [...prev]
                        newMedia[index] = {
                          ...newMedia[index],
                          file: file,
                          preview: URL.createObjectURL(file),
                        }

                        return newMedia
                      })
                    }}
                  />
                </label>
              </div>
              <label className="text-sm">Description</label>
              <textarea
                name={"description_" + index}
                onChange={(e) => handleChange(e, index)}
                value={media[index].description}
                className="h-20 rounded-md p-2"
              />
              <button
                className="text-red-500 hover:bg-red-500 border-2 border-solid border-red-500 hover:text-white p-1 rounded-md absolute right-1 top-1 bg-white"
                type="button"
                onClick={() =>
                  setMedia((prev) => prev.filter((_, i) => index !== i))
                }
              >
                <X />
              </button>
            </div>
          ))}
          <button
            className="border-green-500 text-green-500 border-solid border-2  hover:bg-green-500 hover:text-white rounded-md h-max w-max p-2 flex gap-1"
            type="button"
            onClick={() =>
              setMedia((prev) => [
                ...(prev ?? []),
                { description: "", file: null, preview: null },
              ])
            }
          >
            Add Media <Plus />
          </button>
        </div>

        <button
          className="border-green-500 text-green-500 border-solid border-2  hover:bg-green-500 hover:text-white p-1 rounded-md w-[20em] self-center"
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  )
}

type Media = {
  description: string
  file: File | null
  preview: string | null
}
