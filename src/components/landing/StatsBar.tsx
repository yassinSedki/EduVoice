import { useTranslation } from "react-i18next";

interface Stat {
  value: string;
  labelKey: string;
  color: string;
}

const stats: Stat[] = [
  { value: "1,200+", labelKey: "landing.stats.teachers", color: "#1A5276" },
  { value: "3,800+", labelKey: "landing.stats.parents",  color: "#1E8449" },
  { value: "47",     labelKey: "landing.stats.claims",   color: "#922B21" },
  { value: "218",    labelKey: "landing.stats.thanks",   color: "#6C3483" },
];

export default function StatsBar() {
  const { t } = useTranslation();

  return (
    <div className="bg-[#F2F3F4] border-y border-[#E5E7EB] py-10">
      <div className="max-w-4xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        {stats.map((stat) => (
          <div key={stat.labelKey}>
            <p
              className="font-display text-4xl font-bold"
              style={{ color: stat.color }}
            >
              {stat.value}
            </p>
            <p className="label-caps text-[#5D6D7E] mt-1">{t(stat.labelKey)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
