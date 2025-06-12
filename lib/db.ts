import { PrismaClient } from './generated/prisma'

declare global {
    var prisma: PrismaClient | undefined
}

const prismaClientSingleton = () => {
    return new PrismaClient({
        datasources: {
            db: {
                url: process.env.DATABASE_URL
            }
        },
        // log: process.env.NODE_ENV === 'development' ? ['error'] : [],
    })
}

export const db = globalThis.prisma ?? prismaClientSingleton()

if (process.env.NODE_ENV !== 'production') {
    globalThis.prisma = db
}

// Test the connection
db.$connect()
    .then(() => {
        // if (process.env.NODE_ENV === 'development') {
        //     console.log('Successfully connected to database')
        // }
    })
    .catch((error) => {
        console.error('Failed to connect to database:', error)
        process.exit(1)
    })
