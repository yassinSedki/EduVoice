interface StatCardProps {
  label: string
  value: string | number
  color: string
  bg: string
  icon?: React.ReactNode
}

export default function StatCard({ label, value, color, bg, icon }: StatCardProps) {
  return (
    <div
      className="rounded-lg p-3 border border-[#E5E7EB] flex flex-col gap-1"
      style={{ backgroundColor: bg }}
    >
      <div className="flex items-center gap-1.5">
        {icon && <span style={{ color }}>{icon}</span>}
        <span className="label-caps" style={{ color }}>{label}</span>
      </div>
      <span
        className="text-2xl font-bold font-display leading-none"
        style={{ color }}
      >
        {value}
      </span>
    </div>
  )
}
