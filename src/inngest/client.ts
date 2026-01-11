import { Inngest } from "inngest";
import { sentryMiddleware } from "@inngest/middleware-sentry";

export const inngest = new Inngest({
    id: "rox-ide",
    middleware: [sentryMiddleware()]
})