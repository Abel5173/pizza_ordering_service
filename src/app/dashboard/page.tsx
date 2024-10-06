import { authOptions } from "@/libs/auth";
import { defineAbilityFor } from "@/libs/abilities";
import { getServerSession } from "next-auth";
import React from "react";
import { useRouter } from "next/navigation";
import { Box } from "@mui/material";

export default async function page ({
    children
}: Readonly<{
    children: React.ReactNode;
}>) {
    const router = useRouter()
    const session = await getServerSession(authOptions)
    const user = session?.user as { id: string; name: string; role: string; phone: string; permissions?: string[] }
    const permissions = user?.permissions || []

    const ability = defineAbilityFor(null, user.id)
    if((await ability).can('manage', 'all')) {
        router.push('/admin')
    }

    return (
        <>
            <Box>
                <p>Kasu</p>
            </Box>
        </>
    )

}