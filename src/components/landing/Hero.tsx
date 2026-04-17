import { Link } from "react-router-dom";
import { Shield } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function Hero() {
  const { t } = useTranslation();

  return (
    <section
      className="py-28 bg-white text-center"
      style={{
        backgroundImage:
          "radial-gradient(circle, #E5E7EB 1px, transparent 1px)",
        backgroundSize: "24px 24px",
      }}
    >
      <div className="max-w-3xl mx-auto px-6 flex flex-col items-center">
        {/* Pill label */}
        <span className="reveal-up inline-flex items-center gap-1.5 border border-[#E5E7EB] rounded-full px-3 py-1 text-[11px] font-medium text-[#5D6D7E] mb-8">
          <span
            className="w-1.5 h-1.5 rounded-full bg-[#1A5276] inline-block"
            aria-hidden="true"
          />
          {t("landing.hero.pill")}
        </span>

        {/* H1 */}
        <h1
          className="reveal-up-1 font-display font-bold text-[#1C2833] leading-tight max-w-2xl mx-auto text-center"
          style={{ fontSize: "clamp(2.2rem, 5vw, 3.5rem)" }}
        >
          {t("landing.hero.h1")}
        </h1>

        {/* Subheadline */}
        <p className="reveal-up-2 text-[#5D6D7E] text-base max-w-xl mx-auto text-center mt-4 leading-relaxed">
          {t("landing.hero.subtitle")}
        </p>

        {/* CTA buttons */}
        <div className="reveal-up-3 flex flex-wrap gap-3 justify-center mt-8">
          <Link
            to="/register"
            className="bg-[#1A5276] text-white px-6 py-2.5 rounded-xl font-semibold text-sm hover:bg-[#154360] transition-colors"
          >
            {t("landing.hero.join_teacher")}
          </Link>
          <Link
            to="/register"
            className="bg-[#1E8449] text-white px-6 py-2.5 rounded-xl font-semibold text-sm hover:bg-[#186A3B] transition-colors"
          >
            {t("landing.hero.join_parent")}
          </Link>
        </div>

        {/* Trust line */}
        <div className="reveal-up-4 mt-6 flex items-center gap-2 justify-center text-[11px] text-[#5D6D7E]">
          <Shield size={13} className="shrink-0" />
          <span>{t("landing.hero.trust")}</span>
        </div>
      </div>
    </section>
  );
}
