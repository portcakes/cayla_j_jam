import { checkUser } from "@/lib/checkUser"
import { NextResponse } from "next/server"

export async function GET() {
    try {
        const user = await checkUser()
        return NextResponse.json(user)
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch user" }, { status: 500 })
    }
} 