"use client"
import { useState } from "react"

export default function MediaForm() {
  const [media, setMedia] = useState<Media[]>([
    {
      description: "",
      file: null,
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

  return (
    <>
      <h1>Media Form</h1>
      <div>
        {media.map((med, index) => (
          <div key={index}>
            <label htmlFor="">description</label>
            <textarea
              name={"description_" + index}
              onChange={(e) => handleChange(e, index)}
              value={media[index].description}
            ></textarea>
            <label htmlFor="">media {index}</label>

            <input
              type="file"
              name={"media_" + index}
              onChange={(e) => {
                const file = e.target.files?.[0] || null
                setMedia((prev) => {
                  const newMedia = [...prev]
                  newMedia[index] = {
                    ...newMedia[index],
                    file: file,
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
              { description: "", file: null },
            ])
          }
        >
          Add Media
        </button>
      </div>
    </>
  )
}

type Media = {
  description: string
  file: File | null
}
