import React from 'react'
import RichTextEditor from './rich-text-editor/RichTextEditor'
import ChatHistory from './ChatHistory'

const ChatWindow = () => {
  return (
    <div className="flex flex-col gap-4 w-full">
        <ChatHistory />
        <RichTextEditor />
    </div>
  )
}

export default ChatWindow