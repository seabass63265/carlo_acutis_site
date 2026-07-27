"use client";

import { ReactNode } from "react";
import { useSvgWipe } from "@/components/SvgWipeProvider";

export default function WipeLink({
  href,
  className,
  style,
  children,
}: {
  href: string;
  className?: string;
  style?: React.CSSProperties;
  children: ReactNode;
}) {
  const { trigger: wipeTo } = useSvgWipe();

  return (
    <button onClick={() => wipeTo(href)} className={className} style={style}>
      {children}
    </button>
  );
}
