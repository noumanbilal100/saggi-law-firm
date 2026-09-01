import { Placeholder } from "@/components/ui/Placeholder";
import { siteConfig } from "@/lib/siteConfig";

/**
 * Persistent top bar: pulsing maple dot + short line + phone.
 * Softer copy than an "emergency" bar to match the firm's compliance tone.
 */
export function TopBar() {
  const { phone, phoneHref } = siteConfig.contact;
  return (
    <div className="bg-ink text-cream text-[0.9rem] border-b border-gold/15">
      <div className="mx-auto flex max-w-[1240px] flex-wrap items-center justify-between gap-4 px-6 py-2.5">
        <span className="inline-flex items-center gap-2 font-semibold text-gold">
          <span
            aria-hidden
            className="inline-block h-2 w-2 rounded-full bg-maple animate-[pulse-dot_2s_ease-in-out_infinite] shadow-[0_0_0_4px_rgba(216,6,33,0.22)]"
          />
          Speak with a criminal defence lawyer early.
        </span>

        <span className="hidden items-center gap-1.5 text-[0.78rem] text-cream/70 sm:inline-flex">
          <span className="text-maple leading-none">🍁</span>
          Proudly serving the Greater Toronto Area
        </span>

        <span className="inline-flex items-center gap-1.5 font-bold text-cream">
          <span aria-hidden>✆</span>
          {phone && phoneHref ? (
            <a href={phoneHref} className="hover:text-gold transition-colors">
              {phone}
            </a>
          ) : (
            <Placeholder onDark>[Insert Verified Phone Number]</Placeholder>
          )}
        </span>
      </div>
    </div>
  );
}
