import {
  createSessionClientOnDemand,
  createSessionClientOnRequest,
} from "@/AppWrite/config";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const session = request.cookies.get("session");
    if(session?.value){
        const { account: sessionAccount } = await createSessionClientOnRequest(request);
        const user = await sessionAccount.get();
        console.log("user", user);
    
        return NextResponse.json({ user, success: true });
    } else {
        return NextResponse.json({success: false });
    }
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
export async function POST(request: NextRequest) {
  try {
    console.log("entry in Post User");
    const { secret } = await request.json();
    if(secret){
        const { account: sessionAccount } = await createSessionClientOnDemand(secret);
        const user = await sessionAccount.get();
        // console.log("user in Post User", user);
    
        return NextResponse.json({ user, success: true });
    }
    return NextResponse.json({ success: false }, { status: 401 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
