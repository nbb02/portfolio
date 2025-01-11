"use server"
import { revalidatePath } from "next/cache"
import { cookies } from "next/headers"

async function setTheme() {
  try {
    const cookieStore = await cookies()

    const theme = cookieStore.get("theme")

    cookieStore.set("theme", theme?.value === "dark" ? "light" : "dark")

    revalidatePath("/")
  } catch (error) {
    console.log(error)
  }
}

export { setTheme }
