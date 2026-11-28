// Every picture used by the pages (except the home and the products), in one place.
// When a new picture is ready (see IMAGES-NEEDED.md at the project root): save it in public/ under
// the name given there, then put that path here. Until then, an existing picture stands in.

export const PAGE_IMAGES = {
    // The Momento World (/world)
    worldHero: "/Cozy_Bakery_Kitchen_with_Dessert_Cups.png", // wanted: /pages/world/hero.jpg
    worldKitchen: "/Milo_and_Marcelo_Whipped_Kitchen_Adventure.png", // wanted: /pages/world/kitchen.jpg
    worldSeasons: {
        winter: "/Cozy_Bakery_Kitchen_with_Dessert_Cups.png", // wanted: /pages/world/season-winter.jpg
        spring: null as string | null, // wanted: /pages/world/season-spring.jpg
        summer: null as string | null, // wanted: /pages/world/season-summer.jpg
        autumn: null as string | null, // wanted: /pages/world/season-autumn.jpg
    },

    // Meet Marcelo & Milo (/marcelo-and-milo)
    charactersHero: "/Back-to-Back-chf.png",
    marcelo: "/ChefCoocking.png", // wanted: /pages/characters/marcelo.jpg
    milo: "/sections/why-momento/one-moment-milo.jpg", // wanted: /pages/characters/milo.jpg
    duo: "/Milo_and_Marcelo_Whipped_Kitchen_Adventure.png",
    beginning: "/new_heroImage.jpeg",

    // Our Story (/our-story)
    storyHero: "/new_heroImage.jpeg", // wanted: /pages/story/hero.jpg
    storyBegan: "/Milo_and_Marcelo_Whipped_Kitchen_Adventure.png", // wanted: /pages/story/idea.jpg
    storyIdea: "/sections/why-momento/one-moment-milo.jpg", // wanted: /pages/story/moment.jpg

    // Become a Partner (/become-a-partner)
    partnerHero: "/handshake.png",
    partnerWhy: "/partners_display.png",
    partnerDelivery: "/The_delivery.png",
    franchiseConcept: "/guests_moment.png", // wanted: /pages/partner/franchise-shop.jpg

    // Our Creations (/creations)
    whyPot: "/sections/why-momento/layers-pots.jpg",

    // Contact (/contact)
    contact: "/sections/why-momento/homemade-marcelo.jpg", // wanted: /pages/contact/letter.jpg

    // 404
    notFound: "/Milo_and_Marcelo_Whipped_Kitchen_Adventure.png", // wanted: /pages/404/confused.jpg

    // Small round portraits next to the "Marcelo & Milo say" quote on each product page
    portraitMarcelo: "/sections/why-momento/homemade-marcelo.jpg", // wanted: /pages/characters/marcelo-portrait.jpg
    portraitMilo: "/sections/why-momento/one-moment-milo.jpg", // wanted: /pages/characters/milo-portrait.jpg
};
