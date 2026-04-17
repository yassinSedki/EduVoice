import { ChevronDown, Search, X } from 'lucide-react'
import { useRef, useState, useEffect } from 'react'
import { type SpaceKey, mockSchools, spaceTags, spaceConfig } from '../../data/mockData'
import { useAppStore, getActiveUser } from '../../store/useAppStore'
import { useTranslation } from 'react-i18next'

interface FilterBarProps {
  space: SpaceKey
}

/** Convert a tag like "Resource Gap" → "Resource_Gap" for i18n key lookup */
function tagKey(tag: string) {
  return tag.replace(/[\s&]+/g, '_').replace(/_+/g, '_').replace(/^_|_$/, '')
}

export default function FilterBar({ space }: FilterBarProps) {
  const { t } = useTranslation()
  const { selectedSchool, selectedTag, setSchoolFilter, setTagFilter, activeUserId } = useAppStore()
  const activeUser = getActiveUser(activeUserId)
  const [tagOpen, setTagOpen]           = useState(false)
  const [schoolSearch, setSchoolSearch] = useState('')
  const [searchOpen, setSearchOpen]     = useState(false)
  const searchRef = useRef<HTMLDivElement>(null)

  const cfg  = spaceConfig[space]
  const tags = spaceTags[space]

  const mySchool = mockSchools.find((s) => s.name === activeUser.school)

  const searchResults = schoolSearch.trim().length > 0
    ? mockSchools.filter(
        (s) =>
          s.id !== mySchool?.id &&
          (s.name.toLowerCase().includes(schoolSearch.toLowerCase()) ||
           s.wilaya.toLowerCase().includes(schoolSearch.toLowerCase()))
      )
    : []

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setSearchOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  const selectedSchoolObj = selectedSchool ? mockSchools.find((s) => s.id === selectedSchool) : null

  return (
    <div className="flex items-center gap-2 py-1 flex-wrap md:flex-nowrap">

      {/* ── All Schools pill ─────────────────────────────────── */}
      <button
        onClick={() => setSchoolFilter(null)}
        className={`text-[11px] font-medium px-3 py-1.5 rounded-full border transition-all duration-150 whitespace-nowrap flex-shrink-0 ${
          !selectedSchool
            ? 'border-transparent text-white'
            : 'border-[#E5E7EB] text-[#5D6D7E] bg-white hover:border-[#D1D5DB]'
        }`}
        style={!selectedSchool ? { backgroundColor: cfg.color } : {}}
      >
        {t('app.filter.all_schools')}
      </button>

      {/* ── My School pill ───────────────────────────────────── */}
      {mySchool && (
        <button
          onClick={() => setSchoolFilter(selectedSchool === mySchool.id ? null : mySchool.id)}
          className={`text-[11px] font-medium px-3 py-1.5 rounded-full border transition-all duration-150 whitespace-nowrap flex-shrink-0 ${
            selectedSchool === mySchool.id
              ? 'border-transparent text-white'
              : 'border-[#E5E7EB] text-[#5D6D7E] bg-white hover:border-[#D1D5DB]'
          }`}
          style={selectedSchool === mySchool.id ? { backgroundColor: cfg.color } : {}}
        >
          {t('app.filter.my_school')}
        </button>
      )}

      {/* ── Selected non-my-school pill (dismissible) ─────── */}
      {selectedSchoolObj && selectedSchoolObj.id !== mySchool?.id && (
        <button
          onClick={() => setSchoolFilter(null)}
          className="flex items-center gap-1 text-[11px] font-medium px-3 py-1.5 rounded-full border-transparent text-white transition-all duration-150 whitespace-nowrap flex-shrink-0"
          style={{ backgroundColor: cfg.color }}
        >
          {selectedSchoolObj.name}
          <X size={11} />
        </button>
      )}

      {/* ── School search ────────────────────────────────────── */}
      <div ref={searchRef} className="relative flex-shrink-0">
        <button
          onClick={() => { setSearchOpen((v) => !v) }}
          className="flex items-center gap-1.5 text-[11px] font-medium px-3 py-1.5 rounded-full border border-dashed border-[#D1D5DB] text-[#5D6D7E] bg-white hover:border-[#9CA3AF] transition-all duration-150 whitespace-nowrap"
        >
          <Search size={11} /> {t('app.filter.find_school')}
        </button>

        {searchOpen && (
          <div className="absolute top-full mt-1.5 start-0 bg-white border border-[#E5E7EB] rounded-xl shadow-md z-30 w-64 slide-down">
            <div className="p-2 border-b border-[#E5E7EB]">
              <div className="flex items-center gap-2 px-2 py-1.5 bg-[#F8F9FA] rounded-lg">
                <Search size={13} className="text-[#9CA3AF] flex-shrink-0" />
                <input
                  autoFocus
                  type="text"
                  value={schoolSearch}
                  onChange={(e) => setSchoolSearch(e.target.value)}
                  placeholder={t('app.filter.search_placeholder')}
                  className="flex-1 bg-transparent text-[12px] text-[#1C2833] placeholder:text-[#9CA3AF] focus:outline-none"
                />
                {schoolSearch && (
                  <button onClick={() => setSchoolSearch('')}>
                    <X size={12} className="text-[#9CA3AF] hover:text-[#5D6D7E]" />
                  </button>
                )}
              </div>
            </div>

            <div className="max-h-48 overflow-y-auto py-1">
              {schoolSearch.trim() === '' ? (
                <p className="px-4 py-3 text-[11px] text-[#9CA3AF] text-center">
                  {t('app.filter.search_prompt')}
                </p>
              ) : searchResults.length === 0 ? (
                <p className="px-4 py-3 text-[11px] text-[#9CA3AF] text-center">
                  {t('app.filter.no_schools_found')}
                </p>
              ) : (
                searchResults.map((school) => (
                  <button
                    key={school.id}
                    className="w-full text-start px-4 py-2.5 hover:bg-[#F8F9FA] transition-colors"
                    onClick={() => {
                      setSchoolFilter(school.id)
                      setSchoolSearch('')
                      setSearchOpen(false)
                    }}
                  >
                    <p className="text-[12px] font-medium text-[#1C2833]">{school.name}</p>
                    <p className="text-[10px] text-[#5D6D7E] mt-0.5">{school.wilaya} · {school.city}</p>
                  </button>
                ))
              )}
            </div>
          </div>
        )}
      </div>

      {/* ── Divider ──────────────────────────────────────────── */}
      <div className="w-px h-5 bg-[#E5E7EB] flex-shrink-0 mx-1 hidden md:block" />

      {/* ── Tag dropdown ─────────────────────────────────────── */}
      <div className="relative flex-shrink-0">
        <button
          onClick={() => setTagOpen((v) => !v)}
          className={`flex items-center gap-1.5 text-[11px] font-medium px-3 py-1.5 rounded-full border transition-all duration-150 whitespace-nowrap ${
            selectedTag
              ? 'border-transparent text-white'
              : 'border-[#E5E7EB] text-[#5D6D7E] bg-white hover:border-[#D1D5DB]'
          }`}
          style={selectedTag ? { backgroundColor: cfg.color } : {}}
        >
          {selectedTag ? t(`tags.${tagKey(selectedTag)}`, selectedTag) : t('app.filter.all_topics')}
          <ChevronDown size={12} className={`transition-transform duration-150 ${tagOpen ? 'rotate-180' : ''}`} />
        </button>

        {tagOpen && (
          <div className="absolute top-full mt-1.5 start-0 bg-white border border-[#E5E7EB] rounded-xl shadow-md z-20 py-1 min-w-[180px] slide-down">
            <button
              className="w-full text-start px-4 py-2 text-[12px] text-[#5D6D7E] hover:bg-[#F8F9FA] transition-colors"
              onClick={() => { setTagFilter(null); setTagOpen(false) }}
            >
              {t('app.filter.all_topics')}
            </button>
            {tags.map((tag) => (
              <button
                key={tag}
                className="w-full text-start px-4 py-2 text-[12px] text-[#1C2833] hover:bg-[#F8F9FA] transition-colors font-medium"
                onClick={() => { setTagFilter(tag === selectedTag ? null : tag); setTagOpen(false) }}
                style={selectedTag === tag ? { color: cfg.color } : {}}
              >
                {t(`tags.${tagKey(tag)}`, tag)}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
