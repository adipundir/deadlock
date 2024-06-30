"use client"
import { NextResponse, type NextRequest } from "next/server";
import { createSessionClientOnRequest } from "./AppWrite/config";

export async function middleware(request : NextRequest){
  try {
    const {account: sessionAccount} = await createSessionClientOnRequest(request)
    const user = await sessionAccount.get() //throws exception if user not found
    console.log(user)
  } catch (error) {
    console.log("Error in Middleware", error)
      return NextResponse.redirect(new URL("/signup", request.url));
  }
}

export const config = {
  matcher: ["/((?!login|signup|_next/static|_next/image|favicon.ico).*)"],
};