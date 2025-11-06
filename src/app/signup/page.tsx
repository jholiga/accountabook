"use client"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp"
import { useSignUp } from "@clerk/nextjs"
import * as React from "react"
import { displayError } from "@/lib/utils"
import { useRouter } from "next/navigation"

export default function SignUp() {
    // Clerk user sign up flow 
    const { isLoaded, signUp, setActive } = useSignUp()
    const [emailAddress, setEmailAddress] = React.useState("")
    const [password, setPassword] = React.useState("")
    const [confirmPassword, setConfirmPassword] = React.useState("")
    const [isVerifying, setIsVerifying] = React.useState(false)
    const [code, setCode] = React.useState("")
    const [isCodeWrong, setIsCodeWrong] = React.useState(false)
    const [isLoading, setIsLoading] = React.useState(false)
    const router = useRouter()

    // Handle the initial submission of a new user
    async function handleSubmit() {
        console.log('handling submit')
        if (!isLoaded) return <Spinner />

        // Start the sign-up process using the email and password provided by the user
        try {
            if (password !== confirmPassword) {
                throw new Error("Password must match the confirmation")
            }

            setIsLoading(true)
            await signUp.create({
                emailAddress,
                password,
            })

            // Send the user the email to verify password
            await signUp.prepareEmailAddressVerification({
                strategy: "email_code"
            })

            // Set "isVerifying" to true to display the second form
            // and capture the OTP code
            setIsVerifying(true)
            setIsLoading(false)
        } catch (err: any) {
            // Clerk error handling docs: https://clerk.com/docs/guides/development/custom-flows/error-handling
            displayError(err.message)
            setIsLoading(false)
        }
    }

    // Handle the verify part of a new user
    async function handleVerify() {
        if (!isLoaded) return <Spinner />

        try {
            setIsLoading(true)
            // Use the code that the user provided to attempt initial verification
            const signUpAttempt = await signUp.attemptEmailAddressVerification({
                code,
            })

            // If verification was completed, set the session to active,
            // redirect the user
            if (signUpAttempt.status === 'complete') {
                await setActive({
                    session: signUpAttempt.createdSessionId,
                    navigate: async ({ session }) => {
                        if (session?.currentTask) {
                            // Check for session tasks and navigate to ui page for it.
                            // this is a failsafe for our current config and we shouldn't ever hit this.
                            // see https://clerk.com/docs/guides/development/custom-flows/overview#session-tasks
                            router.push("/signup/tasks")
                            return
                        }

                        router.push("/")
                    },
                })
            } else {
                // If the status is not complete, check why.
                // Throw error
                displayError(`sign up attempt status: ${signUpAttempt.status}`)
                setIsCodeWrong(true)
                setIsLoading(false)
            }
        } catch (err: any) {
            displayError("issue confirming your email. try again later.")
            setIsCodeWrong(true)
            setIsLoading(false)
        }
    }

    // called when submit sign up button is clicked
    async function onSubmitSignUp(e: React.FormEvent) {
        e.preventDefault()

        if (password !== confirmPassword) {
            displayError("your passwords don't match")
            return
        }

        if (!emailAddress) {
            displayError("you forgot an email address")
            return
        }

        if (!password || !confirmPassword) {
            displayError("you forgot a password")
            return
        }

        await handleSubmit()
    }

    // called on each keypress of OTP
    React.useEffect(() => {
        if (code.length > 5) {
            handleVerify()
        }
        else {
            setIsCodeWrong(false)
        }
    }, [code])

    if (isVerifying) {
        return (
            <div className="flex flex-col items-center">
                <h2 className="text-2xl pb-8" >
                    we emailed you a code.
                </h2>
                <h3 className="text-xl pb-4">
                    enter it here to confirm your email.
                </h3>
                <div className={`max-h-16 ${isCodeWrong ? "outline-2 outline-offset-2 outline-red-500/75" : ""} rounded-md flex flex-col`}>
                    <InputOTP
                        maxLength={6}
                        value={code}
                        onChange={(code) => setCode(code)}>
                        <InputOTPGroup>
                            <InputOTPSlot index={0} />
                            <InputOTPSlot index={1} />
                            <InputOTPSlot index={2} />
                            <InputOTPSlot index={3} />
                            <InputOTPSlot index={4} />
                            <InputOTPSlot index={5} />
                        </InputOTPGroup>
                    </InputOTP>
                </div>
                <p className={`${isCodeWrong ? "" : "hidden"} pt-4 text-xs text-red-500/75`}>
                    the code you entered is wrong. please try again some other time :(.
                </p>
            </div >
        )
    }

    return (
        <div>
            {isLoading && <Spinner />}
            {!isLoading && (
                <><div className="flex flex-col content-center items-center justify-center">
                    <form className="flex flex-col items-center" onSubmit={onSubmitSignUp}>
                        <div className="flex flex-col gap-4 text-base font-medium py-16 w-64">
                            <Input value={emailAddress} onChange={(e) => setEmailAddress(e.target.value)} type="email" placeholder="email" />
                            <Input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="password" />
                            <Input value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} type="password" placeholder="confirm password" />
                        </div>
                        <Button className="w-16" type="submit">
                            sign up
                        </Button>
                    </form>
                </div>
                </>
            )}
            <div id="clerk-captcha" />
        </div>
    );
}
