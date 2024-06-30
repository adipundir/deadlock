import { createSessionClientOnDemand, createSessionClientOnRequest } from "@/AppWrite/config";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request : NextRequest){
    try {
         const { account: sessionAccount } = await createSessionClientOnRequest(request);
         const user = sessionAccount.get();
         console.log("user", user)

         return NextResponse.json({user, success : true})
    } catch (error: any) {
        return NextResponse.json({error: error.message},{status : 500})
    }
   
}
export async function POST(request : NextRequest){
    try {
        console.log("entry in get User")
        const {secret} = await request.json();
         const { account: sessionAccount } = await createSessionClientOnDemand(secret);
         const user = await sessionAccount.get();
         console.log("user in get User", user)

         return NextResponse.json({user, success : true})
    } catch (error: any) {
        return NextResponse.json({error: error.message},{status : 500})
    }
   
}