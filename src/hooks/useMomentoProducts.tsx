"use client"
import { useTranslations } from "next-intl";
import { getMomentoProducts, MomentoProduct } from "@/Data/MomentoProducts";

/** Momento catalogue (public/momento_product), with texts from "MomentoProducts" in the messages files. */
export const useMomentoProducts = (): MomentoProduct[] => {
  const t = useTranslations("MomentoProducts");
  return getMomentoProducts(t);
};
