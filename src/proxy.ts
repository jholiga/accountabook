import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

const isProtectedRoute = createRouteMatcher(['/book(.*)'])
const isLogInOrSignIn = createRouteMatcher(['/login', '/signup'])

export default clerkMiddleware(async (auth, req) => {
    const { isAuthenticated, redirectToSignIn } = await auth()

    // redirect unauthenticated user trying to access protected route to sign in
    if (!isAuthenticated && isProtectedRoute(req)) {
        return redirectToSignIn()
    }

    // redirect authenticated user trying to access sign in/sign up to book
    if (isAuthenticated && isLogInOrSignIn(req)) {
        return NextResponse.redirect(new URL('/book', req.url))
    }
})

export const config = {
    matcher: [
        // Skip Next.js internals and all static files, unless found in search params
        '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
        // Always run for API routes
        '/(api|trpc)(.*)',
    ],
}
