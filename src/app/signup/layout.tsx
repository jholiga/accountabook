import { Button } from "@/components/ui/button"

export default function SignUpLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="flex flex-col items-center text-center">
            <h1 className="text-4xl">sign up</h1>
            <div className="py-8">
                <Button variant="link" asChild>
                    <a href="/">&larr; home</a>
                </Button>
                <Button variant="link" asChild>
                    <a href="/login">log in</a>
                </Button>
            </div>
            {children}
        </div>
    );
}
