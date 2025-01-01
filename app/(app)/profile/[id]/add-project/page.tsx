import getUser from "@/app/auth"
import Link from "next/link"
import MediaForm from "./media-form"

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const user = getUser()

  const { id } = await params

  return (
    <div>
      "hello" + id
      <Link href={"/profile/" + id}>Go Back</Link>
      <form>
        <div>
          <label htmlFor="name">Project Name:</label>
          <input type="text" id="project_name" name="name" required />
          <label htmlFor="">Project Description</label>
          <textarea name="project_description" id=""></textarea>
          <label htmlFor="">Project Url</label>
          <input type="text" name="project_url" />
        </div>
        <MediaForm />
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}
