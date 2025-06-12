'use client'

import { PlusIcon } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { Button } from '../ui/button'

interface ChatHeaderProps {
    Id: string
}

const ChatHeader = ({ Id }: ChatHeaderProps) => {
    const [chatDetails, setChatDetails] = useState<{ name: string; description: string } | null>(null)

    useEffect(() => {
        const fetchChatDetails = async () => {
            try {
                const response = await fetch(`/api/chat/${Id}`)
                if (!response.ok) throw new Error('Failed to fetch chat details')
                const data = await response.json()
                setChatDetails(data)
            } catch (error) {
                console.error('Error fetching chat details:', error)
            }
        }

        fetchChatDetails()
    }, [Id])

    return (
        <div className="flex container mx-auto flex-row gap-2 justify-between w-full">
            <div className="flex flex-col gap-2 w-full">
                <h1 className="text-2xl font-bold">{chatDetails?.name || 'Loading...'}</h1>
                <p className="text-sm text-gray-500">{chatDetails?.description || ''}</p>
            </div>
        </div>
    )
}

export default ChatHeader