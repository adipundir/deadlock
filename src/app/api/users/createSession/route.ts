import { createAuthAdminClient } from "@/AppWrite/config";
import axios from "axios";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request : NextRequest){
    try {
        console.log("create Session Run")
        const {secret, userId} = await request.json()
        const {account : adminClient} = await createAuthAdminClient();
        const session = await adminClient.createSession(userId, secret)
        console.log("session", session)
    
        if(session.secret){
          cookies().set("session", session.secret, {
            httpOnly: true,
            sameSite: "strict",
            secure: true,
            maxAge: Math.floor(
              (new Date(session.expire).getTime() - Date.now()) / 1000
            ),
            path: "/",
          });

          //get user data
          const userResponse = await axios.post(
            `${request.nextUrl.origin}/api/users/getUser`,
            { secret: session.secret }
          );
          console.log("getUser response", userResponse);

          const user = userResponse.data.user;

           return NextResponse.json({
             message: "Successfully created session",
             user,
             success: true,
           });
        }
    } catch (error : any) {
        return NextResponse.json({error : error.message},{status : 500});
    }
}