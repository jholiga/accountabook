import { SignedIn } from "@clerk/nextjs"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { LogoutButton } from "@/components/logout-button";

export default function BookLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="p-8">
            {children}
            <SignedIn>
                <div className="absolute top-0 right-0">
                    <SidebarTrigger />
                    <LogoutButton />
                </div>
            </SignedIn>
        </div>
    )
}
