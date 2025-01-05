import { createClient } from "@/utils/supabase/server"

async function uploadFile(file: any, bucket_name: string) {
  const supabase = await createClient()

  const { data, error } = await supabase.storage
    .from(bucket_name)
    .upload(new Date().getTime() + file.name, file)

  if (error) {
    throw error
  }

  const {
    data: { publicUrl },
  } = supabase.storage.from(bucket_name).getPublicUrl(data.path)

  return publicUrl
}

export { uploadFile }
