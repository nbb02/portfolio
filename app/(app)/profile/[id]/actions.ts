"use server"
import { db } from "@/src"
import { profiles, projects, technologies } from "@/src/db/schema"
import { createClient } from "@/utils/supabase/server"
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

    const id = formData.get("id")
    if (id) {
      await db
        .update(technologies)
        .set(data)
        .where(eq(technologies.id, Number(id)))

      revalidatePath("/profile")
    } else {
      if (!data.name || !data.img_url) {
        return {
          error: true,
          message: "Name and Image is Required",
        }
      }

      await db.insert(technologies).values(data)

      revalidatePath("/profile")
    }

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
  try {
    const project = await db
      .select()
      .from(projects)
      .where(eq(projects.id, id))
      .limit(1)

    const media = project[0].media as MediaItem[]

    const mediaPaths = media.map((m) => {
      const parts = m.url.split("/")
      return decodeURIComponent(parts[parts.length - 1])
    })

    const supabase = await createClient()
    await supabase.storage.from("projects").remove(mediaPaths)

    await db.delete(projects).where(eq(projects.id, id))

    revalidatePath("/profile")
  } catch (error) {
    console.log(error)
  }
}

async function changeAvatar(formData: FormData): Promise<void> {
  try {
    const profile_id = Number(formData.get("profile_id"))
    const file = formData.get("avatar_image") as File

    if (!file) {
      return
    }

    const [profile_data] = await db
      .select({
        avatar_image: profiles.avatar_image,
      })
      .from(profiles)
      .where(eq(profiles.id, profile_id))
      .limit(1)

    const supabase = await createClient()

    if (profile_data?.avatar_image) {
      const parts = profile_data.avatar_image.split("/")
      const old_file_name = decodeURIComponent(parts[parts.length - 1])

      console.log("file_name", old_file_name)

      await supabase.storage.from("avatars").remove([old_file_name])
    }

    const fileName = `${new Date().getTime()}-${file.name}`
    const { data, error } = await supabase.storage
      .from("avatars")
      .upload(fileName, file)

    if (error) {
      throw error
    }

    const {
      data: { publicUrl },
    } = supabase.storage.from("avatars").getPublicUrl(data.path)

    await db
      .update(profiles)
      .set({ avatar_image: publicUrl })
      .where(eq(profiles.id, profile_id))

    revalidatePath("/profile")
    return
  } catch (error) {
    console.error("Error in changeAvatar:", error)
    return
  }
}

export { add_technology, deleteTechnology, deleteProject, changeAvatar }

type MediaItem = {
  description: string
  url: string
  type: string
}
