import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';


/**
 * PrivateRoute protège une route et redirige vers /login si l'utilisateur n'est pas connecté.
 * @param {JSX.Element} children - Le composant enfant à afficher si autorisé
 * @param {Array<string>} roles - Liste des rôles autorisés (ex: ["admin", "manager"])
 */



const PrivateRoute = ({children, roles }) => {
    const { auth } = useSelector((state) => ({ ...state}))
  const ownerRole = auth?.owner?.owner.role
  console.log("auth connected :", auth)

  // Si pas d'utilisateur, on redirige vers la page de connexion
  if (!auth) {
    return <Navigate to="/login" replace />;
  }

/* // Vérifie les rôles si précisés
  if (roles && roles.length > 0) {
   // const userRole = auth.user.role; // ⚠️ suppose que tu stockes "role" dans auth.user
    if (!roles.includes(ownerRole)) {
      return <Navigate to="/403" replace />; // ou vers une page 403 / accès refusé
    }
  }
   */

  // Sinon on affiche la route protégée
  return children;
}

export default PrivateRoute