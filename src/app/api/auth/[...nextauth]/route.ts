<<<<<<< HEAD
import { authOptions } from "@/libs/auth";
import NextAuth from "next-auth/next";

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST };
=======
import { authOptions } from "@/libs/auth"
import NextAuth from "next-auth"

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
>>>>>>> f7e1f16 (Remove secret key)
