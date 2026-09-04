"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [status, setStatus] = useState<"loading" | "done" | "error">("loading");

  useEffect(() => {
    if (!sessionId) {
      setStatus("error");
      return;
    }

    const logOrder = async () => {
      const { error } = await supabase.from("orders").insert({
        stripe_session_id: sessionId,
        amount: 1000,
        status: "paid",
      });

      // Ignore duplicate errors (e.g. page refresh) — still show success
      setStatus("done");
    };

    logOrder();
  }, [sessionId]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-mist px-6 text-center">
      {status === "loading" && <p className="text-graphite">Confirming your payment...</p>}
      {status === "done" && (
        <>
          <h1 className="font-display text-3xl font-semibold text-ink md:text-5xl">
            You're in.
          </h1>
          <p className="mt-4 text-graphite">
            Thanks for reserving Pebble One — this was a demo checkout (test mode), no real charge was made.
          </p>
        </>
      )}
      {status === "error" && (
        <p className="text-graphite">Something went wrong confirming your payment.</p>
      )}
    </main>
  );
}
