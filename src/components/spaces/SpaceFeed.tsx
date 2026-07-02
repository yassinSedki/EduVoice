import { Star, Heart, Inbox, FileX, type LucideIcon } from 'lucide-react'
import { useAppStore } from '../../store/useAppStore'
import PostCard from '../ui/PostCard'
import { useTranslation } from 'react-i18next'
import type { SpaceKey } from '../../data/mockData'

const emptyIcons: Record<SpaceKey, LucideIcon> = {
  lounge: Inbox,
  parents: Inbox,
  claims: FileX,
  gratitude: Inbox,
}

interface SpaceFeedProps {
  space: SpaceKey
  emptyTitleKey: string
  emptySubKey: string
}

export default function SpaceFeed({ space, emptyTitleKey, emptySubKey }: SpaceFeedProps) {
  const { t } = useTranslation()
  const { posts, selectedSchool, selectedTag } = useAppStore()

  const spacePosts = posts.filter((p) => p.space === space)

  const totmPost =
    space === 'gratitude'
      ? spacePosts.reduce<typeof spacePosts[number] | null>((best, p) => {
          if (!best) return p
          return p.reactions > best.reactions ? p : best
        }, null)
      : null

  const filtered = spacePosts.filter((p) => {
    if (selectedSchool !== null && p.schoolId !== selectedSchool) return false
    if (selectedTag !== null && p.tag !== selectedTag) return false
    return true
  })

  const EmptyIcon = emptyIcons[space]

  return (
    <div className="fade-in flex flex-col gap-3">
      {totmPost && (
        <div
          className="rounded-xl p-5 mb-4"
          style={{ background: 'linear-gradient(135deg, #6C3483, #9B59B6)' }}
        >
          <div className="flex items-center gap-1.5">
            <Star size={14} className="text-[#E8DAEF]" fill="#E8DAEF" />
            <span
              className="text-[11px] font-semibold tracking-widest uppercase text-[#E8DAEF]"
              style={{ fontVariant: 'all-small-caps' }}
            >
              {t('app.gratitude.totm_label')}
            </span>
          </div>

          <h2 className="font-display text-xl font-bold text-white mt-1">
            {totmPost.targetTeacher ?? 'Unknown Teacher'}
          </h2>

          <p className="text-[#E8DAEF] text-sm">{totmPost.school}</p>

          <div className="mt-2 flex items-center gap-2">
            <span className="inline-flex items-center gap-1 bg-white/20 text-white text-xs px-2 py-1 rounded-full">
              <Heart size={11} fill="white" />
              {totmPost.reactions}
            </span>
          </div>

          <p className="text-[10px] text-[#D7BDE2] mt-2">{t('app.gratitude.totm_desc')}</p>
        </div>
      )}

      {filtered.length === 0 ? (
        <div className="flex flex-col items-center py-16">
          <EmptyIcon size={32} className="text-[#D1D5DB]" />
          <p className="text-sm font-medium text-[#5D6D7E] mt-3">{t(emptyTitleKey)}</p>
          <p className="text-xs text-[#9CA3AF]">{t(emptySubKey)}</p>
        </div>
      ) : (
        filtered.map((post) => <PostCard key={post.id} post={post} space={space} />)
      )}
    </div>
  )
}
