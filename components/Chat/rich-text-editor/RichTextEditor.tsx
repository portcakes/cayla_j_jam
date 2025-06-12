'use client'

import React from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import { Button } from '@/components/ui/button'
import { useUser } from '@clerk/nextjs'
import { toast } from 'sonner'

interface RichTextEditorProps {
    chatId: string
}

const RichTextEditor = ({ chatId }: RichTextEditorProps) => {
    const { user } = useUser()
    const editor = useEditor({
        extensions: [
            StarterKit,
            Underline,
        ],
        content: '',
        editorProps: {
            attributes: {
                class: 'prose prose-sm focus:outline-none max-w-none',
            },
        },
    })

    const handleSendMessage = async () => {
        if (!editor?.isEmpty) {
            try {
                console.log('Sending message with data:', {
                    content: editor?.getHTML(),
                    chatId,
                })

                const response = await fetch('/api/message/create', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        content: editor?.getHTML(),
                        chatId,
                    }),
                })

                const data = await response.json()

                if (response.ok) {
                    editor?.commands.setContent('')
                    toast.success('Message sent')
                } else {
                    console.error('Failed to send message:', data)
                    toast.error(data.error || 'Failed to send message')
                }
            } catch (error) {
                console.error('Error sending message:', error)
                toast.error('Failed to send message')
            }
        } else {
            toast.error('Please enter a message')
        }
    }

    if (!editor) {
        return null
    }

    return (
        <div className="flex flex-col items-center justify-center border-2 border-cyan-500 rounded-md p-4 w-full">
            <div className="flex flex-row gap-2 mb-2">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    className={editor.isActive('bold') ? 'bg-gray-200' : ''}
                >
                    Bold
                </Button>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    className={editor.isActive('italic') ? 'bg-gray-200' : ''}
                >
                    Italic
                </Button>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => editor.chain().focus().toggleUnderline().run()}
                    className={editor.isActive('underline') ? 'bg-gray-200' : ''}
                >
                    Underline
                </Button>
            </div>
            <div className="w-full">
                <EditorContent editor={editor} className="min-h-[100px] border rounded-md p-2" />
            </div>
            <Button 
                variant="outline" 
                onClick={handleSendMessage}
                className="mt-2"
            >
                Send
            </Button>
        </div>
    )
}

export default RichTextEditor