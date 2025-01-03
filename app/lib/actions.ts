import { createClient } from "@/utils/supabase/server"

async function uploadFile(
  file: FormDataEntryValue | null,
  bucket_name: string
) {
  if (!file) return
  const supabase = await createClient()

  const { data, error } = await supabase.storage
    .from(bucket_name)
    .upload(new Date().toString(), file)

  if (error) {
    throw error
  }

  const {
    data: { publicUrl },
  } = supabase.storage.from(bucket_name).getPublicUrl(data.path)

  return publicUrl
}

export { uploadFile }
