import { createAuthAdminClient } from "@/AppWrite/config";
import { NextRequest, NextResponse } from "next/server";
import { ID } from "node-appwrite";

export async function POST(request: NextRequest){
    try {
        const { email, password } = await request.json();
        const { account } = await createAuthAdminClient();
        const newUser = await account.create(ID.unique(), email, password);

        return NextResponse.json({
          message: "Signup SuccessFul",
          success: true,
        });
    } catch (error: any) {
        return NextResponse.json({
          error: error.message,
        }, {status: 500});
        
    }
    
    
}