"use client";

import { ConvexProvider, ConvexReactClient } from "convex/react";
import { ReactNode } from "react";

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export function ConvexClientProvider({ children }: { children: ReactNode }) {
    return <ConvexProvider client={convex}>{children}</ConvexProvider>;
}

// CLERK AND CONVEX PROVIDER
// "use client";

// import { useAuth } from "@clerk/nextjs";
// import { ConvexProvider, ConvexReactClient } from "convex/react";
// import { ConvexProviderWithClerk } from "convex/react-clerk";
// import { ReactNode } from "react";

// const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

// export function ConvexClientProvider({ children }: { children: ReactNode }) {
//     return (
//         <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
//             {children}
//         </ConvexProviderWithClerk>
//     );
// }
