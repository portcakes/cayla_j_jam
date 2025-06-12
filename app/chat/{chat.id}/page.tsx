import { db } from '@/lib/db'
import NotFound from '@/components/NotFound'
import { useParams, useRouter } from 'next/navigation'
import React from 'react'
import Messages from '@/components/Chat/Messages'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { SendIcon } from 'lucide-react'
import RichTextEditor from '@/components/Chat/rich-text-editor/RichTextEditor'
import { useUser } from '@clerk/nextjs'

const ChatPage = async () => {
    const { user } = useUser()
    const router = useRouter()
    const { chatId } = await useParams()
    const chat = await db.chat.findUnique({
        where: {
            id: chatId as string
        },
        include: {
            users: true,
            messages: {
                orderBy: {
                    createdAt: 'desc'
                }
            }
        }
    })
    if (!chat) {
        return <NotFound />
    }
    const handleSendMessage = async (message: string) => {
        const newMessage = await db.message.create({
            data: {
                content: message,
                chatId: chat.id,
                userId: user?.id ?? ''
            }
        })
        router.refresh()
    }
  return (
    <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold">{chat?.name}</h1>
        <p className="text-sm text-gray-500">{chat?.description}</p>
        <div className="flex flex-col gap-2">
            <div className="flex flex-row gap-2">
                <div className="flex flex-col gap-2 w-full">
                <h2 className="text-lg font-bold">Chats</h2>
                <div className="flex flex-col gap-2">
                    {chat?.messages.map((message: any) => (
                        <Messages key={message.id} message={message} />
                    ))}
                </div>
                <div className="flex flex-row gap-2">
                    
                </div>
            </div>
            <div className="flex flex-row gap-2">
                <RichTextEditor />
            </div>
            <div className="flex flex-col gap-2">
                <h2 className="text-lg font-bold">Members</h2>
                <div className="flex flex-col gap-2">
                    {chat?.users.map((user: any) => (
                        <div key={user.id} className="flex flex-col gap-2">
                            <p className="text-sm text-gray-500">{user.username}</p>
                            <p className="text-sm text-gray-500">{user.email}</p>
                        </div>
                    ))}
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ChatPage