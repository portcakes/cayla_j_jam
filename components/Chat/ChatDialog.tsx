import React, { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '../ui/button'
import CreateChat from './CreateChat'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

const ChatDialog = () => {
    const router = useRouter()
    const [chatId, setChatId] = useState('')

    const handleJoinChat = async () => {
        try {
            const response = await fetch(`/api/chat/${chatId}`)
            const data = await response.json()
            
            if (response.ok) {
                router.push(`/chat/${chatId}`)
            } else {
                toast.error('Failed to join chat')
            }
        } catch (error) {
            console.error('Error joining chat:', error)
        }
    }

    const handleJoinRandomChat = async () => {
        try {
            const response = await fetch('/api/chat/random')
            const data = await response.json()
            
            if (response.ok) {
                router.push(`/chat/${data.id}`)
            } else {
                toast.error('Failed to join random chat')
            }
        } catch (error) {
            console.error('Error joining random chat:', error)
        }
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline" className="bg-blue-500 text-white p-6 rounded-md">Chat</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Chat</DialogTitle>
                    <DialogDescription>
                        Chat with your friends (or random people)!
                    </DialogDescription>
                </DialogHeader>

                <div className="flex justify-between gap-4">
                    <CreateChat />
                    <Button variant="outline" onClick={handleJoinChat}>
                        Join Chat
                    </Button>
                    <Button variant="outline" onClick={handleJoinRandomChat}>I'm Feeling Lucky</Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default ChatDialog