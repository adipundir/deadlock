import { createAuthAdminClient } from "@/AppWrite/config";
import { NextRequest, NextResponse } from "next/server";
import { OAuthProvider } from "node-appwrite";

export async function POST(request: NextRequest) {
  try {
    console.log("Login route run");
    const { providerid } = await request.json();
    let authurl = "";
    const { account } = await createAuthAdminClient();

    if (providerid === "google") {
      console.log("google run");
      authurl = await account.createOAuth2Token(
        OAuthProvider.Google,
        `https://0xdeadlock.vercel.app/extractParam`,
        `https://0xdeadlock.vercel.app/unexpected`
      );
    }
    if (providerid === "apple") {
      console.log("apple run");
      authurl = await account.createOAuth2Token(
        OAuthProvider.Apple,
        `https://0xdeadlock.vercel.app/extractParam`,
        `https://0xdeadlock.vercel.app/unexpected`
      );
    }
    return NextResponse.json({
      message: authurl !== "" ? "Login Success" : "Login Failed",
      success: authurl !== "" ? true : false,
      authurl,
    });
  } catch (error: any) {
    console.log("some problem with the Login api");
    return NextResponse.json(
      {
        error: error.message,
      },
      { status: 500 }
    );
  }
}
