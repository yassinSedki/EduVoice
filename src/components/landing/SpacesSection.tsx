import { useTranslation } from "react-i18next";

interface SpaceCard {
  nameKey: string;
  descKey: string;
  tagKey: string;
  color: string;
  bgColor: string;
  tagBg: string;
}

const spaces: SpaceCard[] = [
  {
    nameKey: "landing.spaces.lounge_name",
    descKey: "landing.spaces.lounge_desc",
    tagKey: "landing.spaces.lounge_tag",
    color: "#1A5276",
    bgColor: "#D6EAF8",
    tagBg: "#D6EAF8",
  },
  {
    nameKey: "landing.spaces.parents_name",
    descKey: "landing.spaces.parents_desc",
    tagKey: "landing.spaces.parents_tag",
    color: "#1E8449",
    bgColor: "#D5F5E3",
    tagBg: "#D5F5E3",
  },
  {
    nameKey: "landing.spaces.claims_name",
    descKey: "landing.spaces.claims_desc",
    tagKey: "landing.spaces.claims_tag",
    color: "#922B21",
    bgColor: "#FADBD8",
    tagBg: "#FADBD8",
  },
  {
    nameKey: "landing.spaces.gratitude_name",
    descKey: "landing.spaces.gratitude_desc",
    tagKey: "landing.spaces.gratitude_tag",
    color: "#6C3483",
    bgColor: "#E8DAEF",
    tagBg: "#E8DAEF",
  },
];

export default function SpacesSection() {
  const { t } = useTranslation();

  return (
    <section className="bg-white py-20">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section header */}
        <div className="mb-10">
          <p className="label-caps text-[#5D6D7E] mb-2">{t("landing.spaces.label")}</p>
          <h2 className="font-display text-3xl font-bold text-[#1C2833]">
            {t("landing.spaces.heading")}
          </h2>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {spaces.map((space) => (
            <div
              key={space.nameKey}
              className="bg-white border border-[#E5E7EB] rounded-xl p-5 transition-all duration-200 hover:border-[#D1D5DB] hover:-translate-y-0.5"
              style={{ borderLeftColor: space.color, borderLeftWidth: "4px" }}
            >
              <p className="text-sm font-bold text-[#1C2833]">{t(space.nameKey)}</p>
              <p className="text-[13px] text-[#5D6D7E] mt-1 leading-relaxed">
                {t(space.descKey)}
              </p>
              <div className="mt-4">
                <span
                  className="inline-flex px-2 py-0.5 rounded-full text-[10px] font-medium"
                  style={{
                    backgroundColor: space.tagBg,
                    color: space.color,
                  }}
                >
                  {t(space.tagKey)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
