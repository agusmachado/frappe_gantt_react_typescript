import { ReactNode } from "react"

interface ModalProps {
    titulo: string
    children: ReactNode
    onClose: () => void
}


export default function Modal({titulo, children, onClose} : ModalProps) {
  return (
    <div className="fixed inset-0 bg-gray-700 bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded shadow-lg max-w-xs">
            <h5 className="text-lg font-bold text-center">{titulo}</h5>
            <div className="border-t border-gray-300 mt-4 pt-4">
                {children}
            </div>
            <div className="text-center">
                <button
                    className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
                    onClick={onClose}
                >
                    cerrar
                </button>
            </div>
        </div>
    </div>
  )
}
