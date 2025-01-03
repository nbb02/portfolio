import MediaForm from "./media-form"

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  return <MediaForm id={id} />
}
