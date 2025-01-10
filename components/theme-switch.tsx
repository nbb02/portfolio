"use client"
import { setTheme } from "@/app/lib/actions"
import themeSwitch from "@/styles/themeSwitch.module.css"

export default function ThemeSwitch({ theme }: { theme: string }) {
  return (
    <form action={setTheme}>
      <label className={themeSwitch["ui-switch"]}>
        <input
          type="checkbox"
          defaultChecked={theme === "dark"}
          onChange={(e) => e.target.form?.requestSubmit()}
        />
        <div className={themeSwitch.slider}>
          <div className={themeSwitch.circle}></div>
        </div>
      </label>
    </form>
  )
}
