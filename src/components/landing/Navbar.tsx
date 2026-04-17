import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Globe, ChevronDown } from "lucide-react";
import { useTranslation } from "react-i18next";

const LANGUAGES = [
  { code: "en", label: "English" },
  { code: "fr", label: "Français" },
  { code: "ar", label: "العربية" },
];

export default function Navbar() {
  const { t, i18n } = useTranslation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);

  const currentLang = LANGUAGES.find((l) => l.code === i18n.language) ?? LANGUAGES[0];

  // Close lang dropdown on outside click
  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  function switchLang(code: string) {
    i18n.changeLanguage(code);
    setLangOpen(false);
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-14 bg-white border-b border-[#E5E7EB]">
      <div className="max-w-6xl mx-auto px-6 h-full flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex flex-col leading-none select-none">
          <span>
            <span className="font-display text-xl font-bold text-[#1A5276]">Edu</span>
            <span className="font-display text-xl font-bold text-[#1A5276]">Voice</span>
          </span>
          <span className="label-caps text-[10px] text-[#5D6D7E] mt-0.5">
            {t("landing.tagline")}
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-3">
          {/* Language switcher */}
          <div className="relative" ref={langRef}>
            <button
              onClick={() => setLangOpen((v) => !v)}
              className="flex items-center gap-1.5 border border-[#E5E7EB] px-3 py-1.5 rounded-lg text-sm text-[#5D6D7E] hover:bg-[#F8F9FA] transition-colors"
            >
              <Globe size={14} />
              <span>{currentLang.label}</span>
              <ChevronDown size={13} className={`transition-transform duration-150 ${langOpen ? "rotate-180" : ""}`} />
            </button>
            {langOpen && (
              <div className="absolute top-full mt-1 right-0 bg-white border border-[#E5E7EB] rounded-xl shadow-lg z-50 min-w-[130px] overflow-hidden">
                {LANGUAGES.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => switchLang(lang.code)}
                    className={[
                      "w-full text-start px-4 py-2.5 text-sm transition-colors hover:bg-[#F8F9FA]",
                      i18n.language === lang.code
                        ? "font-semibold text-[#1A5276] bg-[#EBF5FB]"
                        : "text-[#1C2833]",
                    ].join(" ")}
                  >
                    {lang.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          <Link
            to="/login"
            className="border border-[#E5E7EB] px-4 py-1.5 rounded-lg text-sm text-[#1C2833] hover:bg-[#F8F9FA] transition-colors"
          >
            {t("landing.sign_in")}
          </Link>
          <Link
            to="/register"
            className="bg-[#1A5276] text-white px-4 py-1.5 rounded-lg text-sm font-semibold hover:bg-[#154360] transition-colors"
          >
            {t("landing.join")}
          </Link>
        </nav>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-1.5 rounded-md text-[#1C2833] hover:bg-[#F8F9FA] transition-colors"
          onClick={() => setMobileOpen((prev) => !prev)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-b border-[#E5E7EB] px-6 py-4 flex flex-col gap-3">
          {/* Language switcher (mobile) */}
          <div className="flex gap-2">
            {LANGUAGES.map((lang) => (
              <button
                key={lang.code}
                onClick={() => switchLang(lang.code)}
                className={[
                  "flex-1 py-1.5 rounded-lg text-xs font-medium border transition-colors",
                  i18n.language === lang.code
                    ? "bg-[#1A5276] text-white border-[#1A5276]"
                    : "border-[#E5E7EB] text-[#5D6D7E] hover:bg-[#F8F9FA]",
                ].join(" ")}
              >
                {lang.label}
              </button>
            ))}
          </div>
          <Link
            to="/login"
            onClick={() => setMobileOpen(false)}
            className="border border-[#E5E7EB] px-4 py-2 rounded-lg text-sm text-[#1C2833] hover:bg-[#F8F9FA] transition-colors text-center"
          >
            {t("landing.sign_in")}
          </Link>
          <Link
            to="/register"
            onClick={() => setMobileOpen(false)}
            className="bg-[#1A5276] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[#154360] transition-colors text-center"
          >
            {t("landing.join")}
          </Link>
        </div>
      )}
    </header>
  );
}
