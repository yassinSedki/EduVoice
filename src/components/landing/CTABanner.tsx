import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function CTABanner() {
  const { t } = useTranslation();

  return (
    <section className="bg-[#1A5276] py-16">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="font-display text-3xl font-bold text-white">
          {t("landing.cta.heading")}
        </h2>
        <p className="text-[#D6EAF8] text-sm mt-2">
          {t("landing.cta.subtitle")}
        </p>

        <div className="flex flex-wrap gap-3 justify-center mt-8">
          <Link
            to="/register"
            className="border-2 border-white text-white px-6 py-2.5 rounded-xl font-semibold text-sm hover:bg-white hover:text-[#1A5276] transition-colors"
          >
            {t("landing.cta.join_teacher")}
          </Link>
          <Link
            to="/register"
            className="border-2 border-white text-white px-6 py-2.5 rounded-xl font-semibold text-sm hover:bg-white hover:text-[#1A5276] transition-colors"
          >
            {t("landing.cta.join_parent")}
          </Link>
        </div>
      </div>
    </section>
  );
}
