"use client"
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

    await fetch(`/api/add-project/${id}`, {
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
    <div>
      <Link href={"/profile/" + id}>Go Back</Link>
      <form
        className="flex flex-col gap-5"
        onSubmit={handleSubmit}
        method="POST"
      >
        <div className="max-w-[20em] overflow-hidden">
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
              <textarea name="description" />
            </div>
          </div>
        </div>
        {media.map((med, index) => (
          <div key={index}>
            {media[index].file &&
              media[index].file.type.startsWith("image/") && (
                <img src={media[index].preview ?? undefined} alt="preview" />
              )}
            {media[index].file &&
              media[index].file.type.startsWith("video/") && (
                <video controls>
                  <source
                    src={media[index].preview ?? undefined}
                    type={media[index].file.type}
                  />
                  Your browser does not support the video tag.
                </video>
              )}
            <label htmlFor="">description</label>
            <textarea
              name={"description_" + index}
              onChange={(e) => handleChange(e, index)}
              value={media[index].description}
            />
            <label htmlFor="">media {index}</label>
            <input
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
            <button
              type="button"
              onClick={() =>
                setMedia((prev) => prev.filter((_, i) => index !== i))
              }
            >
              delete
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() =>
            setMedia((prev) => [
              ...(prev ?? []),
              { description: "", file: null, preview: null },
            ])
          }
        >
          Add Media
        </button>
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

type Media = {
  description: string
  file: File | null
  preview: string | null
}
