import React from 'react'
import { Editor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'


const RichTextEditor = () => {
    const editor = new Editor({
        extensions: [
            StarterKit,
        ],
        content: 'Hello World!',
    })
  return (
    <div className="flex flex-col items-center justify-center border-2 border-cyan-500 rounded-md p-4 w-full">
        <EditorContent editor={editor} />
    </div>
  )
}

export default RichTextEditor