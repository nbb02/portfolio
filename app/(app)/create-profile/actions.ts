"use server"
import { uploadFile } from "@/app/lib/upload-file"
import { db } from "@/src"
import { profiles } from "@/src/db/schema"
import { createClient } from "@/utils/supabase/server"
import { redirect } from "next/navigation"

export async function create_profile(_: any, formData: FormData) {
  try {
    const supabase = await createClient()

    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) return "Must be Logged In"

    const data: data = {
      user_id: user.id,
      first_name: formData.get("first_name") as string,
      middle_name: formData.get("middle_name") as string | null,
      last_name: formData.get("last_name") as string,
      email: formData.get("email") as string,
      country: formData.get("country") as string,
      province: formData.get("province") as string,
      city: formData.get("city") as string,
      username: formData.get("username") as string,
      role: formData.get("role") as string,
      about: formData.get("about") as string,
      cover_photo: null,
      avatar_image: null,
    }

    data.cover_photo =
      (await uploadFile(formData.get("cover_photo"), "cover_photos")) ?? null
    data.avatar_image =
      (await uploadFile(formData.get("avatar_image"), "avatars")) ?? null

    await db.insert(profiles).values(data).returning()

    redirect("/")
  } catch (error) {
    console.log(error)
  }
}

type data = {
  user_id: string
  first_name: string
  middle_name: string | null
  last_name: string
  email: string
  country: string
  province: string
  city: string
  username: string
  role: string
  about: string
  cover_photo: string | null
  avatar_image: string | null
}
