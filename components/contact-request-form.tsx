"use client";

import { FormEvent, useState } from "react";

const FORM_ENDPOINT = "https://formspree.io/f/xwprlgpo";
const SUCCESS_MESSAGE =
  "Ihre Nachricht wurde versendet. Vielen Dank für Ihre Nachricht. Das DPPFOR / 0Admin-Team wird sich bei Ihnen melden.";
const ERROR_MESSAGE =
  "Die Nachricht konnte gerade nicht versendet werden. Bitte versuchen Sie es erneut oder schreiben Sie uns später noch einmal.";

export function ContactRequestForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    setIsSubmitting(true);
    setStatus("idle");
    setMessage("");

    try {
      const response = await fetch(FORM_ENDPOINT, {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Request failed");
      }

      form.reset();
      setStatus("success");
      setMessage(SUCCESS_MESSAGE);
    } catch {
      setStatus("error");
      setMessage(ERROR_MESSAGE);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name
        <input type="text" name="name" autoComplete="name" required />
      </label>
      <label>
        E-Mail
        <input type="email" name="email" autoComplete="email" required />
      </label>
      <label>
        Nachricht
        <textarea
          name="message"
          rows={5}
          defaultValue="Ich möchte ein Gespräch zu 0Admin anfragen."
          required
        />
      </label>
      <input type="hidden" name="_subject" value="Gesprächsanfrage zu 0Admin" />
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Wird gesendet..." : "Gespräch anfragen"}
      </button>
      <p
        className={`s1-contact__status s1-contact__status--${status}`}
        aria-live="polite"
      >
        {message}
      </p>
    </form>
  );
}
