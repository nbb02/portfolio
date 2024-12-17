import { useActionState, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { signup } from "@/app/login/actions"

type SignUpProps = {
  isSignUp: boolean
  setIsSignup: (isSignUp: boolean) => void
}

export default function SignUp({ isSignUp, setIsSignup }: SignUpProps) {
  const [error, action, pending] = useActionState(signup, null)

  return (
    <form
      className={`transition-transform p-5 duration-1000 bg-white overflow-auto content-center ${
        isSignUp ? "translate-x-[100%] z-1" : "absolute z-0 w-[50%] h-full"
      }`}
    >
      <div className="flex flex-col gap-6">
        <div className="flex flex-col items-center text-center">
          <h1 className="text-2xl font-bold">Welcome </h1>
          <p className="text-balance text-muted-foreground">
            Sign up for an Account
          </p>
        </div>
        {pending ? (
          "Loading..."
        ) : error ? (
          <div className="p-2 text-red-500 bg-red-100 rounded-[0.5em] border-red-500 border-solid border-2 text-center">
            {error}
          </div>
        ) : (
          ""
        )}
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            name="email"
            type="email"
            placeholder="m@example.com"
            required
          />
        </div>
        <div className="grid gap-2">
          <div className="flex items-center">
            <Label htmlFor="password">Password</Label>
          </div>
          <Input name="password" type="password" required />
        </div>
        <Button type="submit" className="w-full" formAction={action}>
          Sign Up
        </Button>
        <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
          <span className="relative z-10 bg-background px-2 text-muted-foreground">
            Already have an account ?
          </span>
        </div>
        <button
          className="underline underline-offset-4"
          type="button"
          onClick={() => setIsSignup(false)}
        >
          Log In
        </button>
      </div>
    </form>
  )
}
