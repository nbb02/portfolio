"use client"

import { createContext, useState } from "react"

export const AppContext = createContext({})

export default function AppProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [user, setUser] = useState(null)

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
