import { DessertData, DessertInterface } from "@/Data/Const";

export function slugify(text: string): string {
    return text
        .toString()
        .toLowerCase()
        .trim()
        .replace(/\s+/g, '-')        // Replace spaces with -
        .replace(/[^\w\-]+/g, '')    // Remove all non-word chars
        .replace(/\-\-+/g, '-');     // Replace multiple - with single -
}

export function getProductBySlug(slug: string): DessertInterface | undefined {
    const products = DessertData();
    return products.find(product => slugify(product.name) === slug);
}
