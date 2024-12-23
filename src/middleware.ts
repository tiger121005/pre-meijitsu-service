// import { NextResponse } from 'next/server'
// import type { NextRequest } from 'next/server'

// export async function middleware(request: NextRequest) {
//     // リダイレクト処理
//     const {
//         data: { session }, error
//     } = await supabase.auth.getSession();

//     // const { data: authListener } = supabase.auth.onAuthStateChange(
//     //     (event, session) => {
//     //     }
//     // );

//     if (error) {
//         console.error("Failed to get session", error);
//     } else {
//         console.log("session status: ", session);
//     }

//     if (!session && request.url.includes("/mypage")) {
//         console.log("redirect to login  session status: ", session);
//         return NextResponse.redirect(new URL("/login", request.url));
//     }
//     if (session && (request.url.includes("/login") || request.url.includes("/register"))) {
//         return NextResponse.redirect(new URL("/", request.url));
//     }

//     return NextResponse.next();
// }

import { type NextRequest } from 'next/server'
import { updateSession } from '../utils/supabase/middleware'

export async function middleware(request: NextRequest) {
    return await updateSession(request)
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * Feel free to modify this pattern to include more paths.
         */
        '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    ],
}