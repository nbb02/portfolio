import { db } from "@/src"
import { profiles } from "@/src/db/schema"
import { eq } from "drizzle-orm"

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const id = (await params).id

  if (!isUuid(id)) {
    return (
      <h1>
        Profile Not Found. <a href="/">Go Back to home</a>
      </h1>
    )
  }

  const profile = await db
    .select()
    .from(profiles)
    .where(eq(profiles.user_id, id))
    .limit(1)

  if (!profile)
    return (
      <h1>
        Profile Not Found. <a href="/">Go Back to home</a>
      </h1>
    )

  return (
    <div>
      My Post: {id}
      <img src={profile[0]?.cover_photo ?? ""} alt="" />
    </div>
  )
}

const isUuid = (input: string): boolean => {
  const uuidRegex =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
  return uuidRegex.test(input)
}
