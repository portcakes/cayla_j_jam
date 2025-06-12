'use client'

import React, { useEffect, useState } from 'react'
import Messages from './Messages'
import { Message } from '@/lib/generated/prisma'
import { toast } from 'sonner'

interface ChatHistoryProps {
    Id: string
}

const ChatHistory = ({ Id }: ChatHistoryProps) => {
    const [messages, setMessages] = useState<(Message & { user: { username: string | null, clerkId: string | null } | null })[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const fetchMessages = async () => {
        if (!Id || typeof Id !== 'string' || Id.trim() === '') {
            setError('Invalid chat ID')
            setIsLoading(false)
            return
        }

        try {
            const response = await fetch(`/api/chat/${Id}`)
            
            if (!response.ok) {
                const errorData = await response.json()
                throw new Error(errorData.error || 'Failed to fetch messages')
            }

            const data = await response.json()
            setMessages(data.messages || [])
            setError(null)
        } catch (error) {
            setError(error instanceof Error ? error.message : 'Failed to fetch messages')
            toast.error('Failed to fetch messages')
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        if (Id && typeof Id === 'string' && Id.trim() !== '') {
            fetchMessages()
            const interval = setInterval(fetchMessages, 5000)
            return () => clearInterval(interval)
        }
    }, [Id])

    return (
        <div className="container mx-auto border-2 border-gray-300 rounded-md p-4">
            <div className="flex flex-col gap-4">
                <h1 className="text-2xl font-bold">Chat History</h1>
                {isLoading ? (
                    <div>Loading messages...</div>
                ) : error ? (
                    <div className="text-red-500">Error: {error}</div>
                ) : messages.length === 0 ? (
                    <div>No messages yet</div>
                ) : (
                    <div className="flex flex-col gap-2">
                        {[...messages].reverse().map((message) => (
                            <Messages 
                                key={message.id} 
                                message={{
                                    ...message,
                                    user: message.user ? {
                                        username: message.user.username,
                                        clerkId: message.user.clerkId
                                    } : null
                                }} 
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default ChatHistory