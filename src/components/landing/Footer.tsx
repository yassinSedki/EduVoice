import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function Footer() {
  const { t } = useTranslation();

  const platformLinks = [
    { labelKey: "landing.footer.about",      to: "/about" },
    { labelKey: "landing.footer.contact",    to: "/contact" },
    { labelKey: "landing.footer.moderation", to: "/moderation-policy" },
    { labelKey: "landing.footer.ministry",   to: "/ministry-guidelines" },
  ];

  const legalLinks = [
    { labelKey: "landing.footer.privacy", to: "/privacy-policy" },
    { labelKey: "landing.footer.terms",   to: "/terms-of-use" },
    { labelKey: "landing.footer.data",    to: "/data-protection" },
  ];

  return (
    <footer className="bg-[#1C2833] text-white pt-14 pb-8">
      <div className="max-w-6xl mx-auto px-6">
        {/* 3-column grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          {/* Column 1: Logo + mission */}
          <div>
            <p className="font-display text-xl font-bold text-white">
              EduVoice
            </p>
            <p className="text-[#9CA3AF] text-sm mt-1">
              {t("landing.footer.tagline")}
            </p>
            <p className="text-[13px] text-[#6B7280] mt-3 leading-relaxed">
              {t("landing.footer.mission")}
            </p>
          </div>

          {/* Column 2: Platform links */}
          <div>
            <p className="label-caps text-[#9CA3AF] mb-4">{t("landing.footer.platform")}</p>
            <ul className="flex flex-col gap-2.5">
              {platformLinks.map(({ labelKey, to }) => (
                <li key={labelKey}>
                  <Link
                    to={to}
                    className="text-[#D1D5DB] text-sm hover:text-white transition-colors"
                  >
                    {t(labelKey)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Legal links */}
          <div>
            <p className="label-caps text-[#9CA3AF] mb-4">{t("landing.footer.legal")}</p>
            <ul className="flex flex-col gap-2.5">
              {legalLinks.map(({ labelKey, to }) => (
                <li key={labelKey}>
                  <Link
                    to={to}
                    className="text-[#D1D5DB] text-sm hover:text-white transition-colors"
                  >
                    {t(labelKey)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-[#2E3D4F] pt-6">
          <p className="text-[#6B7280] text-xs text-center">
            {t("landing.footer.copyright")}
          </p>
        </div>
      </div>
    </footer>
  );
}
