import type { Metadata } from "next";
import { Roboto, Roboto_Slab } from "next/font/google";

/**
 * WP-STYLE PREVIEW — a native Next.js reproduction of the old
 * WordPress home page's look and feel. Used to show the client the
 * palette + Roboto/Roboto Slab type + section rhythm from their
 * previous Elementor-built site, but rendered as clean React
 * components instead of Elementor's div soup.
 *
 * Not linked from anywhere in the site chrome — accessible only at
 * /wp-style-preview and gated behind an .htaccess proxy rule so the
 * live WordPress at / remains untouched.
 */

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  display: "swap",
  variable: "--wp-body",
});
const robotoSlab = Roboto_Slab({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  display: "swap",
  variable: "--wp-head",
});

export const metadata: Metadata = {
  title: "WP-Style Preview — Saggi Law Firm",
  description:
    "Native Next.js reproduction of the previous WordPress home page for design review only.",
  robots: { index: false, follow: false },
  alternates: { canonical: null },
};

const NAVY = "#16163F";
const NAVY_DEEP = "#070518";
const GOLD = "#D3B574";
const RUST = "#AD5207";
const CREAM = "#FBF9ED";
const MUTED = "#C8D5DC";
const PHONE = "647-983-6720";
const PHONE_HREF = "tel:+16479836720";

const STATS = [
  { n: "484", label: "Bail Hearings" },
  { n: "1000+", label: "Cases Defended" },
  { n: "15+", label: "Years in Criminal Defence" },
];

const WHY = [
  {
    title: "Focused Criminal Defence Only",
    body: "The firm handles criminal matters exclusively — assault, impaired driving, drug offences, domestic violence, firearms, youth, and white-collar charges. No dabbling across unrelated practice areas.",
  },
  {
    title: "Available 24/7 — Weekends Included",
    body: "Criminal charges rarely arrive at a convenient time. Whether it's a bail hearing the next morning or guidance after a weekend arrest, Mandeep Saggi is reachable directly.",
  },
  {
    title: "Local Brampton Court Experience",
    body: "Daily appearances at the Brampton Courthouse mean the firm knows the local Crowns, Justices, and the rhythm of the building — invaluable for negotiating early resolutions.",
  },
  {
    title: "Free Initial Consultation",
    body: "A no-cost first conversation lets you understand the charge, the realistic exposure, and the path forward before deciding on representation.",
  },
];

const PRACTICE = [
  "Assault",
  "Domestic Assault",
  "Sexual Offences",
  "Impaired Driving & DUI",
  "Drug Offences",
  "Firearms & Weapons",
  "Corporate Charges",
  "Theft & Robbery",
  "Bail Hearings",
  "Criminal Harassment",
  "Youth Offences",
  "Criminal Lawyer",
];

export default function WpStylePreviewPage() {
  return (
    <div
      className={`${roboto.variable} ${robotoSlab.variable}`}
      style={{
        fontFamily: "var(--wp-body), Roboto, system-ui, sans-serif",
        color: "#3a3a4c",
        background: "#fff",
      }}
    >
      {/* PREVIEW MARKER STRIP */}
      <div
        style={{
          background: "#fff8ea",
          borderBottom: "1px solid #e6d9b4",
          color: "#5a4a2a",
          fontSize: 13,
          padding: "8px 18px",
          textAlign: "center",
          fontFamily: "var(--wp-body), Roboto, sans-serif",
        }}
      >
        <strong style={{ color: NAVY }}>Design preview</strong> · Native
        Next.js port of the old WordPress home page (Roboto + Roboto Slab,
        original palette). Not linked from the site.
      </div>

      {/* HEADER */}
      <header
        style={{
          background: "#fff",
          borderBottom: `1px solid ${MUTED}80`,
          padding: "18px 0",
        }}
      >
        <div
          style={{
            maxWidth: 1180,
            margin: "0 auto",
            padding: "0 24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 24,
          }}
        >
          <span
            style={{
              fontFamily: "var(--wp-head), 'Roboto Slab', serif",
              fontWeight: 700,
              fontSize: 22,
              color: NAVY,
              letterSpacing: "-0.01em",
            }}
          >
            Saggi Law Firm
          </span>
          <nav
            style={{
              display: "flex",
              gap: 28,
              fontSize: 15,
              fontWeight: 500,
              color: "#2a2a3a",
            }}
            className="wp-hide-mobile"
          >
            <span>Home</span>
            <span>About</span>
            <span>Practice Areas</span>
            <span>Blog</span>
            <span>Contact</span>
          </nav>
          <a
            href={PHONE_HREF}
            style={{
              background: RUST,
              color: "#fff",
              padding: "12px 22px",
              borderRadius: 4,
              fontWeight: 700,
              fontSize: 14,
              letterSpacing: "0.02em",
              textDecoration: "none",
              boxShadow: "0 4px 14px rgba(173,82,7,0.28)",
            }}
          >
            ✆ {PHONE}
          </a>
        </div>
      </header>

      {/* HERO */}
      <section
        style={{
          position: "relative",
          background: `linear-gradient(135deg, ${NAVY_DEEP} 0%, ${NAVY} 100%)`,
          color: "#fff",
          overflow: "hidden",
        }}
      >
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "url('https://saggilawfirm.com/wp-content/uploads/2019/10/Criminal-Defense-Lawyer-Brampton-1.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: 0.18,
            filter: "grayscale(60%)",
          }}
        />
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            background: `linear-gradient(180deg, ${NAVY_DEEP}00 0%, ${NAVY_DEEP}80 100%)`,
          }}
        />

        <div
          style={{
            position: "relative",
            maxWidth: 1180,
            margin: "0 auto",
            padding: "110px 24px 130px",
            display: "grid",
            gridTemplateColumns: "1.15fr 0.85fr",
            gap: 60,
            alignItems: "center",
          }}
          className="wp-hero-grid"
        >
          <div>
            <span
              style={{
                display: "inline-block",
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: GOLD,
                marginBottom: 22,
                paddingBottom: 10,
                borderBottom: `2px solid ${GOLD}`,
              }}
            >
              Saggi Law Firm · Est. 2013
            </span>
            <h1
              style={{
                fontFamily: "var(--wp-head), 'Roboto Slab', serif",
                fontSize: "clamp(2.4rem, 5.4vw, 4rem)",
                lineHeight: 1.05,
                fontWeight: 700,
                letterSpacing: "-0.015em",
                margin: 0,
                color: "#fff",
              }}
            >
              Criminal Lawyer
              <br />
              <span style={{ color: GOLD }}>Brampton</span>
            </h1>
            <p
              style={{
                fontSize: 18,
                marginTop: 22,
                color: "#c9c9dc",
                maxWidth: 520,
                lineHeight: 1.65,
              }}
            >
              Criminal Defence Lawyer · Available 24/7 · Free Consultation.
              Focused representation for assault, DUI, drug, bail, and
              other criminal matters throughout the Greater Toronto Area.
            </p>
            <div
              style={{
                marginTop: 34,
                display: "flex",
                flexWrap: "wrap",
                gap: 14,
              }}
            >
              <a
                href={PHONE_HREF}
                style={{
                  background: RUST,
                  color: "#fff",
                  padding: "16px 30px",
                  borderRadius: 4,
                  fontWeight: 700,
                  fontSize: 15,
                  letterSpacing: "0.02em",
                  textDecoration: "none",
                  boxShadow: "0 6px 22px rgba(173,82,7,0.4)",
                }}
              >
                Call {PHONE}
              </a>
              <a
                href="#contact"
                style={{
                  border: `2px solid ${GOLD}`,
                  color: GOLD,
                  padding: "14px 28px",
                  borderRadius: 4,
                  fontWeight: 700,
                  fontSize: 15,
                  letterSpacing: "0.02em",
                  textDecoration: "none",
                }}
              >
                Free Consultation →
              </a>
            </div>
          </div>

          <div
            className="wp-hero-photo"
            style={{
              position: "relative",
              aspectRatio: "3 / 4",
              maxWidth: 380,
              justifySelf: "end",
              borderRadius: 6,
              overflow: "hidden",
              boxShadow: "0 30px 60px rgba(0,0,0,0.45)",
              border: `1px solid ${GOLD}40`,
            }}
          >
            <img
              src="https://saggilawfirm.com/wp-content/uploads/2019/10/Criminal-Lawyer-In-Brampton.jpg"
              alt="Mandeep Saggi — Criminal Lawyer Brampton"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
              }}
            />
            <div
              style={{
                position: "absolute",
                left: -14,
                bottom: 26,
                background: GOLD,
                color: NAVY,
                padding: "10px 18px",
                fontFamily: "var(--wp-head), 'Roboto Slab', serif",
                fontWeight: 700,
                fontSize: 14,
                letterSpacing: "0.05em",
              }}
            >
              MANDEEP SAGGI · B&amp;S
            </div>
          </div>
        </div>
      </section>

      {/* STATS BAR */}
      <section style={{ background: CREAM, borderBottom: `1px solid ${GOLD}30` }}>
        <div
          style={{
            maxWidth: 1180,
            margin: "0 auto",
            padding: "56px 24px",
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 20,
            textAlign: "center",
          }}
          className="wp-stats-grid"
        >
          {STATS.map((s) => (
            <div key={s.label}>
              <div
                style={{
                  fontFamily: "var(--wp-head), 'Roboto Slab', serif",
                  fontSize: "clamp(2.4rem, 5vw, 3.4rem)",
                  fontWeight: 700,
                  color: RUST,
                  lineHeight: 1,
                }}
              >
                {s.n}
              </div>
              <div
                style={{
                  marginTop: 12,
                  fontSize: 13,
                  fontWeight: 700,
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  color: NAVY,
                }}
              >
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* MEET MANDEEP */}
      <section style={{ background: "#fff", padding: "90px 0" }}>
        <div
          style={{
            maxWidth: 1180,
            margin: "0 auto",
            padding: "0 24px",
            display: "grid",
            gridTemplateColumns: "0.9fr 1.1fr",
            gap: 60,
            alignItems: "center",
          }}
          className="wp-meet-grid"
        >
          <div
            style={{
              aspectRatio: "4 / 5",
              borderRadius: 4,
              overflow: "hidden",
              position: "relative",
              boxShadow: `20px 20px 0 ${GOLD}`,
            }}
          >
            <img
              src="https://saggilawfirm.com/wp-content/uploads/2019/10/Criminal-Lawyer-In-Brampton.jpg"
              alt="Mandeep Saggi"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
              }}
            />
          </div>
          <div>
            <span
              style={{
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: "0.24em",
                textTransform: "uppercase",
                color: RUST,
              }}
            >
              Meet the Lawyer
            </span>
            <h2
              style={{
                fontFamily: "var(--wp-head), 'Roboto Slab', serif",
                fontSize: "clamp(1.9rem, 3.4vw, 2.6rem)",
                lineHeight: 1.15,
                fontWeight: 700,
                color: NAVY,
                margin: "16px 0 0",
              }}
            >
              Meet Your Criminal Lawyer Brampton — Mandeep Saggi
            </h2>
            <div
              style={{
                width: 60,
                height: 3,
                background: GOLD,
                margin: "24px 0",
              }}
            />
            <p style={{ fontSize: 17, lineHeight: 1.75, color: "#3d3d4c" }}>
              Since 2013, Mandeep Saggi has built a reputation as a criminal
              defence lawyer in Brampton who vigorously fights for his
              clients' rights. Over the course of his career, he has
              secured the withdrawal or dismissal of thousands of criminal
              charges — many before a case ever reached trial.
            </p>
            <p
              style={{
                fontSize: 17,
                lineHeight: 1.75,
                color: "#3d3d4c",
                marginTop: 18,
              }}
            >
              His approach is built on early, thorough preparation and
              direct client communication. Known for speedy responses, he
              keeps a direct line available 24/7 for anyone facing a
              criminal charge in the Greater Toronto Area.
            </p>
            <div
              style={{
                marginTop: 30,
                display: "flex",
                gap: 30,
                flexWrap: "wrap",
                paddingTop: 26,
                borderTop: `1px solid ${MUTED}80`,
              }}
            >
              <div>
                <div
                  style={{
                    fontFamily: "var(--wp-head), 'Roboto Slab', serif",
                    fontWeight: 700,
                    color: NAVY,
                    fontSize: 15,
                  }}
                >
                  Called to the Ontario Bar
                </div>
                <div style={{ fontSize: 13, color: "#6a6a7a", marginTop: 4 }}>
                  Law Society of Ontario · 2013
                </div>
              </div>
              <div>
                <div
                  style={{
                    fontFamily: "var(--wp-head), 'Roboto Slab', serif",
                    fontWeight: 700,
                    color: NAVY,
                    fontSize: 15,
                  }}
                >
                  Bachelor of Laws (LL.B Hons.)
                </div>
                <div style={{ fontSize: 13, color: "#6a6a7a", marginTop: 4 }}>
                  University of Leicester, UK · 2009
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section style={{ background: CREAM, padding: "90px 0" }}>
        <div
          style={{
            maxWidth: 1180,
            margin: "0 auto",
            padding: "0 24px",
          }}
        >
          <div style={{ textAlign: "center", maxWidth: 720, margin: "0 auto" }}>
            <span
              style={{
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: "0.24em",
                textTransform: "uppercase",
                color: RUST,
              }}
            >
              Why Choose Us
            </span>
            <h2
              style={{
                fontFamily: "var(--wp-head), 'Roboto Slab', serif",
                fontSize: "clamp(1.9rem, 3.4vw, 2.6rem)",
                lineHeight: 1.15,
                fontWeight: 700,
                color: NAVY,
                margin: "14px 0 0",
              }}
            >
              Why Choose Us As Your Criminal Lawyer in Brampton
            </h2>
            <div
              style={{
                width: 60,
                height: 3,
                background: GOLD,
                margin: "22px auto 0",
              }}
            />
          </div>
          <div
            style={{
              marginTop: 56,
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: 24,
            }}
            className="wp-why-grid"
          >
            {WHY.map((w, i) => (
              <div
                key={w.title}
                style={{
                  background: "#fff",
                  padding: "34px 32px",
                  borderTop: `3px solid ${GOLD}`,
                  boxShadow: "0 6px 24px rgba(22,22,63,0.06)",
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--wp-head), 'Roboto Slab', serif",
                    fontSize: 34,
                    color: GOLD,
                    fontWeight: 700,
                    lineHeight: 1,
                  }}
                >
                  0{i + 1}
                </div>
                <h3
                  style={{
                    fontFamily: "var(--wp-head), 'Roboto Slab', serif",
                    fontSize: 20,
                    fontWeight: 700,
                    color: NAVY,
                    margin: "14px 0 12px",
                    lineHeight: 1.25,
                  }}
                >
                  {w.title}
                </h3>
                <p style={{ fontSize: 15, lineHeight: 1.7, color: "#4a4a5a", margin: 0 }}>
                  {w.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRACTICE AREAS */}
      <section style={{ background: "#fff", padding: "90px 0" }}>
        <div
          style={{
            maxWidth: 1180,
            margin: "0 auto",
            padding: "0 24px",
          }}
        >
          <div style={{ textAlign: "center", maxWidth: 720, margin: "0 auto" }}>
            <span
              style={{
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: "0.24em",
                textTransform: "uppercase",
                color: RUST,
              }}
            >
              What we defend
            </span>
            <h2
              style={{
                fontFamily: "var(--wp-head), 'Roboto Slab', serif",
                fontSize: "clamp(1.9rem, 3.4vw, 2.6rem)",
                lineHeight: 1.15,
                fontWeight: 700,
                color: NAVY,
                margin: "14px 0 0",
              }}
            >
              Practice Areas
            </h2>
            <div
              style={{
                width: 60,
                height: 3,
                background: GOLD,
                margin: "22px auto 0",
              }}
            />
          </div>
          <div
            style={{
              marginTop: 50,
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: 18,
            }}
            className="wp-pa-grid"
          >
            {PRACTICE.map((p) => (
              <div
                key={p}
                style={{
                  border: `1px solid ${MUTED}90`,
                  padding: "26px 20px",
                  textAlign: "center",
                  background: "#fff",
                  transition: "transform 200ms, border-color 200ms",
                }}
              >
                <div
                  style={{
                    width: 46,
                    height: 46,
                    margin: "0 auto 14px",
                    borderRadius: "50%",
                    background: `${GOLD}20`,
                    color: RUST,
                    fontFamily: "var(--wp-head), 'Roboto Slab', serif",
                    fontWeight: 700,
                    fontSize: 20,
                    display: "grid",
                    placeItems: "center",
                  }}
                >
                  {p[0]}
                </div>
                <div
                  style={{
                    fontFamily: "var(--wp-head), 'Roboto Slab', serif",
                    fontSize: 15,
                    fontWeight: 700,
                    color: NAVY,
                    lineHeight: 1.3,
                  }}
                >
                  {p}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section
        id="contact"
        style={{
          background: `linear-gradient(135deg, ${NAVY_DEEP} 0%, ${NAVY} 100%)`,
          color: "#fff",
          padding: "90px 0",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: 780, margin: "0 auto", padding: "0 24px" }}>
          <span
            style={{
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: "0.24em",
              textTransform: "uppercase",
              color: GOLD,
            }}
          >
            Free Consultation · 24/7
          </span>
          <h2
            style={{
              fontFamily: "var(--wp-head), 'Roboto Slab', serif",
              fontSize: "clamp(2rem, 3.8vw, 2.8rem)",
              lineHeight: 1.15,
              fontWeight: 700,
              color: "#fff",
              margin: "16px 0 0",
            }}
          >
            Speak with a criminal lawyer now.
          </h2>
          <p
            style={{
              fontSize: 17,
              lineHeight: 1.7,
              color: "#c9c9dc",
              marginTop: 18,
              maxWidth: 560,
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            The first consultation is free and confidential. Weekend and
            after-hours calls are answered directly.
          </p>
          <div
            style={{
              marginTop: 34,
              display: "flex",
              justifyContent: "center",
              flexWrap: "wrap",
              gap: 14,
            }}
          >
            <a
              href={PHONE_HREF}
              style={{
                background: RUST,
                color: "#fff",
                padding: "16px 32px",
                borderRadius: 4,
                fontWeight: 700,
                fontSize: 15,
                letterSpacing: "0.02em",
                textDecoration: "none",
                boxShadow: "0 6px 22px rgba(173,82,7,0.4)",
              }}
            >
              ✆ Call {PHONE}
            </a>
            <a
              href="mailto:mandeep@saggilawfirm.com"
              style={{
                border: `2px solid ${GOLD}`,
                color: GOLD,
                padding: "14px 30px",
                borderRadius: 4,
                fontWeight: 700,
                fontSize: 15,
                letterSpacing: "0.02em",
                textDecoration: "none",
              }}
            >
              mandeep@saggilawfirm.com
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer
        style={{
          background: "#0a0819",
          color: "#8a8aa0",
          padding: "36px 0",
          textAlign: "center",
          fontSize: 13,
        }}
      >
        © {new Date().getFullYear()} Saggi Law Firm · 2250 Bovaird Dr E,
        Unit 401, Brampton, ON L6R 0W3
      </footer>

      {/* PAGE-LOCAL RESPONSIVE OVERRIDES — kept inline so the preview
          is self-contained and doesn't depend on Tailwind config. */}
      <style>{`
        @media (max-width: 900px) {
          .wp-hero-grid { grid-template-columns: 1fr !important; padding-top: 70px !important; padding-bottom: 80px !important; }
          .wp-hero-photo { justify-self: start !important; max-width: 320px !important; }
          .wp-stats-grid { grid-template-columns: 1fr !important; gap: 34px !important; }
          .wp-meet-grid { grid-template-columns: 1fr !important; }
          .wp-why-grid { grid-template-columns: 1fr !important; }
          .wp-pa-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .wp-hide-mobile { display: none !important; }
        }
      `}</style>
    </div>
  );
}
