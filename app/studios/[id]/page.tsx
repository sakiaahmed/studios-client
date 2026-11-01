"use client";

import { Suspense } from "react";
import { useParams } from "next/navigation";
import StudioDetailsClient from "./StudioDetailsClient";
import { Loader2 } from "lucide-react";

function StudioDetailsWrapper() {
  const params = useParams();
  return <StudioDetailsClient id={params.id as string} />;
}

export default function StudioDetailsPage() {
  return (
    <Suspense 
      fallback={
        <div className="flex justify-center items-center min-h-[80vh] bg-zinc-50 dark:bg-[#0a0a0a]">
          <Loader2 className="w-12 h-12 text-brand animate-spin" />
        </div>
      }
    >
      <StudioDetailsWrapper />
    </Suspense>
  );
}