'use client'
import { useEffect, useState } from "react"
import { User } from "@/lib/generated/prisma"

export default function UserGreeting() {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch('/api/user')
        if (response.ok) {
          const data = await response.json()
          setUser(data)
        }
      } catch (error) {
        console.error('Failed to fetch user:', error)
      }
    }
    fetchUser()
  }, [])

  return (
    <div className="flex flex-col items-center justify-center mt-10 bg-cyan-50 rounded-md p-10">
      {user ? (
        <h1 className="font-bold text-4xl text-cyan-500">Hello {user.username} :3</h1>
      ) : (
        <h1 className="font-bold text-4xl text-cyan-500 mb-10">Hello World :3</h1>
      )}
    </div>
  )
} 