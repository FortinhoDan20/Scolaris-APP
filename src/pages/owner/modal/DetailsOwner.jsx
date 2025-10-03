import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { User, AtSign, Calendar, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";
import { getOwner } from "../../../feautres/owner/ownerSlice";

const SkeletonCard = () => (
  <div className="p-6 bg-gray-200 dark:bg-gray-700 rounded-lg shadow animate-pulse mb-8">
    <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded w-1/3 mb-4"></div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-full"></div>
      ))}
    </div>
  </div>
);

const SkeletonTable = () => (
  <div className="p-6 bg-gray-200 dark:bg-gray-700 rounded-lg shadow animate-pulse">
    <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded w-1/4 mb-4"></div>
    <div className="space-y-2">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-full"></div>
      ))}
    </div>
  </div>
);

const DetailsOwner = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { owner, loading, error } = useSelector((state) => state.owner);

  useEffect(() => {
    if (id) dispatch(getOwner(id));
  }, [id, dispatch]);

  if (loading)
    return (
      <div className="p-6 space-y-6 min-h-screen bg-gray-50 dark:bg-gray-900">
        <SkeletonCard />
        <SkeletonTable />
      </div>
    );

  if (error)
    return <div className="text-center text-red-500 font-medium py-10">{error}</div>;

  if (!owner)
    return <div className="text-center mt-10">Aucune donnée trouvée</div>;

  const infoItems = [
    { icon: <User className="w-5 h-5 text-blue-500" />, label: "Nom", value: owner.name },
    { icon: <AtSign className="w-5 h-5 text-green-500" />, label: "Email", value: owner.email },
    { icon: <User className="w-5 h-5 text-purple-500" />, label: "Nom d'utilisateur", value: owner.username },
    { icon: <ShieldCheck className="w-5 h-5 text-pink-500" />, label: "Rôle", value: owner.role },
    { icon: <Calendar className="w-5 h-5 text-yellow-500" />, label: "Créé le", value: owner.createdAt ? new Date(owner.createdAt).toLocaleDateString() : "-" },
    { icon: <Calendar className="w-5 h-5 text-red-500" />, label: "Mis à jour", value: owner.updatedAt ? new Date(owner.updatedAt).toLocaleDateString() : "-" },
  ];

  return (
    <div className="p-6 min-h-screen bg-gray-50 dark:bg-gray-900">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 px-4 py-2 bg-blue-600 text-white rounded shadow hover:bg-blue-700 transition"
      >
        Retour
      </button>

      {/* Carte principale */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 mb-8"
      >
        <h2 className="text-2xl font-semibold mb-4">Détails du propriétaire</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {infoItems.map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-2 p-2 bg-gray-50 dark:bg-gray-700 rounded hover:bg-gray-100 dark:hover:bg-gray-600 transition"
            >
              {item.icon}
              <span className="font-medium">{item.label}:</span> <span>{item.value || "-"}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Tableau des autres infos */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6"
      >
        <h3 className="text-xl font-semibold mb-4">Autres informations</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-500 dark:text-gray-300">Champ</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-500 dark:text-gray-300">Valeur</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              <tr className="hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                <td className="px-4 py-2">Adresse</td>
                <td className="px-4 py-2">{owner.address || "-"}</td>
              </tr>
              <tr className="hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                <td className="px-4 py-2">Téléphone</td>
                <td className="px-4 py-2">{owner.phone || "-"}</td>
              </tr>
              <tr className="hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                <td className="px-4 py-2">Société</td>
                <td className="px-4 py-2">{owner.company || "-"}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
};

export default DetailsOwner;
