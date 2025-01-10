export type MediaItem = {
  description: string
  url: string
  type: string
}

export type Project = {
  id: number
  user_id: number
  name: string
  description: string
  url: string
  media: unknown
}
