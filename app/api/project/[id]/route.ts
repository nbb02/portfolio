"use server"
import { uploadFile } from "@/lib/upload-file"
import { decodePath, validatedFile } from "@/lib/utils"
import { db } from "@/src"
import { projects } from "@/src/db/schema"
import { MediaItem } from "@/types/types"
import { createClient } from "@/utils/supabase/server"
import { eq } from "drizzle-orm"
import { revalidatePath } from "next/cache"

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: number }> }
) {
  try {
    const user_id = (await params).id
    const formData = await request.formData()

    const data = {
      name: formData.get("name") as string,
      description: formData.get("description") as string,
      url: formData.get("url") as string,
    }

    const mediaFiles = Array.from(formData.keys())
      .filter((key) => key.startsWith("media_"))
      .map((key) => {
        const index = key.split("_")[1]

        const file = formData.get(key) as File

        const validate = validatedFile(file)
        if (!validate.valid) {
          throw new Error(validate.error)
        }

        return {
          description: formData.get("description_" + index),
          file: file,
        }
      })

    const uploadedMedia = []

    for (const media of mediaFiles) {
      if (media?.file) {
        const file = media.file
        const fileUrl = await uploadFile(file, "projects")

        uploadedMedia.push({
          description: media.description,
          url: fileUrl,
          type: (file as File).type,
        })
      }
    }

    const projectData = {
      user_id: user_id,
      ...data,
      media: JSON.stringify(uploadedMedia),
    }

    await db.insert(projects).values(projectData)

    revalidatePath("/profile/" + user_id)
    return Response.json({
      success: "true",
    })
  } catch (error) {
    if (error instanceof Error) {
      return Response.json({
        error: error.message,
      })
    }

    return Response.json({
      error: "An unknown error occurred",
    })
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: number }> }
) {
  try {
    const project_id = (await params).id
    const formData = await request.formData()

    const data = {
      name: formData.get("name") as string,
      description: formData.get("description") as string,
      url: formData.get("url") as string,
    }

    if (!data?.name && !data?.description && !data?.url) {
      return Response.json({
        error: "Please fill in all fields",
      })
    }

    await db.update(projects).set(data).where(eq(projects.id, project_id))

    revalidatePath("/projects")
    return Response.json({
      success: "true",
    })
  } catch (error) {
    console.log(error)

    return Response.json({
      error: "An error occured",
    })
  }
}

//We already used server action for delete
// export async function DELETE({ params }: { params: Promise<{ id: number }> }) {
//   try {
//     const id = (await params).id

//     const project = await db
//       .select()
//       .from(projects)
//       .where(eq(projects.id, id))
//       .limit(1)

//     const media = project[0].media as MediaItem[]

//     const mediaPaths = media.map((m) => {
//       const parts = m.url.split("/")
//       return decodeURIComponent(parts[parts.length - 1])
//     })

//     const supabase = await createClient()
//     await supabase.storage.from("projects").remove(mediaPaths)

//     await db.delete(projects).where(eq(projects.id, id))

//     revalidatePath("/profile")

//     return Response.json({
//       success: "true",
//     })
//   } catch (error) {
//     console.log(error)

//     return Response.json({
//       error: "An error occured",
//     })
//   }
// }
