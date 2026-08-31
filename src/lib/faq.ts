/**
 * Home-page FAQ entries. Content is verbatim from client-supplied copy.
 * Also used to render FAQPage JSON-LD in the home page metadata.
 */
export type FaqItem = { q: string; a: string };

export const homeFaq: FaqItem[] = [
  {
    q: "Why should I hire a criminal defence lawyer in Brampton?",
    a: "A criminal defence lawyer can explain the allegations against you, help you understand the criminal justice process, review available information, advise you about your legal options, and provide representation where appropriate. The right approach depends on the specific facts and circumstances of your criminal matter.",
  },
  {
    q: "What should I do if I have been charged with a criminal offence in Brampton?",
    a: "You should take the charge seriously, pay attention to any release conditions and court dates, and consider obtaining legal advice before making important decisions about your case. Saggi Law Firm can discuss your circumstances and explain the legal process and potential options.",
  },
  {
    q: "Does Saggi Law Firm handle bail hearings?",
    a: "Yes. Saggi Law Firm provides legal representation and guidance for bail hearings. Bail matters can involve release conditions, proposed sureties, detention concerns, and other factors that should be assessed according to the circumstances of the case.",
  },
  {
    q: "What types of criminal charges does Saggi Law Firm handle?",
    a: "Saggi Law Firm handles a range of criminal matters, including impaired driving and DUI allegations, assault, domestic assault, drug-related offences, firearms and weapons offences, luring, proceeds of crime, white-collar offences, young offender matters, breaking and entering, theft, mischief, robbery, criminal harassment, bail hearings, and other criminal offences.",
  },
  {
    q: "Does Saggi Law Firm serve clients outside Brampton?",
    a: "Yes. Saggi Law Firm serves clients in Brampton, Mississauga, Toronto, Vaughan, Etobicoke, Scarborough, Woodbridge, Milton, Newmarket, and numerous other GTA and surrounding communities, including Oshawa, Hamilton, Kitchener, Markham, Richmond Hill, Ajax, Pickering, Whitby, Oakville, Burlington, Orangeville, Caledon, Bolton, Waterloo, Cambridge, Guelph, Aurora, Halton Hills, King City, North York, and East York.",
  },
  {
    q: "Can I speak with a lawyer before deciding how to proceed with my criminal case?",
    a: "Yes. An initial consultation can help you understand the allegations, the legal process, and potential options based on the information available about your matter. Contact Saggi Law Firm to discuss arranging a consultation.",
  },
  {
    q: "Does Saggi Law Firm provide services other than criminal defence?",
    a: "Yes. Saggi Law Firm also provides services including attestations, statutory declarations, sponsorship letters, affidavits, on-site Commissioner of Oaths services, and powers of attorney, subject to the requirements applicable to the particular document or service.",
  },
  {
    q: "Can a criminal defence lawyer guarantee the outcome of my case?",
    a: "No responsible lawyer can guarantee a particular result in a criminal case. Outcomes depend on the facts, evidence, applicable law, procedural circumstances, and decisions made throughout the case. A lawyer can provide legal advice and representation designed to protect your rights and pursue the best possible lawful outcome.",
  },
];
