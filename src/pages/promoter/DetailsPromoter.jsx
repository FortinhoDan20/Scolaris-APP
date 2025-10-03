import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getPromoter } from "../../feautres/promoter/promoterSlice";
import { User, AtSign, Phone, Users, Eye, Lock, Unlock } from "lucide-react";
import { motion } from "framer-motion";

const SkeletonCard = () => (
  <div className="p-6 bg-gray-200 dark:bg-gray-700 rounded-lg shadow animate-pulse mb-8">
    <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded w-1/3 mb-4"></div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-full"
        ></div>
      ))}
    </div>
  </div>
);

const SkeletonTable = () => (
  <div className="p-6 bg-gray-200 dark:bg-gray-700 rounded-lg shadow animate-pulse">
    <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded w-1/4 mb-4"></div>
    <div className="space-y-2">
      {[...Array(3)].map((_, i) => (
        <div
          key={i}
          className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-full"
        ></div>
      ))}
    </div>
  </div>
);

const DetailsPromoter = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, promoter, schools } = useSelector(
    (state) => state.promoter
  );

  useEffect(() => {
    dispatch(getPromoter(id));
  }, [dispatch, id]);

  if (loading)
    return (
      <div className="p-6 space-y-6">
        <SkeletonCard />
        <SkeletonTable />
      </div>
    );

  if (error)
    return <div className="text-red-500 mt-10 text-center">{error}</div>;

  if (!promoter)
    return <div className="text-center mt-10">Aucune donnée trouvée</div>;

  const infoItems = [
    {
      icon: <User className="w-5 h-5 text-blue-500" />,
      label: "Prénom",
      value: promoter.firstname,
    },
    {
      icon: <User className="w-5 h-5 text-green-500" />,
      label: "Nom",
      value: promoter.name,
    },
    {
      icon: <Users className="w-5 h-5 text-purple-500" />,
      label: "Nom de famille",
      value: promoter.lastname,
    },
    {
      icon: <Users className="w-5 h-5 text-pink-500" />,
      label: "Genre",
      value: promoter.gender,
    },
    {
      icon: <Phone className="w-5 h-5 text-yellow-500" />,
      label: "Téléphone",
      value: promoter.phone,
    },
    {
      icon: <AtSign className="w-5 h-5 text-red-500" />,
      label: "Email",
      value: promoter.email,
    },
  ];

  return (
    <div className="p-6 bg-gray-50 dark:bg-gray-900 min-h-screen text-gray-900 dark:text-gray-100">
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
        <h2 className="text-2xl font-semibold mb-4">Détails du promoteur</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {infoItems.map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-2 p-2 bg-gray-50 dark:bg-gray-700 rounded hover:bg-gray-100 dark:hover:bg-gray-600 transition"
            >
              {item.icon}
              <span className="font-medium">{item.label}:</span>{" "}
              <span>{item.value || "-"}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Tableau amélioré avec icônes */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6"
      >
        <h3 className="text-xl font-semibold mb-4">Écoles associées</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 table-auto">
            <thead className="bg-gray-50 dark:bg-gray-700 sticky top-0">
              <tr>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-500 dark:text-gray-300">
                  Nom de l'école
                </th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-500 dark:text-gray-300">
                  Abbréviation
                </th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-500 dark:text-gray-300">
                  Adresse
                </th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-500 dark:text-gray-300">
                  Status
                </th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-500 dark:text-gray-300">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
              {schools?.map((item, i) => (
                <tr
                  key={i}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                >
                  <td className="px-4 py-2">{item.schoolName}</td>
                  <td className="px-4 py-2">{item.slug}</td>
                  <td className="px-4 py-2">{item.address}</td>
                  <td className="px-4 py-2">
                    {item.isLocked ? (
                      <span className="text-red-600">Désactivé</span>
                    ) : (
                      <span className="text-green-800">Actif</span>
                    )}
                  </td>
                  <td className="px-4 py-2 flex items-center gap-3">
                    {/* Voir */}
                    <button className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition">
                      <Eye
                        onClick={() => navigate(`/details-school/${item._id}`)}
                        className="w-5 h-5 text-blue-600 cursor-pointer"
                      />
                    </button>
                    {/* Blocage/Déblocage */}
                    <button className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition">
                      {item.isLocked ? (
                        <Unlock
                          onClick={() => toggleSchool(item._id)}
                          className="w-5 h-5 text-green-600 cursor-pointer"
                        />
                      ) : (
                        <Lock
                          onClick={() => toggleSchool(item._id)}
                          className="w-5 h-5 text-red-600 cursor-pointer"
                        />
                      )}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
};

export default DetailsPromoter;
