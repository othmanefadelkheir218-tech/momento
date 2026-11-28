/**
 * Turn the allergen sentence from the translations into a clean list.
 *   "Contient : lait, soja, pistache."  -> ["Lait", "Soja", "Pistache"]
 *   "Œuf, gluten, noisettes."           -> ["Œuf", "Gluten", "Noisettes"]
 * Works for every language: drops anything before a ":" ("Contains:",
 * "Enthält:", "Bevat:") and the trailing period, without touching the data.
 */
export function parseAllergens(text: string | undefined): string[] {
    if (!text) return []
    const body = text.includes(":") ? text.slice(text.indexOf(":") + 1) : text
    return body
        .split(",")
        .map((item) => item.trim().replace(/\.+$/, "").trim())
        .filter(Boolean)
        .map((item) => item.charAt(0).toUpperCase() + item.slice(1))
}

/** "1284 kj / 307 kcal" -> "1284 kJ / 307 kcal" */
export const formatNutritionValue = (value: string) => value.replace(/\bkj\b/gi, "kJ")
