"use client";

import { useState } from "react";

export default function CTA() {
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    setLoading(true);
    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({}),
    });
    const data = await res.json();
    if (data.url) {
      window.location.href = data.url;
    } else {
      setLoading(false);
      alert("Something went wrong. Try again.");
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
        <button
          onClick={handleCheckout}
          disabled={loading}
          className="mt-8 inline-flex items-center gap-3 rounded-full bg-ink px-8 py-4 font-mono text-[12px] uppercase tracking-widest2 text-mist transition-colors hover:bg-moss disabled:opacity-60"
        >
          {loading ? "Redirecting..." : "Reserve — $10 deposit"}
        </button>
        <p className="mt-4 font-mono text-[11px] text-graphite/70">
          Refundable anytime before it ships. (Demo — test mode, no real charge)
        </p>
      </div>
    </section>
  );
}
