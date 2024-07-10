"use client"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useContext } from "react"
import { AuthContext } from "@/contexts/Auth/AuthProvider"
import axios from "axios"
import { NewForm } from "@/components/Form/NewForm"
import { useRouter } from "next/navigation"

const Login = () => {

    const router = useRouter()

    // 2. Submit handler.
    async function onSubmit(providerid: string) {
        try {
            const response = await axios.post("/api/users/signup", { providerid })
            const authurl = response.data.authurl
            console.log("authurl", authurl)
            if (authurl !== "") {
                window.location.href = authurl;
            }
        } catch (error) {
            console.log(error)
        }

    }

    return (
        <div className="mt-20 w-full h-full flex flex-col justify-center items-center">
            <NewForm handleSubmit={onSubmit} heading={"Login To DeadLock"} subheading={"Login to DeadLock while you still can"} />
        </div>
    )
}

export default Login