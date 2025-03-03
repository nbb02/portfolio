import Form from "./form"

export default async function Page() {
  const user = {
    email: "",
    user_metadata: {
      avatar_url: "",
    },
  }
  return (
    <Form
      email={user?.email ?? ""}
      avatarUrl={user?.user_metadata?.avatar_url ?? ""}
    />
  )
}
