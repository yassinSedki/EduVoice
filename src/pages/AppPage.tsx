import { useLocation } from 'react-router-dom'
import { spaceConfig, type SpaceKey } from '../data/mockData'
import TeachersLounge from '../components/spaces/TeachersLounge'
import ParentsForum   from '../components/spaces/ParentsForum'
import FormalClaims   from '../components/spaces/FormalClaims'
import GratitudeWall  from '../components/spaces/GratitudeWall'

function spaceFromPath(pathname: string): SpaceKey {
  const keys = Object.keys(spaceConfig) as SpaceKey[]
  return keys.find((k) => pathname.startsWith(spaceConfig[k].route)) ?? 'lounge'
}

export default function AppPage() {
  const location = useLocation()
  const space = spaceFromPath(location.pathname)

  return (
    <div className="py-4 px-4 md:px-6 max-w-3xl mx-auto">
      {space === 'lounge'    && <TeachersLounge />}
      {space === 'parents'   && <ParentsForum />}
      {space === 'claims'    && <FormalClaims />}
      {space === 'gratitude' && <GratitudeWall />}
    </div>
  )
}
