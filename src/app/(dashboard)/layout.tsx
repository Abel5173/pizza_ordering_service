import { authOptions } from "@/libs/auth";
import { defineAbilityFor } from "@/libs/abilities";
import { getServerSession } from "next-auth";
import React from "react";
import { permission } from "process";
import { redirect, useRouter } from "next/navigation";

export default function RootLayout ({
    children
}: Readonly<{
    children: React.ReactNode;
}>) {


    return (
        <>
            {children}
        </>
    )
}

