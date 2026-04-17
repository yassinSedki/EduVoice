import { LayoutGrid, MapPin, Shield } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useTranslation } from "react-i18next";

interface WhyColumn {
  Icon: LucideIcon;
  headingKey: string;
  bodyKey: string;
}

const columns: WhyColumn[] = [
  {
    Icon: LayoutGrid,
    headingKey: "landing.why.structured_heading",
    bodyKey: "landing.why.structured_body",
  },
  {
    Icon: MapPin,
    headingKey: "landing.why.traceable_heading",
    bodyKey: "landing.why.traceable_body",
  },
  {
    Icon: Shield,
    headingKey: "landing.why.safe_heading",
    bodyKey: "landing.why.safe_body",
  },
];

export default function WhySection() {
  const { t } = useTranslation();

  return (
    <section className="bg-white py-20">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <p className="label-caps text-[#5D6D7E] mb-2">{t("landing.why.label")}</p>
        <h2 className="font-display text-3xl font-bold text-[#1C2833]">
          {t("landing.why.heading")}
        </h2>

        {/* 3-column grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          {columns.map(({ Icon, headingKey, bodyKey }) => (
            <div key={headingKey}>
              <div className="bg-[#D6EAF8] rounded-lg p-2.5 w-10 h-10 flex items-center justify-center text-[#1A5276]">
                <Icon size={18} strokeWidth={1.75} />
              </div>
              <p className="text-sm font-semibold text-[#1C2833] mt-4">
                {t(headingKey)}
              </p>
              <p className="text-[13px] text-[#5D6D7E] mt-2 leading-relaxed">
                {t(bodyKey)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
