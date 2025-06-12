"use client"
import React, { useState } from 'react'
import { Button } from './ui/button'
import LogInForm from './Log-In-Form'
import RegisterForm from './Register-Form'

const Navbar = () => {
    const [isLogIn, setIsLogIn] = useState(false)
    const [isRegister, setIsRegister] = useState(false)

  return (
    <div className="flex justify-between items-center p-4">
        <h1 className="text-2xl font-bold">Cayla's Website</h1>
        <div className="flex gap-4">
            {!isLogIn && !isRegister && (
                <>
                    <Button className="bg-blue-500 text-white p-6 rounded-md" onClick={() => setIsLogIn(true)}>Log In</Button>
                    <Button className="bg-blue-500 text-white p-6 rounded-md" onClick={() => setIsRegister(true)}>Register</Button>
                </>
            )}
            {isRegister && (
                <>
                    <Button className="bg-blue-500 text-white p-6 rounded-md" onClick={() => setIsRegister(false)}>Cancel</Button>
                    <RegisterForm />
                </>
            )}
            {isLogIn && (
                <>
                    <Button className="bg-blue-500 text-white p-6 rounded-md" onClick={() => setIsLogIn(false)}>Cancel</Button>
                    <LogInForm />
                </>
            )}
        </div>
    </div>
  )
}

export default Navbar