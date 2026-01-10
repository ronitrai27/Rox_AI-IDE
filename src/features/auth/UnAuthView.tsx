"use client";

import { Button } from "@/components/ui/button";
import { Item, ItemActions, ItemContent, ItemDescription, ItemMedia, ItemTitle } from "@/components/ui/item";
import { SignInButton } from "@clerk/nextjs";
import { LogInIcon } from "lucide-react";

export const UnAuthView = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen w-full
         bg-background p-4">
            <div className="w-full max-w-lg bg-muted">
                <Item variant="outline">
                    < ItemMedia variant="icon">
                        <LogInIcon className="size-4" />
                    </ItemMedia>

                    <ItemContent>
                        <ItemTitle>Unauthorized access</ItemTitle>
                        <ItemDescription>You are not authorized to access this page. Please sign in to continue.</ItemDescription>
                    </ItemContent>

                    <ItemActions>
                        <SignInButton>
                            <Button variant="outline">Sign in</Button>
                        </SignInButton>
                    </ItemActions>
                </Item>
            </div>
        </div>
    )
}