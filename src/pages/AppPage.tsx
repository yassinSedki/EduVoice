import { useLocation } from 'react-router-dom'
import { spaceConfig, type SpaceKey } from '../data/mockData'
import SpaceFeed from '../components/spaces/SpaceFeed'

function spaceFromPath(pathname: string): SpaceKey {
  const keys = Object.keys(spaceConfig) as SpaceKey[]
  return keys.find((k) => pathname.startsWith(spaceConfig[k].route)) ?? 'lounge'
}

const emptyStateKeys: Record<SpaceKey, { title: string; sub: string }> = {
  lounge: { title: 'app.empty.lounge_title', sub: 'app.empty.lounge_sub' },
  parents: { title: 'app.empty.parents_title', sub: 'app.empty.parents_sub' },
  claims: { title: 'app.empty.claims_title', sub: 'app.empty.claims_sub' },
  gratitude: { title: 'app.empty.gratitude_title', sub: 'app.empty.gratitude_sub' },
}

export default function AppPage() {
  const location = useLocation()
  const space = spaceFromPath(location.pathname)
  const { title, sub } = emptyStateKeys[space]

  return (
    <div className="py-4 px-4 md:px-6 max-w-3xl mx-auto">
      <SpaceFeed space={space} emptyTitleKey={title} emptySubKey={sub} />
    </div>
  )
}
