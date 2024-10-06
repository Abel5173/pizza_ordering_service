import { getSession } from "next-auth/react";

export async function getClientSession(){
    const session = await getSession();

    return session;
}