import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
    // A list of all locales that are supported
    locales: ['en', 'fr', 'de'],

    // Used when no locale matches
    defaultLocale: 'fr',

    // Disable automatic locale detection from browser
    localeDetection: false
});
