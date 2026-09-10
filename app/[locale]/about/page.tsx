import type { Metadata } from "next";
import AnimateIn from "@/components/AnimateIn";
import AboutHero from "@/components/AboutHero";
import ScrollWaveGallery from "@/components/ScrollWaveGallery";
import AboutScrollTypography from "@/components/AboutScrollTypography";
import TeamShowcase, { type TeamMember } from "@/components/ui/team-showcase";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about the Friends of St. Carlo Acutis Foundation — our story, board of directors, and governance.",
};

/* ─── Board ──────────────────────────────────────────────────────────── */
const boardMembers: TeamMember[] = [
  {
    id: "2",
    name: "Josefina Fernandez McEvoy",
    role: "Founder",
    image: "/jfm-foc.jpg",
    column: 2,
    social: { linkedin: "https://www.linkedin.com/in/josefinafernandezmcevoy/" },
    bio: [
      "Josefina Fernandez McEvoy founded Friends of St. Carlo Acutis, Inc. (\"Friends of Carlo\") in early 2025, after nearly two years of prayerful discernment and due diligence to better understand St. Carlo's calling. Along the way, she consulted with several spiritual and technical mentors who helped crystallize her vision for Friends of Carlo. Through this journey, she came to understand St. Carlo's calling as an invitation to help carry forward his legacy by inspiring young people through his example of faith, technology, and service. In particular, Friends of Carlo seeks to foster young people's screen-based friendship with Jesus by listening to their hopes, challenges, and experiences, and helping them encounter Him online through practical guidance, accompaniment, and meaningful digital engagement.",
      "Josefina has been VIRTUS-certified in accordance with the Archdiocese of Los Angeles SAFE Environment policies for 17 years.",
      "For more than a decade, Josefina has served in various volunteer ministries at St. Monica Catholic Community (SMCC), helping children and adults deepen their relationship with Jesus and grow in faith. As a volunteer catechist in SMCC's Religious Education/Faith Formation Ministry for 13 years, she accompanied children in coming to know Jesus more intimately. She also served on SMCC's Adult Faith Formation/Education Council, where she helped reorganize the parish's Faith Formation Ministries and launch initiatives aligned with its Strategic Vision Plan 2020, including seasonal small faith-sharing groups, speaker series, and Voices of Faith.",
      "Josefina completed the eight-month 2023-2024 Ignatian Spiritual Exercises in Everyday Life Retreat at the St. Monica Spirituality Center and currently serves as a volunteer lector in SMCC's Liturgy Ministry.",
    ],
  },
  {
    id: "7",
    name: "Father Matthew",
    role: "Spiritual Director",
    image: "/Fr.Matthew-FOC.png",
    column: 1,
    social: { linkedin: "#" },
    bio: [
      "\"Your eyes beheld my unformed body. In your book was written all the days that were ordained for me, when none of them as yet existed.\" (Ps. 139:16) God knew us even before we were born. No one comes into this world by mistake or mishap, and no life is a fluke of nature. Rather, God creates each person with a purpose in mind.",
      "I was born in Nanvilli, in what was then Ghana's Upper Region, into a family of six children. It was no accident that my parents, despite having no formal education, accepted Christianity when the Missionaries of Africa arrived in our area. Nor was it by chance that my father insisted all his children receive an education, despite cultural resistance at the time.",
      "From an early age, I felt called to the priesthood, inspired by the missionaries who celebrated Mass in our village. After completing my Advanced Level certificate, I was offered the rare opportunity to complete my National Service at an insurance company many would have given anything to join. This slowed my path toward the seminary, particularly when I received a study leave with pay to pursue an accounting degree at Ghana's most prestigious university, with the promise of returning to a managerial position. Although this path held great promise, it could not quiet the deeper call God had placed in my heart. In September 1985, I entered St. Victor's Major Seminary.",
      "Ordained to the priesthood in 1992, I began ministry in newly established and resource-poor parishes, first at St. Cecilia's Parish. I later served as a chaplain and teacher at a boys' secondary school.",
      "My journey eventually brought me to California, where I resided at St. Monica Catholic Community and earned a Master's degree in School Administration before returning to Ghana to serve as a Catholic school principal. Today, I serve as Cathedral Administrator of the Roman Catholic Diocese of Wa in the Metropolitan Ecclesiastic Province of Tamale in Ghana, under the leadership of the Most Rev. Francis Bomansaan, M.Afr., Bishop of Wa, Ghana. I remain deeply grateful for every step along the path God prepared for me long before I took my first breath.",
    ],
  },
  {
    id: "1",
    name: "Carmen Romero",
    role: "Board Member",
    image: "/carmenpic1.jpeg",
    social: { linkedin: "https://www.linkedin.com/in/romerocarmen/" },
    bio: [
      "Carmen Romero is a board member of Friends of St. Carlo, bringing a multidisciplinary background in technology, business strategy, and community engagement. She holds an MBA from Rome City Institute, where she graduated top of her class and was recognized as Master's Student of the Year. Carmen also holds a Bachelor's in Computer Science from Seattle University and a Game Design Certification from the University of Washington.",
      "She supports the foundation's mission through strategic planning and program development, with a commitment to honor Carlo's legacy. Carmen is dedicated to advancing socially responsible innovation and strengthening educational initiatives that empower young people. In her personal time, she's an avid reader, a proud Sims 4 addict, and happiest when she's near the water.",
    ],
  },
  {
    id: "3",
    name: "Sebastian Rocha",
    role: "Technology Director",
    image: "/seaheadshot.jpg",
    objectPosition: "center 25%",
    social: { linkedin: "https://www.linkedin.com/in/sebastian-rocha1/" },
    bio: [
      "Sebastian Rocha serves as Technology Director for Friends of St. Carlo Acutis. He earned a bachelor's degree in Computer Science from Loyola Marymount University, with a minor in Statistics and Data Science. His experience spans information technology, product management, and web development, including building accessible digital experiences and using technology to connect organizations with the communities they serve.",
      "Sebastian is especially inspired by St. Carlo Acutis, a self-taught developer who used his technical gifts to share the Catholic faith with others. Through Friends of Carlo, Sebastian hopes to help young people encounter Jesus through digital spaces that feel welcoming, meaningful, and sincere. He believes technology is at its best when it helps even one person feel closer to God.",
    ],
  },
  {
    id: "6",
    name: "Johnny Vrba",
    role: "Creative Director",
    image: "/JohnnyVrba_Headshot_02.webp",
    column: 3,
    social: { linkedin: "https://www.linkedin.com/in/vrba/" },
    bio: [
      "Johnny Vrba is an artist, author, and missionary from the greater Chicagoland area. He served as a college campus missionary from 2022 to 2024 at the University of St. Thomas in Saint Paul, Minnesota. He is the author of Seas the Day: The True Story of Fear, Friendship, and Faith While Stranded at Sea During Covid-19.",
      "His latest mission is to be a catalyst for a new renaissance within the Catholic Church by inspiring the next generation of young artists through storytelling and deeply meaningful multimedia art. During working hours, Johnny helps curate content that amplifies light as a Business Affairs and Acquisitions Administrator at Angel Studios.",
    ],
  },
  {
    id: "4",
    name: "John McEvoy",
    role: "Board Secretary & Treasurer",
    image: "/john-foc.jpg",
    column: 2,
    social: { linkedin: "#" },
    bio: [
      "John McEvoy is a dedicated Construction Safety Director whose vocation has always centered on protecting people, strengthening communities, and building environments where others can thrive. With years of experience guiding teams, supporting large-scale initiatives, and safeguarding the well-being of those entrusted to his care, John brings a steady, service-driven presence to every role he undertakes.",
      "His commitment to Friends of St. Carlo Acutis is rooted in a deep desire to help others encounter faith in a way that is accessible, modern, and meaningful.",
      "Inspired by St. Carlo's example — living holiness through everyday life, technology, and joyful simplicity — John serves to advance the mission of spreading St. Carlo's message of hope and love.",
      "For John, this work is more than volunteerism; it is a calling. He believes in creating safe, welcoming spaces where young people can grow spiritually, connect with one another, and discover the beauty of a faith that is lived authentically.",
    ],
  },
];

function Board() {
  return (
    <section className="py-28 px-6 bg-navy-dark" id="board">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <AnimateIn>
            <h2 className="font-serif text-4xl md:text-5xl font-semibold text-gold">
              Board of Directors
            </h2>
          </AnimateIn>
        </div>

        <AnimateIn delay={0.15}>
          <TeamShowcase members={boardMembers} />
        </AnimateIn>
      </div>
    </section>
  );
}

/* ─── Governance ─────────────────────────────────────────────────────── */
function Governance() {
  return (
    <section className="py-24 px-6 bg-white" id="governance">
      <div className="max-w-5xl mx-auto">

        {/* Centered headline */}
        <div className="text-center mb-14">
          <AnimateIn>
            <p className="text-gold-dark text-[10px] font-semibold tracking-[0.25em] uppercase mb-5">
              Governance
            </p>
          </AnimateIn>
          <AnimateIn delay={0.08}>
            <h2 className="font-serif text-4xl lg:text-5xl font-semibold text-navy leading-tight mb-6">
              Transparency You Can Trust
            </h2>
          </AnimateIn>
          <AnimateIn delay={0.14}>
            <p className="text-navy/55 text-lg max-w-2xl mx-auto leading-relaxed">
              We operate with the highest standards of nonprofit governance and
              financial transparency. Our donors deserve to know that every
              dollar is being used to advance the mission.
            </p>
          </AnimateIn>
        </div>

        {/* 3×2 stat cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { label: "Companies trust our governance model", value: "501(c)(3)" },
            { label: "Years of transparent operations",      value: "2+"        },
            { label: "Dedicated board members",              value: "6"         },
            { label: "Administrative overhead rate",         value: "< 15%"     },
            { label: "Annual report availability",           value: "Available" },
            { label: "Independent charity rating",           value: "Excellent" },
          ].map(({ label, value }, i) => (
            <AnimateIn key={label} delay={i * 0.08}>
              <div className="bg-[#f4f4f4] rounded-xl p-10 text-center">
                <p className="text-navy font-bold text-3xl mb-3">
                  <span className="text-gold mr-1">↑</span>{value}
                </p>
                <p className="text-navy/50 text-sm leading-snug">{label}</p>
              </div>
            </AnimateIn>
          ))}
        </div>

        {/* Governance detail */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-12">
          <AnimateIn delay={0.05}>
            <h3 className="font-serif text-2xl font-semibold text-navy mb-4">
              Board Oversight
            </h3>
            <p className="text-navy/60 text-base leading-relaxed">
              Our Board of Directors is responsible for setting the mission and
              strategic direction of Friends of St. Carlo Acutis, Inc. and for
              overseeing its finances, operations, and policies as set forth in
              the Articles of Incorporation, and the Bylaws. The Board of
              Directors regularly reviews the operations and policies of the
              organization to ensure that they comply with all legal
              requirements and reflect the best practices in the field.
            </p>
          </AnimateIn>

          <AnimateIn delay={0.1}>
            <h3 className="font-serif text-2xl font-semibold text-navy mb-4">
              FOC Bylaws
            </h3>
            <p className="text-navy/60 text-base leading-relaxed">
              The Friends of St. Carlo Acutis, Inc.&rsquo;s Bylaws are the
              internal operating rules set by the Board of Directors to ensure
              the organization is structured and operated exclusively for
              charitable, religious, educational, and scientific purposes
              within the meaning of Section 501(c)(3) of the Internal Revenue
              Code and in compliance with California laws governing public
              benefit corporations.
            </p>
          </AnimateIn>
        </div>

      </div>
    </section>
  );
}

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <ScrollWaveGallery />
      <AboutScrollTypography />
      <Board />
      <Governance />
    </>
  );
}
