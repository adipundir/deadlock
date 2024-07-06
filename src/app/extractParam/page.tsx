"use client"
import axios from 'axios'
import React, { useEffect } from 'react'
import { AuthContext } from '@/contexts/Auth/AuthProvider'
import { useContext } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

const Page = () => {
  const {setUser} = useContext(AuthContext)
  const router = useRouter()

  async function getparams(){
    const params = new URLSearchParams(window.location.search)
    const secret = params.get('secret')
    const userId = params.get('userId')
    console.log("secret",secret)
    console.log("userid",userId)
    try{
      const response = await axios.post("/api/users/createSession", { secret, userId })
      console.log("response", response)
      if (response.data.user) {
        setUser(response.data.user)
        toast("Logged in")
        router.replace("/dashboard")
      }
      else {
        setUser(null)
        router.replace("/unexpected")
      }
    } catch(error : any){
      console.log(error.message)
    }
  }

  useEffect(() => {
    getparams()
  }, [])

  return (
    <div></div>
  )
}

export default Page
