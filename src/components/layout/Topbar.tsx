import { PlusCircle } from 'lucide-react'
import { useAppStore, getActiveUser } from '../../store/useAppStore'
import { spaceConfig, type SpaceKey } from '../../data/mockData'
import { useTranslation } from 'react-i18next'

interface TopbarProps {
  space: SpaceKey
}

export default function Topbar({ space }: TopbarProps) {
  const { t } = useTranslation()
  const openNewPostModal = useAppStore((s) => s.openNewPostModal)
  const activeUserId     = useAppStore((s) => s.activeUserId)
  const cfg              = spaceConfig[space]

  const activeUser = getActiveUser(activeUserId)
  const canPost = !(space === 'lounge' && activeUser.role === 'parent')

  return (
    <header className="sticky top-0 z-20 bg-white border-b border-[#E5E7EB] flex items-center justify-between px-5 h-14 shrink-0">

      {/* Left: space title + subtitle */}
      <div className="flex flex-col justify-center gap-0.5 min-w-0">
        <h1
          className="text-lg font-semibold leading-tight truncate"
          style={{ fontFamily: '"Crimson Pro", Georgia, serif', color: cfg.color }}
        >
          {t(`spaces.${space}`, cfg.label)}
        </h1>
        <p className="text-[11px] text-gray-400 leading-none truncate">
          {t(`spaces.${space}_subtitle`)}
          {space === 'lounge' && activeUser.role === 'parent' && (
            <span className="ms-2 text-[#9CA3AF] italic">· {t('spaces.read_only')}</span>
          )}
        </p>
      </div>

      {/* Right: New Post button */}
      {canPost && (
        <button
          onClick={openNewPostModal}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-sm font-semibold text-white shrink-0 transition-opacity duration-150 hover:opacity-85"
          style={{ backgroundColor: cfg.color }}
          aria-label="Open new post modal"
        >
          <PlusCircle size={15} className="shrink-0" />
          <span>{t('app.new_post')}</span>
        </button>
      )}
    </header>
  )
}
