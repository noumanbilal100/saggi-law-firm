import type { Metadata } from "next";
import Image from "next/image";

/**
 * Standalone Google-Ads landing page.
 *
 * Port of the client's original WordPress design (Elementor-authored,
 * page ID 5845 in the retired WP DB) — kept faithfully because that
 * design was already tuned for conversion and the client had signed
 * off on it. Only this page uses this palette (navy #0d1b2a / gold
 * #b08d3f, Georgia serif); the rest of the site follows the relocked
 * brand tokens.
 *
 * Page-specific contact details — the landing carries its own tracked
 * number and WhatsApp link so ad-driven leads route separately from
 * the main firm line.
 */

const CONTACT = {
  phone: "+1 437-605-6573",
  phoneHref: "tel:+14376056573",
  whatsappHref: "https://wa.me/14376056573",
  email: "Aman.usman.legal@gmail.com",
  emailHref: "mailto:Aman.usman.legal@gmail.com",
  addressLine1: "2250 Bovaird Dr E, Unit 401",
  addressLine2: "Brampton, ON L6R 0W3",
  city: "Brampton, Ontario",
  region: "Serving the Greater Toronto Area",
  hours: "Available 24/7 — including weekends and holidays",
  mapsQuery: "2250+Bovaird+Dr+E+Unit+401+Brampton+ON+L6R+0W3",
  mapsHref:
    "https://www.google.com/maps/search/?api=1&query=2250+Bovaird+Dr+E+Unit+401+Brampton+ON+L6R+0W3",
} as const;

/** Two hand-picked Google reviews used for the on-page social proof.
    Kept short so the visual weight stays on the CTAs above and below. */
const REVIEWS = [
  {
    author: "Kiran Dhaliwal",
    credentials: "Local Guide · Google Review",
    text:
      "TRUST HIM BLINDLY, HE WILL NOT LET YOU DOWN. I am extremely grateful to Mr. Saggi for handling my case with outstanding professionalism and dedication.",
  },
  {
    author: "LAKHVEER SINGH",
    credentials: "Verified Google Review",
    text:
      "Mr. Saggi is a very good lawyer. He listens politely and is available all the time. He helped me get assault-with-weapon charges dropped. The best lawyer in Ontario.",
  },
] as const;

/** Landing-specific FAQs — power the accordion at the bottom of the
    page AND the FAQPage JSON-LD so Google can surface answers directly
    in the search results the ad targets. */
const FAQS = [
  {
    q: "How quickly can I speak to a criminal defence lawyer?",
    a: "You can reach a criminal defence lawyer directly, 24 hours a day, seven days a week. Call the number on this page or send a WhatsApp message and someone from the firm will respond as soon as possible — often within minutes.",
  },
  {
    q: "Is the first consultation really free?",
    a: "Yes. The initial consultation is free and confidential. Its purpose is to understand your situation, review the allegations at a high level, explain the legal process, and outline the options that may be available in your case.",
  },
  {
    q: "What areas do you serve?",
    a: "The firm is headquartered in Brampton and represents clients throughout the Greater Toronto Area, including Toronto, Mississauga, Vaughan, Etobicoke, Scarborough, and courthouses across Peel and the surrounding GTA.",
  },
  {
    q: "What if I was arrested outside of business hours?",
    a: "Criminal matters don't wait for business hours. The firm's direct line is monitored 24/7 so you can speak with counsel about a bail hearing, police questioning, or an urgent charge as soon as it happens.",
  },
  {
    q: "What information should I have ready when I call?",
    a: "If it is safe to do so, have any charge documents, a copy of the release conditions, and the next court date in front of you. It also helps to have a short summary of what happened and any names of officers involved. If you don't have any of this yet, call anyway — we'll work through it together.",
  },
] as const;

export const metadata: Metadata = {
  title:
    "Criminal Defence Legal Guidance in Brampton — Saggi Law Firm",
  description:
    "Facing criminal charges in Brampton or the Greater Toronto Area? Speak with a criminal defence lawyer today. Call, WhatsApp, or email — direct line to a lawyer, no gatekeepers.",
  alternates: {
    canonical: "/criminal-defence-legal-guidance-in-brampton",
  },
  openGraph: {
    title:
      "Criminal Defence Legal Guidance in Brampton — Saggi Law Firm",
    description:
      "Speak with a criminal defence lawyer today. Call, WhatsApp, or email — direct line to a lawyer serving Brampton and the GTA.",
    type: "website",
  },
};

const legalServiceJsonLd = {
  "@context": "https://schema.org",
  "@type": "LegalService",
  name: "Saggi Law Firm — Criminal Defence Legal Guidance in Brampton",
  telephone: CONTACT.phoneHref.replace("tel:", ""),
  email: CONTACT.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: CONTACT.addressLine1,
    addressLocality: "Brampton",
    addressRegion: "ON",
    postalCode: "L6R 0W3",
    addressCountry: "CA",
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "5.0",
    reviewCount: "93",
  },
  areaServed: [
    "Brampton",
    "Toronto",
    "Mississauga",
    "Greater Toronto Area",
    "Ontario",
    "Canada",
  ],
  serviceType: "Criminal defence law",
};

/** FAQPage schema — lets Google surface these Q&A pairs directly in
    the search result the ad targets, which lifts the ad's quality
    score and cuts the click cost for the same position. */
const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

/* ------------------------------ page ---------------------------------- */

export default function LandingPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(legalServiceJsonLd),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* Georgia serif overrides the site's Fraunces/Manrope; the WP
          page relied on classic serif type and that reading rhythm is
          part of what the client approved. Bottom padding leaves room
          for the sticky mobile CTA. */}
      <div
        className="pb-[76px] text-[17px] leading-[1.75] text-[#3d4a57] sm:pb-0"
        style={{
          fontFamily: 'Georgia, "Times New Roman", serif',
        }}
      >
        <TrustBar />
        <Hero />
        <ContactStrip />
        <Testimonials />
        <LegalConcern />
        <ChargedWithOffence />
        <PracticeAreas />
        <OurFirm />
        <WhatToExpect />
        <Jurisdiction />
        <WhyChooseFirm />
        <UnderstandingProcess />
        <OfficeLocation />
        <Faq />
        <SpeakWithCounsel />
        <GetStarted />
        <FooterBar />
      </div>
      <StickyMobileCta />
    </>
  );
}

/* ------------------------------ blocks -------------------------------- */

function Hero() {
  return (
    <section className="bg-gradient-to-b from-[#0d1b2a] to-[#132a41] text-[#c9d3dd]">
      <div className="grid items-stretch md:grid-cols-[55%_45%]">
        <div className="px-6 py-14 md:py-20 lg:py-24">
          <div className="ml-auto max-w-[600px] md:pl-6">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#b08d3f]/40 bg-[#b08d3f]/15 px-3 py-1.5 font-sans text-[11.5px] font-bold uppercase tracking-[0.14em] text-[#d6b872]" style={{ fontFamily: "Arial, Helvetica, sans-serif" }}>
              <span aria-hidden className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#d6b872]/60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#d6b872]" />
              </span>
              Available 24/7 · Free Consultation
            </div>
            <Eyebrow light>Saggi Law Firm — Criminal Defence</Eyebrow>
            <h1 className="mt-4 font-serif text-[clamp(30px,4.2vw,50px)] font-bold leading-[1.1] tracking-[-0.01em] text-white">
              Protect Your Future: Speak With a Criminal Defence Lawyer in
              Toronto now
            </h1>
            <GoldRule />
            <p className="mt-6 text-[#c3cfda]">
              If you have been charged with a crime, arrested, or are facing
              a criminal charge, having the right lawyer can make a
              significant difference. Our criminal defence lawyer team
              provides focused criminal law services for individuals facing
              criminal offences. We understand that every criminal case is
              different, and we build a defence strategy around the
              specific facts, evidence, and complexity of the case.
            </p>
            <p className="mt-4 text-[#c3cfda]">
              Whether you need an experienced criminal defence lawyer, an
              experienced criminal lawyer, or immediate legal advice after
              an arrest, our law firm is prepared to help. We provide
              strong legal representation while working to protect your
              rights throughout the criminal justice system.
            </p>
            <ActionsRow variant="hero" />
          </div>
        </div>

        <div className="relative min-h-[300px] md:min-h-[520px] order-first md:order-last">
          <Image
            src="/landing-brampton/saggi-hero-criminal-defence-lawyer.jpg"
            alt="Criminal defence lawyer in a navy suit standing in a Canadian courthouse corridor before a court appearance"
            fill
            priority
            sizes="(max-width: 900px) 100vw, 45vw"
            className="object-cover"
          />
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(90deg, rgba(13,27,42,0.92) 0%, rgba(13,27,42,0.35) 45%, rgba(13,27,42,0.55) 100%)",
            }}
          />
        </div>
      </div>
    </section>
  );
}

function ContactStrip() {
  const items = [
    {
      k: "Call directly",
      v: CONTACT.phone,
      href: CONTACT.phoneHref,
      icon: PhoneIcon,
    },
    {
      k: "WhatsApp",
      v: "Message a lawyer",
      href: CONTACT.whatsappHref,
      icon: WhatsAppIcon,
      external: true,
    },
    {
      k: "Email",
      v: CONTACT.email,
      href: CONTACT.emailHref,
      icon: MailIcon,
    },
  ];
  return (
    <section
      className="border-t border-white/10 bg-[#132a41]"
      aria-label="Contact"
    >
      <Wrap>
        <div className="flex flex-wrap gap-3.5 py-6">
          {items.map(({ k, v, href, icon: I, external }) => (
            <a
              key={k}
              href={href}
              {...(external
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
              className="group flex flex-1 basis-[260px] items-center gap-4 border border-white/15 bg-white/[0.03] p-4 no-underline transition-all duration-200 hover:border-[#b08d3f] hover:bg-[#b08d3f]/10"
            >
              <span className="grid h-11 w-11 flex-shrink-0 place-items-center rounded-full border border-white/15 text-[#d6b872] transition-colors group-hover:border-[#b08d3f] group-hover:text-[#d6b872]">
                <I />
              </span>
              <span className="min-w-0">
                <span
                  className="block truncate font-sans text-[11px] font-bold uppercase tracking-[0.2em] text-[#d6b872]"
                  style={{ fontFamily: "Arial, Helvetica, sans-serif" }}
                >
                  {k}
                </span>
                <span className="mt-1 block truncate font-serif text-[18px] text-white">
                  {v}
                </span>
              </span>
            </a>
          ))}
        </div>
        <p className="pb-6 text-center text-[13px] font-semibold uppercase tracking-[0.18em] text-white/50">
          {CONTACT.location}
        </p>
      </Wrap>
    </section>
  );
}

function LegalConcern() {
  return (
    <SoftSection>
      <div className="grid items-center gap-10 md:grid-cols-2 md:gap-14">
        <div>
          <Eyebrow>Your Legal Concern</Eyebrow>
          <h2 className="mt-3 font-serif text-[clamp(25px,3vw,36px)] font-bold leading-[1.15] tracking-[-0.01em] text-[#0d1b2a]">
            Experienced Criminal Lawyer for Criminal Charges
          </h2>
          <GoldRule />
          <p className="mt-6">
            A criminal charge can affect your employment, family,
            reputation, travel, finances, and future. The criminal justice
            process can also be complicated, particularly when you are
            unfamiliar with the court system, the criminal code, or your
            legal rights.
          </p>
          <p className="mt-4">
            Our criminal lawyer can explain the allegations against you,
            the potential consequences of a criminal conviction, and the
            available defence options. From your first consultation
            through court appearances, we provide practical legal services
            and strategic defence counsel focused on achieving the best
            possible result.
          </p>
          <ActionsRow />
        </div>
        <figure className="relative aspect-[4/3] border border-[#e2e6ea] bg-[#0d1b2a] md:min-h-[340px] md:shadow-[-18px_18px_0_rgba(176,141,63,0.18)]">
          <Image
            src="/landing-brampton/saggi-arrest-legal-concern.jpg"
            alt="Man detained in a police interview room after an arrest, waiting to speak with a criminal defence lawyer"
            fill
            sizes="(max-width: 900px) 100vw, 45vw"
            className="object-cover"
          />
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(13,27,42,0.12), rgba(13,27,42,0.5))",
            }}
          />
        </figure>
      </div>
    </SoftSection>
  );
}

function ChargedWithOffence() {
  return (
    <BasicSection>
      <div className="max-w-[820px]">
        <Eyebrow>Why Legal Representation Matters</Eyebrow>
        <h2 className="mt-3 font-serif text-[clamp(25px,3vw,36px)] font-bold leading-[1.15] tracking-[-0.01em] text-[#0d1b2a]">
          Charged With a Criminal Offence?
        </h2>
        <GoldRule />
        <p className="mt-6 text-[19px]">
          If you have been charged with a criminal offence, do not assume
          that a conviction is inevitable. Depending on the circumstances,
          a skilled lawyer may challenge evidence, identify weaknesses in
          the prosecution&apos;s case, negotiate with the Crown
          prosecutor, or present a defence at criminal trial.
        </p>
        <blockquote
          className="my-8 border-l-[3px] border-[#b08d3f] pl-5 font-serif text-[20px] italic text-[#1c2733]"
        >
          You may have the right to remain silent and the right to legal
          counsel. Speaking with a criminal defence lawyer as early as
          possible can help you understand the reason for your arrest,
          your obligations, and the next steps in the legal process.
        </blockquote>
        <ActionsRow />
      </div>
    </BasicSection>
  );
}

function PracticeAreas() {
  const areas = [
    {
      title: "Impaired Driving",
      body: "Impaired driving charges can create serious legal and personal consequences. A criminal lawyer can review the circumstances of the stop, investigation, testing procedures, evidence, and allegations before advising you on your options.",
    },
    {
      title: "Drug Offences",
      body: "Drug-related allegations can involve significant penalties depending on the circumstances and the substances involved. Cases involving drug offences may require careful consideration of the Controlled Drugs and Substances Act, search procedures, possession allegations, and the evidence relied upon by prosecutors.",
    },
    {
      title: "Sexual Assault",
      body: "A sexual assault allegation is extremely serious and can have substantial consequences even before a case reaches trial. Experienced defence counsel can review the allegations and evidence, explain the legal process, and develop an appropriate strategy to achieve the best possible outcome.",
    },
    {
      title: "Other Criminal Offences",
      body: "We also assist with a variety of other criminal offences, including matters that may involve indictable offences, assault allegations, property offences, probation issues, and other charges under the Criminal Code of Canada.",
    },
  ];
  return (
    <SoftSection>
      <div className="max-w-[820px]">
        <Eyebrow>Practice Areas</Eyebrow>
        <h2 className="mt-3 font-serif text-[clamp(25px,3vw,36px)] font-bold leading-[1.15] tracking-[-0.01em] text-[#0d1b2a]">
          Criminal Defence Cases We Handle
        </h2>
        <GoldRule />
        <p className="mt-6">
          Our team of criminal defence lawyers assists clients with a
          broad range of criminal matters. Every offence requires an
          individual assessment because the appropriate strategy depends
          on the allegations, evidence, previous history, and
          circumstances surrounding the case.
        </p>
      </div>
      <div className="mt-10 grid gap-6 sm:grid-cols-2">
        {areas.map((a) => (
          <article
            key={a.title}
            className="group border border-[#e2e6ea] border-t-[3px] border-t-[#b08d3f] bg-white p-7 transition-all duration-200 hover:-translate-y-1 hover:border-[#0d1b2a] hover:border-t-[#b08d3f] hover:shadow-[0_18px_40px_-28px_rgba(13,27,42,0.55)]"
          >
            <h3 className="font-serif text-[19px] font-bold leading-[1.3] text-[#0d1b2a]">
              {a.title}
            </h3>
            <p className="mt-3 text-[16px]">{a.body}</p>
          </article>
        ))}
      </div>
      <ActionsRow />
    </SoftSection>
  );
}

function OurFirm() {
  return (
    <BasicSection>
      <div className="grid items-center gap-10 md:grid-cols-[45%_1fr] md:gap-14">
        <figure className="relative aspect-[4/3] border border-[#e2e6ea] bg-[#0d1b2a] md:min-h-[340px] md:shadow-[18px_18px_0_rgba(176,141,63,0.18)]">
          <Image
            src="/landing-brampton/saggi-firm-case-review.jpg"
            alt="Criminal defence legal team reviewing disclosure and Criminal Code of Canada materials in a law firm boardroom"
            fill
            sizes="(max-width: 900px) 100vw, 45vw"
            className="object-cover"
          />
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(13,27,42,0.12), rgba(13,27,42,0.5))",
            }}
          />
        </figure>
        <div>
          <Eyebrow>Our Firm</Eyebrow>
          <h2 className="mt-3 font-serif text-[clamp(25px,3vw,36px)] font-bold leading-[1.15] tracking-[-0.01em] text-[#0d1b2a]">
            Criminal Defence Lawyer Focused on Your Rights
          </h2>
          <GoldRule />
          <p className="mt-6">
            When you are facing criminal charges, you need representation
            that understands both the law and the practical realities of
            the criminal justice system. Our criminal defence lawyer
            approaches each case by carefully reviewing the allegations,
            evidence, disclosure, applicable legislation, and procedural
            history.
          </p>
          <p className="mt-4">
            The goal is not simply to appear in court. The goal is to
            provide the best representation possible and pursue the best
            outcome available under the circumstances. Depending on the
            case, this may involve negotiations, applications, a bail
            hearing, resolution discussions, or preparation for trial.
          </p>
          <ActionsRow />
        </div>
      </div>
    </BasicSection>
  );
}

function WhatToExpect() {
  const items = [
    "Understanding your criminal charge and allegations",
    "Preparing for a bail hearing",
    "Reviewing disclosure and evidence",
    "Advising on potential defence strategies",
    "Negotiating with the Crown prosecutor",
    "Preparing for court appearances",
    "Representing you during a criminal trial",
    "Addressing probation and sentencing concerns",
    "Pursuing an acquittal where appropriate",
    "Explaining the potential consequences of different legal options",
  ];
  return (
    <SoftSection>
      <div className="max-w-[820px]">
        <Eyebrow>What to Expect</Eyebrow>
        <h2 className="mt-3 font-serif text-[clamp(25px,3vw,36px)] font-bold leading-[1.15] tracking-[-0.01em] text-[#0d1b2a]">
          Legal Representation From Arrest to Resolution
        </h2>
        <GoldRule />
        <p className="mt-6">
          Being arrested and charged can be overwhelming. Early decisions
          can influence how a case develops, which is why timely legal
          advice matters.
        </p>
        <p className="mt-4">Our criminal lawyer can assist with matters such as:</p>
      </div>
      <ul className="mt-6 grid list-none gap-x-9 sm:grid-cols-2">
        {items.map((it) => (
          <li
            key={it}
            className="relative border-b border-[#e2e6ea] py-3.5 pl-8 text-[16.5px]"
          >
            <span
              aria-hidden
              className="absolute left-0 top-[26px] block h-0.5 w-3 bg-[#b08d3f]"
            />
            {it}
          </li>
        ))}
      </ul>
      <ActionsRow />
    </SoftSection>
  );
}

function Jurisdiction() {
  return (
    <BasicSection>
      <div className="max-w-[820px]">
        <Eyebrow>Jurisdiction</Eyebrow>
        <h2 className="mt-3 font-serif text-[clamp(25px,3vw,36px)] font-bold leading-[1.15] tracking-[-0.01em] text-[#0d1b2a]">
          Toronto Criminal Defence Lawyer and Lawyers in Canada
        </h2>
        <GoldRule />
        <p className="mt-6">
          Criminal law is governed by Canadian federal legislation,
          including the Criminal Code of Canada, while certain procedural
          and provincial considerations may vary. If you are searching for
          a Toronto criminal defence lawyer, comparing lawyers in Canada,
          or looking for representation connected to Ontario, it is
          important to choose counsel who understands the jurisdiction in
          which your matter is proceeding.
        </p>
        <p className="mt-4">
          Individuals facing criminal allegations should seek a lawyer
          familiar with the applicable provincial and federal legal
          framework. A top criminal defence lawyer should be able to
          explain how the allegations, evidence, jurisdiction, and court
          system may affect your case.
        </p>
      </div>
    </BasicSection>
  );
}

function WhyChooseFirm() {
  return (
    <SoftSection>
      <div className="max-w-[820px]">
        <Eyebrow>Why Choose Our Firm</Eyebrow>
        <h2 className="mt-3 font-serif text-[clamp(25px,3vw,36px)] font-bold leading-[1.15] tracking-[-0.01em] text-[#0d1b2a]">
          Why Choose an Experienced Criminal Defence Lawyer?
        </h2>
        <GoldRule />
        <p className="mt-6">
          Choosing the best lawyer for a criminal matter is an important
          decision. Experience matters because criminal cases can involve
          complicated evidence, procedural requirements, negotiations,
          and competing legal strategies.
        </p>
        <p className="mt-4">
          An experienced criminal defence lawyer can help you understand
          the strengths and weaknesses of your case rather than making
          assumptions about the outcome. Our team of criminal defence
          professionals evaluates each matter individually and works
          toward a strategy designed to achieve the best possible
          outcome.
        </p>
      </div>
      <div className="mt-10 grid gap-6 sm:grid-cols-2">
        <article className="border border-[#e2e6ea] border-t-[3px] border-t-[#b08d3f] bg-white p-7">
          <h3 className="font-serif text-[19px] font-bold leading-[1.3] text-[#0d1b2a]">
            Protect Your Rights and Your Future
          </h3>
          <p className="mt-3 text-[16px]">
            A criminal allegation does not define you. However, ignoring a
            criminal charge can create unnecessary risks. A conviction may
            affect your criminal record, career opportunities, immigration
            or travel plans, relationships, and other areas of your life.
          </p>
          <p className="mt-3.5 text-[16px]">
            Our role is to provide clear advice, strong legal
            representation, and informed advocacy throughout your criminal
            defence cases. We work within the standards established by
            the Law Society, applicable Canadian legislation, and the
            principles of the Canadian justice system.
          </p>
        </article>
        <article className="border border-[#e2e6ea] border-t-[3px] border-t-[#b08d3f] bg-white p-7">
          <h3 className="font-serif text-[19px] font-bold leading-[1.3] text-[#0d1b2a]">
            Your Case Deserves Individual Attention
          </h3>
          <p className="mt-3 text-[16px]">
            There is no universal strategy for a criminal case. The
            appropriate approach depends on the offence, evidence,
            witnesses, disclosure, procedural history, and your
            objectives.
          </p>
          <p className="mt-3.5 text-[16px]">
            Whether you need representation for impaired driving, sexual
            assault, drug offences, or another criminal matter, our
            experienced criminal lawyer will assess the circumstances and
            explain your available options.
          </p>
        </article>
      </div>
      <ActionsRow />
    </SoftSection>
  );
}

function UnderstandingProcess() {
  return (
    <section className="relative overflow-hidden bg-[#0d1b2a] text-[#c9d3dd]">
      <Image
        src="/landing-brampton/saggi-courtroom-justice-process.jpg"
        alt="Empty Canadian courtroom with judge's bench, where criminal trials and bail hearings take place"
        fill
        sizes="100vw"
        className="object-cover opacity-[0.32]"
      />
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(100deg, rgba(13,27,42,0.96) 0%, rgba(13,27,42,0.82) 55%, rgba(19,42,65,0.78) 100%)",
        }}
      />
      <div className="relative z-[1] py-16 md:py-20 lg:py-24">
        <Wrap>
          <div className="max-w-[820px]">
            <Eyebrow light>Important Information</Eyebrow>
            <h2 className="mt-3 font-serif text-[clamp(25px,3vw,36px)] font-bold leading-[1.15] tracking-[-0.01em] text-white">
              Understanding the Criminal Justice Process
            </h2>
            <span
              className="mt-5 block h-[3px] w-[66px] bg-[#b08d3f]"
              aria-hidden
            />
            <p className="mt-6 text-[#c9d3dd]">
              The criminal justice process may involve arrest, charges,
              release conditions, a bail hearing, disclosure, pre-trial
              discussions, applications, trial, sentencing, and possible
              appeals. Not every case follows the same path.
            </p>
            <p className="mt-4 text-[#c9d3dd]">
              For example, some cases may be resolved without a trial,
              while others require extensive preparation for court.
              Matters involving indictable offences can carry particularly
              serious consequences and may require detailed preparation
              and experienced defence counsel.
            </p>
            <p className="mt-4 text-[#c9d3dd]">
              Canadian criminal law is supported by federal institutions
              and legislation, including the Federal Department of
              Justice, while appeals and significant legal questions can
              ultimately reach courts such as the Supreme Court of Canada.
              Your lawyer&apos;s role is to explain how the law applies to
              your particular circumstances and help you make informed
              decisions.
            </p>
            <ActionsRow variant="dark" />
          </div>
        </Wrap>
      </div>
    </section>
  );
}

function SpeakWithCounsel() {
  return (
    <BasicSection>
      <div className="max-w-[820px]">
        <Eyebrow>Speak With Counsel</Eyebrow>
        <h2 className="mt-3 font-serif text-[clamp(25px,3vw,36px)] font-bold leading-[1.15] tracking-[-0.01em] text-[#0d1b2a]">
          Facing Criminal Charges? Speak With a Criminal Defence Lawyer
        </h2>
        <GoldRule />
        <p className="mt-6">
          If you have been charged with a crime, facing a criminal
          offence, or are concerned about an investigation, getting
          professional advice early can help you understand what happens
          next. Do not make important decisions about your case without
          understanding your legal rights and potential consequences.
        </p>
        <p className="mt-4">
          Our top criminal defence team provides focused criminal law
          representation and is committed to providing responsive legal
          services, strategic advocacy, and the best possible
          representation for every client.
        </p>
        <ActionsRow />
      </div>
    </BasicSection>
  );
}

function GetStarted() {
  return (
    <SoftSection>
      <div className="max-w-[820px]">
        <Eyebrow>Get Started</Eyebrow>
        <h2 className="mt-3 font-serif text-[clamp(25px,3vw,36px)] font-bold leading-[1.15] tracking-[-0.01em] text-[#0d1b2a]">
          Get Legal Advice About Your Criminal Case
        </h2>
        <GoldRule />
        <p className="mt-6">
          If you need a criminal defence lawyer, contact our law firm to
          discuss your situation. We can explain the allegations, the
          legal process, possible outcomes, and the steps that may be
          available to defend your rights.
        </p>
        <p className="mt-4">
          Whether you are preparing for your first court appearance or
          dealing with an ongoing criminal trial, having an experienced
          criminal defence lawyer on your side can help you navigate the
          justice system with greater clarity and confidence.
        </p>
        <p className="mt-4">
          Contact our criminal defence team today to discuss your
          criminal matter and learn how we can help you pursue the best
          possible outcome.
        </p>
        <ActionsRow />
      </div>
    </SoftSection>
  );
}

/* ------------------------- Google Ads adds ---------------------------- */

function TrustBar() {
  const items = [
    { k: "5.0", v: "★★★★★ Google rated" },
    { k: "93+", v: "Client reviews" },
    { k: "14+", v: "Years defending in Ontario" },
    { k: "24/7", v: "Direct-line availability" },
  ];
  return (
    <div className="border-b border-white/10 bg-[#0a1520] text-[#d6b872]">
      <div className="mx-auto flex max-w-[1180px] flex-wrap items-center justify-center gap-x-8 gap-y-2 px-6 py-2.5 text-center font-sans text-[12px] font-semibold uppercase tracking-[0.14em]" style={{ fontFamily: "Arial, Helvetica, sans-serif" }}>
        {items.map((it, i) => (
          <span key={it.k} className="inline-flex items-center gap-2">
            <span className="text-white">{it.k}</span>
            <span className="text-[#d6b872]/80">{it.v}</span>
            {i < items.length - 1 && (
              <span aria-hidden className="ml-6 hidden text-white/25 sm:inline">·</span>
            )}
          </span>
        ))}
      </div>
    </div>
  );
}

function Testimonials() {
  return (
    <BasicSection>
      <div className="max-w-[820px]">
        <Eyebrow>Client Reviews</Eyebrow>
        <h2 className="mt-3 font-serif text-[clamp(25px,3vw,36px)] font-bold leading-[1.15] tracking-[-0.01em] text-[#0d1b2a]">
          What clients say about working with the firm.
        </h2>
        <GoldRule />
        <p className="mt-6">
          Google-verified reviews from clients whose criminal matters
          the firm has handled. See the full 93+ reviews on the Google
          Business Profile.
        </p>
      </div>
      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {REVIEWS.map((r) => (
          <blockquote
            key={r.author}
            className="border border-[#e2e6ea] border-l-[3px] border-l-[#b08d3f] bg-white p-7"
          >
            <div className="mb-3 flex items-center gap-2 text-[16px] tracking-[0.1em] text-[#b08d3f]">
              {"★★★★★".split("").map((s, i) => (
                <span key={i} aria-hidden>
                  {s}
                </span>
              ))}
            </div>
            <p className="font-serif text-[17px] italic leading-[1.6] text-[#1c2733]">
              &ldquo;{r.text}&rdquo;
            </p>
            <footer className="mt-4 border-t border-[#e2e6ea] pt-3 text-[13px]">
              <span className="block font-semibold text-[#0d1b2a]">
                {r.author}
              </span>
              <span
                className="mt-0.5 block font-sans text-[11.5px] uppercase tracking-[0.14em] text-[#b08d3f]"
                style={{ fontFamily: "Arial, Helvetica, sans-serif" }}
              >
                {r.credentials}
              </span>
            </footer>
          </blockquote>
        ))}
      </div>
    </BasicSection>
  );
}

function OfficeLocation() {
  return (
    <SoftSection>
      <div className="grid items-stretch gap-10 md:grid-cols-[1fr_1.2fr] md:gap-14">
        <div>
          <Eyebrow>Visit the Office</Eyebrow>
          <h2 className="mt-3 font-serif text-[clamp(25px,3vw,36px)] font-bold leading-[1.15] tracking-[-0.01em] text-[#0d1b2a]">
            Located in Brampton, serving the GTA.
          </h2>
          <GoldRule />
          <dl className="mt-8 grid gap-6">
            <div>
              <dt
                className="font-sans text-[11px] font-bold uppercase tracking-[0.2em] text-[#b08d3f]"
                style={{ fontFamily: "Arial, Helvetica, sans-serif" }}
              >
                Address
              </dt>
              <dd className="mt-2 font-serif text-[17px] leading-[1.55] text-[#0d1b2a]">
                {CONTACT.addressLine1}
                <br />
                {CONTACT.addressLine2}
              </dd>
            </div>
            <div>
              <dt
                className="font-sans text-[11px] font-bold uppercase tracking-[0.2em] text-[#b08d3f]"
                style={{ fontFamily: "Arial, Helvetica, sans-serif" }}
              >
                Hours
              </dt>
              <dd className="mt-2 text-[15.5px] leading-[1.55]">
                {CONTACT.hours}
              </dd>
            </div>
            <div>
              <dt
                className="font-sans text-[11px] font-bold uppercase tracking-[0.2em] text-[#b08d3f]"
                style={{ fontFamily: "Arial, Helvetica, sans-serif" }}
              >
                Direct line
              </dt>
              <dd className="mt-2">
                <a
                  href={CONTACT.phoneHref}
                  className="font-serif text-[24px] text-[#0d1b2a] no-underline hover:text-[#b08d3f]"
                >
                  {CONTACT.phone}
                </a>
              </dd>
            </div>
          </dl>
          <ActionsRow />
          <a
            href={CONTACT.mapsHref}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 text-[14px] font-semibold text-[#b08d3f] hover:text-[#8f7130]"
          >
            <PinIcon />
            Get directions on Google Maps →
          </a>
        </div>
        <div className="relative min-h-[380px] overflow-hidden border border-[#e2e6ea] bg-[#0d1b2a] md:min-h-[500px] md:shadow-[18px_18px_0_rgba(176,141,63,0.18)]">
          <iframe
            title="Saggi Law Firm office location on Google Maps"
            src={`https://maps.google.com/maps?q=${CONTACT.mapsQuery}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
            className="absolute inset-0 h-full w-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </SoftSection>
  );
}

function Faq() {
  return (
    <BasicSection>
      <div className="max-w-[820px]">
        <Eyebrow>Frequently Asked</Eyebrow>
        <h2 className="mt-3 font-serif text-[clamp(25px,3vw,36px)] font-bold leading-[1.15] tracking-[-0.01em] text-[#0d1b2a]">
          Answers before you call.
        </h2>
        <GoldRule />
        <div className="mt-8 divide-y divide-[#e2e6ea] border-t border-[#e2e6ea]">
          {FAQS.map((f) => (
            <details
              key={f.q}
              className="group border-b border-[#e2e6ea] py-5"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-serif text-[18px] font-bold text-[#0d1b2a] transition-colors group-open:text-[#b08d3f] [&::-webkit-details-marker]:hidden">
                {f.q}
                <span
                  aria-hidden
                  className="grid h-8 w-8 flex-shrink-0 place-items-center rounded-full border border-[#b08d3f] text-[16px] font-normal text-[#b08d3f] transition-transform group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p className="mt-3 text-[16px] leading-[1.7]">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </BasicSection>
  );
}

function StickyMobileCta() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 flex border-t border-[#b08d3f]/40 bg-[#0d1b2a] shadow-[0_-8px_24px_rgba(0,0,0,0.35)] sm:hidden">
      <a
        href={CONTACT.phoneHref}
        className="flex flex-1 items-center justify-center gap-2 border-r border-white/10 bg-[#b08d3f] py-4 font-sans text-[13px] font-bold uppercase tracking-[0.1em] text-white no-underline transition-colors hover:bg-[#8f7130]"
        style={{ fontFamily: "Arial, Helvetica, sans-serif" }}
      >
        <PhoneIcon />
        Call Now
      </a>
      <a
        href={CONTACT.whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-1 items-center justify-center gap-2 bg-[#25D366] py-4 font-sans text-[13px] font-bold uppercase tracking-[0.1em] text-white no-underline transition-colors hover:bg-[#1fb655]"
        style={{ fontFamily: "Arial, Helvetica, sans-serif" }}
      >
        <WhatsAppIcon />
        WhatsApp
      </a>
    </div>
  );
}

function PinIcon() {
  return (
    <svg
      aria-hidden
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function FooterBar() {
  return (
    <footer className="border-t border-white/10 bg-[#0d1b2a] py-8 text-center text-[13px] text-white/60">
      <Wrap>
        <p>
          © {new Date().getFullYear()} Saggi Law Firm Professional
          Corporation. All rights reserved.
        </p>
        <p className="mt-2">
          Direct line:{" "}
          <a
            href={CONTACT.phoneHref}
            className="border-b border-[#b08d3f] pb-0.5 text-white hover:text-[#d6b872]"
          >
            {CONTACT.phone}
          </a>{" "}
          · {CONTACT.email} · {CONTACT.city} · {CONTACT.region}
        </p>
      </Wrap>
    </footer>
  );
}

/* ------------------------------ shared -------------------------------- */

function Wrap({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto w-full max-w-[1180px] px-6">{children}</div>
  );
}

function BasicSection({ children }: { children: React.ReactNode }) {
  return (
    <section className="bg-white py-16 md:py-20 lg:py-24">
      <Wrap>{children}</Wrap>
    </section>
  );
}

function SoftSection({ children }: { children: React.ReactNode }) {
  return (
    <section className="border-b border-t border-[#e2e6ea] bg-[#f4f6f8] py-16 md:py-20 lg:py-24">
      <Wrap>{children}</Wrap>
    </section>
  );
}

function Eyebrow({
  children,
  light,
}: {
  children: React.ReactNode;
  light?: boolean;
}) {
  return (
    <p
      className={`font-sans text-[12px] font-bold uppercase tracking-[0.22em] ${
        light ? "text-[#d6b872]" : "text-[#b08d3f]"
      }`}
      style={{ fontFamily: "Arial, Helvetica, sans-serif" }}
    >
      {children}
    </p>
  );
}

function GoldRule() {
  return <span aria-hidden className="mt-5 block h-[3px] w-[66px] bg-[#b08d3f]" />;
}

function ActionsRow({
  variant = "default",
}: {
  variant?: "default" | "hero" | "dark";
}) {
  return (
    <div className="mt-8 flex flex-wrap gap-3.5">
      <a
        href={CONTACT.phoneHref}
        className="inline-flex items-center justify-center gap-2.5 border-2 border-[#b08d3f] bg-[#b08d3f] px-6 py-[15px] font-sans text-[13.5px] font-bold uppercase tracking-[0.09em] text-white no-underline transition-colors duration-200 hover:border-[#8f7130] hover:bg-[#8f7130]"
        style={{ fontFamily: "Arial, Helvetica, sans-serif" }}
      >
        <PhoneIcon />
        Call · Free Consultation
      </a>
      <a
        href={CONTACT.whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        className={
          variant === "hero" || variant === "dark"
            ? "inline-flex items-center justify-center gap-2.5 border-2 border-white/55 bg-transparent px-6 py-[15px] font-sans text-[13.5px] font-bold uppercase tracking-[0.09em] text-white no-underline transition-colors duration-200 hover:border-white hover:bg-white hover:text-[#0d1b2a]"
            : "inline-flex items-center justify-center gap-2.5 border-2 border-[#0d1b2a] bg-transparent px-6 py-[15px] font-sans text-[13.5px] font-bold uppercase tracking-[0.09em] text-[#0d1b2a] no-underline transition-colors duration-200 hover:bg-[#0d1b2a] hover:text-white"
        }
        style={{ fontFamily: "Arial, Helvetica, sans-serif" }}
      >
        <WhatsAppIcon />
        WhatsApp Us
      </a>
    </div>
  );
}

/* ---------------------------- tiny icons ------------------------------ */

function PhoneIcon() {
  return (
    <svg
      aria-hidden
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg aria-hidden width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.5 14.4c-.3-.2-1.8-.9-2.1-1s-.5-.2-.7.1c-.2.3-.8 1-.9 1.2-.2.2-.3.2-.6.1-.3-.2-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6.1-.1.3-.3.4-.5.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5s-.7-1.6-.9-2.2c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.4 0 1.4 1 2.8 1.2 3 .1.2 2 3.1 4.9 4.3.7.3 1.2.5 1.7.6.7.2 1.3.2 1.8.1.5-.1 1.7-.7 1.9-1.4.2-.6.2-1.2.2-1.3-.1-.1-.3-.2-.6-.4zM12 2a10 10 0 0 0-8.5 15.2L2 22l4.9-1.3A10 10 0 1 0 12 2zm0 18.3a8.3 8.3 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3a8.3 8.3 0 1 1 6.9 3.8z" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg
      aria-hidden
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  );
}
