import { Button } from "@/components/ui/button"
import { auth } from "@clerk/nextjs/server"

export default async function Home() {
    const { isAuthenticated } = await auth()

    return (
        <>
            <h1 className="flex text-4xl items-center">accountabook</h1>
            <p className="max-w-md text-lg leading-8 py-48">
                the simplest way to keep an eye on your family's finances.
            </p>
            {!isAuthenticated && (<>
                <div className="flex flex-col gap-4 text-base font-medium sm:flex-row">
                    <Button className="lg" asChild>
                        <a href="/signup">sign up</a>
                    </Button>
                    <Button className="lg" variant="outline" asChild>
                        <a href="/login">log in</a>
                    </Button>

                </div>
            </>)}
            {isAuthenticated && (<>

                <Button className="lg" asChild>
                    <a href="/book">go to the book</a>
                </Button>
            </>)}
        </>
    );
}
