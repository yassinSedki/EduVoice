import { Star, Heart, Inbox } from 'lucide-react'
import { useAppStore } from '../../store/useAppStore'
import PostCard from '../ui/PostCard'
import { useTranslation } from 'react-i18next'

export default function GratitudeWall() {
  const { t } = useTranslation()
  const { posts, selectedSchool, selectedTag } = useAppStore()

  const gratitudePosts = posts.filter((p) => p.space === 'gratitude')

  const totmPost = gratitudePosts.reduce<typeof gratitudePosts[number] | null>((best, p) => {
    if (!best) return p
    return p.reactions > best.reactions ? p : best
  }, null)

  const filtered = gratitudePosts.filter((p) => {
    if (selectedSchool !== null && p.schoolId !== selectedSchool) return false
    if (selectedTag !== null && p.tag !== selectedTag) return false
    return true
  })

  return (
    <div className="fade-in flex flex-col gap-3">
      {/* Teacher of the Month Banner */}
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

          <p className="text-[10px] text-[#D7BDE2] mt-2">
            {t('app.gratitude.totm_desc')}
          </p>
        </div>
      )}

      {filtered.length === 0 ? (
        <div className="flex flex-col items-center py-16">
          <Inbox size={32} className="text-[#D1D5DB]" />
          <p className="text-sm font-medium text-[#5D6D7E] mt-3">{t('app.empty.gratitude_title')}</p>
          <p className="text-xs text-[#9CA3AF]">{t('app.empty.gratitude_sub')}</p>
        </div>
      ) : (
        filtered.map((post) => (
          <PostCard key={post.id} post={post} space="gratitude" />
        ))
      )}
    </div>
  )
}
