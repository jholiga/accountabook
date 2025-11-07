import type { Metadata } from "next";
import { TASA_Orbiter, Google_Sans_Code } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs"
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
    title: "havenbook",
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
                    className={`${tasaOrbiter.variable} ${googleSansCode.variable} font-sans antialiased dark`}
                >
                    <main>
                        <div className="flex">
                            <div className="items-center">
                                {children}
                            </div>
                        </div>
                    </main>
                    <Toaster />
                </body>
            </html>
        </ClerkProvider >
    );
}
