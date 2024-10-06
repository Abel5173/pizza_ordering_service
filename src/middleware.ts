import { NextRequest, NextResponse } from "next/server";
import { authorize } from "./middleware/authorize";

export async function middleware(req: NextRequest) {

<<<<<<< HEAD
    console.log('====================================');
    console.log("session");
    console.log('====================================');
=======
    console.log("Middleware called");
>>>>>>> f7e1f16 (Remove secret key)
    // Call the authorize function to check permissions
    const auth = await authorize(req)

    // If the authorization fails, return the auth response
<<<<<<< HEAD
    if (!auth || auth.status !== 200) {
        return auth;
    }
=======
    // if (!auth || auth.status !== 200) {
    //     return auth;
    // }
>>>>>>> f7e1f16 (Remove secret key)

    // If the user is authorized, return a 200 OK response
    return NextResponse.next(); 

}

export const config = {
    matcher: ['/', '/api/:path*'],
}