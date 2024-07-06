"use client"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useContext } from "react"
import { AuthContext } from "@/contexts/Auth/AuthProvider"
import axios from "axios"
import { NewForm } from "@/components/Form/NewForm"
import { OAuthProvider } from "node-appwrite"
import {account} from "@/AppWrite/clientsdk"
import { useRouter } from "next/navigation"


const formSchema = z.object({
    email: z.string().email(),
    password : z.string().min(8).max(32)
})

const Signup = () => {

    const router = useRouter()

    // 1. Define your form.
    const form = useForm < z.infer < typeof formSchema >> ({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: ""
        },
    })
    // 2. Submit handler.
    async function onSubmit(providerid: string) {
        try {

            console.log("session run")
            const response = await axios.post("/api/users/signup", {providerid} )
            const authurl = response.data.authurl
            console.log("authurl", authurl)
            if (authurl !== ""){
                window.location.href = authurl;
            }
        } catch (error) {
            console.log(error)
        }

    }

    //extracting user data from context
    const {user, setUser} = useContext(AuthContext)

  return (
      <div className="mt-20 w-full h-full flex flex-col justify-center items-center">
          <NewForm handleSubmit={onSubmit} heading={"Signup To DeadLock"} subheading={"Signup to DeadLock while you still can"}  />
        </div> 
  )
}

export default Signup