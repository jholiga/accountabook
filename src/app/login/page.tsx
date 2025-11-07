"use client"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"
import { displayError } from "@/lib/utils"
import * as React from "react"
import { useSignIn } from "@clerk/nextjs"
import { useRouter } from "next/navigation"

export default function LogIn() {
    const { isLoaded, signIn, setActive } = useSignIn()
    const [email, setEmail] = React.useState("")
    const [password, setPassword] = React.useState("")
    const [isLoading, setIsLoading] = React.useState(false)
    const router = useRouter()

    // Handle the initial submission of a new user
    async function handleSubmit() {
        if (!isLoaded) return <Spinner />

        // Start the sign-in process using the email and password provided by the user
        try {
            setIsLoading(true)
            const signInAttempt = await signIn.create({
                identifier: email,
                password,
            })

            // If sign-in process is complete, set the created session as active
            // and redirect the user
            if (signInAttempt.status === 'complete') {
                await setActive({
                    session: signInAttempt.createdSessionId,
                    navigate: async ({ session }) => {
                        if (session?.currentTask) {
                            // Check for session tasks and navigate to ui page for it.
                            // we don't use this in our current config but including incase it's needed in future
                            // see https://clerk.com/docs/guides/development/custom-flows/overview#session-tasks
                            console.log(session?.currentTask)
                            return
                        }

                        router.push("/book")
                    },
                })
            } else {
                // If the status is not complete, check why.
                // Throw error
                displayError(`sign up attempt status: ${signInAttempt.status}`)
                setIsLoading(false)
            }
        } catch (err: any) {
            // Clerk error handling docs: https://clerk.com/docs/guides/development/custom-flows/error-handling
            displayError(err.message)
            setIsLoading(false)
        }
    }

    // called when submit sign up button is clicked
    async function onSubmitSignIn(e: React.FormEvent) {
        e.preventDefault()

        if (!email) {
            displayError("you forgot an email address")
            return
        }

        if (!password) {
            displayError("you forgot a password")
            return
        }

        await handleSubmit()
    }

    return (
        <div className="flex flex-col items-center min-w-screen py-16">
            <h1 className="text-4xl">log in</h1>
            <div className="flex text-px-8 py-8">
                <Button variant="link" asChild>
                    <a href="/">&larr; home</a>
                </Button>
                <Button variant="link" asChild>
                    <a href="/signup">sign up</a>
                </Button>
            </div>
            {!isLoading && <>
                <form className="flex flex-col items-center" onSubmit={onSubmitSignIn}>
                    <div className="flex flex-col gap-4 text-base font-medium py-16 w-64">
                        <Input type="email" placeholder="email" autoFocus={true} value={email} onChange={(e) => setEmail(e.target.value)} />
                        <Input type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <Button className="w-16" >login</Button>
                </form>
            </>}
            {isLoading && <Spinner />}
        </div>
    );
}
