"use client"
import { Button } from "@/components/ui/button"
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
} from "@/components/ui/input-otp"

import { useContext, useState } from "react"
import { AuthContext } from "@/contexts/Auth/AuthProvider"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import axios from "axios"

const SetPin = () => {
    const [dLPin, setDLPin] = useState("")
    const { user, setUser } = useContext(AuthContext)

    const router = useRouter()

    async function onSubmit() {
        try {
            console.log(dLPin)
            const res = await axios.post("/api/users/setPin", { dLPin })
            toast(res.data.message)
            if (res.data.success)
                router.replace("/")
            else {
                router.push("")
            }
        } catch (error) {
            console.log(" in setting DLPIN", error)
        }

    }

    //extracting user data from context

    return (
        <div className="w-full h-[100vh] flex flex-col gap-4 justify-center items-center">

            <InputOTP maxLength={6} value={dLPin} onChange={(value) => setDLPin(value)}>
                <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                </InputOTPGroup>
                <InputOTPSeparator />
                <InputOTPGroup>
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                </InputOTPGroup>
            </InputOTP>
            <div className="text-center text-sm ">
                {dLPin === "" ? (
                    <>Set your DeadLock Pin.</>
                ) : (
                    <>You entered: {dLPin}</>
                )}
            </div>
            <Button onClick={onSubmit}>Set DeadLock Pin</Button>

        </div>

    )
}

export default SetPin