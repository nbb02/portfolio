"use server"
import { db } from "@/src"
import { technologies } from "@/src/db/schema"
import { eq } from "drizzle-orm"
import { revalidatePath } from "next/cache"

type Response = {
  success?: boolean
  error?: boolean
  message?: string
}

async function add_technology(_: any, formData: FormData): Promise<Response> {
  try {
    const data = {
      user_id: Number(formData.get("user_id")),
      name: formData.get("name") as string,
      img_url: formData.get("img_url") as string,
    }

    if (!data.name || !data.img_url) {
      return {
        error: true,
        message: "Name and Image is Required",
      }
    }

    await db.insert(technologies).values(data)

    revalidatePath("/profile")

    return {
      success: true,
    }
  } catch (error) {
    console.log(error)

    return {
      error: true,
      message: "Error Occured",
    }
  }
}

async function deleteTechnology(id: number): Promise<void> {
  try {
    await db.delete(technologies).where(eq(technologies.id, id))

    revalidatePath("/profile")
  } catch (error) {
    console.log(error)
  }
}

async function deleteProject(id: number): Promise<void> {
  // try {
  //   await db.delete(projects).where(eq(projects.id, id))
  //   revalidatePath("/profile")
  // } catch (error) {
  //   console.log(error)
  // }
}

export { add_technology, deleteTechnology, deleteProject }
