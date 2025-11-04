import { Button } from "@/components/ui/button"

export default function Home() {
    return (
        <div className="flex min-h-screen items-center justify-center font-sans">
            <main className="flex min-h-screen w-full max-w-3xl flex-col items-center py-32">
                <div className="flex flex-col items-center text-center">
                    <h1 className="flex text-4xl items-center">accountabook</h1>

                    <p className="max-w-md text-lg leading-8 py-48">
                        the simplest way to keep an eye on your family's finances.
                    </p>
                    <div className="flex flex-col gap-4 text-base font-medium sm:flex-row">
                        <Button className="lg" asChild>
                            <a href="/signup">sign up</a>
                        </Button>
                        <Button className="lg" variant="outline" asChild>
                            <a href="/login">log in</a>
                        </Button>

                    </div>
                </div>
            </main>
        </div>
    );
}
