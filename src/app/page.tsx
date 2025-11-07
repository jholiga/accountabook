import { Button } from "@/components/ui/button"
import { auth } from "@clerk/nextjs/server"

export default async function Home() {
    const { isAuthenticated } = await auth()

    return (
        <div className="min-w-screen py-16 content-center items-center text-center">
            <h1 className="text-4xl items-center">havenbook</h1>
            <p className="text-lg py-48">
                the simplest way to keep an eye on your family's finances.
            </p>
            {!isAuthenticated && (<>
                <div className="flex flex-col gap-4 text-base font-medium items-center">
                    <div className="space-x-4">
                        <Button className="lg" asChild>
                            <a href="/signup">sign up</a>
                        </Button>
                        <Button className="lg" variant="outline" asChild>
                            <a href="/login">log in</a>
                        </Button>
                    </div>
                </div>
            </>)}
            {isAuthenticated && (<>
                <Button className="lg" asChild>
                    <a href="/book">go to the book</a>
                </Button>
            </>)}
        </div>
    );
}
