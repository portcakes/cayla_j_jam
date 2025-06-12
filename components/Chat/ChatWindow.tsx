import React from 'react'
import RichTextEditor from './rich-text-editor/RichTextEditor'
import ChatHistory from './ChatHistory'

interface ChatWindowProps {
    chatId: string
}

const ChatWindow = ({ chatId }: ChatWindowProps) => {
  return (
    <div className="flex flex-col gap-4 w-full">
        <ChatHistory />
        <RichTextEditor chatId={chatId} />
    </div>
  )
}

export default ChatWindow