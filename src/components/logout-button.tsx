"use client"

import { useClerk } from "@clerk/nextjs"
import { Button } from "@/components/ui/button"

export const LogoutButton = () => {
    const { signOut } = useClerk()

    return (
        // Clicking this button signs out a user and redirects them to the home page "/"

        <Button variant="link" className="p-4" onClick={() => signOut({ redirectUrl: "/" })}>
            log out
        </Button>
    )
}
