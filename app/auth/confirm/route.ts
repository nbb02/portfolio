import { type NextRequest } from "next/server"
import { redirect } from "next/navigation"

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const token_hash = searchParams.get("token_hash")
  const type = searchParams.get("type")
  const next = searchParams.get("next") ?? "/"

  if (token_hash && type) {
    const response = await fetch("https://your-api.com/auth/verify-otp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token_hash, type }),
    })
    const data = await response.json()
    if (response.ok && data?.success) {
      // redirect user to specified redirect URL or root of app
      redirect(next)
    }
  }

  // redirect the user to an error page with some instructions
  redirect("/error")
}
