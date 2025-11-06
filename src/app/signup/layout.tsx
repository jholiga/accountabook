import { Button } from "@/components/ui/button"

export default function SignUpLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="flex min-h-screen items-center justify-center font-sans">
            <main className="flex min-h-screen w-full max-w-3xl flex-col items-center py-32">
                <div className="flex flex-col items-center text-center">
                    <h1 className="flex text-4xl items-center">sign up</h1>
                    <div className="flex text-px-8 py-8">
                        <Button variant="link" asChild>
                            <a href="/">&larr; home</a>
                        </Button>
                        <Button variant="link" asChild>
                            <a href="/login">log in</a>
                        </Button>
                    </div>
                    {children}
                </div>
            </main>
        </div>
    );
}
