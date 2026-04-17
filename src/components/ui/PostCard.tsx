import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Heart, MessageCircle, ThumbsUp, CheckCircle,
  Users, Eye, Send, ShieldCheck, ChevronDown, ChevronUp
} from 'lucide-react'
import Avatar from './Avatar'
import Tag from './Tag'
import {
  type Post, type SpaceKey,
  mockUsers, spaceConfig, timeAgo,
} from '../../data/mockData'
import { useAppStore, getActiveUser } from '../../store/useAppStore'
import { useTranslation } from 'react-i18next'

const claimStatusConfig: Record<string, { bg: string; color: string }> = {
  'Submitted':       { bg: '#FEF3C7', color: '#92400E' },
  'Under Review':    { bg: '#DBEAFE', color: '#1E40AF' },
  'Response Issued': { bg: '#D1FAE5', color: '#065F46' },
  'Resolved':        { bg: '#F3F4F6', color: '#374151' },
  'Escalated':       { bg: '#FEE2E2', color: '#991B1B' },
}

/** Convert raw tag string to i18n key, e.g. "Resource Gap" → "Resource_Gap" */
function tagKey(tag: string) {
  return tag.replace(/[\s&]+/g, '_').replace(/_+/g, '_').replace(/^_|_$/, '')
}

/** Convert raw claim status to i18n key, e.g. "Under Review" → "Under_Review" */
function statusKey(s: string) {
  return s.replace(/\s+/g, '_')
}

interface PostCardProps {
  post: Post
  space: SpaceKey
}

export default function PostCard({ post, space }: PostCardProps) {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { reactToPost, supportClaim, comments, addComment, activeUserId } = useAppStore()
  const activeUser = getActiveUser(activeUserId)

  const [expanded, setExpanded]                       = useState(false)
  const [commentsOpen, setCommentsOpen]               = useState(false)
  const [commentBody, setCommentBody]                 = useState('')
  const [officialResponseOpen, setOfficialResponseOpen] = useState(false)

  const user = mockUsers.find((u) => u.id === post.userId)
  const cfg  = spaceConfig[space]
  const isLong = post.body.length > 300

  const postComments = comments.filter((c) => c.postId === post.id)

  const displayName = post.anonymous
    ? (user?.role === 'teacher' ? t('app.post.anonymous_teacher') : t('app.post.anonymous_parent'))
    : (user?.name ?? 'Unknown')
  const displayInitials = post.anonymous ? '?' : (user?.initials ?? '?')

  function handleReact() {
    reactToPost(post.id)
  }

  function handleSchoolClick(e: React.MouseEvent) {
    e.stopPropagation()
    navigate(`/app/school/${post.schoolId}`)
  }

  function handleCommentSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!commentBody.trim()) return
    addComment(post.id, commentBody.trim())
    setCommentBody('')
  }

  const commentCount = post.comments
  const commentLabel = commentCount === 0
    ? t('app.post.comment')
    : t('app.post.comments_count_other', { count: commentCount })

  return (
    <article className="bg-white border border-[#E5E7EB] rounded-xl overflow-hidden hover:border-[#D1D5DB] transition-colors duration-150">
      <div className="p-4">
        {/* ── Header ──────────────────────────────────────────── */}
        <div className="flex items-start gap-3">
          <Avatar
            initials={displayInitials}
            role={user?.role}
            size="md"
            anonymous={post.anonymous}
          />
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
              <span className="text-sm font-semibold text-[#1C2833] leading-none">{displayName}</span>
              {user && !post.anonymous && (
                <span
                  className="text-[10px] font-medium px-1.5 py-0.5 rounded-full leading-none"
                  style={{ backgroundColor: cfg.bg, color: cfg.color }}
                >
                  {t(`roles.${user.role}`, user.role.charAt(0).toUpperCase() + user.role.slice(1))}
                </span>
              )}
              <button
                onClick={handleSchoolClick}
                className="text-[11px] text-[#5D6D7E] hover:text-[#1A5276] hover:underline transition-colors"
              >
                {post.school} · {post.district}
              </button>
              <span className="text-[11px] text-[#5D6D7E] ms-auto">{timeAgo(post.timestamp)}</span>
            </div>
            <div className="mt-1.5 flex items-center gap-2 flex-wrap">
              <Tag label={t(`tags.${tagKey(post.tag)}`, post.tag)} color={cfg.color} bg={cfg.bg} size="xs" />
              {post.claimStatus && (
                <span
                  className="text-[10px] font-semibold px-2 py-0.5 rounded-full leading-none"
                  style={{
                    backgroundColor: claimStatusConfig[post.claimStatus]?.bg,
                    color: claimStatusConfig[post.claimStatus]?.color,
                  }}
                >
                  {t(`claim_status.${statusKey(post.claimStatus)}`, post.claimStatus)}
                </span>
              )}
              {post.hasResponse && (
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#D1FAE5] text-[#065F46] leading-none flex items-center gap-1">
                  <CheckCircle size={10} /> {t('app.post.responded')}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* ── Body ─────────────────────────────────────────────── */}
        <div className="mt-3">
          {post.title && (
            <h3 className="font-semibold text-[#1C2833] text-sm mb-1 leading-snug font-display">
              {post.title}
            </h3>
          )}
          {post.targetTeacher && space === 'gratitude' && (
            <p className="text-xs text-[#5D6D7E] mb-1 flex items-center gap-1">
              <Heart size={11} className="text-[#6C3483]" fill="#6C3483" />
              {t('app.post.for_teacher')} <strong className="text-[#6C3483] ms-1">{post.targetTeacher}</strong>
            </p>
          )}
          <p className={`text-[13px] text-[#1C2833] leading-relaxed ${!expanded && isLong ? 'line-clamp-3' : ''}`}>
            {post.body}
          </p>
          {isLong && (
            <button
              onClick={() => setExpanded((v) => !v)}
              className="text-[12px] font-medium mt-1 transition-colors duration-150"
              style={{ color: cfg.color }}
            >
              {expanded ? t('app.post.show_less') : t('app.post.read_more')}
            </button>
          )}
        </div>

        {/* ── Actions ──────────────────────────────────────────── */}
        {space === 'lounge' && activeUser.role === 'parent' ? null : (
        <div className="mt-3 pt-3 border-t border-[#F3F4F6] flex items-center gap-1 flex-wrap">

          {space === 'lounge' && (
            <button
              onClick={handleReact}
              className={`flex items-center gap-1.5 text-[12px] font-medium px-3 py-1.5 rounded-lg transition-all duration-150 ${
                post.reacted ? 'text-[#1A5276] bg-[#D6EAF8]' : 'text-[#5D6D7E] hover:bg-[#F8F9FA]'
              }`}
            >
              <Heart size={13} fill={post.reacted ? '#1A5276' : 'none'} />
              {t('app.post.react')} · {post.reactions}
            </button>
          )}
          {space === 'parents' && (
            <button
              onClick={() => reactToPost(post.id)}
              className={`flex items-center gap-1.5 text-[12px] font-medium px-3 py-1.5 rounded-lg transition-all duration-150 ${
                post.reacted ? 'text-[#1E8449] bg-[#D5F5E3]' : 'text-[#5D6D7E] hover:bg-[#F8F9FA]'
              }`}
            >
              <ThumbsUp size={13} fill={post.reacted ? '#1E8449' : 'none'} />
              {t('app.post.upvote')} · {post.reactions}
            </button>
          )}
          {space === 'claims' && (
            <button
              onClick={() => supportClaim(post.id)}
              className={`flex items-center gap-1.5 text-[12px] font-medium px-3 py-1.5 rounded-lg transition-all duration-150 ${
                post.supported ? 'text-[#922B21] bg-[#FADBD8]' : 'text-[#5D6D7E] hover:bg-[#F8F9FA]'
              }`}
            >
              <Users size={13} />
              {post.supported ? t('app.post.supporting') : t('app.post.support')} · {post.supportCount ?? 0}
            </button>
          )}
          {space === 'gratitude' && (
            <button
              onClick={() => reactToPost(post.id)}
              className={`flex items-center gap-1.5 text-[12px] font-medium px-3 py-1.5 rounded-lg transition-all duration-150 ${
                post.reacted ? 'text-[#6C3483] bg-[#E8DAEF]' : 'text-[#5D6D7E] hover:bg-[#F8F9FA]'
              }`}
            >
              <Heart size={13} fill={post.reacted ? '#6C3483' : 'none'} />
              {post.reactions}
            </button>
          )}

          {/* Official response badge (claims) */}
          {space === 'claims' && post.hasOfficialResponse && (
            <button
              onClick={() => setOfficialResponseOpen((v) => !v)}
              className="flex items-center gap-1.5 text-[12px] font-medium text-[#065F46] bg-[#D1FAE5] px-3 py-1.5 rounded-lg hover:bg-[#A7F3D0] transition-colors duration-150"
            >
              <Eye size={13} /> {t('app.post.official_response')}
              {officialResponseOpen ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
            </button>
          )}

          {/* Comment toggle */}
          <button
            onClick={() => setCommentsOpen((v) => !v)}
            className={`flex items-center gap-1.5 text-[12px] font-medium px-3 py-1.5 rounded-lg transition-all duration-150 ${
              commentsOpen ? 'bg-[#F3F4F6] text-[#1C2833]' : 'text-[#5D6D7E] hover:bg-[#F8F9FA]'
            }`}
          >
            <MessageCircle size={13} />
            {commentLabel}
          </button>
        </div>
        )}
      </div>

      {/* ── Official response panel ──────────────────────────── */}
      {officialResponseOpen && post.officialResponse && (
        <div className="border-t border-[#D1FAE5] bg-[#F0FDF4] px-4 py-3">
          <div className="flex items-center gap-2 mb-2">
            <ShieldCheck size={14} className="text-[#065F46]" />
            <span className="text-[11px] font-semibold text-[#065F46] uppercase tracking-wide">
              {t('app.post.official_response')}
            </span>
            <span className="text-[10px] text-[#9CA3AF] ms-auto">
              {post.officialResponseBy} · {post.officialResponseAt
                ? new Date(post.officialResponseAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
                : ''}
            </span>
          </div>
          <p className="text-[13px] text-[#1C2833] leading-relaxed">{post.officialResponse}</p>
        </div>
      )}

      {/* ── Comments panel ───────────────────────────────────── */}
      {commentsOpen && (
        <div className="border-t border-[#F3F4F6] bg-[#F8F9FA]">
          {postComments.length > 0 && (
            <div className="px-4 pt-3 flex flex-col gap-3">
              {postComments.map((c) => {
                const cUser = mockUsers.find((u) => u.id === c.userId)
                const isMe = c.userId === activeUserId
                return (
                  <div key={c.id} className="flex items-start gap-2.5">
                    <Avatar
                      initials={cUser?.initials ?? '?'}
                      role={cUser?.role}
                      size="sm"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="bg-white rounded-xl px-3 py-2 border border-[#E5E7EB]">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-[11px] font-semibold text-[#1C2833]">
                            {isMe ? t('app.post.you') : (cUser?.name ?? 'Unknown')}
                          </span>
                          {c.isOfficial && (
                            <span className="flex items-center gap-1 text-[9px] font-semibold px-1.5 py-0.5 rounded-full bg-[#D1FAE5] text-[#065F46] leading-none">
                              <ShieldCheck size={9} /> {t('app.post.official_badge')}
                            </span>
                          )}
                          <span className="text-[10px] text-[#9CA3AF] ms-auto">{timeAgo(c.timestamp)}</span>
                        </div>
                        <p className="text-[12px] text-[#1C2833] leading-relaxed">{c.body}</p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}

          {postComments.length === 0 && (
            <p className="px-4 pt-3 text-[11px] text-[#9CA3AF] italic">
              {t('app.empty.lounge_title')}
            </p>
          )}

          {(space === 'claims' && activeUser.role === 'parent') ? null : (
          <form onSubmit={handleCommentSubmit} className="flex items-center gap-2 px-4 py-3">
            <Avatar initials={activeUser.initials} role={activeUser.role} size="sm" />
            <div className="flex-1 flex items-center gap-2 bg-white border border-[#E5E7EB] rounded-full px-3 py-1.5 focus-within:border-[#D1D5DB] transition-colors">
              <input
                type="text"
                value={commentBody}
                onChange={(e) => setCommentBody(e.target.value)}
                placeholder={t('app.post.write_comment')}
                className="flex-1 bg-transparent text-[12px] text-[#1C2833] placeholder:text-[#9CA3AF] focus:outline-none"
              />
              <button
                type="submit"
                disabled={!commentBody.trim()}
                className="disabled:opacity-30 transition-opacity"
                style={{ color: cfg.color }}
                aria-label="Post comment"
              >
                <Send size={14} />
              </button>
            </div>
          </form>
          )}
        </div>
      )}
    </article>
  )
}
