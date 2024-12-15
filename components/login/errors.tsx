import { useSearchParams } from "next/navigation"

export default function Error() {
  const searchParams = useSearchParams()
  const error = searchParams.get("error")

  if (!error) return

  return (
    <div className="p-2 text-red-500 bg-red-100 rounded-[0.5em] border-red-500 border-solid border-2 text-center">
      {error === "invalid_credentials"
        ? " Invalid credentials"
        : "An error occurred"}
    </div>
  )
}
