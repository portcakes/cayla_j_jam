"use client"
import React, { useState, useEffect } from 'react'
import { Button } from './ui/button'
import { useUser, SignOutButton, SignUpButton, SignInButton, UserButton } from '@clerk/nextjs'
import { Laugh, SmilePlus, Smile, Angry, Annoyed, HandMetal, HeartHandshake, Heart,BicepsFlexed, ThumbsUp, Star, PartyPopper, Salad, LeafyGreen, PiggyBank, Gem, Ham, Sandwich, Croissant, Cake, Cherry, Coins, Gamepad, Ghost, Gift, Skull, Sparkles, Castle, Crown, Flower, Save, Bubbles, MoonStar, CableCar, CirclePower } from 'lucide-react'
import ChatDialog from './Chat/ChatDialog'

const Navbar = () => {
    const { user } = useUser()
    const icons = [Laugh, SmilePlus, Smile, Angry, Annoyed, HandMetal, HeartHandshake, Heart, BicepsFlexed, ThumbsUp, Star, PartyPopper, Salad, LeafyGreen, PiggyBank, Gem, Ham, Sandwich, Croissant, Cake, Cherry, Coins, Gamepad, Ghost, Gift, Skull, Sparkles, Castle, Crown, Flower, Save, Bubbles, MoonStar, CableCar, CirclePower]
    const [Icon, setIcon] = useState(() => icons[0]) // Default to first icon

    useEffect(() => {
        const randomIcon = icons[Math.floor(Math.random() * icons.length)]
        setIcon(() => randomIcon)
    }, []) // Empty dependency array means this runs once on mount

    return (
        <div className="flex justify-between items-center p-4">
            <h1 className="text-2xl font-bold flex items-center gap-2"><Icon className="text-4xl" /> Cayla's Website</h1>
            <div className="flex gap-4">
                {!user && (
                    <>
                        <SignInButton mode="modal">
                            <Button className="bg-blue-500 text-white p-6 rounded-md">Log In</Button>
                        </SignInButton>
                        <SignUpButton mode="modal">
                            <Button className="bg-blue-500 text-white p-6 rounded-md">Register</Button>
                        </SignUpButton>
                    </>
                )}

                {user && (
                    <>
                        <UserButton />
                        <ChatDialog />
                    <SignOutButton>
                        <Button className="bg-blue-500 text-white p-6 rounded-md">Log Out</Button>
                    </SignOutButton>
                    </>
                )}
            </div>
        </div>
    )
}

export default Navbar