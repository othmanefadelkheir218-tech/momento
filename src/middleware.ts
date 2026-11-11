import createMiddleware from 'next-intl/middleware';
import { NextResponse, type NextRequest } from 'next/server';
import { routing } from './i18n/routing';
import { COMING_SOON } from './lib/comingSoon';

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
    if (COMING_SOON) {
        const segments = request.nextUrl.pathname.split('/').filter(Boolean);
        const [first, ...rest] = segments;
        const isLocale = (routing.locales as readonly string[]).includes(first ?? '');

        // Allow only "/" and "/{locale}" — everything else goes to the coming soon page.
        const isAllowed = segments.length === 0 || (isLocale && rest.length === 0);
        if (!isAllowed) {
            const locale = isLocale ? first : routing.defaultLocale;
            const url = request.nextUrl.clone();
            url.pathname = `/${locale}`;
            url.search = '';
            return NextResponse.redirect(url, 307);
        }
    }

    return intlMiddleware(request);
}

export const config = {
    // Match all pathnames except for internal paths
    matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
};
