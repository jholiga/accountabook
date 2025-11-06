import type { Metadata } from "next";
import { TASA_Orbiter, Google_Sans_Code } from "next/font/google";
import { ClerkProvider, SignedIn, UserButton, } from "@clerk/nextjs"
import { Toaster } from "@/components/ui/sonner"
import "./globals.css";

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
            <html lang="en">
                <body
                    className={`${tasaOrbiter.variable} ${googleSansCode.variable} antialiased dark`}
                >
                    <div className="absolute top-0 right-0">
                        <SignedIn>
                            <UserButton />
                        </SignedIn>
                    </div>
                    <div className="flex min-h-screen items-center justify-center font-sans">
                        <main className="flex min-h-screen w-full max-w-3xl flex-col items-center py-32">
                            <div className="flex flex-col items-center text-center">
                                {children}
                            </div>
                        </main>
                    </div>
                    <Toaster />
                </body>
            </html>
        </ClerkProvider>
    );
}
