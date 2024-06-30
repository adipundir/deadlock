"use client"
import Link from "next/link"
import { NavLinks } from "./helper"
import { useContext, useEffect, useState } from "react"
import { AuthContext } from "@/contexts/Auth/AuthProvider"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"



const Navbar = () => {

  const { user, setUser } = useContext(AuthContext)
  const [ sideMenuOpen, setSideMenuOpen ] = useState(false)
  const [scrolled, setScrolled] = useState(false);


  const router = useRouter()

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > window.innerHeight) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const Logout = async () => {
    // try {
    //   await account.deleteSessions()
    //   setSideMenuOpen(false)
    //   setUser(null)
    //   router.replace("/")
    // } catch (error) {
    //   console.log("Logout error")
    // }
  }

  const GoToLogin = () => {
    router.push("/login")
    setSideMenuOpen(false)
  }

  return (
    <nav className={`bg-transparent ${scrolled ? "text-purple" : "text-white" } z-[999999] fixed min-h-fit top-0 w-full flex justify-between items-center gap-2 px-16 py-2 shadow-lg`}>
      <div className="w-10 md:text-xl">
        Dead<span className="font-thin">Lock</span>
      </div>
      <div className="flex gap-6 items-center">
        {NavLinks.map((link) => <Link key={link.name} href={link.href} className="">{link.name}</Link>)}
        {/* {user && <Link href={""} onClick={Logout}>Logout</Link>} */}
        <Sheet open={sideMenuOpen} onOpenChange={setSideMenuOpen}>
          <SheetTrigger><Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>{user ? `Welcome ${user?.email}` : (
                <Button onClick={GoToLogin}>Login</Button>
              )} </SheetTitle>
              <SheetDescription>
                {user && <Button onClick={Logout}>Logout</Button>}
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>

      </div>
    </nav>
  )
}

export default Navbar