"use client";
import { useState } from "react";
import { FaLinkedinIn, FaTwitter, FaBehance, FaInstagram } from "react-icons/fa";
import { cn } from "@/lib/utils";

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
  /** Overrides which photo column this member's photo appears in (1-3). Defaults to a round-robin based on list order. */
  column?: 1 | 2 | 3;
  /** CSS object-position for the photo (e.g. "center 30%"). Defaults to "center". */
  objectPosition?: string;
  /** Optional bio paragraphs, revealed inline when the member's row is clicked. */
  bio?: string[];
  social?: {
    twitter?: string;
    linkedin?: string;
    instagram?: string;
    behance?: string;
  };
}

interface TeamShowcaseProps {
  members: TeamMember[];
}

export default function TeamShowcase({ members }: TeamShowcaseProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const columnOf = (m: TeamMember, i: number) => m.column ?? ((i % 3) + 1);
  const col1 = members.filter((m, i) => columnOf(m, i) === 1);
  const col2 = members.filter((m, i) => columnOf(m, i) === 2);
  const col3 = members.filter((m, i) => columnOf(m, i) === 3);

  return (
    <div className="flex flex-col md:flex-row items-start gap-12 md:gap-16 lg:gap-24 select-none w-full max-w-7xl mx-auto py-10 px-4 md:px-8 font-sans">
      {/* Photo grid */}
      <div className="flex gap-3 md:gap-4 flex-shrink-0 overflow-x-auto pb-1 md:pb-0 w-full md:w-auto">
        <div className="flex flex-col gap-3 md:gap-4">
          {col1.map((member) => (
            <PhotoCard
              key={member.id}
              member={member}
              className="w-[176px] h-[283px] sm:w-[209px] sm:h-[328px] md:w-[253px] md:h-[404px]"
              hoveredId={hoveredId}
              onHover={setHoveredId}
            />
          ))}
        </div>
        <div className="flex flex-col gap-3 md:gap-4 mt-[79px] sm:mt-[99px] md:mt-[121px]">
          {col2.map((member) => (
            <PhotoCard
              key={member.id}
              member={member}
              className="w-[196px] h-[310px] sm:w-[231px] sm:h-[367px] md:w-[281px] md:h-[448px]"
              hoveredId={hoveredId}
              onHover={setHoveredId}
            />
          ))}
        </div>
        <div className="flex flex-col gap-3 md:gap-4 mt-[37px] sm:mt-[46px] md:mt-[57px]">
          {col3.map((member) => (
            <PhotoCard
              key={member.id}
              member={member}
              className="w-[185px] h-[296px] sm:w-[220px] sm:h-[346px] md:w-[266px] md:h-[424px]"
              hoveredId={hoveredId}
              onHover={setHoveredId}
            />
          ))}
        </div>
      </div>

      {/* Member name list */}
      <div className="flex flex-col sm:grid sm:grid-cols-2 md:flex md:flex-col gap-5 md:gap-7 pt-0 md:pt-4 flex-1 w-full">
        {members.map((member) => (
          <MemberRow
            key={member.id}
            member={member}
            hoveredId={hoveredId}
            onHover={setHoveredId}
          />
        ))}
      </div>
    </div>
  );
}

function PhotoCard({
  member,
  className,
  hoveredId,
  onHover,
}: {
  member: TeamMember;
  className: string;
  hoveredId: string | null;
  onHover: (id: string | null) => void;
}) {
  const isActive = hoveredId === member.id;
  const isDimmed = hoveredId !== null && !isActive;

  return (
    <div
      className={cn(
        "overflow-hidden rounded-xl cursor-pointer flex-shrink-0 transition-opacity duration-[400ms]",
        className,
        isDimmed ? "opacity-50" : "opacity-100"
      )}
      onMouseEnter={() => onHover(member.id)}
      onMouseLeave={() => onHover(null)}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={member.image}
        alt={member.name}
        className="w-full h-full object-cover transition-[filter] duration-500"
        style={{
          objectPosition: member.objectPosition ?? "center",
          filter: isActive
            ? "grayscale(0) brightness(1)"
            : "grayscale(1) brightness(0.7)",
        }}
      />
    </div>
  );
}

function MemberRow({
  member,
  hoveredId,
  onHover,
}: {
  member: TeamMember;
  hoveredId: string | null;
  onHover: (id: string | null) => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const isActive = hoveredId === member.id;
  const isDimmed = hoveredId !== null && !isActive;
  const hasSocial =
    member.social?.twitter ??
    member.social?.linkedin ??
    member.social?.instagram ??
    member.social?.behance;
  const hasBio = !!member.bio?.length;

  return (
    <div
      className={cn(
        "cursor-pointer transition-opacity duration-300",
        isDimmed ? "opacity-40" : "opacity-100"
      )}
      onMouseEnter={() => onHover(member.id)}
      onMouseLeave={() => onHover(null)}
      onClick={() => hasBio && setExpanded((v) => !v)}
    >
      <div className="flex items-center gap-3">
        <span
          className={cn(
            "h-3.5 rounded-[5px] flex-shrink-0 transition-all duration-300",
            isActive ? "w-6 bg-white" : "w-5 bg-white/30"
          )}
        />
        <span
          className={cn(
            "text-xl md:text-2xl lg:text-[26px] font-semibold leading-none tracking-tight transition-colors duration-300 font-serif",
            isActive ? "text-white" : "text-white/80"
          )}
        >
          {member.name}
        </span>

        {hasSocial && (
          <div
            className={cn(
              "flex items-center gap-1.5 ml-0.5 transition-all duration-200",
              isActive
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-2 pointer-events-none"
            )}
          >
            {member.social?.twitter && (
              <a
                href={member.social.twitter}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="p-1 rounded text-white/50 hover:text-white hover:bg-white/10 transition-all duration-150 hover:scale-110"
              >
                <FaTwitter size={12} />
              </a>
            )}
            {member.social?.linkedin && (
              <a
                href={member.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="p-1 rounded text-white/50 hover:text-white hover:bg-white/10 transition-all duration-150 hover:scale-110"
              >
                <FaLinkedinIn size={12} />
              </a>
            )}
            {member.social?.instagram && (
              <a
                href={member.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="p-1 rounded text-white/50 hover:text-white hover:bg-white/10 transition-all duration-150 hover:scale-110"
              >
                <FaInstagram size={12} />
              </a>
            )}
            {member.social?.behance && (
              <a
                href={member.social.behance}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="p-1 rounded text-white/50 hover:text-white hover:bg-white/10 transition-all duration-150 hover:scale-110"
              >
                <FaBehance size={12} />
              </a>
            )}
          </div>
        )}
      </div>

      <p className="mt-2 pl-[35px] text-[9px] md:text-[11px] font-medium uppercase tracking-[0.22em] text-white/40">
        {member.role}
      </p>
      {hasBio && (
        <p className="mt-1.5 pl-[35px] text-[14px] md:text-[16px] font-medium normal-case tracking-normal text-white/30 transition-colors duration-200 hover:text-white/60">
          {expanded ? "− Less" : "+ Bio"}
        </p>
      )}

      {hasBio && (
        <div
          className="grid pl-[35px] transition-[grid-template-rows] duration-500 ease-out"
          style={{ gridTemplateRows: expanded ? "1fr" : "0fr" }}
        >
          <div className="overflow-hidden">
            <div className="pt-3 pr-4 pb-1 space-y-3 max-w-xl">
              {member.bio!.map((paragraph, i) => (
                <p key={i} className="text-[12.5px] md:text-[13.5px] leading-relaxed text-white/50">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
