"use client"
import { useTranslations } from "next-intl";
import { getDessertData, DessertInterface } from "@/Data/Const";

export const useDessertData = (namespace: string = "Desserts"): DessertInterface[] => {
  const t = useTranslations(namespace);
  return getDessertData(t);
};
