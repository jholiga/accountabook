import type { Metadata } from "next";
import { TASA_Orbiter, Google_Sans_Code } from "next/font/google";
import { ClerkProvider, SignedIn, UserButton, } from "@clerk/nextjs"
import { Toaster } from "@/components/ui/sonner"
import { LogoutButton } from "@/components/logout-button";
import { SidebarTrigger, SidebarProvider } from "@/components/ui/sidebar"
import "./globals.css";
import { AppSidebar } from "@/components/app-sidebar";

const tasaOrbiter = TASA_Orbiter({
    variable: "--font-tasa-orbiter",
    subsets: ["latin"],
});

const googleSansCode = Google_Sans_Code({
    variable: "--font-google-sans-code",
    subsets: ["latin"],
});


export const metadata: Metadata = {
    title: "accountabook",
    description: "simple personal finances",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <ClerkProvider>
            <SidebarProvider>
                <html lang="en">
                    <body
                        className={`${tasaOrbiter.variable} ${googleSansCode.variable} antialiased dark`}
                    >
                        <SignedIn>
                            <AppSidebar />
                        </SignedIn>
                        <main className="min-w-screen">
                            <div className="flex">
                                <div className="items-center p-16 min-w-screen">
                                    {children}
                                </div>
                            </div>
                        </main>
                        <Toaster />
                    </body>
                </html>
            </SidebarProvider>
        </ClerkProvider>
    );
}
