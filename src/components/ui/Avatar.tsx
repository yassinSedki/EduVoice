interface AvatarProps {
  initials: string
  role?: 'teacher' | 'parent' | 'admin'
  size?: 'sm' | 'md' | 'lg'
  anonymous?: boolean
}

const roleColors: Record<string, string> = {
  teacher: 'bg-[#D6EAF8] text-[#1A5276]',
  parent:  'bg-[#D5F5E3] text-[#1E8449]',
  admin:   'bg-[#FADBD8] text-[#922B21]',
}

const sizes = {
  sm: 'w-7 h-7 text-[10px]',
  md: 'w-9 h-9 text-xs',
  lg: 'w-11 h-11 text-sm',
}

export default function Avatar({ initials, role = 'teacher', size = 'md', anonymous = false }: AvatarProps) {
  return (
    <div
      className={`
        ${sizes[size]}
        ${anonymous ? 'bg-[#F8F9FA] text-[#5D6D7E] border border-[#E5E7EB]' : roleColors[role]}
        rounded-full flex items-center justify-center font-semibold flex-shrink-0
        font-[IBM_Plex_Sans]
      `}
    >
      {anonymous ? '?' : initials}
    </div>
  )
}
