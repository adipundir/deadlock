"use client"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AuthContext } from "@/contexts/Auth/AuthProvider"
import { useContext, useState } from "react"
import { toast } from "sonner"

export function UploadFileDialog({onSubmit}: any) {
    const [file , setFile] = useState<File | null>(null)
    const [description, setDescription] = useState<string>("")
    const [isOpen, setOpen] = useState<boolean>(false)

    const {user} = useContext(AuthContext)

    function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
        if (e.target.files) {
            setFile(e.target.files[0]);
        }
    }
    function handleDescriptionChange(e: React.ChangeEvent<HTMLInputElement>){
        if(e.target.value){
            setDescription(e.target.value)
        }
    }

    function handleSubmit() {
        // const data = new FormData()
        console.log("file in child component", file)
        if (file && description && user) {
            onSubmit(file, description, user.prefs.bucketId, user.email, user.$id);
            setOpen(false);
            setFile(null)
            setDescription("")
        } else {
            if (!file && !description)
                toast("All fields are required")
            else if(!file)
                toast("No file Selected")
            else if(!description)
                toast("Description is required")
        }
    }
    return (
        <Dialog open={isOpen} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline">Upload To PermaWeb</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Upload File</DialogTitle>
                    <DialogDescription>
                        Enter the description for the file
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="file" className="text-right">
                            File
                        </Label>
                        <Input
                            id="file"
                            type="file"
                            className="col-span-3"
                             onChange={handleFileChange}
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="description" className="text-right">
                            Description
                        </Label>
                        <Input
                            onChange={handleDescriptionChange}
                            id="description"
                            placeholder="Hey! don't Share this with anyone."
                            className="col-span-3"
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button type="submit" onClick={handleSubmit}>Upload File </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
