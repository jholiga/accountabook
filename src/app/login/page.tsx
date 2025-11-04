import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function LogIn() {
    return (
        <div className="flex min-h-screen items-center justify-center font-sans">
            <main className="flex min-h-screen w-full max-w-3xl flex-col items-center py-32">
                <div className="flex flex-col items-center text-center">
                    <h1 className="flex text-4xl items-center">log in</h1>
                    <div className="flex text-px-8 py-8">
                        <Button variant="link" asChild>
                            <a href="/">&larr; home</a>
                        </Button>
                    </div>
                    <div className="flex flex-col gap-4 text-base font-medium py-16 w-64">
                        <Input type="email" placeholder="email" />
                        <Input type="password" placeholder="password" />
                    </div>
                    <div className="flex flex-col">
                        <Button>login</Button>
                    </div>
                </div>
            </main>
        </div>
    );
}
