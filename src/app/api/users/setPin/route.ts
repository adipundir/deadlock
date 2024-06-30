import { createSessionClientOnRequest } from "@/AppWrite/config";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest){
    try {
        const { dLPin } = await request.json();
        const {account : sessionClient} = await createSessionClientOnRequest(request)
        const user = await sessionClient.get()
        const prefs = user.prefs;
        if(prefs.hasPin)
            return NextResponse.json({message : "DeadLock Pin Can't be Changed", success : false })

        const updatedUser = await sessionClient.updatePrefs({
          ...prefs,
          hasPin: true,
          dLPin: dLPin,
        });

        console.log("response", updatedUser )
        return NextResponse.json({
          message: "DeadLock Pin Set",
          success: true,
          updatedUser,
        });
    } catch (error :any) {
        return NextResponse.json({error: error.message},{status : 500})
    }

}