import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Bell, FileText, ShieldCheck, LogOut, Globe } from 'lucide-react'
import { useAppStore, getActiveUser } from '../../store/useAppStore'
import { useTranslation } from 'react-i18next'
import { spaceConfig, type SpaceKey } from '../../data/mockData'

const myActivityItems = [
  { label: 'My Posts',      icon: FileText, href: '/app/my-posts' },
  { label: 'Notifications', icon: Bell,     href: '/app/notifications' },
]

const roleColors: Record<string, { bg: string; color: string }> = {
  teacher: { bg: '#D6EAF8', color: '#1A5276' },
  parent:  { bg: '#D5F5E3', color: '#1E8449' },
  admin:   { bg: '#FADBD8', color: '#922B21' },
}

export default function Sidebar() {
  const { t, i18n } = useTranslation()
  const location     = useLocation()
  const navigate     = useNavigate()
  const setSpace     = useAppStore((s) => s.setSpace)
  const logout       = useAppStore((s) => s.logout)
  const activeUserId = useAppStore((s) => s.activeUserId)
  const notifications = useAppStore((s) => s.notifications)

  const activeUser = getActiveUser(activeUserId)
  const { role }   = activeUser
  const rc         = roleColors[role] ?? roleColors.teacher

  const hasUnread = notifications.some((n) => !n.read)

  function handleSpaceClick(key: SpaceKey) {
    setSpace(key)
    navigate(spaceConfig[key].route)
  }

  function handleLogout() {
    logout()
    navigate('/login')
  }

  function isSpaceActive(key: SpaceKey) {
    return location.pathname.startsWith(spaceConfig[key].route)
  }

  function isRouteActive(href: string) {
    return location.pathname === href || location.pathname.startsWith(href + '/')
  }

  // Parents can see lounge (read-only) but not claims
  const visibleSpaces = (Object.keys(spaceConfig) as SpaceKey[]).filter((key) => {
    if (key === 'claims' && role === 'parent') return false
    return true
  })

  return (
    <aside className="flex flex-col h-full w-60 bg-white border-r border-[#E5E7EB] select-none">

      {/* ── Logo ───────────────────────────────────────────────────── */}
      <div className="px-5 pt-5 pb-4 border-b border-[#E5E7EB]">
        <span
          className="block font-display text-xl font-bold text-[#1A5276]"
          style={{ fontFamily: '"Crimson Pro", Georgia, serif' }}
        >
          EduVoice
        </span>
        <span className="block text-[10px] text-gray-400 mt-0.5 leading-tight">
          The platform for educators &amp; communities
        </span>
      </div>

      {/* ── Spaces ─────────────────────────────────────────────────── */}
      <nav className="px-3 pt-4 pb-2">
        <p className="px-2 mb-2 text-[10px] font-semibold tracking-widest text-gray-400 uppercase">
          {t('nav.spaces', 'Spaces')}
        </p>
        <ul className="space-y-0.5">
          {visibleSpaces.map((key) => {
            const cfg    = spaceConfig[key]
            const active = isSpaceActive(key)
            return (
              <li key={key}>
                <button
                  onClick={() => handleSpaceClick(key)}
                  className="w-full flex items-center gap-2.5 px-2 py-2 rounded-md text-sm transition-colors duration-150 relative text-left"
                  style={{
                    backgroundColor: active ? cfg.bg : 'transparent',
                    color: active ? cfg.color : '#374151',
                    fontWeight: active ? 700 : 400,
                  }}
                >
                  {active && (
                    <span
                      className="absolute left-0 top-1 bottom-1 w-[3px] rounded-full"
                      style={{ backgroundColor: cfg.color }}
                    />
                  )}
                  <span
                    className="shrink-0 rounded-full"
                    style={{ width: 8, height: 8, backgroundColor: cfg.color, opacity: active ? 1 : 0.55 }}
                  />
                  <span className="flex-1 truncate">{t(`nav.${key}`, cfg.label)}</span>
                  {hasUnread && key === 'lounge' && (
                    <span className="shrink-0 w-2 h-2 rounded-full bg-red-500" />
                  )}
                </button>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* ── My Activity ─────────────────────────────────────────────── */}
      <nav className="px-3 pt-3 pb-2">
        <p className="px-2 mb-2 text-[10px] font-semibold tracking-widest text-gray-400 uppercase">
          {t('nav.my_activity', 'My Activity')}
        </p>
        <ul className="space-y-0.5">
          {myActivityItems.map(({ label, icon: Icon, href }) => {
            const active  = isRouteActive(href)
            const showDot = label === 'Notifications' && hasUnread
            return (
              <li key={href}>
                <Link
                  to={href}
                  className="flex items-center gap-2.5 px-2 py-2 rounded-md text-sm transition-colors duration-150"
                  style={{
                    backgroundColor: active ? '#F3F4F6' : 'transparent',
                    color: active ? '#111827' : '#374151',
                    fontWeight: active ? 600 : 400,
                  }}
                >
                  <Icon size={15} className="shrink-0 text-gray-500" />
                  <span className="flex-1">
                    {label === 'My Posts' ? t('nav.my_posts') : t('nav.notifications')}
                  </span>
                  {showDot && <span className="shrink-0 w-2 h-2 rounded-full bg-red-500" />}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* ── Authority Panel (admin only) ────────────────────────────── */}
      {role === 'admin' && (
        <nav className="px-3 pt-3 pb-2">
          <p className="px-2 mb-2 text-[10px] font-semibold tracking-widest text-gray-400 uppercase">
            {t('nav.authority')}
          </p>
          <ul className="space-y-0.5">
            <li>
              <Link
                to="/app/admin"
                className="flex items-center gap-2.5 px-2 py-2 rounded-md text-sm transition-colors duration-150"
                style={{
                  backgroundColor: isRouteActive('/app/admin') ? '#FADBD8' : 'transparent',
                  color: isRouteActive('/app/admin') ? '#922B21' : '#374151',
                  fontWeight: isRouteActive('/app/admin') ? 600 : 400,
                }}
              >
                <ShieldCheck
                  size={15}
                  className="shrink-0"
                  style={{ color: isRouteActive('/app/admin') ? '#922B21' : '#6B7280' }}
                />
                <span className="flex-1">{t('nav.authority_panel')}</span>
              </Link>
            </li>
          </ul>
        </nav>
      )}

      {/* ── Language Switcher ─────────────────────────────────────── */}
      <div className="mt-auto px-4 py-3">
        <div className="flex items-center gap-2 text-sm text-[#5D6D7E]">
          <Globe size={15} />
          <select
            value={i18n.language}
            onChange={(e) => i18n.changeLanguage(e.target.value)}
            className="bg-transparent border-none focus:ring-0 cursor-pointer outline-none w-full"
          >
            <option value="en">{t('header.english', 'English')}</option>
            <option value="ar">{t('header.arabic', 'العربية')}</option>
            <option value="fr">{t('header.french', 'Français')}</option>
          </select>
        </div>
      </div>

      {/* ── User card ───────────────────────────────────────────────── */}
      <div className="border-t border-[#E5E7EB] px-4 py-3">
        <div className="flex items-center gap-3">
          <div
            className="shrink-0 w-9 h-9 rounded-full flex items-center justify-center"
            style={{ backgroundColor: rc.bg }}
          >
            <span className="text-xs font-bold" style={{ color: rc.color }}>
              {activeUser.initials}
            </span>
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-bold text-gray-900 truncate">{activeUser.name}</p>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span
                className="inline-block px-1.5 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wide"
                style={{ backgroundColor: rc.bg, color: rc.color }}
              >
                {t(`nav.role_${role}`)}
              </span>
              {activeUser.verified && (
                <span className="text-[10px] text-green-600 font-medium">{t('nav.verified')}</span>
              )}
            </div>
          </div>
          <button
            onClick={handleLogout}
            title={t('nav.logout', 'Sign out')}
            className="shrink-0 p-1.5 rounded-md text-[#9CA3AF] hover:text-[#374151] hover:bg-[#F3F4F6] transition-colors"
          >
            <LogOut size={15} />
          </button>
        </div>
      </div>
    </aside>
  )
}
