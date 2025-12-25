export interface ProductInterface {
    id: number;
    name: string;
    weight: string;
    price: string;
    image: string;
    isNew: boolean;
}

export const ProductData = (): ProductInterface[] => {
    return [
        {
            id: 1,
            name: "Raspberry Cheesecake",
            weight: "80г",
            price: "140 UAH.",
            image: "/images/prod1.png",
            isNew: true,
        },
        {
            id: 2,
            name: "Speculoos Tiramisu",
            weight: "75г",
            price: "140 UAH.",
            image: "/images/prod2.png",
            isNew: true,
        },
        {
            id: 3,
            name: "Salted Caramel",
            weight: "80г",
            price: "140 UAH.",
            image: "/images/prod3.png",
            isNew: true,
        },
        {
            id: 4,
            name: "Red Velvet Tiramisu",
            weight: "75г",
            price: "140 UAH.",
            image: "/images/prod4.png",
            isNew: true,
        },
        {
            id: 5,
            name: "Lemon Cheesecake",
            weight: "80г",
            price: "140 UAH.",
            image: "/images/prod5.png",
            isNew: false,
        },
        {
            id: 6,
            name: "Classic Tiramisu",
            weight: "75г",
            price: "140 UAH.",
            image: "/images/prod6.png",
            isNew: false,
        },
        {
            id: 7,
            name: "Snickers Tiramisu",
            weight: "80г",
            price: "140 UAH.",
            image: "/images/prod7.png",
            isNew: false,
        },
        {
            id: 8,
            name: "Pistachio Cream",
            weight: "75г",
            price: "140 UAH.",
            image: "/images/prod8.png",
            isNew: false,
        },
        // continue to 18 plese 
        {
            id: 9,
            name: "Snickers Tiramisu",
            weight: "80г",
            price: "140 UAH.",
            image: "/images/prod9.png",
            isNew: true,
        },
        {
            id: 10,
            name: "Madagascar Vanilla",
            weight: "80г",
            price: "140 UAH.",
            image: "/images/prod10.png",
            isNew: true,
        },
        {
            id: 11,
            name: "Kinder Bueno",
            weight: "80г",
            price: "140 UAH.",
            image: "/images/prod11.png",
            isNew: true,
        },
        {
            id: 12,
            name: "Mango cheescake",
            weight: "80г",
            price: "140 UAH.",
            image: "/images/prod12.png",
            isNew: true,
        },
        {
            id: 13,
            name: "Chocolate Mousse",
            weight: "80г",
            price: "140 UAH.",
            image: "/images/prod13.png",
            isNew: true,
        },
        {
            id: 14,
            name: "Oreo Crumble",
            weight: "80г",
            price: "140 UAH.",
            image: "/images/prod14.png",
            isNew: true,
        },
        {
            id: 15,
            name: "Cheescake Citron",
            weight: "80г",
            price: "140 UAH.",
            image: "/images/prod15.png",
            isNew: true,
        },
        {
            id: 16,
            name: "Chocolate Blance Spéculoos.",
            weight: "80г",
            price: "140 UAH.",
            image: "/images/prod16.png",
            isNew: true,
        },
        {
            id: 17,
            name: "Supreme Chocolate & Brownie",
            weight: "80г",
            price: "140 UAH.",
            image: "/images/prod17.png",
            isNew: true,
        },
    ]
}



// 1. Interface for the nested nutritional values
export interface NutritionalValues {
    energy: string;        // e.g., "1284 kj / 307 kcal"
    fat: string;           // e.g., "17.9 g"
    saturated_fat: string; // e.g., "11.1 g"
    carbohydrates: string; // e.g., "32.2 g"
    sugars: string;        // e.g., "29.1 g"
    fiber: string;         // e.g., "4.1 g" or ""
    protein: string;       // e.g., "4.3 g"
    salt: string;          // e.g., "0.35 g" or ""

}

// 2. Main Product Interface
export interface DessertInterface {
    id: number;
    name: string;
    category: string;
    weight: string;        // e.g., "125g" or ""
    description: string;
    allergens: string;
    nutritional_values: NutritionalValues;
    storage_conditions: string[];
    main_image: string;
    other_images: string[];
    isNew: boolean;
}



export const DessertData = (): DessertInterface[] => {
    return [
        {
            id: 1,
            "name": "Dubai Chocolat Snack Bar",
            "category": "Dubai Chocolat",
            "weight": "",
            "isNew": true,
            "description": "Ingrediënt chocolade 41% [suiker, cacaoboter, MELKpoeder (LACTOSE), cacaomassa, gekarameliseerde glucosestroop, emulgator: E322 SOJA, aroma (vanille)], PISTACHENOTEN 36% , witte chocolade 12% [suiker, cacaoboter, MELKpoeder (LACTOSE), emulgator: E322 SOJA, vanilline], kunefe 7% [water, roux [TARWEmeel (GLUTEN), palmvet], TARWEbloem (GLUTEN), zout [zout, antiklontermiddel: E535, E504]], WALNOTENolie 3% , aroma [aromapreparaat, water, draagstof: E1520, E422, karamelsuikerstroop, verstevigingsmiddel: E415, zuurteregelaar: E330, conserveermiddel: E202], margarine [plantaardige olie en vet (palm, koolzaad), water, zout, emulgator: E322, E471, conserveermiddel: E202, suiker, voedingszuur: E330, aroma, vitamine: A D3, kleurstof: E160a]",
            "allergens": "",
            "nutritional_values": {
                "energy": "1284 kj / 307 kcal",
                "fat": "17.9 g",
                "saturated_fat": "11.1 g",
                "carbohydrates": "32.2 g",
                "sugars": "29.1 g",
                "fiber": "",
                "protein": "4.3 g",
                "salt": "0.35 g"
            },
            "storage_conditions": [],
            "main_image": "/product_images/Dubai_Chocolat_Snack_Bar_1.png",
            "other_images": [
                "/product_images/Dubai_Chocolat_Snack_Bar_2.png",
                "/product_images/Dubai_Chocolat_Snack_Bar_3.png",
                "/product_images/Dubai_Chocolat_Snack_Bar_4.png",
                "/product_images/Dubai_Chocolat_Snack_Bar_5.png"
            ]
        },
        {
            id: 2,
            "name": "Dubai Chocolat Snack tablet",
            "category": "Dubai Chocolat",
            "weight": "",
            "isNew": true,
            "description": "Ingrediënt chocolade 41% [suiker, cacaoboter, MELKpoeder (LACTOSE), cacaomassa, gekarameliseerde glucosestroop, emulgator: E322 SOJA, aroma (vanille)], PISTACHENOTEN 36% , witte chocolade 12% [suiker, cacaoboter, MELKpoeder (LACTOSE), emulgator: E322 SOJA, vanilline], kunefe 7% [water, roux [TARWEmeel (GLUTEN), palmvet], TARWEbloem (GLUTEN), zout [zout, antiklontermiddel: E535, E504]], WALNOTENolie 3% , aroma [aromapreparaat, water, draagstof: E1520, E422, karamelsuikerstroop, verstevigingsmiddel: E415, zuurteregelaar: E330, conserveermiddel: E202], margarine [plantaardige olie en vet (palm, koolzaad), water, zout, emulgator: E322, E471, conserveermiddel: E202, suiker, voedingszuur: E330, aroma, vitamine: A D3, kleurstof: E160a]",
            "allergens": "",
            "nutritional_values": {
                "energy": "2302 kj / 551 kcal",
                "fat": "39.5 g",
                "saturated_fat": "14.2 g",
                "carbohydrates": "37.7 g",
                "sugars": "30.3 g",
                "fiber": "4.1 g",
                "protein": "11.6 g",
                "salt": ""
            },
            "storage_conditions": [],
            "main_image": "/product_images/Dubai_Chocolat_Snack_tablet_1.png",
            "other_images": [
                "/product_images/Dubai_Chocolat_Snack_tablet_2.png",
                "/product_images/Dubai_Chocolat_Snack_tablet_3.png",
                "/product_images/Dubai_Chocolat_Snack_tablet_4.png",
                "/product_images/Dubai_Chocolat_Snack_tablet_5.png"
            ]
        },
        {
            id: 3,
            "name": "Citron",
            "category": "Gamme Glace",
            "weight": "125g",
            "isNew": true,
            "description": "Un fond de biscuit croquant, une crème au goût unique, agrémentée d’un délicieux coulis de mangue.",
            "allergens": "MELK, suiker, BOTER, YOGHURT (3%), ROOM, WEIpoeder, dextrose, sprits (1%) [TARWEbloem, plantaardige vetten (palm, zonnebloem), suiker, zetmeel (TARWE), zout, rijsmiddel (E503i), aroma, EIpoeder], MELKeiwitten, glucosestroop, plantaardige olie (kokos), maltodextrine, citroensappoeder, citrusvezel, stabilisatoren (E466, E401, E406, E412, E415), emulgatoren (E471, E472b, E477), voedingszuren (E331, E330), kleurstof (E160a), zout, aroma's, SOJAbloem, vanille-extract",
            "nutritional_values": {
                "energy": "956 kj / 228 kcal",
                "fat": "9.2 g",
                "saturated_fat": "6.4 g",
                "carbohydrates": "31.6 g",
                "sugars": "26.4 g",
                "fiber": "",
                "protein": "4.5 g",
                "salt": ""
            },
            "storage_conditions": [],
            "main_image": "/product_images/Citron_1.png",
            "other_images": [
                "/product_images/Citron_2.png",
                "/product_images/Citron_3.png",
                "/product_images/Citron_4.png",
                "/product_images/Citron_5.png"
            ]
        },
        {
            id: 4,
            "name": "Madagascar Vanilla",
            "category": "Gamme Glace",
            "weight": "125g",
            "isNew": true,
            "description": "Un fond de biscuit croquant, une crème au goût unique, agrémentée d’un délicieux coulis de mangue.",
            "allergens": "MELK, suiker, cacaokoekjes (8%) [TARWEbloem, suiker, plantaardige olieën en vetten (kokos, palm), cacaopoeder, glucosestroop, rijsmiddelen (E500ii, E503ii), zout, zuurteregelaar (E524)], BOTER, ROOM, WEIpoeder, dextrose, MELKeiwitten, plantaardige oliën (zonnebloem, palm), cacaopoeder, MELKpoeder, LACTOSE, stabilisatoren (E466, E401, E406), emulgatoren (E471, E322 (SOJA)), voedingszuren (E331, E330), kleurstof (E160a), zout, aroma's, vanille-extract",
            "nutritional_values": {
                "energy": "1072 kj / 256 kcal",
                "fat": "11.3 g",
                "saturated_fat": "7.3 g",
                "carbohydrates": "30.4 g",
                "sugars": "29.1 g",
                "fiber": "",
                "protein": "4.1 g",
                "salt": "0.32 g"
            },
            "storage_conditions": [],
            "main_image": "/product_images/Madagascar_Vanilla_1.png",
            "other_images": [
                "/product_images/Madagascar_Vanilla_2.png",
                "/product_images/Madagascar_Vanilla_3.png",
                "/product_images/Madagascar_Vanilla_4.png",
                "/product_images/Madagascar_Vanilla_5.png"
            ]
        },
        {
            id: 5,
            "name": "Spéculoos",
            "category": "Gamme Glace",
            "isNew": true,
            "weight": "125g",
            "description": "Un fond de biscuit croquant, une crème au goût unique, agrémentée d’un délicieux coulis de mangue.",
            "allergens": "MELK, suiker, speculoos (10%) [TARWEbloem, kandijsuiker, plantaardige oliën en vetten (palm, koolzaad), rietsuiker, SOJAbloem, invertsuikerstroop, rijsmiddel (E500ii), kaneel, nootmuskaat], BOTER, witte chocolade (4%) [suiker, cacaoboter, MELKpoeder], ROOM, WEIpoeder, dextrose, MELKeiwitten, plantaardige oliën (soja, kokos), MELKpoeder, stabilisatoren (E466, E401, E406), emulgatoren (E471, E322 (SOJA)), voedingszuren (E331, E330), kleurstof (E160a), zout, aroma's, vanille-extract",
            "nutritional_values": {
                "energy": "1284 kj / 307 kcal",
                "fat": "17.9 g",
                "saturated_fat": "11.1 g",
                "carbohydrates": "32.2 g",
                "sugars": "29.1 g",
                "fiber": "",
                "protein": "4.3 g",
                "salt": "0.35 g"
            },
            "storage_conditions": [],
            "main_image": "/product_images/Speculoos_1.png",
            "other_images": [
                "/product_images/Speculoos_2.png",
                "/product_images/Speculoos_3.png",
                "/product_images/Speculoos_4.png",
                "/product_images/Speculoos_5.png"
            ]
        },
        {
            id: 6,
            "name": "Supreme Chocolate & Brownie",
            "category": "Gamme Glace",
            "weight": "125g",
            "description": "Un fond de biscuit croquant, une crème au goût unique, agrémentée d’un délicieux coulis de mangue.",
            "isNew": true,
            "allergens": "MELK, suiker, BOTER, ROOM, WEIpoeder, dextrose, cacaopoeder, brownie (3%), [plantaardige oliën en vetten (palm, koolzaad, zonnebloem), suiker, chocolade (suiker, cacaomassa, cacaoboter, emulgator (E322 (SOJA)), aroma), EI, TARWEbloem, glucosestroop, stabilisator (E422), magere cacaopoeder, geconcentreerde BOTER, glucose-fructosestroop, maïsbloem, zout, rijsmiddel (E500ii), conserveermiddel (E202), aroma's, emulgatoren (E322, E471)], MELKeiwitten, plantaardige oliën (zonnebloem, palm), MELKpoeder, LACTOSE, stabilisatoren (E466, E401, E406), emulgatoren (E471, E322 (SOJA)), voedingszuren (E331, E330), kleurstof (E160a), zout, aroma's, vanille-extract",
            "nutritional_values": {
                "energy": "940kj / 225 kcal",
                "fat": "11.5 g",
                "saturated_fat": "6.8 g",
                "carbohydrates": "25.2 g",
                "sugars": "24.3 g",
                "fiber": "",
                "protein": "4.6 g",
                "salt": ""
            },
            "storage_conditions": [],
            "main_image": "/product_images/Supreme_Chocolate_&_Brownie_1.png",
            "other_images": [
                "/product_images/Supreme_Chocolate_&_Brownie_2.png",
                "/product_images/Supreme_Chocolate_&_Brownie_3.png",
                "/product_images/Supreme_Chocolate_&_Brownie_4.png",
                "/product_images/Supreme_Chocolate_&_Brownie_5.png"
            ]
        },
        {
            id: 7,
            "name": "Tiramisu",
            "category": "Gamme Glace",
            "weight": "125g",
            "description": "Un fond de biscuit croquant, une crème au goût unique, agrémentée d’un délicieux coulis de mangue.",
            "isNew": true,
            "allergens": "MELK, suiker, mascarpone (7%) [ROOM, MELK, zuurteregelaar (E330)], BOTER, ROOM, WEIpoeder, dextrose, lange vingers (1%) [suiker, TARWEbloem, EI, rijsmiddelen (E503i, E500i), aroma, emulgator (E322)], MELKeiwitten, EIgeel, stabilisatoren (E466, E401, E406), emulgator (E471), voedingszuren (E331, E330), kleurstof (E160a), zout, ethylalcohol, aroma's, vanille-extract, cacaopoeder",
            "nutritional_values": {
                "energy": "853 kj / 204 kcal",
                "fat": "10.0 g",
                "saturated_fat": "6.4 g",
                "carbohydrates": "24.6 g",
                "sugars": "24.4 g",
                "fiber": "",
                "protein": "3.9 g",
                "salt": "0.26 g"
            },
            "storage_conditions": [],
            "main_image": "/product_images/Tiramisu_1.png",
            "other_images": [
                "/product_images/Tiramisu_2.png",
                "/product_images/Tiramisu_3.png",
                "/product_images/Tiramisu_4.png",
                "/product_images/Tiramisu_5.png"
            ]
        },
        {
            id: 8,
            "name": "Classic Tiramisu",
            "category": "La gamme verrine",
            "weight": "100g",
            "description": "Basé sur la recette autentique du tiramisu avec du biscuit au boudoir.",
            "isNew": true,
            "allergens": "Amande*, Oeuf, Gluten, Noisette*, Lactose, Lait, Noix de pécan*, Seigle* Soja*, Blé, Noix de cajou*, Orge*, Avoine*, Blé de khorasan*, Noix de macadamia* Fruits à coque*, Pistaches*, Sésame*, Épeautre*, Noix* *Peut contenir des traces de contaminations croisées",
            "nutritional_values": {
                "energy": "1449 kj / 347 kcal",
                "fat": "27.1 g",
                "saturated_fat": "7.0 g",
                "carbohydrates": "18.2 g",
                "sugars": "15.3 g",
                "fiber": "0.4 g",
                "protein": "6.0 g",
                "salt": "0.11 g"
            },
            "storage_conditions": [
                "temps de dégivrage au réfrigérateur à +4°c: 4H",
                "12 pots par boite",
                "Sans colorants ajoutés",
                "Gelatine de poisson",
                "100% HALAL",
                "Produits prêts pour un service rapide",
                "Produits adaptés à un long stockage au réfrigérateur"
            ],
            "main_image": "/product_images/Classic_Tiramisu_1.png",
            "other_images": [
                "/product_images/Classic_Tiramisu_2.png",
                "/product_images/Classic_Tiramisu_3.png",
                "/product_images/Classic_Tiramisu_4.png",
                "/product_images/Classic_Tiramisu_5.png"
            ]
        },
        {
            id: 9,
            "name": "Chocolate Mousse",
            "category": "La gamme verrine",
            "weight": "95g",
            "isNew": true,
            "description": "Une recette autentique Momento® à base de chocolate belge.",
            "allergens": "Oeuf, Lactose, Lait, Soja",
            "nutritional_values": {
                "energy": "1445 kj / 346 kcal",
                "fat": "28.7 g",
                "saturated_fat": "15.6 g",
                "carbohydrates": "17.0 g",
                "sugars": "16.3 g",
                "fiber": "1.3 g",
                "protein": "4.2 g",
                "salt": "0.11 g"
            },
            "storage_conditions": [
                "temps de dégivrage au réfrigérateur à +4°c: 4H",
                "12 pots par boite",
                "Sans colorants ajoutés",
                "Gelatine de poisson",
                "100% HALAL",
                "Produits prêts pour un service rapide",
                "Produits adaptés à un long stockage au réfrigérateur"
            ],
            "main_image": "/product_images/Chocolate_Mouse_1.png",
            "other_images": [
                "/product_images/Chocolate_Mouse_2.png",
                "/product_images/Chocolate_Mouse_3.png",
                "/product_images/Chocolate_Mouse_4.png",
                "/product_images/Chocolate_Mouse_5.png"
            ]
        },
        {
            id: 10,
            "name": "Kinder Bueno",
            "category": "La gamme verrine",
            "weight": "105g",
            "isNew": true,
            "description": "Basé sur la recette autentique du tiramisu avec Bueno.",
            "allergens": "Amandes*, Oeuf, Gluten, Noisette, Lactose, Lait, Noix de pécan*, Seigle* Soja, Blé, Noix de cajou, Orge, Avoine, Blé de khorasan*, Noix de macadamia* Fruits à coque, Pistaches*, Sésame,* Épeautre*, Noix* *Peut contenir des traces de contaminations croisées",
            "nutritional_values": {
                "energy": "1609 kj / 385 kcal",
                "fat": "31.7 g",
                "saturated_fat": "5.6 g",
                "carbohydrates": "18.0 g",
                "sugars": "19.1 g",
                "fiber": "0.0 g",
                "protein": "5.3 g",
                "salt": "0.14 g"
            },
            "storage_conditions": [
                "temps de dégivrage au réfrigérateur à +4°c: 4H",
                "12 pots par boite",
                "Sans colorants ajoutés",
                "Gelatine de poisson",
                "100% HALAL",
                "Produits prêts pour un service rapide",
                "Produits adaptés à un long stockage au réfrigérateur"
            ],
            "main_image": "/product_images/Kinder_Bueno_1.png",
            "other_images": [
                "/product_images/Kinder_Bueno_2.png",
                "/product_images/Kinder_Bueno_3.png",
                "/product_images/Kinder_Bueno_4.png",
                "/product_images/Kinder_Bueno_5.png"
            ]
        },
        {
            id: 11,
            "name": "Lemon Cheesecake",
            "category": "La gamme verrine",
            "weight": "110g",
            "description": "Un fond de biscuit croquant, une crème au goût unique, agrémentée d’un délicieux coulis de citron.",
            "isNew": true,
            "allergens": "Amandes*, Oeuf, Gluten, Noisette*, Lactose, Lait, Noix de pécan*, Seigle* Soja*, Blé, Noix de cajou*, Orge*, Avoine*, Blé de khorasan*, Noix de macadamia* Fruits à coque*, Pistaches*, Sésame*, Épeautre*, Noix* *Peut contenir des traces de contaminations croisées",
            "nutritional_values": {
                "energy": "1305 kj / 312 kcal",
                "fat": "20.6 g",
                "saturated_fat": "11.4 g",
                "carbohydrates": "24.9 g",
                "sugars": "17.2 g",
                "fiber": "0.4 g",
                "protein": "6.7 g",
                "salt": "0.23 g"
            },
            "storage_conditions": [
                "temps de dégivrage au réfrigérateur à +4°c: 4H",
                "12 pots par boite",
                "Sans colorants ajoutés",
                "Gelatine de poisson",
                "100% HALAL",
                "Produits prêts pour un service rapide",
                "Produits adaptés à un long stockage au réfrigérateur"
            ],
            "main_image": "/product_images/Lemon_cheesecake_1.png",
            "other_images": [
                "/product_images/Lemon_cheesecake_2.png",
                "/product_images/Lemon_cheesecake_3.png",
                "/product_images/Lemon_cheesecake_4.png",
                "/product_images/Lemon_cheesecake_5.png"
            ]
        },
        {
            id: 12,
            "name": "Mango Cheesecake",
            "category": "La gamme verrine",
            "weight": "110g",
            "description": "Un fond de biscuit croquant, une crème au goût unique, agrémentée d’un délicieux coulis de mangue",
            "isNew": true,
            "allergens": "Amandes*, Oeuf, Gluten, Noisette*, Lactose, Lait, Noix de pécan*, Seigle* Soja*, Blé, Noix de cajou*, Orge*, Avoine*, Blé de khorasan*, Noix de macadamia* Fruits à coque*, Pistaches*, Sésame*, Épeautre*, Noix* *Peut contenir des traces de contaminations croisées",
            "nutritional_values": {
                "energy": "1414 kj / 338 kcal",
                "fat": "21.3 g",
                "saturated_fat": "11.4 g",
                "carbohydrates": "29.2 g",
                "sugars": "17.8 g",
                "fiber": "0.7 g",
                "protein": "7.3 g",
                "salt": "0.28 g"
            },
            "storage_conditions": [
                "temps de dégivrage au réfrigérateur à +4°c: 4H",
                "12 pots par boite",
                "Sans colorants ajoutés",
                "Gelatine de poisson",
                "100% HALAL",
                "Produits prêts pour un service rapide",
                "Produits adaptés à un long stockage au réfrigérateur"
            ],
            "main_image": "/product_images/Mango_cheescake_1.png",
            "other_images": [
                "/product_images/Mango_cheescake_2.png",
                "/product_images/Mango_cheescake_3.png",
                "/product_images/Mango_cheescake_4.png",
                "/product_images/Mango_cheescake_5.png"
            ]
        },
        {
            id: 13,
            "name": "Oreo Crumble",
            "category": "La gamme verrine",
            "weight":   "105g",
            "isNew": true,
            "description": "Basé sur la recette autentique du tiramisu avec un crumble Oreo.",
            "allergens": "Amande*, Oeuf, Gluten, Noisette*, Lactose, Lait, Noix de pécan*, Seigle* Soja*, Blé, Noix de cajou*, Orge*, Avoine*, Blé de khorasan*, Noix de macadamia* Fruits à coque*, Pistaches*, Sésame*, Épeautre*, Noix* *Peut contenir des traces de contaminations croisées",
            "nutritional_values": {
                "energy": "1758 kj / 420 kcal",
                "fat": "32.9 g",
                "saturated_fat": "6.3 g",
                "carbohydrates": "24.8 g",
                "sugars": "17.7 g",
                "fiber": "0.6 g",
                "protein": "4.5 g",
                "salt": "0.26 g"
            },
            "storage_conditions": [
                "temps de dégivrage au réfrigérateur à +4°c: 4H",
                "12 pots par boite",
                "Sans colorants ajoutés",
                "Gelatine de poisson",
                "100% HALAL",
                "Produits prêts pour un service rapide",
                "Produits adaptés à un long stockage au réfrigérateur"
            ],
            "main_image": "/product_images/Oreo_Crumble_1.png",
            "other_images": [
                "/product_images/Oreo_Crumble_2.png",
                "/product_images/Oreo_Crumble_3.png",
                "/product_images/Oreo_Crumble_4.png",
                "/product_images/Oreo_Crumble_5.png"
            ]
        },
        {
            id: 14,
            "name": "Pistachio Cream",
            "category": "La gamme verrine",
            "weight": "105g",
            "description": "Basé sur la recette autentique du tiramisu avec une créme vanille de chocolate blanc et une mousse à la pistache.",
            "isNew": true,
            "allergens": "Amandes*, Oeuf, Gluten*, Noisette*, Lactose, Lait, Noix de pécan*, Seigle* Soja, Blé,sul te, Noix de cajou*, Orge*, Avoine*, Blé de khorasan*, Noix de macadamia*, Fruits à coque*, Pistaches*, Sésame*, Épeautre*, Noix* *Peut contenir des traces de contaminations croisées",
            "nutritional_values": {
                "energy": "1629 kj / 390 kcal",
                "fat": "31.8 g",
                "saturated_fat": "6.2 g",
                "carbohydrates": "20.6 g",
                "sugars": "18.8 g",
                "fiber": "0.2 g",
                "protein": "3.8 g",
                "salt": "0.15 g"
            },
            "storage_conditions": [
                "temps de dégivrage au réfrigérateur à +4°c: 4H",
                "12 pots par boite",
                "Sans colorants ajoutés",
                "Gelatine de poisson",
                "100% HALAL",
                "Produits prêts pour un service rapide",
                "Produits adaptés à un long stockage au réfrigérateur"
            ],
            "main_image": "/product_images/Pistachio_Cream_1.png",
            "other_images": [
                "/product_images/Pistachio_Cream_2.png",
                "/product_images/Pistachio_Cream_3.png",
                "/product_images/Pistachio_Cream_4.png",
                "/product_images/Pistachio_Cream_5.png"
            ]
        },
        {
            id: 15,
            "name": "Raspberry Cheesecake",
            "category": "La gamme verrine",
            "isNew": true,
            "weight": "110g",
            "description": "Un fond de biscuit croquant, une crème au goût unique, agrémentée d’un délicieux coulis de framboise.",
            "allergens": "Amande*, Oeuf, Gluten, Noisette*, Lactose, Lait, Noix de pécan*, Seigle* Soja*, Blé, Noix de cajou*, Orge*, Avoine*, Blé de khorasan*, Noix de macadamia* Fruits à coque*, Pistaches*, Sésame*, Épeautre*, Noix* *Peut contenir des traces de contaminations croisées",
            "nutritional_values": {
                "energy": "1332 kj / 319 kcal",
                "fat": "17.2 g",
                "saturated_fat": "9.2 g",
                "carbohydrates": "33.3 g",
                "sugars": "21.1 g",
                "fiber": "0.1 g",
                "protein": "7.5 g",
                "salt": "0.32 g"
            },
            "storage_conditions": [
                "temps de dégivrage au réfrigérateur à +4°c: 4H",
                "12 pots par boite",
                "Sans colorants ajoutés",
                "Gelatine de poisson",
                "100% HALAL",
                "Produits prêts pour un service rapide",
                "Produits adaptés à un long stockage au réfrigérateur"
            ],
            "main_image": "/product_images/Raspberry_Cheesecake_1.png",
            "other_images": [
                "/product_images/Raspberry_Cheesecake_2.png",
                "/product_images/Raspberry_Cheesecake_3.png",
                "/product_images/Raspberry_Cheesecake_4.png",
                "/product_images/Raspberry_Cheesecake_5.png"
            ]
        },
        {
            id: 16,
            "name": "Red Velvet Tiramisu",
            "category": "La gamme verrine",
            "weight": "120g",
            "description": "L’incontournable cake red velvet, revisité en tiramisu Momento®.",
            "isNew": false,
            "allergens": "Amandes*, Oeuf, Gluten, Noisette*, Lactose, Lait, Noix de pécan*, Seigle* Soja*, Blé*, Noix de cajou*, Orge*, Avoine*, Blé de khorasan*, Noix de macadamia* Fruits à coque*, Pistaches*, Sésame*, Épeautre*, Noix* *Peut contenir des traces de contaminations croisées",
            "nutritional_values": {
                "energy": "1069 kj / 256 kcal",
                "fat": "15.1 g",
                "saturated_fat": "7.7 g",
                "carbohydrates": "22.9 g",
                "sugars": "19.6 g",
                "fiber": "0.3 g",
                "protein": "7.0 g",
                "salt": "0.09 g"
            },
            "storage_conditions": [
                "temps de dégivrage au réfrigérateur à +4°c: 4H",
                "12 pots par boite",
                "Sans colorants ajoutés",
                "Gelatine de poisson",
                "100% HALAL",
                "Produits prêts pour un service rapide",
                "Produits adaptés à un long stockage au réfrigérateur"
            ],
            "main_image": "/product_images/Red_Velvet_Tiramisu_1.png",
            "other_images": [
                "/product_images/Red_Velvet_Tiramisu_2.png",
                "/product_images/Red_Velvet_Tiramisu_3.png",
                "/product_images/Red_Velvet_Tiramisu_4.png",
                "/product_images/Red_Velvet_Tiramisu_5.png"
            ]
        },
        {
            id: 17,
            "name": "Salted Caramel",
            "category": "La gamme verrine",
            "weight": "105g",
            "isNew": true,
            "description": "La créme Momento®, au goût caramel beurre salé.",
            "allergens": "Amandes*, Oeuf, Gluten, Noisette*, Lactose, Lait, Noix de pécan*, Seigle Soja*, Blé, Noix de cajou*, Orge*, Avoine*, Blé de khorasan*, Noix de macadamia* Fruits à coque, Pistaches, Sésame*, Épeautre*, Noix* *Peut contenir des traces de contaminations croisées",
            "nutritional_values": {
                "energy": "1707 kj / 408 kcal",
                "fat": "31.8 g",
                "saturated_fat": "6.9 g",
                "carbohydrates": "24.8 g",
                "sugars": "0.0 g",
                "fiber": "4.1 g",
                "protein": "7.3 g",
                "salt": "0.22 g"
            },
            "storage_conditions": [
                "temps de dégivrage au réfrigérateur à +4°c: 4H",
                "12 pots par boite",
                "Sans colorants ajoutés",
                "Gelatine de poisson",
                "100% HALAL",
                "Produits prêts pour un service rapide",
                "Produits adaptés à un long stockage au réfrigérateur"
            ],
            "main_image": "/product_images/Salted_Caramel_1.png",
            "other_images": [
                "/product_images/Salted_Caramel_2.png",
                "/product_images/Salted_Caramel_3.png",
                "/product_images/Salted_Caramel_4.png",
                "/product_images/Salted_Caramel_5.png"
            ]
        },
        {
            id: 18,
            "name": "Snickers Tiramisu",
            "category": "La gamme verrine",
            "weight": "105g",
            "isNew": true,
            "description": "Basé sur la recette autentique du tiramisu avec du Snickers.",
            "allergens": "Amande*, Oeuf, Gluten*, Noisette*, Lactose, Lait, Noix de pécan*, Seigle* Soja, Blé*, Noix de cajou*, Orge*, Avoine*, Blé de khorasan*, Noix de macadamia* Fruits à coque*,Cacahuètes, Pistaches*, Sésame*, Épeautre*, Noix* *Peut contenir des traces de contaminations croisées",
            "nutritional_values": {
                "energy": "1564 kj / 374 kcal",
                "fat": "27.7 g",
                "saturated_fat": "6.8 g",
                "carbohydrates": "20.0 g",
                "sugars": "18.2 g",
                "fiber": "0.3 g",
                "protein": "5.5 g",
                "salt": "0.21 g"
            },
            "storage_conditions": [
                "temps de dégivrage au réfrigérateur à +4°c: 4H",
                "12 pots par boite",
                "Sans colorants ajoutés",
                "Gelatine de poisson",
                "100% HALAL",
                "Produits prêts pour un service rapide",
                "Produits adaptés à un long stockage au réfrigérateur"
            ],
            "main_image": "/product_images/Snickers_Tiramisu_1.png",
            "other_images": [
                "/product_images/Snickers_Tiramisu_2.png",
                "/product_images/Snickers_Tiramisu_3.png",
                "/product_images/Snickers_Tiramisu_4.png",
                "/product_images/Snickers_Tiramisu_5.png"
            ]
        },
        {
            id: 19,
            "name": "Speculoos Tiramisu",
            "category": "La gamme verrine",
            "weight": "110g",
            "isNew": true,
            "description": "Basé sur la recette autentique du tiramisu avec du biscuit au spéculoos.",
            "allergens": "Amande*, Oeuf, Gluten, Noisette*, Lactose, Lait, Noix de pécan, Seigle* Soja*, Blé, Noix de cajou*, Orge, Avoine, Blé de khorasan*, Noix de macadamia Fruits à coque, Pistaches*, Sésame*, Épeautre*, Noix *Peut contenir des traces de contaminations croisées",
            "nutritional_values": {
                "energy": "1465 kj / 351 kcal",
                "fat": "29.1 g",
                "saturated_fat": "6.0 g",
                "carbohydrates": "17.1 g",
                "sugars": "14.1 g",
                "fiber": "0.3 g",
                "protein": "3.6 g",
                "salt": "0.14 g"
            },
            "storage_conditions": [
                "temps de dégivrage au réfrigérateur à +4°c: 4H",
                "12 pots par boite",
                "Sans colorants ajoutés",
                "Gelatine de poisson",
                "100% HALAL",
                "Produits prêts pour un service rapide",
                "Produits adaptés à un long stockage au réfrigérateur"
            ],
            "main_image": "/product_images/Speculoos_Tiramisu_1.png",
            "other_images": [
                "/product_images/Speculoos_Tiramisu_2.png",
                "/product_images/Speculoos_Tiramisu_3.png",
                "/product_images/Speculoos_Tiramisu_4.png",
                "/product_images/Speculoos_Tiramisu_5.png"
            ]
        }
    ]
}