import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Check,
  CheckCircle,
  GraduationCap,
  Users,
  Search,
  ChevronRight,
  ChevronLeft,
  Mail,
  ChevronDown,
  X,
} from 'lucide-react';
import { TUNISIAN_WILAYAS } from '../data/mockData';
import { useTranslation } from 'react-i18next';

// ─── Types ────────────────────────────────────────────────────────
type Role = 'teacher' | 'parent' | null;
type VerifyMethod = 'registration' | 'email' | null;

interface School {
  id: string;
  name: string;
  wilaya: string;
  city: string;
}

// ─── Mock data ────────────────────────────────────────────────────
const mockSchools: School[] = [
  { id: 'ik',  name: 'Ibn Khaldoun',          wilaya: 'Sfax',      city: 'Sfax' },
  { id: 'fh',  name: 'Farhat Hached',          wilaya: 'Tunis',     city: 'Tunis' },
  { id: 'hb',  name: 'Habib Bourguiba',        wilaya: 'Sousse',    city: 'Sousse' },
  { id: 'aa',  name: 'Al Amal',                wilaya: 'Sfax',      city: 'Sfax' },
  { id: 'ab',  name: 'Abou Bakr Seddik',       wilaya: 'Sfax',      city: 'Sakiet Ezzit' },
  { id: 'mt',  name: 'Mongi Trad',             wilaya: 'Tunis',     city: 'Tunis' },
  { id: 'hy',  name: 'Hédi Nouira',            wilaya: 'Monastir',  city: 'Monastir' },
  { id: 'tb',  name: 'Tahar Ben Achour',       wilaya: 'Manouba',   city: 'La Manouba' },
  { id: 'bh',  name: 'Bourguiba High School',  wilaya: 'Nabeul',    city: 'Nabeul' },
  { id: 'ar',  name: 'Ariana Preparatory',     wilaya: 'Ariana',    city: 'Ariana' },
  { id: 'bj',  name: 'Béja Secondary',         wilaya: 'Béja',      city: 'Béja' },
  { id: 'sf',  name: 'Sfax El Jadida',         wilaya: 'Sfax',      city: 'Sfax' },
  { id: 'gf',  name: 'Gafsa Preparatory',      wilaya: 'Gafsa',     city: 'Gafsa' },
  { id: 'sb',  name: 'Sidi Bouzid Secondary',  wilaya: 'Sidi Bouzid', city: 'Sidi Bouzid' },
  { id: 'kn',  name: 'Kairouan El Koufa',      wilaya: 'Kairouan',  city: 'Kairouan' },
];

// ─── Password strength ────────────────────────────────────────────
function getPasswordStrength(pw: string): { pct: number; color: string; level: string } {
  const len = pw.length;
  if (len === 0) return { pct: 0,   color: 'bg-[#E5E7EB]',  level: '' };
  if (len < 6)   return { pct: 25,  color: 'bg-red-500',    level: 'weak' };
  if (len < 8)   return { pct: 50,  color: 'bg-orange-400', level: 'fair' };
  if (len < 10)  return { pct: 75,  color: 'bg-yellow-400', level: 'good' };
  return               { pct: 100, color: 'bg-[#1E8449]',  level: 'strong' };
}

// ─── Step indicator ───────────────────────────────────────────────
function StepIndicator({ current, labels }: { current: number; labels: string[] }) {
  return (
    <div className="max-w-md mx-auto mb-8 px-2">
      <div className="flex items-center">
        {labels.map((label, idx) => {
          const stepNum = idx + 1;
          const isCompleted = current > stepNum;
          const isActive = current === stepNum;

          return (
            <div key={label} className="flex items-center flex-1 last:flex-none">
              {/* Dot */}
              <div className="flex flex-col items-center">
                <div
                  className={[
                    'w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all',
                    isCompleted
                      ? 'bg-[#1A5276] text-white'
                      : isActive
                        ? 'bg-[#1A5276] text-white ring-4 ring-[#D6EAF8]'
                        : 'bg-white border-2 border-[#E5E7EB] text-[#5D6D7E]',
                  ].join(' ')}
                >
                  {isCompleted ? (
                    <Check size={14} strokeWidth={2.5} />
                  ) : (
                    stepNum
                  )}
                </div>
                <span
                  className={[
                    'mt-1.5 text-[10px] font-medium whitespace-nowrap',
                    isActive ? 'text-[#1A5276]' : 'text-[#5D6D7E]',
                  ].join(' ')}
                >
                  {label}
                </span>
              </div>

              {/* Connector line */}
              {idx < labels.length - 1 && (
                <div className="flex-1 h-0.5 mx-2 mb-4">
                  <div
                    className={[
                      'h-full rounded-full transition-all duration-500',
                      isCompleted ? 'bg-[#1A5276]' : 'bg-[#E5E7EB]',
                    ].join(' ')}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────
export default function RegisterPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  // Wizard state
  const [step, setStep] = useState(1);

  // Step 1
  const [role, setRole] = useState<Role>(null);

  // Step 2
  const [fullName, setFullName]         = useState('');
  const [email, setEmail]               = useState('');
  const [password, setPassword]         = useState('');
  const [confirmPw, setConfirmPw]       = useState('');
  const [phone, setPhone]               = useState('');

  // Step 3
  const [schoolSearch, setSchoolSearch]     = useState('');
  const [selectedWilaya, setSelectedWilaya] = useState<string>('');
  const [wilayaOpen, setWilayaOpen]         = useState(false);
  const [selectedSchool, setSelectedSchool] = useState<School | null>(null);

  // Step 4
  const [verifyMethod, setVerifyMethod] = useState<VerifyMethod>(null);
  const [regNumber, setRegNumber]       = useState('');
  const [instEmail, setInstEmail]       = useState('');
  const [childName, setChildName]       = useState('');
  const [enrollNum, setEnrollNum]       = useState('');

  const strength = getPasswordStrength(password);

  // Step 3 — filtered schools
  const hasSchoolQuery = schoolSearch.trim().length > 0 || selectedWilaya !== '';
  const filteredSchools = hasSchoolQuery
    ? mockSchools.filter((s) => {
        const nameMatch = s.name.toLowerCase().includes(schoolSearch.toLowerCase());
        const wilayaMatch = selectedWilaya === '' || s.wilaya === selectedWilaya;
        return nameMatch && wilayaMatch;
      })
    : [];

  const next = () => setStep((s) => s + 1);
  const back = () => setStep((s) => s - 1);

  const stepLabels = [
    t('register.steps.role'),
    t('register.steps.info'),
    t('register.steps.school'),
    t('register.steps.verify'),
  ];

  // ── STEP 1: Role ─────────────────────────────────────────────────
  const Step1 = (
    <div className="slide-down">
      <h2 className="font-display text-xl font-bold text-[#1C2833] mb-1">
        {t('register.step1.heading')}
      </h2>
      <p className="text-xs text-[#5D6D7E] mb-6">
        {t('register.step1.subtitle')}
      </p>

      <div className="grid grid-cols-2 gap-4 mb-5">
        {/* Teacher card */}
        <button
          type="button"
          onClick={() => setRole('teacher')}
          className={[
            'relative min-h-[160px] rounded-2xl p-5 flex flex-col items-center justify-center gap-2 text-center transition-all cursor-pointer',
            role === 'teacher'
              ? 'border-2 border-[#1A5276] bg-[#EBF5FB]'
              : 'border border-[#E5E7EB] hover:border-[#D1D5DB] bg-white',
          ].join(' ')}
        >
          {role === 'teacher' && (
            <CheckCircle
              size={18}
              className="absolute top-3 right-3 text-[#1A5276]"
              strokeWidth={2}
            />
          )}
          <GraduationCap size={36} className="text-[#1A5276]" strokeWidth={1.6} />
          <span className="font-semibold text-sm text-[#1C2833]">
            {t('register.step1.teacher_label')}
          </span>
          <span className="text-xs text-[#5D6D7E] leading-snug mt-1">
            {t('register.step1.teacher_desc')}
          </span>
        </button>

        {/* Parent card */}
        <button
          type="button"
          onClick={() => setRole('parent')}
          className={[
            'relative min-h-[160px] rounded-2xl p-5 flex flex-col items-center justify-center gap-2 text-center transition-all cursor-pointer',
            role === 'parent'
              ? 'border-2 border-[#1A5276] bg-[#EBF5FB]'
              : 'border border-[#E5E7EB] hover:border-[#D1D5DB] bg-white',
          ].join(' ')}
        >
          {role === 'parent' && (
            <CheckCircle
              size={18}
              className="absolute top-3 right-3 text-[#1A5276]"
              strokeWidth={2}
            />
          )}
          <Users size={36} className="text-[#1E8449]" strokeWidth={1.6} />
          <span className="font-semibold text-sm text-[#1C2833]">
            {t('register.step1.parent_label')}
          </span>
          <span className="text-xs text-[#5D6D7E] leading-snug mt-1">
            {t('register.step1.parent_desc')}
          </span>
        </button>
      </div>

      <p className="text-center text-xs text-[#5D6D7E] mb-6">
        <a href="#" className="hover:underline" onClick={(e) => e.preventDefault()}>
          {t('register.step1.admin_link')}
        </a>
      </p>

      <div className="flex justify-end">
        <button
          type="button"
          onClick={next}
          disabled={!role}
          className="inline-flex items-center gap-2 bg-[#1A5276] disabled:opacity-40 text-white px-6 py-2.5 rounded-xl font-semibold text-sm hover:bg-[#154360] disabled:cursor-not-allowed transition-colors cursor-pointer"
        >
          {t('register.step1.next')} <ChevronRight size={15} />
        </button>
      </div>
    </div>
  );

  // ── STEP 2: Personal Info ─────────────────────────────────────────
  const Step2 = (
    <div className="slide-down">
      <h2 className="font-display text-xl font-bold text-[#1C2833] mb-1">
        {t('register.step2.heading')}
      </h2>
      <p className="text-xs text-[#5D6D7E] mb-6">
        {t('register.step2.subtitle')}
      </p>

      {/* Full name */}
      <div className="mb-4">
        <label className="label-caps block mb-1.5">{t('register.step2.full_name')}</label>
        <input
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          placeholder="Fatima Ben Ali"
          className="px-3 py-2.5 border border-[#E5E7EB] rounded-xl w-full text-sm text-[#1C2833] placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#1A5276] transition-colors bg-white"
        />
      </div>

      {/* Email */}
      <div className="mb-4">
        <label className="label-caps block mb-1.5">{t('register.step2.email')}</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@school.edu"
          className="px-3 py-2.5 border border-[#E5E7EB] rounded-xl w-full text-sm text-[#1C2833] placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#1A5276] transition-colors bg-white"
        />
      </div>

      {/* Password */}
      <div className="mb-4">
        <label className="label-caps block mb-1.5">{t('register.step2.password')}</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          className="px-3 py-2.5 border border-[#E5E7EB] rounded-xl w-full text-sm text-[#1C2833] placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#1A5276] transition-colors bg-white"
        />
        <div className="h-1 rounded-full bg-[#E5E7EB] w-full mt-1.5 relative overflow-hidden">
          <div
            className={`absolute inset-y-0 left-0 rounded-full transition-all duration-300 ${strength.color}`}
            style={{ width: `${strength.pct}%` }}
          />
        </div>
        {strength.level && (
          <p className="text-[10px] text-[#5D6D7E] mt-1">
            {t('register.step2.password_strength', { level: t(`register.step2.${strength.level}`) })}
          </p>
        )}
      </div>

      {/* Confirm password */}
      <div className="mb-4">
        <label className="label-caps block mb-1.5">{t('register.step2.confirm_password')}</label>
        <input
          type="password"
          value={confirmPw}
          onChange={(e) => setConfirmPw(e.target.value)}
          placeholder="••••••••"
          className={[
            'px-3 py-2.5 border rounded-xl w-full text-sm text-[#1C2833] placeholder:text-[#9CA3AF] focus:outline-none transition-colors bg-white',
            confirmPw && confirmPw !== password
              ? 'border-red-400 focus:border-red-500'
              : 'border-[#E5E7EB] focus:border-[#1A5276]',
          ].join(' ')}
        />
        {confirmPw && confirmPw !== password && (
          <p className="text-[10px] text-red-500 mt-1">{t('register.step2.passwords_no_match')}</p>
        )}
      </div>

      {/* Phone (optional) */}
      <div className="mb-6">
        <label className="label-caps block mb-1.5">
          {t('register.step2.phone')}{' '}
          <span className="normal-case font-normal text-[#9CA3AF] tracking-normal">
            {t('register.step2.optional')}
          </span>
        </label>
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="+216 XX XXX XXX"
          className="px-3 py-2.5 border border-[#E5E7EB] rounded-xl w-full text-sm text-[#1C2833] placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#1A5276] transition-colors bg-white"
        />
      </div>

      <div className="flex justify-between">
        <button
          type="button"
          onClick={back}
          className="inline-flex items-center gap-2 border border-[#E5E7EB] text-[#5D6D7E] px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-[#F8F9FA] transition-colors cursor-pointer"
        >
          <ChevronLeft size={15} /> {t('register.step2.back')}
        </button>
        <button
          type="button"
          onClick={next}
          disabled={!fullName || !email || !password || confirmPw !== password}
          className="inline-flex items-center gap-2 bg-[#1A5276] disabled:opacity-40 text-white px-6 py-2.5 rounded-xl font-semibold text-sm hover:bg-[#154360] disabled:cursor-not-allowed transition-colors cursor-pointer"
        >
          {t('register.step2.next')} <ChevronRight size={15} />
        </button>
      </div>
    </div>
  );

  // ── STEP 3: School Selection ──────────────────────────────────────
  const Step3 = (
    <div className="slide-down">
      <h2 className="font-display text-xl font-bold text-[#1C2833] mb-1">
        {t('register.step3.heading')}
      </h2>
      <p className="text-xs text-[#5D6D7E] mb-5">
        {t('register.step3.subtitle')}
      </p>

      {/* Wilaya selector */}
      <div className="mb-3">
        <label className="label-caps mb-1.5 block">{t('register.step3.wilaya_label')}</label>
        <div className="relative">
          <button
            type="button"
            onClick={() => setWilayaOpen((v) => !v)}
            className="w-full flex items-center justify-between px-3 py-2.5 border border-[#E5E7EB] rounded-xl bg-white text-sm focus:outline-none hover:border-[#D1D5DB] transition-colors"
          >
            <span className={selectedWilaya ? 'text-[#1C2833]' : 'text-[#9CA3AF]'}>
              {selectedWilaya || t('register.step3.wilaya_placeholder')}
            </span>
            <div className="flex items-center gap-1.5">
              {selectedWilaya && (
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); setSelectedWilaya(''); setSelectedSchool(null); }}
                  className="text-[#9CA3AF] hover:text-[#5D6D7E]"
                >
                  <X size={14} />
                </button>
              )}
              <ChevronDown size={15} className={`text-[#5D6D7E] transition-transform duration-150 ${wilayaOpen ? 'rotate-180' : ''}`} />
            </div>
          </button>
          {wilayaOpen && (
            <div className="absolute top-full mt-1 left-0 right-0 bg-white border border-[#E5E7EB] rounded-xl shadow-md z-20 max-h-48 overflow-y-auto slide-down">
              {TUNISIAN_WILAYAS.map((w) => (
                <button
                  key={w}
                  type="button"
                  onClick={() => { setSelectedWilaya(w); setWilayaOpen(false); setSelectedSchool(null); }}
                  className={`w-full text-start px-4 py-2.5 text-sm transition-colors hover:bg-[#F8F9FA] ${
                    selectedWilaya === w ? 'font-semibold text-[#1A5276] bg-[#EBF5FB]' : 'text-[#1C2833]'
                  }`}
                >
                  {w}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* School name search */}
      <div className="mb-3">
        <label className="label-caps mb-1.5 block">{t('register.step3.school_label')}</label>
        <div className="relative">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9CA3AF]" strokeWidth={2} />
          <input
            type="text"
            value={schoolSearch}
            onChange={(e) => { setSchoolSearch(e.target.value); setSelectedSchool(null); }}
            placeholder={t('register.step3.school_placeholder')}
            className="pl-9 pr-3 py-2.5 border border-[#E5E7EB] rounded-xl w-full text-sm text-[#1C2833] placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#1A5276] transition-colors bg-white"
          />
        </div>
      </div>

      {/* Prompt when nothing typed */}
      {!hasSchoolQuery && (
        <div className="py-6 text-center text-[#9CA3AF] text-xs border border-dashed border-[#E5E7EB] rounded-xl mb-4">
          {t('register.step3.prompt')}
        </div>
      )}

      {/* Results list */}
      {hasSchoolQuery && (
        <div className="border border-[#E5E7EB] rounded-xl overflow-hidden mb-4 max-h-52 overflow-y-auto">
          {filteredSchools.length === 0 ? (
            <div className="py-8 text-center text-sm text-[#5D6D7E]">
              {t('register.step3.no_results')}
            </div>
          ) : (
            filteredSchools.map((school, idx) => {
              const isSelected = selectedSchool?.id === school.id;
              return (
                <button
                  key={school.id}
                  type="button"
                  onClick={() => setSelectedSchool(school)}
                  className={[
                    'w-full flex items-center justify-between px-4 py-3 text-left transition-colors cursor-pointer',
                    idx < filteredSchools.length - 1 ? 'border-b border-[#E5E7EB]' : '',
                    isSelected ? 'bg-[#EBF5FB] border-l-2 border-l-[#1A5276]' : 'hover:bg-[#F8F9FA]',
                  ].join(' ')}
                >
                  <div>
                    <p className="font-semibold text-sm text-[#1C2833]">{school.name}</p>
                    <p className="text-xs text-[#5D6D7E]">{school.wilaya} · {school.city}</p>
                  </div>
                  {isSelected && (
                    <CheckCircle size={17} className="text-[#1A5276] shrink-0 ml-2" strokeWidth={2} />
                  )}
                </button>
              );
            })
          )}
        </div>
      )}

      {/* Selected chip */}
      {selectedSchool && (
        <div className="mb-5 fade-in">
          <span className="inline-flex items-center gap-1.5 bg-[#D6EAF8] text-[#1A5276] text-xs px-3 py-1 rounded-full font-medium">
            <CheckCircle size={12} strokeWidth={2.5} />
            {selectedSchool.name} · {selectedSchool.wilaya}
          </span>
        </div>
      )}

      <div className="flex justify-between">
        <button
          type="button"
          onClick={back}
          className="inline-flex items-center gap-2 border border-[#E5E7EB] text-[#5D6D7E] px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-[#F8F9FA] transition-colors cursor-pointer"
        >
          <ChevronLeft size={15} /> {t('register.step3.back')}
        </button>
        <button
          type="button"
          onClick={next}
          disabled={!selectedSchool}
          className="inline-flex items-center gap-2 bg-[#1A5276] disabled:opacity-40 text-white px-6 py-2.5 rounded-xl font-semibold text-sm hover:bg-[#154360] disabled:cursor-not-allowed transition-colors cursor-pointer"
        >
          {t('register.step3.next')} <ChevronRight size={15} />
        </button>
      </div>
    </div>
  );

  // ── STEP 4: Verification ──────────────────────────────────────────
  const Step4Teacher = (
    <div className="slide-down">
      <h2 className="font-display text-xl font-bold text-[#1C2833] mb-1">
        {t('register.step4_teacher.heading')}
      </h2>
      <p className="text-xs text-[#5D6D7E] mb-5">
        {t('register.step4_teacher.subtitle')}
      </p>

      <div className="space-y-3 mb-6">
        {/* Option A — Registration number */}
        <button
          type="button"
          onClick={() => setVerifyMethod('registration')}
          className={[
            'w-full rounded-xl p-4 text-left transition-all cursor-pointer',
            verifyMethod === 'registration'
              ? 'border-2 border-[#1A5276] bg-[#EBF5FB]'
              : 'border border-[#E5E7EB] hover:border-[#D1D5DB] bg-white',
          ].join(' ')}
        >
          <div className="flex items-start justify-between mb-1">
            <p className="font-semibold text-sm text-[#1C2833]">
              {t('register.step4_teacher.reg_title')}
            </p>
            {verifyMethod === 'registration' && (
              <CheckCircle size={16} className="text-[#1A5276] shrink-0 mt-0.5 ml-2" strokeWidth={2} />
            )}
          </div>
          <p className="text-xs text-[#5D6D7E] mb-3">
            {t('register.step4_teacher.reg_desc')}
          </p>
          {verifyMethod === 'registration' && (
            <input
              type="text"
              value={regNumber}
              onChange={(e) => setRegNumber(e.target.value)}
              placeholder={t('register.step4_teacher.reg_placeholder')}
              onClick={(e) => e.stopPropagation()}
              className="px-3 py-2.5 border border-[#E5E7EB] rounded-xl w-full text-sm text-[#1C2833] placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#1A5276] transition-colors bg-white"
            />
          )}
        </button>

        {/* Option B — Institutional email */}
        <button
          type="button"
          onClick={() => setVerifyMethod('email')}
          className={[
            'w-full rounded-xl p-4 text-left transition-all cursor-pointer',
            verifyMethod === 'email'
              ? 'border-2 border-[#1A5276] bg-[#EBF5FB]'
              : 'border border-[#E5E7EB] hover:border-[#D1D5DB] bg-white',
          ].join(' ')}
        >
          <div className="flex items-start justify-between mb-1">
            <p className="font-semibold text-sm text-[#1C2833]">
              {t('register.step4_teacher.email_title')}
            </p>
            {verifyMethod === 'email' && (
              <CheckCircle size={16} className="text-[#1A5276] shrink-0 mt-0.5 ml-2" strokeWidth={2} />
            )}
          </div>
          <p className="text-xs text-[#5D6D7E] mb-3">
            {t('register.step4_teacher.email_desc')}
          </p>
          {verifyMethod === 'email' && (
            <div className="space-y-2">
              <input
                type="email"
                value={instEmail}
                onChange={(e) => setInstEmail(e.target.value)}
                placeholder={t('register.step4_teacher.email_placeholder')}
                onClick={(e) => e.stopPropagation()}
                className="px-3 py-2.5 border border-[#E5E7EB] rounded-xl w-full text-sm text-[#1C2833] placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#1A5276] transition-colors bg-white"
              />
              <button
                type="button"
                onClick={(e) => e.stopPropagation()}
                className="inline-flex items-center gap-2 border border-[#1A5276] text-[#1A5276] text-xs font-medium px-4 py-2 rounded-xl hover:bg-[#EBF5FB] transition-colors cursor-pointer"
              >
                <Mail size={13} strokeWidth={2} />
                {t('register.step4_teacher.send_email')}
              </button>
            </div>
          )}
        </button>
      </div>

      <div className="flex justify-between">
        <button
          type="button"
          onClick={back}
          className="inline-flex items-center gap-2 border border-[#E5E7EB] text-[#5D6D7E] px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-[#F8F9FA] transition-colors cursor-pointer"
        >
          <ChevronLeft size={15} /> {t('register.step4_teacher.back')}
        </button>
        <button
          type="button"
          onClick={next}
          disabled={!verifyMethod}
          className="inline-flex items-center gap-2 bg-[#1E8449] disabled:opacity-40 text-white px-6 py-2.5 rounded-xl font-semibold text-sm hover:bg-[#196F3D] disabled:cursor-not-allowed transition-colors cursor-pointer"
        >
          {t('register.step4_teacher.submit')}
        </button>
      </div>
    </div>
  );

  const Step4Parent = (
    <div className="slide-down">
      <h2 className="font-display text-xl font-bold text-[#1C2833] mb-1">
        {t('register.step4_parent.heading')}
      </h2>
      <p className="text-xs text-[#5D6D7E] mb-5">
        {t('register.step4_parent.subtitle')}
      </p>

      <div className="mb-4">
        <label className="label-caps block mb-1.5">{t('register.step4_parent.child_name')}</label>
        <input
          type="text"
          value={childName}
          onChange={(e) => setChildName(e.target.value)}
          placeholder="Youssef Ben Ali"
          className="px-3 py-2.5 border border-[#E5E7EB] rounded-xl w-full text-sm text-[#1C2833] placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#1A5276] transition-colors bg-white"
        />
      </div>

      <div className="mb-6">
        <label className="label-caps block mb-1.5">{t('register.step4_parent.enrol_number')}</label>
        <input
          type="text"
          value={enrollNum}
          onChange={(e) => setEnrollNum(e.target.value)}
          placeholder="e.g. 2023-IK-0042"
          className="px-3 py-2.5 border border-[#E5E7EB] rounded-xl w-full text-sm text-[#1C2833] placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#1A5276] transition-colors bg-white"
        />
        <p className="text-[10px] text-[#5D6D7E] mt-1">
          {t('register.step4_parent.enrol_hint')}
        </p>
      </div>

      <div className="flex justify-between">
        <button
          type="button"
          onClick={back}
          className="inline-flex items-center gap-2 border border-[#E5E7EB] text-[#5D6D7E] px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-[#F8F9FA] transition-colors cursor-pointer"
        >
          <ChevronLeft size={15} /> {t('register.step4_parent.back')}
        </button>
        <button
          type="button"
          onClick={next}
          disabled={!childName || !enrollNum}
          className="inline-flex items-center gap-2 bg-[#1E8449] disabled:opacity-40 text-white px-6 py-2.5 rounded-xl font-semibold text-sm hover:bg-[#196F3D] disabled:cursor-not-allowed transition-colors cursor-pointer"
        >
          {t('register.step4_parent.submit')}
        </button>
      </div>
    </div>
  );

  const Step4 = role === 'teacher' ? Step4Teacher : Step4Parent;

  // ── STEP 5: Success ───────────────────────────────────────────────
  const displayName = fullName.split(' ')[0] || 'there';

  const Step5 = (
    <div className="flex flex-col items-center text-center py-4 slide-down">
      <div className="w-20 h-20 rounded-full bg-[#D5F5E3] flex items-center justify-center mx-auto scale-in">
        <CheckCircle size={40} className="text-[#1E8449]" strokeWidth={1.8} />
      </div>

      <h2 className="font-display text-2xl font-bold text-[#1C2833] mt-6">
        {t('register.step5.welcome', { name: displayName })}
      </h2>

      <p className="text-sm text-[#5D6D7E] mt-2 max-w-xs leading-relaxed">
        {role === 'teacher'
          ? t('register.step5.teacher_msg')
          : t('register.step5.parent_msg')}
      </p>

      {selectedSchool && (
        <div className="mt-4 inline-flex items-center gap-1.5 bg-[#D6EAF8] text-[#1A5276] text-xs px-3 py-1 rounded-full font-medium">
          <CheckCircle size={12} strokeWidth={2.5} />
          {t('register.step5.linked_to', { school: selectedSchool.name })}
        </div>
      )}

      <button
        type="button"
        onClick={() => navigate('/app/lounge')}
        className="mt-8 bg-[#1A5276] text-white px-8 py-2.5 rounded-xl font-semibold text-sm hover:bg-[#154360] transition-colors cursor-pointer"
      >
        {t('register.step5.explore')}
      </button>
    </div>
  );

  // ── Render ────────────────────────────────────────────────────────
  const stepContent = [Step1, Step2, Step3, Step4, Step5];

  return (
    <div className="bg-[#F8F9FA] min-h-screen py-12 px-4 font-body">

      {/* Wordmark */}
      <div className="max-w-md mx-auto mb-6 text-center reveal-up-1">
        <span className="font-display text-2xl font-bold text-[#1A5276]">
          EduVoice
        </span>
        <p className="label-caps mt-1">{t('register.tagline')}</p>
      </div>

      {/* Step indicator — only for steps 1–4 */}
      {step <= 4 && <StepIndicator current={step} labels={stepLabels} />}

      {/* Card */}
      <div className="bg-white rounded-2xl border border-[#E5E7EB] p-8 w-full max-w-md mx-auto reveal-up">
        {stepContent[step - 1]}
      </div>

      {/* Login link */}
      {step <= 4 && (
        <p className="mt-6 text-center text-sm text-[#5D6D7E] reveal-up-2">
          {t('register.already_have')}{' '}
          <a href="/login" className="text-[#1A5276] font-medium hover:underline">
            {t('register.sign_in')}
          </a>
        </p>
      )}
    </div>
  );
}
