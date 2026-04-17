import { Heart, MessageCircle, FileText, CheckCircle, Star } from 'lucide-react'
import { useAppStore } from '../store/useAppStore'
import { type Notification } from '../data/mockData'
import { useTranslation } from 'react-i18next'

const TODAY = new Date('2026-04-15T23:59:59Z')

function getGroup(timestamp: string): 'today' | 'week' | 'earlier' {
  const then = new Date(timestamp)
  const diffMs = TODAY.getTime() - then.getTime()
  const diffDays = diffMs / 86400000
  if (diffDays < 1) return 'today'
  if (diffDays < 7) return 'week'
  return 'earlier'
}

type NotifType = Notification['type']

const typeConfig: Record<
  NotifType,
  { icon: React.ElementType; bg: string; color: string }
> = {
  reaction:          { icon: Heart,          bg: '#D6EAF8', color: '#1A5276' },
  comment:           { icon: MessageCircle,  bg: '#D5F5E3', color: '#1E8449' },
  claim_update:      { icon: FileText,       bg: '#FADBD8', color: '#922B21' },
  official_response: { icon: CheckCircle,    bg: '#D5F5E3', color: '#065F46' },
  gratitude:         { icon: Star,           bg: '#E8DAEF', color: '#6C3483' },
}

const GROUP_ORDER = ['today', 'week', 'earlier'] as const

export default function NotificationsPage() {
  const { t } = useTranslation()
  const { notifications, markNotificationsRead, markNotificationRead } = useAppStore()

  const unreadCount = notifications.filter((n) => !n.read).length

  const grouped = notifications.reduce<Record<string, Notification[]>>((acc, n) => {
    const group = getGroup(n.timestamp)
    if (!acc[group]) acc[group] = []
    acc[group].push(n)
    return acc
  }, {})

  const groupLabel: Record<string, string> = {
    today:   t('notifications.group_today'),
    week:    t('notifications.group_week'),
    earlier: t('notifications.group_earlier'),
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-5">
        <div className="flex items-center gap-2">
          <h1 className="font-display text-xl font-bold text-[#1C2833]">
            {t('notifications.title')}
          </h1>
          {unreadCount > 0 && (
            <span className="bg-[#FADBD8] text-[#922B21] text-xs px-2 py-0.5 rounded-full font-medium">
              {unreadCount} {t('notifications.new')}
            </span>
          )}
        </div>
        {unreadCount > 0 && (
          <button
            onClick={markNotificationsRead}
            className="text-sm text-[#1A5276] font-medium hover:underline transition-colors"
          >
            {t('notifications.mark_all_read')}
          </button>
        )}
      </div>

      {/* Grouped notifications */}
      {GROUP_ORDER.filter((g) => grouped[g]?.length > 0).map((group, groupIdx) => (
        <div key={group}>
          {groupIdx > 0 && <hr className="border-[#E5E7EB] my-3" />}

          <p
            className="text-[10px] font-semibold tracking-widest uppercase text-[#9CA3AF] mb-2 px-1"
            style={{ fontVariant: 'all-small-caps' }}
          >
            {groupLabel[group]}
          </p>

          <div className="flex flex-col gap-1">
            {grouped[group].map((notif) => {
              const cfg = typeConfig[notif.type]
              const IconComponent = cfg.icon

              return (
                <div
                  key={notif.id}
                  onClick={() => markNotificationRead(notif.id)}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-[#F8F9FA] cursor-pointer transition-colors"
                >
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: cfg.bg }}
                  >
                    <IconComponent size={16} color={cfg.color} />
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-[#1C2833] leading-snug">{notif.text}</p>
                    <p className="text-xs text-[#5D6D7E] mt-0.5">
                      {new Date(notif.timestamp).toLocaleString('en-GB', {
                        day: 'numeric',
                        month: 'short',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  </div>

                  {!notif.read && (
                    <div className="w-2 h-2 rounded-full bg-[#1A5276] flex-shrink-0" />
                  )}
                </div>
              )
            })}
          </div>
        </div>
      ))}

      {notifications.length === 0 && (
        <div className="flex flex-col items-center py-16">
          <p className="text-sm font-medium text-[#5D6D7E]">{t('notifications.empty_title')}</p>
          <p className="text-xs text-[#9CA3AF] mt-1">{t('notifications.empty_sub')}</p>
        </div>
      )}
    </div>
  )
}
