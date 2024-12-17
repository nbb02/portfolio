import { createClient } from "@/utils/supabase/server"
import Form from "./form"

export default async function Page() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  return (
    <Form
      email={user?.email ?? ""}
      avatarUrl={user?.user_metadata?.avatar_url ?? ""}
    />
  )
}
