import React from 'react'
import { useDispatch } from 'react-redux';
import { Link } from "react-router-dom";
const Forbidden403 = () => {
    const dispatch = useDispatch();
  return (
     <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 text-center px-4">
      <h1 className="text-6xl font-bold text-red-600">403</h1>
      <h2 className="mt-4 text-2xl font-semibold text-gray-800 dark:text-gray-200">
        Accès refusé
      </h2>
      <p className="mt-2 text-gray-600 dark:text-gray-400 max-w-md">
        Désolé, vous n’avez pas les autorisations nécessaires pour accéder à cette page.
      </p>

      <Link
        to="/"
        className="mt-6 inline-block bg-blue-600 text-white px-6 py-2 rounded-xl shadow hover:bg-blue-700 transition"
      >
        Retour à l’accueil
      </Link>
    </div>
  )
}

export default Forbidden403