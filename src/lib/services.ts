/**
 * Criminal defence services offered by Saggi Law Firm.
 *
 * Slugs here match the ones in Payload CMS (Services collection), so the
 * home-page cards, the /services/ listing, and the "related services" on
 * every service page all link straight to the pages authored in admin —
 * not to placeholder fallbacks.
 *
 * `category` groups semantically-related services so we can auto-suggest
 * related practice areas on individual service pages. `universal: true`
 * marks a service that pairs with any charge.
 */

export type ServiceCategory =
  | "general"
  | "impaired"
  | "personal"
  | "drugs"
  | "weapons"
  | "property"
  | "financial"
  | "sexual"
  | "youth"
  | "bail";

export type Service = {
  slug: string;
  icon: string;
  title: string;
  summary: string;
  order: number;
  category: ServiceCategory;
  /** Shown on every service page's related section regardless of category. */
  universal?: boolean;
};

export const services: Service[] = [
  {
    slug: "criminal-lawyer",
    icon: "C",
    title: "Criminal Lawyer",
    order: 0,
    category: "general",
    universal: true,
    summary:
      "Facing a criminal charge can affect your freedom, reputation, employment, and future. Saggi Law Firm provides focused criminal defence and legal representation for people facing charges across the Greater Toronto Area.",
  },
  {
    slug: "impairedover-80-dui",
    icon: "D",
    title: "Impaired Driving & DUI",
    order: 1,
    category: "impaired",
    summary:
      "Impaired driving, Over 80, and refusal allegations can carry driving prohibitions, a criminal record, and insurance consequences. A defence lawyer can review the roadside stop, investigation, testing, and evidence disclosure.",
  },
  {
    slug: "assault",
    icon: "A",
    title: "Assault",
    order: 2,
    category: "personal",
    summary:
      "Assault allegations can arise from many circumstances — bar disputes, workplace incidents, altercations between acquaintances. Saggi Law Firm defends simple assault, assault causing bodily harm, and aggravated assault charges across Ontario.",
  },
  {
    slug: "domestic-assault",
    icon: "H",
    title: "Domestic Assault",
    order: 3,
    category: "personal",
    summary:
      "Domestic assault cases involve unique considerations because of the relationship between the parties and the release conditions imposed after arrest. Saggi Law Firm represents individuals facing domestic assault, uttering threats, and related charges.",
  },
  {
    slug: "criminal-harassment",
    icon: "N",
    title: "Criminal Harassment",
    order: 4,
    category: "personal",
    summary:
      "Criminal harassment allegations can involve repeated communication, following, watching, or threatening conduct alleged to cause a person to reasonably fear for their safety. Careful review of the evidence and context is essential.",
  },
  {
    slug: "firearms-weapons",
    icon: "F",
    title: "Firearms & Weapons",
    order: 5,
    category: "weapons",
    summary:
      "Firearms and weapons allegations can involve possession, use, storage, transportation, or prohibited weapon offences. Saggi Law Firm assists individuals facing firearms and weapons-related criminal charges.",
  },
  {
    slug: "white-collar",
    icon: "W",
    title: "White Collar Crime",
    order: 6,
    category: "financial",
    summary:
      "Fraud, embezzlement, breach of trust, money laundering, tax evasion, insider trading, and other white-collar allegations put your career, finances, and reputation at risk — and often involve substantial documentation and complex evidence.",
  },
  {
    slug: "proceeds-of-crime",
    icon: "P",
    title: "Proceeds of Crime",
    order: 7,
    category: "financial",
    summary:
      "Proceeds of crime allegations can accompany drug, fraud, or organized crime charges and can lead to asset restraint or forfeiture. Saggi Law Firm provides defence representation for individuals facing proceeds-of-crime allegations.",
  },
  {
    slug: "theft",
    icon: "T",
    title: "Theft",
    order: 8,
    category: "property",
    summary:
      "From alleged shoplifting to theft over $5,000, theft charges range from summary matters to serious indictable offences with a lasting criminal record. Saggi Law Firm defends theft, possession of stolen property, and related charges.",
  },
  {
    slug: "robbery",
    icon: "R",
    title: "Robbery",
    order: 9,
    category: "property",
    summary:
      "Robbery is a serious indictable offence carrying significant sentencing exposure — especially where a weapon is alleged. The specific facts, evidence, and identification issues can all shape the defence.",
  },
  {
    slug: "breaking-and-entering",
    icon: "B",
    title: "Breaking & Entering",
    order: 10,
    category: "property",
    summary:
      "Break-and-enter allegations can involve residential or commercial premises and carry the risk of imprisonment and a permanent criminal record. Saggi Law Firm defends individuals facing break-and-enter and related property charges.",
  },
  {
    slug: "mischief",
    icon: "M",
    title: "Mischief",
    order: 11,
    category: "property",
    summary:
      "Mischief charges relate to alleged damage, interference with property, or interference with the lawful use of property. Depending on value and circumstances, mischief can proceed summarily or by indictment.",
  },
  {
    slug: "luring",
    icon: "L",
    title: "Luring",
    order: 12,
    category: "sexual",
    summary:
      "Luring allegations — including internet or child luring — carry serious consequences and mandatory minimums, and require careful, focused defence representation.",
  },
  {
    slug: "soliciting",
    icon: "S",
    title: "Soliciting",
    order: 13,
    category: "sexual",
    summary:
      "Soliciting and related charges can be brought following investigations that may involve entrapment concerns, disclosure issues, and Charter arguments. Saggi Law Firm provides defence representation for soliciting allegations.",
  },
  {
    slug: "young-offenders",
    icon: "Y",
    title: "Young Offenders",
    order: 14,
    category: "youth",
    summary:
      "Young people accused of criminal offences are dealt with under the Youth Criminal Justice Act — a distinct legal framework with its own rules and principles. Saggi Law Firm provides legal guidance and defence for youth criminal matters.",
  },
];

export const otherServicesNote = {
  title: "Other Criminal Law Services",
  body: "Every criminal matter is different, and the list of services above does not represent every type of criminal allegation that may require legal advice. If you are facing a criminal offence that is not listed, contact Saggi Law Firm to determine whether legal representation may be available for your matter.",
};

/** Attestation / Commissioner of Oaths / etc. — a separate section. */
export type AdditionalService = {
  slug: string;
  icon: string;
  title: string;
  summary: string;
  lead?: boolean;
};

export const additionalServices: AdditionalService[] = [
  {
    slug: "attestation",
    icon: "§",
    title: "Attestation Services",
    lead: true,
    summary:
      "Preparing Canadian documents for use outside Canada — attestations, authentications, and guidance through the process for individuals and businesses.",
  },
  {
    slug: "affidavits",
    icon: "S",
    title: "Affidavits & Statutory Declarations",
    summary:
      "Preparing, reviewing, and commissioning affidavits and statutory declarations for court, insurance, immigration, and other formal proceedings.",
  },
  {
    slug: "on-site-commissioner-of-oaths",
    icon: "C",
    title: "Commissioner of Oaths",
    summary:
      "On-site commissioning services for documents that must be sworn, affirmed, or formally witnessed — available at our Brampton office.",
  },
  {
    slug: "sponsorship-letters",
    icon: "L",
    title: "Sponsorship Letters",
    summary:
      "Sponsorship letters supporting immigration applications — explaining the relationship, financial support, and purpose of the sponsored person's visit.",
  },
];

export const getServiceBySlug = (slug: string): Service | undefined =>
  services.find((s) => s.slug === slug);

/**
 * Auto-suggest practice areas related to the current service.
 * Order of preference:
 *   1. Other services in the same category
 *   2. Universally-relevant services (Criminal Lawyer)
 *   3. Any remaining services, by `order`
 * De-duplicated, capped at `limit`.
 */
export function getRelatedServices(slug: string, limit = 4): Service[] {
  const current = getServiceBySlug(slug);
  if (!current) return services.slice(0, limit);

  const seen = new Set<string>([slug]);
  const out: Service[] = [];

  const push = (s: Service) => {
    if (seen.has(s.slug)) return;
    seen.add(s.slug);
    out.push(s);
  };

  services
    .filter((s) => s.category === current.category)
    .sort((a, b) => a.order - b.order)
    .forEach(push);

  services
    .filter((s) => s.universal)
    .sort((a, b) => a.order - b.order)
    .forEach(push);

  services
    .slice()
    .sort((a, b) => a.order - b.order)
    .forEach(push);

  return out.slice(0, limit);
}
