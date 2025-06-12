import { currentUser } from "@clerk/nextjs/server"
import { db } from "./db"

export const checkUser = async () => {
    const user = await currentUser()
    // if user is not found, return null
    if (!user) {
        return null
    }
    // if user is found, check if user is in database
    const userInDb = await db.user.findUnique({
        where: {
            clerkId: user.id
        }
    })
    // if user is not in database, create user in database
    if (!userInDb) {
        const newUser = await db.user.create({
            data: {
                clerkId: user.id,
                clerkImageUrl: user.imageUrl ?? null,
                username: user.username ?? `user_${user.id}`,
                email: user.emailAddresses[0]?.emailAddress ?? null,
                createdAt: new Date(),
                updatedAt: new Date(),
                roles: {
                    create: {
                        name: "user"
                    }
                },
                isAdmin: false,
                isModerator: false,
                isSuperAdmin: false,
                isBanned: false,
                isActive: true,
                isOnline: false,
                isOffline: false,
            }
        })
        return newUser
    }
    // if user is in database, return user
    return userInDb
}