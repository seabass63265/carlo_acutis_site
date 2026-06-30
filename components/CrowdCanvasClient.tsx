"use client";

import dynamic from "next/dynamic";

const CrowdCanvas = dynamic(
  () => import("@/components/ui/skiper39").then((m) => m.CrowdCanvas),
  { ssr: false }
);

export default function CrowdCanvasClient() {
  return (
    <CrowdCanvas
      src="/images/peeps/all-peeps.png"
      rows={15}
      cols={7}
    />
  );
}
