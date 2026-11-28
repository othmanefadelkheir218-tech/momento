"use client";

import { FormEvent, ReactNode, useRef } from "react";
import { useTranslations } from "next-intl";
import Consent from "@/components/ui/form/Consent";
import FormDone from "@/components/ui/form/FormDone";
import MomentoButton from "@/components/ui/MomentoButton";
import type { SendState } from "@/components/ui/form/useFormSend";

// What every form shares: the fields (children), the consent box, the send button, the error line,
// and the thank-you that replaces the form once sent. `ns`: the form's translations
// (submit, sending, error, doneTitle, done, again, consent).

type Props = {
    ns: string;
    state: SendState;
    onSubmit: (form: HTMLFormElement) => void;
    onAgain: () => void;
    consentError?: string;
    children: ReactNode;
};

export default function FormShell({ ns, state, onSubmit, onAgain, consentError, children }: Props) {
    const t = useTranslations(ns);
    const formRef = useRef<HTMLFormElement>(null);

    if (state === "done") {
        return (
            <FormDone
                title={t("doneTitle")}
                text={t("done")}
                action={
                    <button type="button" onClick={onAgain} className="font-body text-[14px] font-medium text-burgundy underline underline-offset-4 hover:text-burgundy-dark">
                        {t("again")}
                    </button>
                }
            />
        );
    }

    const submit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSubmit(e.currentTarget);
    };

    return (
        <form ref={formRef} noValidate onSubmit={submit} className="space-y-9">
            {children}
            <Consent ns={ns} error={consentError} />
            <div className="flex flex-wrap items-center gap-6">
                {/* hidden real submit button: Enter in a field still sends the form */}
                <button type="submit" tabIndex={-1} aria-hidden className="sr-only" />
                <MomentoButton onClick={() => state !== "sending" && formRef.current?.requestSubmit()} className="w-fit">
                    {state === "sending" ? t("sending") : t("submit")}
                </MomentoButton>
                {state === "error" && (
                    <p role="alert" className="font-body text-[14px] text-burgundy">
                        {t("error")}
                    </p>
                )}
            </div>
        </form>
    );
}
