import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { DessertInterface } from "@/Data/Const";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function slugify(text: string): string {
    return text
        .toString()
        .toLowerCase()
        .trim()
        .replace(/\s+/g, '-')        // Replace spaces with -
        .replace(/[^\w\-]+/g, '')    // Remove all non-word chars
        .replace(/\-\-+/g, '-');     // Replace multiple - with single -
}

export function getProductBySlug(products: DessertInterface[], slug: string): DessertInterface | undefined {
    return products.find(product => slugify(product.name) === slug);
}
