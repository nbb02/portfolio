import React from "react"
import { X } from "lucide-react"

const Modal = ({
  closeTxt = "Close",
  confirmTxt = "Confirm",
  closeFn,
  confirmFn,
  title = "Confirm Action",
  description = "This can`t be undone.",
}: {
  closeTxt?: string
  confirmTxt?: string
  title?: string
  description?: string
  closeFn?: () => void
  confirmFn: () => void
}) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md mx-4">
        <div className="p-4 space-y-3">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
              <p className="text-sm text-gray-500 mt-1">{description}</p>
            </div>
            <button className="text-gray-400 hover:text-gray-500">
              <X size={20} />
            </button>
          </div>

          <div className="flex justify-end space-x-3 mt-6">
            {closeFn && (
              <button
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-md border border-gray-300"
                onClick={closeFn}
              >
                {closeTxt}
              </button>
            )}
            <button
              className="px-4 py-2 text-sm font-medium text-white bg-red-500 hover:bg-red-600 rounded-md"
              onClick={confirmFn}
            >
              {confirmTxt}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Modal
