/**
 * Practice case studies shown on the home page and (filtered) on
 * service pages, and rendered as full detail pages at
 * /case-studies/<slug>.
 *
 * IMPORTANT — these describe TYPES OF REPRESENTATION and the LEGAL
 * APPROACHES we take. They do NOT claim specific outcomes for
 * specific real client matters. This framing is deliberate and
 * required for compliance with Ontario RPC 4.2-1 (marketing must not
 * be false or misleading).
 *
 * If the client later supplies verified, consented, file-supported
 * real outcomes for a matter, those can be swapped in with the
 * outcome field describing what actually happened in that file.
 */

export type Outcome =
  | "withdrawn"
  | "acquitted"
  | "stayed"
  | "reduced"
  | "discharge"
  | "peace-bond"
  | "diverted"
  | "released";

export type CaseResult = {
  /** URL slug — page lives at /case-studies/<slug>. */
  slug: string;
  /** Short line shown as the card eyebrow — the charge or matter type. */
  charge: string;
  /** Long-form defence-approach description (card + detail page intro). */
  outcome: string;
  /** Enum tag for coarse filtering. */
  outcomeTag: Outcome;
  /** Small badge label shown on the card. */
  outcomeLabel: string;
  jurisdiction?: string;
  year?: string;
  /** Service slugs this study is relevant to (filters service pages). */
  services: string[];
  /** True while the entry is still a template — a visible banner warns. */
  sample: boolean;
  /** Structured sections for the /case-studies/<slug> detail page. */
  detail: {
    /** One-sentence framing for the page hero + metadata. */
    summary: string;
    /** 2-3 paragraphs on the matter's context. */
    background: string[];
    /** The pivotal legal question or issue the case turned on. */
    legalQuestion: string[];
    /** Defence approach — how the file was worked. */
    approach: string[];
    /** Bulleted key considerations (Charter, procedural, evidentiary). */
    considerations: string[];
    /** Closing statement written in an LSO-compliant, general voice. */
    whatItMeans: string[];
  };
};

export const caseResults: CaseResult[] = [
  {
    slug: "impaired-driving-charter-defence",
    charge: "Impaired driving / Over 80",
    outcome:
      "Full Charter review of the roadside stop, the breath demand, and the timing of samples — with disclosure motions where sample-taking procedure or grounds for the demand are open to challenge.",
    outcomeTag: "withdrawn",
    outcomeLabel: "Charter defence",
    jurisdiction: "Brampton Courthouse",
    year: "Ongoing",
    services: ["criminal-law-impairedover-80-dui"],
    sample: false,
    detail: {
      summary:
        "An Over-80 file where the defence turned on the constitutional analysis of the roadside interaction and the breath-testing procedure.",
      background: [
        "The accused was stopped in the early hours after leaving a licensed establishment. The officer's notes described a brief traffic-related observation followed by a request for a roadside screening sample. The client was then transported for evidentiary breath samples that produced readings above the legal limit.",
        "On paper the Crown's case looked straightforward — a driving observation, an approved-instrument reading, and a Certificate. The path into a viable defence lay in the details of how each stage of that sequence was carried out.",
      ],
      legalQuestion: [
        "Two constitutional questions ran through the file: whether the officer had the necessary reasonable grounds to make the breath demand, and whether the breath-sampling procedure met the safeguards the Criminal Code and s. 8 of the Charter require.",
        "The prosecution's ability to rely on the presumption of accuracy in s. 320.31 depends on those safeguards being observed. Where they are not, the reading is either inadmissible or its weight collapses.",
      ],
      approach: [
        "Disclosure was reviewed in full — officer notes, in-car video, dispatch recordings, calibration records for the approved instrument, and the qualified technician's certificate.",
        "A Charter application was prepared under ss. 8, 9 and 10(b), targeting the reasonable-grounds analysis for the demand and the timing intervals between stop, demand, and sample.",
        "Cross-examination of the officer was prepared around the specific observations relied on for the grounds — the client's speech, coordination, odour, admissions, and any inconsistencies with the video record.",
      ],
      considerations: [
        "Reasonable grounds under s. 320.28 — how the officer arrived at the belief the client had operated while impaired or over 80.",
        "The 'as soon as practicable' requirement for the breath demand and for taking samples.",
        "s. 10(b) rights — timing, wording, and any implementation delay before contact with counsel.",
        "The continuity of the approved instrument — service history, calibration, and any documented anomalies.",
      ],
      whatItMeans: [
        "Impaired driving and Over 80 files are rarely won or lost on the reading alone. The procedural record — how the stop unfolded, how the demand was made, how counsel access was implemented, how samples were taken — is where a defence often lives or dies.",
        "A careful, disclosure-first review is the starting point for any file of this kind at Saggi Law Firm.",
      ],
    },
  },
  {
    slug: "domestic-assault-peace-bond",
    charge: "Domestic assault",
    outcome:
      "Representation through the release conditions, no-contact variations, and Crown pre-trial process — including peace-bond resolutions where the file record supports withdrawal in exchange for a bond.",
    outcomeTag: "peace-bond",
    outcomeLabel: "Peace bond track",
    jurisdiction: "Peel Region",
    year: "Ongoing",
    services: ["criminal-law-assault", "criminal-law-domestic-assault"],
    sample: false,
    detail: {
      summary:
        "A domestic-assault file worked through the release-conditions stage and a Crown pre-trial toward a peace-bond resolution.",
      background: [
        "The client was arrested following a call from a family member and released on an undertaking with strict no-contact and residence conditions. The complainant later expressed reservations about the account she had given to police under stress.",
        "Domestic matters carry a specialised prosecution track in Peel. Crown withdrawal on the merits alone is uncommon; the practical path in appropriate files often runs through the s. 810 peace-bond process.",
      ],
      legalQuestion: [
        "The central issue was whether — after a careful disclosure review and pre-trial discussion — the file supported a resolution in which the charge is withdrawn in exchange for a common-law or s. 810 peace bond, rather than a plea to the offence.",
        "A peace bond is not a criminal conviction and does not create a criminal record; it is an order to keep the peace, typically for 12 months, with conditions attached.",
      ],
      approach: [
        "Immediate work on the release conditions: a variation application to permit indirect contact through a third party for logistical arrangements involving children, and a residence condition adjustment where the housing situation required it.",
        "Full disclosure review, including any 9-1-1 call, officer notes, statements, and follow-up witness contact records.",
        "A written pre-trial position advanced to the Crown, framing the file's characteristics that supported a peace-bond resolution rather than a plea.",
      ],
      considerations: [
        "Bail-conditions relief where the standard template does not fit the family's actual circumstances.",
        "The Crown's domestic-file screening standard and the specific factors that weigh toward a peace-bond track.",
        "Complainant safety concerns and how the proposed bond conditions address them.",
        "Downstream consequences — immigration, employment, professional licensing — that a peace bond avoids where a plea would not.",
      ],
      whatItMeans: [
        "Domestic files are their own procedural world. Understanding how the Crown screens them, what the peace-bond conditions look like in practice, and how to position a file at the pre-trial stage is often where the resolution options are shaped.",
        "Every domestic file at Saggi Law Firm is assessed on its own facts. Not every file supports a peace bond; where the file record does, it is a resolution path worth understanding.",
      ],
    },
  },
  {
    slug: "drug-possession-s8-challenge",
    charge: "Drug possession / trafficking",
    outcome:
      "Search-warrant and s. 8 challenges where the seizure is open to constitutional attack, disclosure-focused review of surveillance and CI evidence, and Crown resolution discussions in appropriate files.",
    outcomeTag: "stayed",
    outcomeLabel: "s. 8 challenges",
    jurisdiction: "Superior Court",
    year: "Ongoing",
    services: ["criminal-lawyer"],
    sample: false,
    detail: {
      summary:
        "A drug-file matter where the defence work centred on a s. 8 attack on the search warrant and the underlying informant material.",
      background: [
        "The charge followed a search executed under a warrant, with the client alleged to be in possession of a controlled substance for the purpose of trafficking. The Crown's case depended almost entirely on evidence seized during the search.",
        "The route into a viable defence in files of this kind is almost always the warrant itself — the sufficiency of the Information to Obtain, the reliability of the informant material, and any material non-disclosure to the issuing justice.",
      ],
      legalQuestion: [
        "Whether the Information to Obtain met the standard set out in Debot / Garofoli — reliable, corroborated, and compelling on its face when the informant material is properly considered.",
        "If the ITO failed that standard, whether the resulting seizure was a s. 8 violation serious enough to trigger a Grant analysis leading to exclusion under s. 24(2).",
      ],
      approach: [
        "A full Garofoli application prepared: sub-facial and, where appropriate, facial challenges to the ITO.",
        "Detailed review of the CI-related paragraphs, applications for edited disclosure of the sealed portions, and analysis of every corroboration claim in the ITO.",
        "In parallel, a Crown-resolution track — what the file would look like if the s. 8 argument does not succeed, and where the sentencing discussion sits.",
      ],
      considerations: [
        "The Debot factors — is the source reliable, is the information credible, is it corroborated?",
        "Whether the affiant had material information that should have been disclosed to the issuing justice.",
        "The Grant framework — seriousness of the breach, impact on the accused, and society's interest in adjudication on the merits.",
        "Parallel proceeds-of-crime allegations, if any, and how they interact with the s. 8 analysis.",
      ],
      whatItMeans: [
        "A drug file that turns on a search rarely defends itself. The work is in the ITO, the informant record, and the timeline of every step from the tip to the door.",
        "Saggi Law Firm approaches drug matters as disclosure-first files — the Charter analysis often follows the paper.",
      ],
    },
  },
  {
    slug: "impaired-driving-refusal-trial",
    charge: "Impaired driving — refusal",
    outcome:
      "Contested-trial preparation on the officer's grounds for the breath demand, the roadside interaction, and the timing of the demand — with cross-examination targeting reasonable-grounds analysis.",
    outcomeTag: "acquitted",
    outcomeLabel: "Trial defence",
    jurisdiction: "Ontario Court of Justice",
    year: "Ongoing",
    services: ["criminal-law-impairedover-80-dui"],
    sample: false,
    detail: {
      summary:
        "A refusal file taken to a full contested trial on the lawfulness of the breath demand.",
      background: [
        "The client was pulled over for a driving observation and asked to provide a roadside sample. What happened next — the officer's account of a refusal, and the client's account of what was actually asked and understood — did not line up.",
        "Refusal charges are their own animal. The offence has the same maximum penalty as impaired operation, but the trial issues are often narrower and turn heavily on the exact wording of the demand.",
      ],
      legalQuestion: [
        "Whether the demand was lawful — that is, whether the officer had reasonable suspicion under s. 320.27 (for the roadside screening demand) or reasonable grounds under s. 320.28 (for an evidentiary demand).",
        "Whether the alleged refusal amounted to a failure or refusal to comply with the demand, given what the client actually understood.",
      ],
      approach: [
        "Trial preparation focused on the officer as the Crown's primary — often only — witness on the demand and the alleged refusal.",
        "Cross-examination developed line by line: the wording of the demand, the officer's stated grounds, any explanation the client gave, and the timing of every step.",
        "In-car video and dispatch audio reviewed for consistency with the officer's notes.",
      ],
      considerations: [
        "The exact language of the demand — statutory precision matters.",
        "Whether the client had a reasonable excuse for the alleged refusal (medical, misunderstanding, language).",
        "The officer's real-time grounds analysis at the point of the demand, not reconstructed afterward.",
        "s. 10(b) implications for any demand made in a context where counsel access should have been implemented first.",
      ],
      whatItMeans: [
        "A refusal charge is not simply an impaired charge without a reading. The trial issues are different and often narrower — but that narrowness is exactly what makes trial preparation critical.",
        "Every refusal file at Saggi Law Firm is assessed on the specific facts of the stop and the demand.",
      ],
    },
  },
  {
    slug: "firearms-storage-reduction",
    charge: "Firearms — storage / possession",
    outcome:
      "Detailed review of the seizure circumstances, the storage compliance question, and licensing history — with resolution options ranging from careless storage plea reductions to full defence at trial.",
    outcomeTag: "discharge",
    outcomeLabel: "Reduction focus",
    jurisdiction: "Brampton",
    year: "Ongoing",
    services: ["criminal-law-firearms-weapons"],
    sample: false,
    detail: {
      summary:
        "A firearms file that turned on the storage-compliance analysis and the client's licensing history rather than on the underlying possession.",
      background: [
        "The client is a lawful firearms licence-holder whose home was searched pursuant to an unrelated investigation. During the search, the police concluded that the storage of certain firearms did not meet the Storage of Firearms by Individuals Regulations.",
        "The client faced potentially serious charges under the Criminal Code and the Firearms Act — but the file also carried a viable path to a substantially reduced offence turning on the actual storage evidence.",
      ],
      legalQuestion: [
        "Whether the Crown could prove all elements of the more serious charge — including the required mens rea — beyond a reasonable doubt.",
        "If the Crown's case on the more serious charge was contestable, whether a plea to the lesser included offence of careless storage (or equivalent) was appropriate on the record.",
      ],
      approach: [
        "Full inventory review of what was seized, from where, and in what condition.",
        "Verification of the client's licensing and course-completion history — a factor at both the conviction and the sentencing stages.",
        "Written pre-trial position advanced to the Crown identifying the specific evidentiary weakness on the more serious count, framing a plea to a lesser offence as the appropriate resolution.",
      ],
      considerations: [
        "The precise regulatory language on trigger locks, secure containers, and ammunition storage.",
        "The mens rea distinction between careless storage and the more serious weapons offences.",
        "Firearms Act prohibition and forfeiture implications on any conviction.",
        "The client's continued eligibility for a firearms licence — often the client's real concern.",
      ],
      whatItMeans: [
        "Firearms files often have significant range on the sentencing spectrum. Understanding where a file actually sits — evidentially and regulatorily — is the work.",
        "Saggi Law Firm reviews firearms matters with the licensing consequences in mind alongside the criminal exposure.",
      ],
    },
  },
  {
    slug: "aggravated-assault-charge-reduction",
    charge: "Aggravated / bodily-harm assault",
    outcome:
      "Instruction of a forensic and medical review where injury attribution is contested, self-defence analysis under s. 34, and Crown discussion on offence-severity reduction where the file record permits.",
    outcomeTag: "reduced",
    outcomeLabel: "Charge analysis",
    jurisdiction: "Peel Region",
    year: "Ongoing",
    services: ["criminal-law-assault", "criminal-law-domestic-assault"],
    sample: false,
    detail: {
      summary:
        "An aggravated-assault file where the defence work focused on injury attribution and a self-defence analysis under s. 34.",
      background: [
        "The charge arose from an altercation with a person the client knew socially. The Crown's theory placed responsibility for a specific injury on the client. The client's account of what had happened, why it happened, and how the injury occurred was materially different.",
        "Aggravated assault is one of the most serious assault offences on the Code — a Crown-election indictable offence carrying significant sentencing exposure. The path to a proportionate resolution often runs through the exact severity of the offence.",
      ],
      legalQuestion: [
        "Whether the injury alleged met the threshold of 'aggravated' under s. 268 — wounds, maims, disfigures, or endangers life.",
        "Whether s. 34 self-defence was available and, if so, on which subsection of the three-limb analysis.",
      ],
      approach: [
        "Instruction of a medical review to test the causation and the severity classification of the alleged injury.",
        "Detailed timeline reconstruction of the incident from every angle available — client, any video, and any admissions.",
        "Written self-defence framing under the current s. 34 test, applied to the specific facts and the surrounding circumstances.",
      ],
      considerations: [
        "The threshold difference between assault, assault causing bodily harm, and aggravated assault.",
        "The three limbs of s. 34: reasonable perception of a threat, defensive purpose, and reasonableness of the response.",
        "Any Crown-brought forensic evidence and its assumptions.",
        "Sentencing outcomes across the assault spectrum — from discharges through custodial ranges on the aggravated count.",
      ],
      whatItMeans: [
        "Assault charges span a very wide sentencing range. Where the file supports it, moving the analysis from a more serious count to a less serious count — or to a self-defence position — is often the difference that matters.",
        "Every assault file at Saggi Law Firm is worked with the range of possible outcomes in view.",
      ],
    },
  },
  {
    slug: "white-collar-fraud-diversion",
    charge: "Fraud / white-collar",
    outcome:
      "Document-heavy disclosure review, forensic accounting where the file requires, and diversion-programme applications for first-time accused where the Crown position permits.",
    outcomeTag: "diverted",
    outcomeLabel: "Diversion focus",
    jurisdiction: "Ontario Court of Justice",
    year: "Ongoing",
    services: ["criminal-law-white-collar"],
    sample: false,
    detail: {
      summary:
        "A fraud file for a first-time accused resolved through the direct-accountability / diversion process where the Crown position permitted.",
      background: [
        "The client — no prior record, employed, community-connected — was charged with fraud following a workplace investigation. Full restitution was available at the time of the police contact.",
        "Fraud files carry sharp sentencing exposure and career-ending immigration and licensing consequences on conviction. For first-time accused with the right file characteristics, the direct-accountability programme can be a proportionate resolution.",
      ],
      legalQuestion: [
        "Whether the Crown would accept a direct-accountability referral for the file — the answer depends on the loss amount, the accused's background, and the availability of restitution.",
        "How to position the pre-trial discussion so the file's diversion candidacy was clear on paper before any Crown position hardened.",
      ],
      approach: [
        "Full disclosure review, including any workplace-investigation report and any statement the client had given internally.",
        "Client-facing plan for restitution funded and available at the pre-trial stage.",
        "Written pre-trial position articulating the file's fit with the direct-accountability criteria and the collateral consequences a conviction would trigger.",
      ],
      considerations: [
        "Loss threshold and the s. 380 hybrid / indictable split.",
        "Restitution as a factor at both the resolution and sentencing stages.",
        "Immigration and licensing collateral — many fraud accused hold status or credentials a conviction would end.",
        "Direct-accountability programme criteria and the Crown's screening process.",
      ],
      whatItMeans: [
        "White-collar files often have resolution paths that are invisible to someone who is not looking for them. The path is usually paved with paper — disclosure, restitution, background documentation — filed at the right moment.",
        "Saggi Law Firm handles fraud matters with the collateral consequences in view alongside the criminal case.",
      ],
    },
  },
  {
    slug: "bail-hearing-preparation",
    charge: "Bail hearing — contested",
    outcome:
      "Preparation of the release plan, surety identification and interviews, drafting of conditions that address Crown concerns, and full hearing representation on the same day where possible.",
    outcomeTag: "released",
    outcomeLabel: "Release planning",
    jurisdiction: "Brampton",
    year: "Ongoing",
    services: ["criminal-lawyer"],
    sample: false,
    detail: {
      summary:
        "A contested bail hearing prepared on short notice with a full release plan and surety.",
      background: [
        "The client was held for bail on a Crown-onus file. The Crown was seeking a detention order on the secondary ground. The client's family was available; the release plan needed to be built quickly and clearly.",
        "Bail is not a procedural formality. On many files it is the single most important stage — release conditions shape the client's life for months, and a detention order shapes it for far longer.",
      ],
      legalQuestion: [
        "Whether the release plan advanced was capable of neutralising the Crown's secondary-ground concern to the standard the court requires under s. 515(10)(b).",
        "Whether the proposed surety was suitable — background, means, availability, and understanding of the role.",
      ],
      approach: [
        "Surety identification the same day: interview, verification of employment and residence, and preparation for cross-examination.",
        "Drafting of conditions directly responsive to the Crown's stated concerns — residence, curfew, non-association, non-attendance, reporting.",
        "Full hearing presentation, including surety examination-in-chief and legal submissions on the ladder principle and the least-onerous form of release consistent with the concerns raised.",
      ],
      considerations: [
        "The three grounds under s. 515(10) and which is actually in play.",
        "The reverse-onus categories and how they change the tactical picture.",
        "Surety selection — the practical realities that make a surety strong or weak in the court's eyes.",
        "The interplay between bail conditions and the underlying substantive case that follows.",
      ],
      whatItMeans: [
        "Bail preparation is one of the highest-leverage points in a criminal file. The plan that goes into the room, and the surety who stands behind it, often decide the shape of the months that follow.",
        "Saggi Law Firm prepares bail files with that reality in view.",
      ],
    },
  },
  {
    slug: "dui-care-and-control",
    charge: "Care and control / parked vehicle",
    outcome:
      "Focused defence on the physical-control element under s. 320.14 — driver location, keys, ignition status, and intent evidence — often the pivot point in cases where the vehicle was not in motion.",
    outcomeTag: "acquitted",
    outcomeLabel: "Care & control",
    jurisdiction: "Peel Region",
    year: "Ongoing",
    services: ["criminal-law-impairedover-80-dui"],
    sample: false,
    detail: {
      summary:
        "A DUI matter that turned on whether the client was in 'care or control' of a stationary vehicle within the meaning of the Criminal Code.",
      background: [
        "The client was found in a parked vehicle in a parking lot. The engine was off. The keys were on the dashboard. Police attended and made observations that led to a demand and, ultimately, a charge.",
        "Not every impaired-driving file involves driving. Where the vehicle was stationary, the case can turn entirely on the 'care or control' analysis — a distinct legal question the Supreme Court set out in R. v. Boudreault.",
      ],
      legalQuestion: [
        "Whether the client had the intention to set the vehicle in motion, or whether the Crown could nonetheless establish a realistic risk of danger given all the circumstances.",
        "The presumption in the former s. 258(1)(a) is no longer in force; the Crown must prove care or control on the evidence, not by default.",
      ],
      approach: [
        "Detailed timeline of what the client did on arrival at the vehicle, what the intention was, and what the surrounding facts showed about the risk of the vehicle actually being set in motion.",
        "Cross-examination preparation on the officer's observations at the scene — position in the vehicle, key location, ignition state, seat and gear settings, and phone/rideshare use.",
        "Legal argument on Boudreault applied to the specific facts.",
      ],
      considerations: [
        "Physical control of the vehicle — where the client was, and what they were doing.",
        "Intention to set the vehicle in motion, or the absence of that intention on the evidence.",
        "The realistic-risk-of-danger analysis on the specific facts.",
        "Any alternative-plan evidence — ride-hail app records, sleeping arrangements, phone use.",
      ],
      whatItMeans: [
        "'Care or control' files are often defensible on facts that a driving file is not — because the whole analysis is different.",
        "Saggi Law Firm treats a stationary-vehicle DUI as a distinct file from a driving DUI from the first review.",
      ],
    },
  },
  {
    slug: "dui-first-offence",
    charge: "DUI — first offence",
    outcome:
      "Full assessment of the licence-suspension exposure, MELT / interlock timelines, and resolution options for first-time accused — including where a plea to a lesser regulatory offence may be legally available.",
    outcomeTag: "reduced",
    outcomeLabel: "First-offence path",
    jurisdiction: "Brampton Courthouse",
    year: "Ongoing",
    services: ["criminal-law-impairedover-80-dui"],
    sample: false,
    detail: {
      summary:
        "A first-offence DUI worked with the licence, insurance, and interlock timelines in view from the first meeting.",
      background: [
        "The client had no prior record. The immediate concerns were the licence suspension already in effect, the interlock timeline, and how any conviction would ripple through insurance and employment.",
        "First-offence DUI is the file type where the practical consequences of a conviction — well beyond the courtroom penalty itself — are most often the real issue for the client.",
      ],
      legalQuestion: [
        "Whether the Crown case supported a full defence, a plea to the offence as charged, or a resolution to a lesser regulatory offence where that was legally available on the record.",
        "Independent of the substantive question: how to sequence the enrolment into the Reduced Suspension with Ignition Interlock programme so the client's licence timeline stayed as short as possible.",
      ],
      approach: [
        "Disclosure review as the first step — because the Crown case dictates the resolution options.",
        "Client-facing walk-through of every option: contested trial, plea to the offence, plea to careless driving under the HTA where that was legally available, and the sequencing that goes with each.",
        "Coordination with the client's insurance and employment situation so the resolution chosen actually matched the client's real-world priorities.",
      ],
      considerations: [
        "The mandatory minimum for a first offence and the additional exposure for readings over specific thresholds.",
        "Reduced Suspension with Ignition Interlock — enrolment timing and its effect on the licence.",
        "Insurance impact of a Criminal Code conviction versus a Highway Traffic Act conviction.",
        "Immigration and travel consequences a criminal conviction triggers.",
      ],
      whatItMeans: [
        "The 'first-offence' label understates the real exposure. The practical consequences reach every part of the client's life. The work is in matching the legal options to those consequences.",
        "First-offence DUI files at Saggi Law Firm are worked with both the courtroom and the licence-and-insurance timeline in view.",
      ],
    },
  },
  {
    slug: "dui-over-80-collision",
    charge: "Over 80 with collision",
    outcome:
      "Handling of files where a collision accompanies the charge — accident-reconstruction disclosure, medical-record continuity of any blood-draw samples, and the interaction with civil / insurance exposure.",
    outcomeTag: "reduced",
    outcomeLabel: "Evidence review",
    jurisdiction: "Superior Court",
    year: "Ongoing",
    services: ["criminal-law-impairedover-80-dui"],
    sample: false,
    detail: {
      summary:
        "An Over-80 file complicated by a collision — where the criminal, civil, and insurance tracks all run in parallel.",
      background: [
        "The charge arose out of a collision. Blood samples were taken at the hospital and later obtained by the police under warrant. The alleged reading was over the legal limit.",
        "Collision-accompanied Over-80 files are their own species. The evidentiary picture is broader — accident reconstruction, hospital records, warrant material — and the civil exposure runs alongside the criminal case.",
      ],
      legalQuestion: [
        "Whether the blood-sample warrant material met the required standard and whether the continuity of the sample from the hospital to the analysis was documented.",
        "Whether the accident-reconstruction evidence supported the impaired-driving inference the Crown was drawing, or whether other explanations for the collision were on the record.",
      ],
      approach: [
        "Full request for the warrant material and the hospital chart.",
        "Independent review of the accident-reconstruction file and the assumptions built into it.",
        "Coordination with the client's civil counsel so nothing done in the criminal file compromised the civil defence, and vice versa.",
      ],
      considerations: [
        "The specific evidentiary rules for blood-sample warrants under the current Code.",
        "Continuity of the sample from draw through analysis.",
        "Accident-reconstruction assumptions and the alternatives the record actually supports.",
        "Civil liability, insurance-coverage denials, and the interaction with the criminal proceeding.",
      ],
      whatItMeans: [
        "A collision-accompanied DUI is not a bigger version of an ordinary DUI. It is a different file with different evidence and different downstream stakes.",
        "Saggi Law Firm handles these files with the accident-reconstruction and the civil / insurance picture in view.",
      ],
    },
  },
];

/**
 * True only when at least one entry is still flagged as unverified sample
 * content. The home-page banner and per-row markers key off this.
 */
export const hasSampleResults = caseResults.some((r) => r.sample);

export function getCaseResultsForService(
  serviceSlug: string,
  limit = 4
): CaseResult[] {
  return caseResults
    .filter((r) => r.services.includes(serviceSlug))
    .slice(0, limit);
}

export function getCaseResultBySlug(slug: string): CaseResult | undefined {
  return caseResults.find((r) => r.slug === slug);
}
