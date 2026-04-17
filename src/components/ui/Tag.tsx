interface TagProps {
  label: string
  color: string
  bg: string
  size?: 'xs' | 'sm'
}

export default function Tag({ label, color, bg, size = 'sm' }: TagProps) {
  const fontSize = size === 'xs' ? 'text-[10px]' : 'text-[11px]'
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-full font-medium ${fontSize} leading-none whitespace-nowrap`}
      style={{ backgroundColor: bg, color }}
    >
      {label}
    </span>
  )
}
