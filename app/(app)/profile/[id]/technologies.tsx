"use client"
import React, { useActionState, useEffect, useState } from "react"
import { add_technology } from "./actions"

type Props = {
  profile_id: number
  technologies: Technologies[]
}

type Technologies = {
  id: number
  name: string
  user_id: number
  img_url: string
}

export default function Technologies({ profile_id, technologies }: Props) {
  const [editing, setEditing] = useState(false)
  const [adding, setAdding] = useState(false)

  return (
    <div className="py-5 relative">
      <h1 className="text-center text-2xl">Technologies</h1>
      <main className="flex flex-wrap justify-center gap-10 ">
        {editing ? (
          <button
            className="absolute top-1 right-1 border-2 border-solid border-orange-500 px-2 rounded-md"
            onClick={() => setEditing(false)}
          >
            Close
          </button>
        ) : (
          <button
            className="absolute top-1 right-1 border-2 border-solid border-emerald-500 px-2 rounded-md"
            onClick={() => setEditing(true)}
          >
            edit
          </button>
        )}
        <Technology name="HTML" img_url="" />
        <Technology name="CSS" img_url="" />
        <Technology name="JAVASCRIPT" img_url="" />
        {technologies?.map((item) => (
          <Technology key={item.id} name={item.name} img_url={item.img_url} />
        ))}
        {adding && (
          <Form close={() => setAdding(false)} profile_id={profile_id} />
        )}
        {editing && <button onClick={() => setAdding(true)}>Add +</button>}
      </main>
    </div>
  )
}

function Technology({ name, img_url }: { name: string; img_url: string }) {
  return (
    <div className="relative">
      <p>{name}</p>
      <img src={img_url == "" ? "/placeholder" : img_url} alt={name} />
    </div>
  )
}

function Form({
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
      className="fixed top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] p-5 border-2 border-solid border-violet-500 flex flex-col gap-5 bg-white bg-opacity-50 backdrop-blur-sm rounded-md"
    >
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
