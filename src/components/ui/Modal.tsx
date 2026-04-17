import { useEffect } from 'react'
import { X } from 'lucide-react'

interface ModalProps {
  open: boolean
  onClose: () => void
  children: React.ReactNode
  maxWidth?: string
}

export default function Modal({ open, onClose, children, maxWidth = 'max-w-2xl' }: ModalProps) {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [open])

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
    >
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"
        onClick={onClose}
        aria-hidden="true"
      />
      {/* Panel */}
      <div
        className={`relative w-full ${maxWidth} bg-white rounded-2xl shadow-xl border border-[#E5E7EB] overflow-hidden fade-in`}
        style={{ maxHeight: '90vh', overflowY: 'auto' }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center rounded-full text-[#5D6D7E] hover:bg-[#F8F9FA] hover:text-[#1C2833] transition-colors duration-150"
          aria-label="Close modal"
        >
          <X size={18} />
        </button>
        {children}
      </div>
    </div>
  )
}
