"use client"

import { AppContext } from "@/app/app-provider"
import { Toaster } from "@/components/ui/sonner"
import api from "@/config/axios"
import socket from "@/lib/socket"
import { cn } from "@/lib/utils"
import { useState, useEffect, useRef, useContext } from "react"
import { toast } from "sonner"

interface Message {
  id: number
  conversation_id: number
  user_id: number
  content: string
  timestamp: string
}

interface ChatData {
  id: number
  created_at: string
  messages: Message[]
  name: string | null
  type: string
}

export default function Page() {
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState("")
  const [loading, setLoading] = useState(true)
  const [id, setId] = useState<string | null>(null)
  const containerRef = useRef<HTMLUListElement>(null)
  const { user } = useContext(AppContext)

  useEffect(() => {
    async function fetchMessages() {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/global-chat`
      )
      const data: ChatData = await response.json()
      setMessages(data.messages.reverse())
      setLoading(false)
    }

    fetchMessages()
  }, [])

  useEffect(() => {
    socket.on("public chat", (message) => {
      setMessages((prevMessages) => [...prevMessages, message])
      console.log("set m 1", message)

      toast("New message received")
    })

    socket.on("connect", () => {
      setId(socket.id ?? null)
    })

    return () => {
      socket.off("public chat")
    }
  }, [])

  useEffect(() => {
    containerRef.current?.scrollTo(0, containerRef.current.scrollHeight)
  }, [messages])

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    // const response = await fetch(
    //   `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/global-chat`,
    //   {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({ content: newMessage }),
    //   }
    // )

    const { data } = await api.post("/global-chat", { content: newMessage })
    setMessages((prev) => [...prev, data])
    toast("Message sent")
    setNewMessage("")
  }

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div className="p-5 flex-1  flex flex-col overflow-hidden max-h-[100vh]">
      <header>
        <h1 className=" font-bold text-3xl p-2 border-violet-400 border-2 rounded-md">
          Global Chat {id}
        </h1>
      </header>
      <main className="p-5 flex flex-col flex-1 min-w-[40em] m-auto pb-5 overflow-hidden">
        <ul
          className="flex-1 flex flex-col gap-2 overflow-auto"
          ref={containerRef}
        >
          {messages.map((message, index) => (
            <li
              key={index}
              className={cn(
                "border-2 p-2 rounded-md bg-violet-200 max-w-[50%] ",
                message.user_id === user?.id ? "self-end" : ""
              )}
            >
              <strong>User {message.user_id}:</strong> {message.content}{" "}
              <em>({new Date(message.timestamp).toLocaleString()})</em>
            </li>
          ))}
        </ul>
        <footer className="w-full b p-2 border-2 border-violet-500 ">
          <form onSubmit={handleSubmit} className="flex w-full">
            <input
              className="flex-1"
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message"
              required
            />
            <button type="submit">Send</button>
          </form>
        </footer>
      </main>

      <Toaster />
    </div>
  )
}
