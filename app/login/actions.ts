"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export async function login(
  previousState: any,
  formData: FormData
): Promise<void | string> {
  // const data = {
  //   email: formData.get("email") as string,
  //   password: formData.get("password") as string,
  // }
  // const { error } = await supabase.auth.signInWithPassword(data)
  // if (error) {
  //   return error.code === "invalid_credentials"
  //     ? "Invalid Credentials"
  //     : "An Error Occured"
  // }
  // revalidatePath("/", "layout")
  // redirect("/")
}

export async function signup(previousState: any, formData: FormData) {
  // const data = {
  //   email: formData.get("email") as string,
  //   password: formData.get("password") as string,
  // }
  // const { error } = await supabase.auth.signUp(data)
  // if (error) {
  //   return error.code
  // }
  // revalidatePath("/", "layout")
  // redirect("/")
}

export async function signInWithGithub() {
  // const supabase = await createClient()
  // const { data, error } = await supabase.auth.signInWithOAuth({
  //   provider: "github",
  //   options: {
  //     redirectTo: "http://localhost:3000/auth/callback",
  //   },
  // })
  // if (data.url) {
  //   redirect(data.url)
  // }
}
export async function signInWithFacebook() {
  // const supabase = await createClient()
  // const { data, error } = await supabase.auth.signInWithOAuth({
  //   provider: "facebook",
  //   options: {
  //     redirectTo: "http://localhost:3000/auth/callback",
  //   },
  // })
  // if (data.url) {
  //   redirect(data.url)
  // }
}
export async function signInWithGoogle() {
  // const supabase = await createClient()
  // const { data, error } = await supabase.auth.signInWithOAuth({
  //   provider: "google",
  //   options: {
  //     redirectTo: "http://localhost:3000/auth/callback",
  //   },
  // })
  // if (data.url) {
  //   redirect(data.url) // use the redirect API for your server framework
  // }
}

export async function signOut() {
  // const supabase = await createClient()
  // const { error } = await supabase.auth.signOut()
  // if (error) {
  //   redirect("/error")
  // }
  // redirect("/login")
}
