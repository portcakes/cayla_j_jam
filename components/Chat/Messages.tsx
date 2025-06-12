import React from 'react'
import { useUser } from '@clerk/nextjs'
import { db } from '@/lib/db'
import { Message } from '@/lib/generated/prisma'

const Messages = async ({ message }: { message: Message } ) => {
    const { user } = useUser()
    const isUser = user?.id === message.userId
    const userData = await db.user.findUnique({
        where: {
            id: message.userId ?? ''
        }
    })
  return (
    <div className="flex flex-col gap-2">
        <p className="text-sm">{message.content}</p>
        <p className="text-sm text-gray-500">{message.createdAt.toLocaleString()}</p>
        <p className="text-sm text-gray-500">{isUser ? 'You' : userData?.username}</p>
    </div>
  )
}

export default Messages