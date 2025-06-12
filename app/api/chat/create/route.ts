import { db } from '@/lib/db'
import { NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'

export async function POST(request: Request) {
    try {
        console.log('Starting chat creation process...')
        
        const { userId } = await auth()
        console.log('Auth userId:', userId)
        
        if (!userId) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const body = await request.json()
        const { name, description, chatType } = body
        console.log('Request body:', { name, description, chatType })

        if (!name || !description || !chatType) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            )
        }

        // First, get or create the user
        console.log('Looking up user...')
        let user = await db.user.findUnique({
            where: { clerkId: userId }
        })
        console.log('Found user:', user)

        if (!user) {
            console.log('Creating new user...')
            user = await db.user.create({
                data: {
                    clerkId: userId,
                    username: userId, // You might want to get this from Clerk
                }
            })
            console.log('Created new user:', user)
        }

        // Create the appropriate chat type record
        console.log('Creating chat type record...')
        let chatTypeRecord;
        try {
            if (chatType === 'group') {
                chatTypeRecord = await db.groupChats.create({
                    data: {
                        name,
                        description,
                    }
                });
            } else if (chatType === 'public') {
                chatTypeRecord = await db.publicChats.create({
                    data: {
                        name,
                        description,
                    }
                });
            } else {
                chatTypeRecord = await db.privateChats.create({
                    data: {
                        name,
                        description,
                    }
                });
            }
            console.log('Created chat type record:', chatTypeRecord)
        } catch (error) {
            console.error('Error creating chat type record:', error)
            throw error
        }

        // Create the chat with the appropriate relations
        console.log('Creating chat...')
        try {
            const chat = await db.chat.create({
                data: {
                    name,
                    description,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    isPublic: chatType === 'public',
                    isGroup: chatType === 'group',
                    isPrivate: chatType === 'private',
                    isDeleted: false,
                    isArchived: false,
                    isStarred: false,
                    isFavorite: false,
                    isRead: false,
                    isUnread: false,
                    isMuted: false,
                    user: {
                        connect: { id: user.id }
                    },
                    ...(chatType === 'group' && { 
                        groupChats: {
                            connect: { id: chatTypeRecord.id }
                        }
                    }),
                    ...(chatType === 'public' && { 
                        publicChats: {
                            connect: { id: chatTypeRecord.id }
                        }
                    }),
                    ...(chatType === 'private' && { 
                        privateChats: {
                            connect: { id: chatTypeRecord.id }
                        }
                    }),
                },
                include: {
                    user: true,
                }
            })

            // After creating the chat, connect the user as a member
            await db.chat.update({
                where: { id: chat.id },
                data: {
                    user: {
                        connect: { id: user.id }
                    }
                }
            })

            console.log('Successfully created chat:', chat)
            return NextResponse.json(chat)
        } catch (error) {
            console.error('Error creating chat:', error)
            throw error
        }
    } catch (error) {
        console.error('Detailed error in chat creation:', error)
        return NextResponse.json(
            { 
                error: 'Internal Server Error', 
                details: error instanceof Error ? error.message : 'Unknown error',
                stack: error instanceof Error ? error.stack : undefined
            },
            { status: 500 }
        )
    }
} 