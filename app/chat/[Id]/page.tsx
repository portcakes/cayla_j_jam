import { db } from '@/lib/db'
import NotFound from '@/components/NotFound'
import ChatWindow from '@/components/Chat/ChatWindow'

interface ChatPageProps {
    params: {
        Id: string
    }
}

const ChatPage = async ({ params }: ChatPageProps) => {
    const resolvedParams = await params
    if (!resolvedParams?.Id) {
        return <NotFound />
    }

    try {
        const chat = await db.chat.findUnique({
            where: {
                id: resolvedParams.Id
            },
            include: {
                users: true,
                messages: {
                    orderBy: {
                        createdAt: 'desc'
                    },
                    include: {
                        user: true
                    }
                }
            }
        })

        if (!chat) {
            return <NotFound />
        }

        return <ChatWindow Id={chat.id} />
    } catch (error) {
        return <NotFound />
    }
}

export default ChatPage 