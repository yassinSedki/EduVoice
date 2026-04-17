import { Inbox } from 'lucide-react'
import { useAppStore } from '../../store/useAppStore'
import PostCard from '../ui/PostCard'
import { useTranslation } from 'react-i18next'

export default function TeachersLounge() {
  const { t } = useTranslation()
  const { posts, selectedSchool, selectedTag } = useAppStore()

  const filtered = posts.filter((p) => {
    if (p.space !== 'lounge') return false
    if (selectedSchool !== null && p.schoolId !== selectedSchool) return false
    if (selectedTag !== null && p.tag !== selectedTag) return false
    return true
  })

  return (
    <div className="fade-in flex flex-col gap-3">
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center py-16">
          <Inbox size={32} className="text-[#D1D5DB]" />
          <p className="text-sm font-medium text-[#5D6D7E] mt-3">{t('app.empty.lounge_title')}</p>
          <p className="text-xs text-[#9CA3AF]">{t('app.empty.lounge_sub')}</p>
        </div>
      ) : (
        filtered.map((post) => (
          <PostCard key={post.id} post={post} space="lounge" />
        ))
      )}
    </div>
  )
}
