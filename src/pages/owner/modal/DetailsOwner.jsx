import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { Loader2, ArrowLeft, User } from "lucide-react";
import { getOwner } from "../../../feautres/owner/ownerSlice";
const DetailsOwner = () => {
   const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { owner, loading, error } = useSelector((state) => state.owner);

   useEffect(() => {
    if (id) {
      dispatch(getOwner(id));
    }
  }, [id, dispatch]);
  return (
     <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-10 px-6">
      <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
        {/* Header */}
        <div className="flex items-center justify-between border-b pb-4 mb-6">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
            <User className="w-6 h-6 text-blue-500" />
            Détails du propriétaire
          </h1>
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-1 text-gray-600 dark:text-gray-300 hover:text-blue-600 transition"
          >
            <ArrowLeft className="w-5 h-5" />
            Retour
          </button>
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex justify-center items-center py-10">
            <Loader2 className="w-6 h-6 animate-spin text-blue-500" />
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="text-center text-red-500 font-medium py-4">
            {error}
          </div>
        )}

        {/* Informations */}
        {!loading && owner && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Nom</p>
              <p className="text-lg font-semibold text-gray-800 dark:text-white">
                {owner.name || "Non renseigné"}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
              <p className="text-lg font-semibold text-gray-800 dark:text-white">
                {owner.email || "Non renseigné"}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Nom d'utilisateur</p>
              <p className="text-lg font-semibold text-gray-800 dark:text-white">
                {owner.username || "Non renseigné"}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Rôle</p>
              <span className="px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-700 dark:bg-blue-700 dark:text-white">
                {owner.role || "Non défini"}
              </span>
            </div>

            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Créé le</p>
              <p className="text-lg font-semibold text-gray-800 dark:text-white">
                {owner.createdAt
                  ? new Date(owner.createdAt).toLocaleDateString()
                  : "N/A"}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Mis à jour</p>
              <p className="text-lg font-semibold text-gray-800 dark:text-white">
                {owner.updatedAt
                  ? new Date(owner.updatedAt).toLocaleDateString()
                  : "N/A"}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default DetailsOwner