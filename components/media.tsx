import { MediaItem } from "@/types/types"
import Image from "next/image"

export default function Media({
  className,
  media,
  index,
  onMouseEnter,
  onMouseLeave,
}: {
  className?: string
  media: MediaItem
  index?: number
  onMouseEnter?: () => void
  onMouseLeave?: () => void
}) {
  return media?.type?.includes("image") ? (
    <Image
      key={"media" + index}
      src={media.url ?? "/placeholder.png"}
      alt={media.description}
      className={className}
      height={500}
      width={500}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    />
  ) : (
    <video
      key={"media" + index}
      src={media.url}
      controls
      className={className}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    />
  )
}
