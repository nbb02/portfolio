"use server"
import { uploadFile } from "@/app/lib/upload-file"
import { db } from "@/src"
import { projects } from "@/src/db/schema"
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

        return {
          description: formData.get("description_" + index),
          file: formData.get(key),
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
    console.log(error)

    return Response.json({
      error: "An error occured",
    })
  }
}
