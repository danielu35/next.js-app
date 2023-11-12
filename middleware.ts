export { default } from "next-auth/middleware";

export const config = {
    // *: zero of more params
    // +: one of more params
    // ?: zero or one params
    matcher: ['/users/:id*', '/admin', '/products']
}