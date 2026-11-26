
import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
    pages: {
        signIn: '/login',
    },
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user;
            const pathname = nextUrl.pathname;

            const isProtected =
                pathname === '/create' ||
                pathname === '/projects/create' ||
                (
                    pathname.startsWith('/projects/') &&
                    pathname.endsWith('/edit')
                );

            if (isProtected) {
                return isLoggedIn;
            }

            if (isLoggedIn && pathname === '/login') {
                return Response.redirect(
                    new URL('/', nextUrl)
                );
            }

            return true;
        },
    },
    providers: [],
} satisfies NextAuthConfig;
