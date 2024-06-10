import { motion, AnimatePresence } from 'framer-motion'

import { cn } from '@/utils/cn'

type ModalWrapperProps = {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
  className?: string
}

const ModalWrapper = ({ isOpen, onClose, children, className }: ModalWrapperProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
          onClick={onClose}
        >
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            className={cn(
              "bg-white p-4 rounded-lg w-[calc(100vh-1rem)] md:max-w-[500px]",
              className
            )}
            onClick={(e) => e.stopPropagation()}
          >
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default ModalWrapper