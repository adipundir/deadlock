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
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import axios from 'axios'

const formSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8).max(32)
})

const Login = () => {

    const {user, setUser} = useContext(AuthContext)

    //setup Router
    const router = useRouter();
    
    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: ""
        },
    })
    // 2. Submit handler.
    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            // if (user){
            //     toast(`Logged in ${user.name}`)
            //     return
            // }
            const response = await axios.post("/api/users/login", {email : values.email, password : values.password});
            console.log("response : ",response)
            const LoggedUser = response.data.user;
            
            if (LoggedUser) {
                toast(`Logged in ${LoggedUser.name}`)
                setUser(LoggedUser)
                if (LoggedUser.prefs.hasPin === true)
                    router.replace("/")
                else router.replace("/setPin")
                // const url = await account.createVerification("http://localhost:3000/setPin")
                // router.replace('/setPin')
                // console.log("URL", url)
            }
        } catch (error) {
            console.log("Error in Login",error)
        }

    }

    return (
        <div className="w-full h-[100vh] flex flex-col justify-center items-center">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-8 border rounded-md border-solid border-black px-6 py-8 md:w-1/3 w-full">
                    {/* <h1 className="text-xl">Signup</h1> */}
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input placeholder="Email" {...field} />
                                </FormControl>
                                <FormDescription>
                                    Please Enter your Email.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input type="password" placeholder="Password" {...field} />
                                </FormControl>
                                <FormDescription>
                                    Please Enter your Password.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit">Login</Button>
                </form>
            </Form>
        </div>
    )
}

export default Login