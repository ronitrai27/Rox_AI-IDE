"use client";

import { UnAuthView } from "@/features/auth/UnAuthView";
import { ClerkProvider, SignInButton, SignUpButton, useAuth, UserButton } from "@clerk/nextjs";
import { Authenticated, AuthLoading, ConvexReactClient, Unauthenticated } from "convex/react";
import { ConvexProviderWithClerk } from "convex/react-clerk";

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export const Providers = ({ children }: { children: React.ReactNode }) => {
    return (
        <ClerkProvider>
            <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
                {/* wrapped children withinn CLERK authenticated component */}
                <Authenticated>
                    {/* <UserButton /> */}
                    {children}
                </Authenticated>
                {/* if not authenticated, show not authenticated */}
                <Unauthenticated>
                    {/* <SignInButton />
                    <SignUpButton /> */}
                    <UnAuthView />
                    <AuthLoading>
                        loading.....
                    </AuthLoading>
                </Unauthenticated>
            </ConvexProviderWithClerk>
        </ClerkProvider>
    )
}