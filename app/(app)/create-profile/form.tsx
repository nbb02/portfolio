"use client"
import { useActionState, useState } from "react"
import { create_profile } from "./actions"

export default function Form({
  email,
  avatarUrl,
}: {
  email: string
  avatarUrl: string
}) {
  const [imgPreview, setImagePreview] = useState<string | null>(null)
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null)

  const [error, action, pending] = useActionState(create_profile, null)

  return (
    <main className="flex justify-center ">
      <form
        className={`p-5 flex flex-col max-w-[50em] ${pending && "opacity-75"}`}
        action={action}
      >
        {pending && (
          <span className="fixed top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] p-2 border-s-violet-500 border-solid border-2">
            Loading...
          </span>
        )}
        {error && <div className="text-red-500 font-extrabold">{error}</div>}
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base/7 font-semibold text-gray-900 dark:text-gray-300">
              Personal Information
            </h2>
            <p className="mt-1 text-sm/6 text-gray-600 dark:text-gray-300">
              Use a permanent address where you can receive mail.
            </p>
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label
                  htmlFor="first_name"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  First name
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="first_name"
                    id="first_name"
                    autoComplete="given-name"
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                </div>
              </div>
              <div className="sm:col-span-3">
                <label
                  htmlFor="middle_name"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Middle name
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="middle_name"
                    id="middle_name"
                    autoComplete="family-name"
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                </div>
              </div>
              <div className="sm:col-span-3">
                <label
                  htmlFor="last_name"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Last name
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="last_name"
                    id="last_name"
                    autoComplete="family-name"
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                </div>
              </div>
              <div className="sm:col-span-4">
                <label
                  htmlFor="email"
                  className="block text-sm/6 font-medium text-gray-900 dark:text-gray-300"
                >
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    defaultValue={email}
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="country"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Country
                </label>
                <div className="mt-2 grid grid-cols-1">
                  <input
                    type="text"
                    id="country"
                    name="country"
                    autoComplete="country-name"
                    className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pl-3 pr-8 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                </div>
              </div>
              <div className="sm:col-span-2 sm:col-start-1">
                <label
                  htmlFor="province"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Province
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="province"
                    id="province"
                    autoComplete="address-level2"
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                </div>
              </div>
              <div className="sm:col-span-2 sm:col-start-1">
                <label
                  htmlFor="city"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  City/Municipality
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="city"
                    id="city"
                    autoComplete="address-level2"
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base/7 font-semibold text-gray-900 dark:text-gray-300">
              Profile
            </h2>
            <p className="mt-1 text-sm/6 text-gray-600 dark:text-gray-300">
              This information will be displayed publicly so be careful what you
              share.
            </p>
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6">
              <div className="sm:col-span-4">
                <label
                  htmlFor="username"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Username
                </label>
                <div className="mt-2">
                  <div className="flex items-center rounded-md bg-white dark:bg-gray-800 pl-3 outline outline-1 -outline-offset-1 outline-gray-300 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                    <input
                      type="text"
                      name="username"
                      id="username"
                      className="block min-w-0 grow py-1.5 pl-1 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6"
                    />
                  </div>
                </div>
              </div>
              <div className="sm:col-span-4">
                <label
                  htmlFor="role"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Role / Position / Title
                </label>
                <div className="mt-2">
                  <div className="flex items-center rounded-md dark:bg-gray-800 bg-white pl-3 outline outline-1 -outline-offset-1 outline-gray-300 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                    <input
                      type="text"
                      name="role"
                      id="role"
                      className="block min-w-0 grow py-1.5 pl-1 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6"
                    />
                  </div>
                </div>
              </div>
              <div className="col-span-full">
                <label
                  htmlFor="about"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  About
                </label>
                <div className="mt-2">
                  <textarea
                    name="about"
                    id="about"
                    rows={2}
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  ></textarea>
                </div>
                <p className="mt-3 text-sm/6 text-gray-600 dark:text-gray-300">
                  Write a few sentences about yourself.
                </p>
              </div>
              <div className="col-span-full">
                <label
                  htmlFor="photo"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Photo
                </label>
                <div className="mt-2 flex items-center gap-x-3">
                  {avatarPreview ? (
                    <img
                      src={avatarPreview}
                      alt="default avatar"
                      className="h-14 rounded-full w-14 object-cover"
                    />
                  ) : avatarUrl ? (
                    <img
                      src={avatarUrl}
                      alt="default avatar"
                      className="h-10 rounded-full"
                    />
                  ) : (
                    <svg
                      className="size-12 text-gray-300"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden="true"
                      data-slot="icon"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                  <label>
                    <span className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                      Change
                    </span>
                    <input
                      type="file"
                      name="avatar_image"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0]

                        if (file) {
                          if (file?.size > 10 * 1024 * 1024) {
                            e.preventDefault()
                            alert("Maximum of 10MB")
                            return
                          }

                          const reader = new FileReader()
                          reader.onloadend = () => {
                            setAvatarPreview(reader.result as string)
                            console.log(reader.result)
                          }
                          reader.readAsDataURL(file)
                        }
                      }}
                    />
                  </label>
                </div>
              </div>
              <div className="col-span-full h-[15em] ">
                <label
                  htmlFor="cover_photo"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Cover photo
                </label>
                <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10 relative h-[15em] dark:border-white">
                  {imgPreview && (
                    <img
                      src={
                        typeof imgPreview === "string" ? imgPreview : undefined
                      }
                      className="absolute left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%] h-full w-full object-cover"
                    />
                  )}
                  <div
                    className={`text-center p-2 rounded-xl self-end z-10 h-max ${
                      imgPreview && " bg-white/50 backdrop-blur-xs "
                    }`}
                  >
                    {!imgPreview && (
                      <svg
                        className="mx-auto size-12 text-gray-300"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        aria-hidden="true"
                        data-slot="icon"
                      >
                        <path
                          fillRule="evenodd"
                          d="M1.5 6a2.25 2.25 0 0 1 2.25-2.25h16.5A2.25 2.25 0 0 1 22.5 6v12a2.25 2.25 0 0 1-2.25 2.25H3.75A2.25 2.25 0 0 1 1.5 18V6ZM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0 0 21 18v-1.94l-2.69-2.689a1.5 1.5 0 0 0-2.12 0l-.88.879.97.97a.75.75 0 1 1-1.06 1.06l-5.16-5.159a1.5 1.5 0 0 0-2.12 0L3 16.061Zm10.125-7.81a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                    <div className="mt-4 flex text-sm/6 text-gray-600">
                      <label
                        htmlFor="cover_photo"
                        className="relative cursor-pointer rounded-md bg-white  text-black dark:text-white dark:bg-gray-800 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500 px-1
                        dark:hover:bg-gray-700 "
                      >
                        <span>Upload a file</span>
                        <input
                          id="cover_photo"
                          name="cover_photo"
                          type="file"
                          onChange={(e) => {
                            const file = e.target.files?.[0]
                            if (file) {
                              if (file?.size > 10 * 1024 * 1024) {
                                e.preventDefault()
                                alert("Maximum of 10MB")
                                return
                              }

                              const reader = new FileReader()
                              reader.onloadend = () => {
                                setImagePreview(reader.result as string)
                              }
                              reader.readAsDataURL(file)
                            }
                          }}
                          className="sr-only"
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs/5 text-gray-600">
                      PNG, JPG, GIF up to 10MB
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-6 flex items-center justify-end gap-x-6">
          <a href="/">
            <button
              type="button"
              className="text-sm/6 font-semibold text-gray-900"
            >
              Cancel
            </button>
          </a>
          <button
            type="submit"
            disabled={pending}
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Save
          </button>
        </div>
      </form>
    </main>
  )
}
