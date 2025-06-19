import React from 'react'
import { Trash2 } from 'lucide-react'
import { SquarePen } from 'lucide-react'

export const Comments = ({
  user,
  comment,
  date,
  isActive,
  handleEdit,
  handleDelete,
  handleClose,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black opacity-70" onClick={handleClose}></div>

      <div className="relative bg-white dark:bg-gray-800 rounded-2xl p-6 w-full max-w-md shadow-xl z-10">
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-300"
          onClick={handleClose}
        >
          ✕
        </button>

        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800 dark:text-white">
          Detalle del Comentario
        </h2>

        <div className="space-y-4">
          <div>
            <label className="text-gray-600 dark:text-gray-300 text-sm">Usuario:</label>
            <p className="text-lg font-semibold text-gray-900 dark:text-white">{user}</p>
          </div>

          <div>
            <label className="text-gray-600 dark:text-gray-300 text-sm">Comentario:</label>
            <p className="text-gray-800 dark:text-gray-200">{comment}</p>
          </div>

          <div>
            <label className="text-gray-600 dark:text-gray-300 text-sm">Fecha:</label>
            <p className="text-gray-800 dark:text-gray-200">{new Date(date).toLocaleString()}</p>
          </div>

          <div>
            <label className="text-gray-600 dark:text-gray-300 text-sm">Activo:</label>
            <p className={`font-bold ${isActive ? 'text-green-600' : 'text-red-600'}`}>
              {isActive ? 'Sí' : 'No'}
            </p>
          </div>

          <div className="flex justify-between pt-4">
            <button
              onClick={handleEdit}
              className="flex items-center space-x-1 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              <SquarePen />
              <span>Editar</span>
            </button>

            <button
              onClick={handleDelete}
              className="flex items-center space-x-1 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-700"
            >
              <Trash2 />
              <span>Eliminar</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
