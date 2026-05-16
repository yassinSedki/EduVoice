import { useNavigate, Link } from 'react-router-dom'
import { GraduationCap, Users, ShieldCheck } from 'lucide-react'
import { mockUsers } from '../data/mockData'
import { useAppStore, getActiveUser } from '../store/useAppStore'
import { useTranslation } from 'react-i18next'

export default function LoginPage() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const login    = useAppStore((s) => s.login)

  const demoAccounts = [
    {
      userId: 'u1',
      icon: GraduationCap,
      roleLabel: t('login.role_teacher'),
      color: '#1A5276',
      bg: '#D6EAF8',
      desc: t('login.teacher_desc'),
    },
    {
      userId: 'u3',
      icon: Users,
      roleLabel: t('login.role_parent'),
      color: '#1E8449',
      bg: '#D5F5E3',
      desc: t('login.parent_desc'),
    },
    {
      userId: 'u6',
      icon: ShieldCheck,
      roleLabel: t('login.role_admin'),
      color: '#922B21',
      bg: '#FADBD8',
      desc: t('login.admin_desc'),
    },
  ]

  function handleLogin(userId: string) {
    login(userId)
    const user = getActiveUser(userId)
    const destinations: Record<string, string> = {
      teacher: '/app/lounge',
      parent:  '/app/parents',
      admin:   '/app/admin',
    }
    navigate(destinations[user.role] ?? '/app/lounge')
  }

  return (
    <div className="bg-[#F8F9FA] min-h-screen flex flex-col items-center justify-center p-4 font-body">

      {/* Wordmark */}
      <div className="mb-8 text-center reveal-up-1">
        <span className="font-display text-2xl font-bold text-[#1A5276] tracking-tight">
          EduVoice
        </span>
        <p className="label-caps mt-1">
          {t('login.tagline')}
        </p>
      </div>

      {/* Card */}
      <div className="bg-white rounded-2xl border border-[#E5E7EB] p-8 w-full max-w-xl reveal-up">

        <h1 className="font-display text-xl font-bold text-[#1C2833] mb-1">
          {t('login.title')}
        </h1>
        <p className="text-xs text-[#5D6D7E] mb-6">
          {t('login.subtitle')}
        </p>

        <div className="flex flex-col gap-3">
          {demoAccounts.map(({ userId, icon: Icon, roleLabel, color, bg, desc }) => {
            const user = mockUsers.find((u) => u.id === userId)!
            return (
              <button
                key={userId}
                onClick={() => handleLogin(userId)}
                className="flex items-center gap-4 p-4 rounded-xl border border-[#E5E7EB] text-left hover:border-[#D1D5DB] hover:bg-[#FAFAFA] transition-all duration-150 group"
              >
                {/* Role icon */}
                <div
                  className="w-11 h-11 rounded-full flex items-center justify-center shrink-0"
                  style={{ backgroundColor: bg }}
                >
                  <Icon size={20} style={{ color }} />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-sm font-semibold text-[#1C2833]">{user.name}</span>
                    <span
                      className="text-[10px] font-semibold px-1.5 py-0.5 rounded-full leading-none"
                      style={{ backgroundColor: bg, color }}
                    >
                      {roleLabel}
                    </span>
                  </div>
                  <p className="text-[11px] text-[#5D6D7E] mb-1">
                    {user.school} · {user.district}
                  </p>
                  <p className="text-[11px] text-[#9CA3AF] leading-relaxed">{desc}</p>
                </div>

                {/* Arrow */}
                <span
                  className="text-[13px] font-semibold shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ color }}
                >
                  {t('login.sign_in_arrow')}
                </span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Register link */}
      <p className="mt-6 text-sm text-[#5D6D7E] reveal-up-2">
        {t('login.no_account')}{' '}
        <Link to="/register" className="text-[#1A5276] font-medium hover:underline">
          {t('login.create_one')}
        </Link>
      </p>
    </div>
  )
}
