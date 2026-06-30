"use client";
import dynamic from "next/dynamic";

const MiraclesMap = dynamic(() => import("@/components/MiraclesMap"), { ssr: false });

export default function MiraclesMapClient() {
  return <MiraclesMap />;
}
