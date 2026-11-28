"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import Choices from "@/components/ui/form/Choices";
import Field from "@/components/ui/form/Field";
import { readForm, useFormSend } from "@/components/ui/form/useFormSend";
import FormShell from "./FormShell";

// "Franchise enquiry". Sent to /api/central/contact as a contact message with the type
// "Franchise" (there is no franchise form in the central admin yet).

const NS = "Sections.partner.franchiseForm";
const METHODS = ["email", "phone"] as const;
const REQUIRED = ["name", "email", "phone", "country", "city", "project"];

export default function FranchiseForm() {
    const t = useTranslations(NS);
    const { state, send, reset } = useFormSend("/api/central/contact");
    const [method, setMethod] = useState("");
    const [errors, setErrors] = useState<Record<string, string>>({});

    const submit = (form: HTMLFormElement) => {
        const { data, errors } = readForm(form, REQUIRED, { required: t("required"), email: t("invalidEmail") });
        if (!method) errors.method = t("required");
        if (!data.consent) errors.consent = t("consentRequired");
        setErrors(errors);
        if (Object.keys(errors).length) return;
        send({
            cooperation: "Franchise",
            name: data.name,
            email: data.email,
            phone: data.phone,
            city: data.city,
            message: [
                `${t("fields.country")}: ${data.country}`,
                `${t("fields.contactMethod")}: ${t(`methods.${method}`)}`,
                "",
                data.project,
            ].join("\n"),
        });
    };

    return (
        <FormShell ns={NS} state={state} onSubmit={submit} onAgain={reset} consentError={errors.consent}>
            <div className="grid gap-9 sm:grid-cols-2 sm:gap-x-8">
                <Field name="name" label={t("fields.name")} required error={errors.name} autoComplete="name" className="sm:col-span-2" />
                <Field name="email" type="email" label={t("fields.email")} required error={errors.email} autoComplete="email" />
                <Field name="phone" type="tel" label={t("fields.phone")} required error={errors.phone} autoComplete="tel" />
                <Field name="country" label={t("fields.country")} required error={errors.country} autoComplete="country-name" />
                <Field name="city" label={t("fields.city")} required error={errors.city} />
                <Field name="project" label={t("fields.project")} multiline required error={errors.project} className="sm:col-span-2" />
            </div>
            <Choices
                name="method"
                label={t("fields.contactMethod")}
                value={method}
                onChange={setMethod}
                error={errors.method}
                options={METHODS.map((v) => ({ value: v, label: t(`methods.${v}`) }))}
            />
        </FormShell>
    );
}
