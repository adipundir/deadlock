import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest){
    try {
        cookies().delete("session")
        return NextResponse.json({message : "Logged Out", success: true})
    } catch (error :any) {
        return NextResponse.json({error : error.message},{status : 500})
    }
    
}