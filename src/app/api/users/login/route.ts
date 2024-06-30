import { createAuthAdminClient, createSessionClientOnDemand } from "@/AppWrite/config";
import axios from "axios";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        //Extract email and password from request
        const { email, password } = await request.json();

        //Creat authAdmin Client for creating session
        const { account: adminAccount } = await createAuthAdminClient();

        //create session
        const session = await adminAccount.createEmailPasswordSession(
          email,
          password
        );
        console.log("session", session)

        //set session secret in cookie
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

        return NextResponse.json({
          message: "login Successful",
          user: userResponse.data.user,
          success: true,
        });
    } catch (error : any) {
        return NextResponse.json({error : error.message},{status : 500})
    }

}
