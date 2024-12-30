import Link from "next/link"

export default function NotFound() {
  return (
    <div className="text-white bg-black h-dvh flex flex-col items-center justify-center gap-2">
      <h1 className="text-5xl font-bold">404 Not Found</h1>
      <p>Could not find requested resource</p>
      <Link
        href="/"
        className="border-2 border-white border-solid px-2 rounded-sm"
      >
        Return Home
      </Link>
    </div>
  )
}
