"use client"
import { type FileType, columns } from "@/components/DataTable/columns"
import { DataTable } from "@/components/DataTable/data-table"
import { AuthContext } from "@/contexts/Auth/AuthProvider"
import axios from "axios"
import { useRouter } from "next/navigation"
import { useContext, useEffect, useState } from "react"
import { UploadFileDialog } from "../UploadFile/UploadFile"
import { toast } from "sonner"




export default function Dashboard() {
    const router = useRouter()
    const {user} = useContext(AuthContext)
    const [files, setFiles] = useState([])
   

    async function getFiles() {
        try {
            const response = await axios.post("/api/data/getAll", {bucketId : user?.prefs.bucketId})
             setFiles(response.data.serialisedFilesArray)
            
        } catch (error : any) {
            console.log(error.message)
        }
    }

    async function uploadFile(file: File, description: string, bucketId : string, email : string, userid : string) {
        try {
            console.log("function start")
            console.log("file",file)
            const formData = new FormData();
            formData.append("file", file);
            formData.append("description", description); 
            formData.append("bucketId", bucketId); 
            formData.append("email", email); 
            formData.append("userid", userid); 

            const response = await axios.post('api/data/uploadFile', formData);
            getFiles()
            toast(response.data.message);
        } catch (error: any) {
            console.log(error.message);
        }
    }

    
    useEffect(() => {
        if(user){
            console.log(user)
            getFiles();
        }
    },[user])

    useEffect(() => {
        console.log("files", files)
    },[files])

    return (
        <div className="container mx-auto py-10 mt-8 flex flex-col gap-4">
            <h1 className="text-4xl font-bold ">All files</h1>
            <DataTable columns={columns} data={files} />
            <UploadFileDialog onSubmit={uploadFile} />
        </div>
    )
}
