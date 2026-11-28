"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import Choices from "@/components/ui/form/Choices";
import Field from "@/components/ui/form/Field";
import { readForm, useFormSend } from "@/components/ui/form/useFormSend";
import FormShell from "./FormShell";

// The contact page form. Sent to /api/central/contact (the subject goes in "cooperation").

const NS = "Sections.contact.form";
const SUBJECTS = ["general", "order", "franchise", "press", "other"] as const;
const REQUIRED = ["name", "email", "message"];

export default function ContactForm() {
    const t = useTranslations(NS);
    const { state, send, reset } = useFormSend("/api/central/contact");
    const [subject, setSubject] = useState("");
    const [errors, setErrors] = useState<Record<string, string>>({});

    const submit = (form: HTMLFormElement) => {
        const { data, errors } = readForm(form, REQUIRED, { required: t("required"), email: t("invalidEmail") });
        if (!subject) errors.subject = t("required");
        if (!data.consent) errors.consent = t("consentRequired");
        setErrors(errors);
        if (Object.keys(errors).length) return;
        send({ cooperation: t(`subjects.${subject}`), name: data.name, email: data.email, phone: data.phone, message: data.message });
    };

    return (
        <FormShell ns={NS} state={state} onSubmit={submit} onAgain={reset} consentError={errors.consent}>
            <div className="grid gap-9 sm:grid-cols-2 sm:gap-x-8">
                <Field name="name" label={t("fields.name")} required error={errors.name} autoComplete="name" className="sm:col-span-2" />
                <Field name="email" type="email" label={t("fields.email")} required error={errors.email} autoComplete="email" />
                <Field name="phone" type="tel" label={t("fields.phone")} autoComplete="tel" />
            </div>
            <Choices
                name="subject"
                label={t("fields.subject")}
                value={subject}
                onChange={setSubject}
                error={errors.subject}
                options={SUBJECTS.map((v) => ({ value: v, label: t(`subjects.${v}`) }))}
            />
            <Field name="message" label={t("fields.message")} multiline required error={errors.message} />
        </FormShell>
    );
}
