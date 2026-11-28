// The site's languages, in the order the switcher shows them.
// `name` is the language written in itself (the same in every version of the site),
// so a visitor always recognises their own language.

export const LANGUAGES = [
    { code: "fr", name: "Français" },
    { code: "en", name: "English" },
    { code: "nl", name: "Nederlands" },
    { code: "de", name: "Deutsch" },
] as const;
