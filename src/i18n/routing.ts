import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
    // A list of all locales that are supported
    locales: ['nl', 'fr', 'de', 'en'],

    // Used when no locale matches
    defaultLocale: 'nl',

    // Disable automatic locale detection from browser
    localeDetection: false
});
