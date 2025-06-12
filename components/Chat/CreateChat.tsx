import React, { useState } from 'react'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from '../ui/label'
import { Textarea } from '../ui/textarea'
import { Checkbox } from '../ui/checkbox'
import { RadioGroup, RadioGroupItem } from '../ui/radio-group'
import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

const CreateChat = () => {
    const [chatName, setChatName] = useState('')
    const [chatDescription, setChatDescription] = useState('')
    const [chatType, setChatType] = useState('private')
    const [chatAgree, setChatAgree] = useState(false)
    const { user } = useUser()
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()

    const handleCreateChat = async () => {
        if (!user) {
            toast.error('You must be logged in to create a chat')
            return
        }

        if (!chatAgree) {
            toast.error('You must agree to the terms and conditions')
            return
        }

        setIsLoading(true)
        try {
            const response = await fetch('/api/chat/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: chatName,
                    description: chatDescription,
                    chatType,
                }),
            })

            const data = await response.json()
            
            if (response.ok) {
                router.push(`/chat/${data.id}`)
            } else {
                toast.error(data.error || 'Failed to create chat')
            }
        } catch (error) {
            toast.error('Failed to create chat')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">Create Chat</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create Chat</DialogTitle>
                    <DialogDescription>
                        Create a new chat!
                    </DialogDescription>
                </DialogHeader>
                <div className="flex flex-col gap-4">
                    <Input placeholder="Enter Chat Name" value={chatName} onChange={(e) => setChatName(e.target.value)} />
                    <Textarea placeholder="Enter Chat Description" value={chatDescription} onChange={(e) => setChatDescription(e.target.value)} />
                    <RadioGroup value={chatType} onValueChange={setChatType}>
                        <div className="flex items-center gap-2">
                            <RadioGroupItem value="private" id="private" />
                            <Label htmlFor="private">Private</Label>
                        </div>
                        <div className="flex items-center gap-2">
                            <RadioGroupItem value="public" id="public" />
                            <Label htmlFor="public">Public</Label>
                        </div>
                        <div className="flex items-center gap-2">
                            <RadioGroupItem value="group" id="group" />
                            <Label htmlFor="group">Group</Label>
                        </div>
                    </RadioGroup>
                    <div className="flex items-center gap-2">
                        <Checkbox 
                            id="terms" 
                            checked={chatAgree} 
                            onCheckedChange={(checked) => setChatAgree(checked === true)} 
                        />
                        <Label htmlFor="terms">I agree to the terms and conditions</Label>
                    </div>
                    {isLoading ? (
                        <Button className="bg-blue-500 text-white p-6 rounded-md" disabled>Creating...</Button>
                    ) : (
                        <Button className="bg-blue-500 text-white p-6 rounded-md" onClick={handleCreateChat}>Create Chat</Button>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default CreateChat