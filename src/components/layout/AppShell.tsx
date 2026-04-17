import { useEffect } from 'react'
import { Outlet, useLocation, Navigate } from 'react-router-dom'
import { useAppStore, getActiveUser } from '../../store/useAppStore'
import { spaceConfig, type SpaceKey } from '../../data/mockData'
import Sidebar    from './Sidebar'
import Topbar     from './Topbar'
import RightPanel from './RightPanel'
import BottomNav  from './BottomNav'
import FilterBar  from '../ui/FilterBar'
import NewPostModal from '../ui/NewPostModal'

const SPACE_ROUTES: SpaceKey[] = ['lounge', 'parents', 'claims', 'gratitude']

function spaceFromPath(pathname: string): SpaceKey {
  return (SPACE_ROUTES.find((k) =>
    pathname.startsWith(spaceConfig[k].route)
  ) ?? 'lounge') as SpaceKey
}

function isSpaceRoute(pathname: string): boolean {
  return SPACE_ROUTES.some((k) => pathname.startsWith(spaceConfig[k].route))
}

export default function AppShell() {
  const location     = useLocation()
  const currentSpace = useAppStore((s) => s.currentSpace)
  const setSpace     = useAppStore((s) => s.setSpace)
  const activeUserId = useAppStore((s) => s.activeUserId)

  // Auth guard — redirect to login if not logged in
  if (!activeUserId) return <Navigate to="/login" replace />

  const activeUser   = getActiveUser(activeUserId)
  const { role }     = activeUser

  // Access control redirects
  const path = location.pathname
  if (role === 'parent' && path.startsWith('/app/claims')) return <Navigate to="/app/parents" replace />
  if (role !== 'admin'  && path.startsWith('/app/admin'))  return <Navigate to="/app/lounge"  replace />

  const onSpacePage = isSpaceRoute(path)
  const space = spaceFromPath(path)

  // Keep Zustand in sync with the current route
  useEffect(() => {
    if (onSpacePage) {
      const derived = spaceFromPath(path)
      if (derived !== currentSpace) setSpace(derived)
    }
  }, [path, currentSpace, setSpace, onSpacePage])

  return (
    <div className="min-h-screen bg-[#F8F9FA]">

      {/* ── Desktop Sidebar ───────────────────────────────────── */}
      <div className="hidden md:flex w-60 fixed left-0 top-0 h-screen border-r border-[#E5E7EB] bg-white z-30 flex-col">
        <Sidebar />
      </div>

      {/* ── Desktop Right Panel ───────────────────────────────── */}
      <div className="hidden md:flex w-[220px] fixed right-0 top-0 h-screen border-l border-[#E5E7EB] bg-white overflow-y-auto z-20 flex-col">
        <RightPanel />
      </div>

      {/* ── Main content ─────────────────────────────────────── */}
      <main className="flex flex-col min-h-screen md:ms-60 md:me-[220px] pb-14 md:pb-0">

        {/* Space topbar + filter — only on space routes */}
        {onSpacePage && (
          <>
            <div className="sticky top-0 z-20 bg-white border-b border-[#E5E7EB]">
              <Topbar space={space} />
            </div>
            <div className="sticky top-14 z-20 bg-white border-b border-[#E5E7EB] px-5 py-2 overflow-visible">
              <div className="max-w-3xl mx-auto">
                <FilterBar space={space} />
              </div>
            </div>
          </>
        )}

        {/* Route content */}
        <div className="flex-1">
          <Outlet />
        </div>
      </main>

      {/* ── Mobile Bottom Nav ─────────────────────────────────── */}
      <BottomNav />

      {/* ── New Post Modal ────────────────────────────────────── */}
      <NewPostModal space={onSpacePage ? space : currentSpace} />
    </div>
  )
}
