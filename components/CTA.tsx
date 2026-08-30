"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function CTA() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    const { error } = await supabase.from("waitlist").insert({ email });

    if (error) {
      setStatus("error");
    } else {
      setStatus("success");
      setEmail("");
    }
  };

  return (
    <section id="reserve" className="bg-mist py-24 md:py-32">
      <div className="mx-auto flex max-w-3xl flex-col items-center px-6 text-center">
        <p className="font-mono text-[11px] uppercase tracking-widest2 text-moss">
          Reserve
        </p>
        <h2 className="mt-4 font-display text-3xl font-semibold text-ink md:text-5xl">
          Pebble One
        </h2>
        <p className="mt-4 text-graphite">
          $79. Ships October. Made in one colorway, on purpose.
        </p>

        {status === "success" ? (
          <p className="mt-8 font-mono text-[13px] text-moss">
            You&apos;re on the list — we&apos;ll email you when it ships.
          </p>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="mt-8 flex w-full max-w-sm flex-col items-center gap-3"
          >
            <input
              type="email"
              required
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-full border border-ink/20 bg-transparent px-6 py-3 text-center font-mono text-[13px] text-ink placeholder:text-graphite/50 focus:outline-none focus:border-ink"
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className="inline-flex items-center gap-3 rounded-full bg-ink px-8 py-4 font-mono text-[12px] uppercase tracking-widest2 text-mist transition-colors hover:bg-moss disabled:opacity-60"
            >
              {status === "loading" ? "Reserving..." : "Reserve — $10 deposit"}
            </button>
            {status === "error" && (
              <p className="font-mono text-[11px] text-red-600">
                Something went wrong. Try again.
              </p>
            )}
          </form>
        )}

        <p className="mt-4 font-mono text-[11px] text-graphite/70">
          Refundable anytime before it ships.
        </p>
      </div>
    </section>
  );
}
