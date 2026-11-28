"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import Choices from "@/components/ui/form/Choices";
import Field from "@/components/ui/form/Field";
import { readForm, useFormSend } from "@/components/ui/form/useFormSend";
import FormShell from "./FormShell";

// "Client request" (businesses that want to sell or serve Momento). Sent to /api/central/partner,
// which expects the French field names below.

const NS = "Sections.partner.clientForm";
const TYPES = ["cafe", "restaurant", "hotel", "store", "corporate", "events", "other"] as const;
const REQUIRED = ["business", "contact", "email", "phone", "city"];

export default function ClientForm() {
    const t = useTranslations(NS);
    const { state, send, reset } = useFormSend("/api/central/partner");
    const [type, setType] = useState("");
    const [errors, setErrors] = useState<Record<string, string>>({});

    const submit = (form: HTMLFormElement) => {
        const { data, errors } = readForm(form, REQUIRED, { required: t("required"), email: t("invalidEmail") });
        if (!type) errors.type = t("required");
        if (!data.consent) errors.consent = t("consentRequired");
        setErrors(errors);
        if (Object.keys(errors).length) return;
        send({
            type_etablissement: t(`types.${type}`),
            nom_etablissement: data.business,
            ville: data.city,
            contact_personne: data.contact,
            telephone: data.phone,
            email: data.email,
            quantite_mensuelle: data.quantity,
            informations: [data.products && `${t("fields.products")}: ${data.products}`, data.message].filter(Boolean).join("\n\n"),
        });
    };

    return (
        <FormShell ns={NS} state={state} onSubmit={submit} onAgain={reset} consentError={errors.consent}>
            <Choices
                name="type"
                label={t("fields.type")}
                value={type}
                onChange={setType}
                error={errors.type}
                options={TYPES.map((v) => ({ value: v, label: t(`types.${v}`) }))}
            />
            <div className="grid gap-9 sm:grid-cols-2 sm:gap-x-8">
                <Field name="business" label={t("fields.business")} required error={errors.business} autoComplete="organization" />
                <Field name="contact" label={t("fields.contact")} required error={errors.contact} autoComplete="name" />
                <Field name="email" type="email" label={t("fields.email")} required error={errors.email} autoComplete="email" />
                <Field name="phone" type="tel" label={t("fields.phone")} required error={errors.phone} autoComplete="tel" />
                <Field name="city" label={t("fields.city")} required error={errors.city} autoComplete="address-level2" />
                <Field name="quantity" label={t("fields.quantity")} />
                <Field name="products" label={t("fields.products")} className="sm:col-span-2" />
                <Field name="message" label={t("fields.message")} multiline className="sm:col-span-2" />
            </div>
        </FormShell>
    );
}
