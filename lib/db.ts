import { PrismaClient } from './generated/prisma'

declare global {
    var prisma: PrismaClient | undefined
}

const prismaClientSingleton = () => {
    return new PrismaClient({
        log: ['query', 'error', 'warn'],
    })
}

export const db = globalThis.prisma ?? prismaClientSingleton()

if (process.env.NODE_ENV !== 'production') {
    globalThis.prisma = db
}

// Test the connection
db.$connect()
    .then(() => {
        console.log('Successfully connected to database')
    })
    .catch((error) => {
        console.error('Failed to connect to database:', error)
    })
