"use client";
import dynamic from "next/dynamic";

const MiraclesMap = dynamic(() => import("@/components/eucharistic-miracles/MiraclesMap"), { ssr: false });

export default function MiraclesMapClient() {
  return <MiraclesMap />;
}
