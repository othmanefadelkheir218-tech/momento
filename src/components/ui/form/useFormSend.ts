"use client";

import { useState } from "react";

// Sends a form to one of our API routes (src/app/api/central/…) and tracks its state.
//   idle → sending → done | error

export type SendState = "idle" | "sending" | "done" | "error";

export function useFormSend(endpoint: string) {
    const [state, setState] = useState<SendState>("idle");

    const send = async (payload: Record<string, string>) => {
        setState("sending");
        try {
            const res = await fetch(endpoint, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });
            const json = (await res.json().catch(() => ({}))) as { success?: boolean };
            setState(res.ok && json.success ? "done" : "error");
        } catch {
            setState("error");
        }
    };

    return { state, send, reset: () => setState("idle") };
}

/** Reads the form's fields as text; checks the required ones and the email. Returns the errors by field. */
export function readForm(form: HTMLFormElement, required: string[], messages: { required: string; email: string }) {
    const data = Object.fromEntries(
        Array.from(new FormData(form).entries()).map(([k, v]) => [k, typeof v === "string" ? v.trim() : ""]),
    ) as Record<string, string>;
    const errors: Record<string, string> = {};
    for (const name of required) if (!data[name]) errors[name] = messages.required;
    if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) errors.email = messages.email;
    return { data, errors };
}
