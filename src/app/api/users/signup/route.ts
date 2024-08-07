import { createAuthAdminClient } from "@/AppWrite/config";
import { NextRequest, NextResponse } from "next/server";
import { OAuthProvider } from "node-appwrite";

export async function POST(request: NextRequest){
    try {
      console.log(request.nextUrl.origin);
      console.log("signup route run")
        const { providerid } = await request.json();
        let authurl = ""
        const { account } = await createAuthAdminClient();

        if(providerid === "google"){
          authurl = await account.createOAuth2Token(
            OAuthProvider.Google,
            `${request.nextUrl.origin}/extractParam`,
            `${request.nextUrl.origin}//unexpected`
          );
        }
        if(providerid === "apple"){
          console.log("apple run")
          authurl = await account.createOAuth2Token(
            OAuthProvider.Apple,
            `${request.nextUrl.origin}/extractParam`,
            `${request.nextUrl.origin}//unexpected`
          );

        }

        //0xdeadlock.vercel.app/extractParam
        return NextResponse.json({
          message: authurl !== "" ? "Signup Success" : "Signup Failed",
          success: authurl !== "" ? true : false,
          authurl,
        });
    } catch (error: any) {
      console.log("some problem with the /signup api")
        return NextResponse.json({
          error: error.message,
        }, {status: 500});
        
    }
}