import React from 'react'
import RichTextEditor from './rich-text-editor/RichTextEditor'
import ChatHistory from './ChatHistory'
import ChatHeader from './ChatHeader'

interface ChatWindowProps {
    Id: string
}

const ChatWindow = ({ Id }: ChatWindowProps) => {
    return (
        <div className="flex flex-col gap-4 w-full">
            <ChatHeader Id={Id} />
            <ChatHistory Id={Id} />
            <RichTextEditor Id={Id} />
        </div>
    )
}

export default ChatWindow