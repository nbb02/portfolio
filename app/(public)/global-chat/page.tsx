"use client"

import socket from "@/lib/socket"
import { useState, useEffect } from "react"

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
      alert(message)
      setMessages((prevMessages) => [...prevMessages, message])
    })

    return () => {
      socket.off("public chat")
    }
  }, [])

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/global-chat`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content: newMessage }),
      }
    )

    socket.emit("public chat", newMessage)

    const data: Message = await response.json()
    setMessages([...messages, data])
    setNewMessage("")
  }

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <h1>Global Chat</h1>
      <ul>
        {messages.map((message) => (
          <li key={message.id}>
            <strong>User {message.user_id}:</strong> {message.content}{" "}
            <em>({new Date(message.timestamp).toLocaleString()})</em>
          </li>
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message"
          required
        />
        <button type="submit">Send</button>
      </form>
    </div>
  )
}
