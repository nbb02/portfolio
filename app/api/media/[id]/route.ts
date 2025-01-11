import { uploadFile } from "@/lib/upload-file"
import { decodePath } from "@/lib/utils"
import { db } from "@/src"
import { projects } from "@/src/db/schema"
import { MediaItem } from "@/types/types"
import { createClient } from "@/utils/supabase/server"
import { eq } from "drizzle-orm"
import { revalidatePath } from "next/cache"
import { NextRequest } from "next/server"

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: number }> }
) {
  try {
    const project_id = (await params).id
    const formData = await request.formData()

    const media = {
      file: formData.get("media"),
      description: formData.get("description"),
    }

    if (!media?.file || !media?.description) {
      return Response.json({
        error: true,
        message: "File and Description Required",
      })
    }

    const fileUrl = await uploadFile(media.file, "projects")

    const mediaData = {
      description: media.description,
      url: fileUrl,
      type: (media.file as File).type,
    }

    const [projectData] = await db
      .select()
      .from(projects)
      .where(eq(projects.id, project_id))

    const mediaObject = projectData.media as MediaItem[]

    const newMediaObject = [...(mediaObject ?? []), mediaData]

    await db
      .update(projects)
      .set({
        media: newMediaObject,
      })
      .where(eq(projects.id, project_id))

    revalidatePath("/projects/" + project_id)
    revalidatePath("/profile/" + projectData.user_id)
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

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: number }> }
) {
  try {
    const project_id = (await params).id
    const formData = await request.formData()
    const index = Number(formData.get("index"))

    const data = {
      file: formData.get("media") as File,
      description: formData.get("description") as string,
    }

    if (!data?.file && !data?.description) {
      return Response.json({
        error: true,
        message: "File or Description Required",
      })
    }

    const [projectData] = await db
      .select()
      .from(projects)
      .where(eq(projects.id, project_id))

    const media = projectData.media as MediaItem[]

    const selected = media[index]

    const updateData: {
      description?: string
      url?: string
      type?: string
    } = {}

    if (data?.file) {
      const oldMediaPath = decodePath(selected.url.split("/").pop() as string)

      const supabase = await createClient()
      await supabase.storage.from("projects").remove([oldMediaPath])

      updateData.url = await uploadFile(data.file, "projects")
      updateData.type = data.file.type
    } else {
      updateData.url = selected.url
      updateData.type = selected.type
    }
    if (data?.description) {
      updateData.description = data.description as string
    } else {
      updateData.description = selected.description
    }

    const newUpdatedMedia = media.map((mediaItem, i) =>
      i === index ? { ...mediaItem, ...updateData } : mediaItem
    )

    await db
      .update(projects)
      .set({
        media: newUpdatedMedia,
      })
      .where(eq(projects.id, project_id))

    revalidatePath("/projects/" + project_id)
    revalidatePath("/profile/" + projectData.user_id)
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

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: number }> }
) {
  try {
    const searchParams = request.nextUrl.searchParams
    const index = Number(searchParams.get("index"))

    const project_id = (await params).id

    const [projectData] = await db
      .select()
      .from(projects)
      .where(eq(projects.id, project_id))

    const mediaArray = projectData.media as MediaItem[]

    const selected = mediaArray[index]

    const mediaPath = decodePath(selected.url)

    const supabase = await createClient()
    await supabase.storage.from("projects").remove([mediaPath])

    const newMediaArray = mediaArray.filter((_, i) => index !== i)

    await db
      .update(projects)
      .set({
        media: newMediaArray,
      })
      .where(eq(projects.id, project_id))

    revalidatePath("/projects/" + project_id)
    revalidatePath("/profile/" + projectData.user_id)
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
