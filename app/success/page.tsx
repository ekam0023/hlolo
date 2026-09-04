"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabase";

function SuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [status, setStatus] = useState<"loading" | "done" | "error">("loading");

  useEffect(() => {
    if (!sessionId) {
      setStatus("error");
      return;
    }

    const logOrder = async () => {
      await supabase.from("orders").insert({
        stripe_session_id: sessionId,
        amount: 1000,
        status: "paid",
      });
      setStatus("done");
    };

    logOrder();
  }, [sessionId]);

  return (
    <>
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
    </>
  );
}

export default function SuccessPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-mist px-6 text-center">
      <Suspense fallback={<p className="text-graphite">Loading...</p>}>
        <SuccessContent />
      </Suspense>
    </main>
  );
}
