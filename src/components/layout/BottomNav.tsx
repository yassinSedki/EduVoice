import { Link, useLocation } from 'react-router-dom'
import { GraduationCap, MessageSquare, FileWarning, Heart, User } from 'lucide-react'
import { spaceConfig, type SpaceKey } from '../../data/mockData'
import { useAppStore, getActiveUser } from '../../store/useAppStore'
import { useTranslation } from 'react-i18next'

interface NavItem {
  labelKey: string
  icon:     React.ElementType
  href:     string
  spaceKey?: SpaceKey
}

const allNavItems: NavItem[] = [
  { labelKey: 'app.bottom_nav.lounge',    icon: GraduationCap, href: '/app/lounge',    spaceKey: 'lounge'    },
  { labelKey: 'app.bottom_nav.parents',   icon: MessageSquare, href: '/app/parents',   spaceKey: 'parents'   },
  { labelKey: 'app.bottom_nav.claims',    icon: FileWarning,   href: '/app/claims',    spaceKey: 'claims'    },
  { labelKey: 'app.bottom_nav.gratitude', icon: Heart,         href: '/app/gratitude', spaceKey: 'gratitude' },
  { labelKey: 'app.bottom_nav.profile',   icon: User,          href: '/app/notifications'                    },
]

export default function BottomNav() {
  const { t } = useTranslation()
  const location     = useLocation()
  const setSpace     = useAppStore((s) => s.setSpace)
  const activeUserId = useAppStore((s) => s.activeUserId)

  const activeUser = getActiveUser(activeUserId)
  const { role }   = activeUser

  const navItems = allNavItems.filter((item) => {
    if (item.spaceKey === 'claims' && role === 'parent') return false
    return true
  })

  function isActive(href: string) {
    return location.pathname.startsWith(href)
  }

  function getActiveColor(item: NavItem): string {
    if (!item.spaceKey) return '#1A5276'
    return spaceConfig[item.spaceKey].color
  }

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-[#E5E7EB] h-14 flex items-center">
      {navItems.map((item) => {
        const active      = isActive(item.href)
        const Icon        = item.icon
        const activeColor = getActiveColor(item)

        return (
          <Link
            key={item.href}
            to={item.href}
            onClick={() => {
              if (item.spaceKey) setSpace(item.spaceKey)
            }}
            className="flex-1 flex flex-col items-center justify-center gap-0.5 h-full transition-colors duration-150"
            aria-label={t(item.labelKey)}
            aria-current={active ? 'page' : undefined}
          >
            <Icon
              size={22}
              strokeWidth={active ? 2.2 : 1.6}
              style={{ color: active ? activeColor : '#9CA3AF' }}
            />
            <span
              className="text-[9px] font-medium leading-none text-center"
              style={{ color: active ? activeColor : '#9CA3AF' }}
            >
              {t(item.labelKey)}
            </span>
          </Link>
        )
      })}
    </nav>
  )
}
