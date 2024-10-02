import { NextRequest, NextResponse } from "next/server";
import { authorize } from "./middleware/authorize";

export async function middleware(req: NextRequest) {

    console.log('====================================');
    console.log("session");
    console.log('====================================');
    // Call the authorize function to check permissions
    const auth = await authorize(req)

    // If the authorization fails, return the auth response
    if (!auth || auth.status !== 200) {
        return auth;
    }

    // If the user is authorized, return a 200 OK response
    return NextResponse.next(); 

}

export const config = {
    matcher: ['/', '/api/:path*'],
}