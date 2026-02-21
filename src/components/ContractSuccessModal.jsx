import { useEffect } from 'react'

export default function ContractSuccessModal({ isOpen, onClose, onMarkAsSigned, onKeepDraft }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
    >
      <div
        className="w-full max-w-md rounded-2xl bg-white shadow-xl"
      >
        <div className="px-5 py-6 text-center">
          <h3 className="text-xl font-semibold text-gray-900">
            Contrat généré avec succès ! 🎉
          </h3>
          <p className="mt-3 text-sm text-gray-600">
            Le fichier PDF a été téléchargé sur votre appareil.
          </p>
          <p className="mt-2 text-sm text-gray-600">
            Voulez-vous marquer ces prestations comme SIGNÉES dans votre tableau de bord ?
          </p>
        </div>
        <div className="flex gap-2 justify-end border-t border-gray-100 px-5 py-4">
          <button
            type="button"
            onClick={() => {
              onKeepDraft?.()
              onClose?.()
            }}
            className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Non, garder en brouillon
          </button>
          <button
            type="button"
            onClick={() => {
              onMarkAsSigned?.()
              onClose?.()
            }}
            className="rounded-lg bg-amber-600 px-4 py-2 text-sm font-medium text-white hover:bg-amber-700"
          >
            Oui, marquer comme Signé
          </button>
        </div>
      </div>
    </div>
  )
}
