import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Listbox } from "@headlessui/react";
import {
  ArrowUp,
  ArrowDown,
  ChevronsUpDown,
  Pencil,
  Eye,
} from "lucide-react";
import {
  fetchAllSchool,
  setPage,
  setPromoterName,
  setSort,
  setSortOrder,
  setSearch,
} from "../../feautres/school/schoolSlice";
import { motion, AnimatePresence } from "framer-motion";

// === Options de tri ===
const sortOptions = [
  { name: "Date de création", value: "createdAt" },
  { name: "Nom de l’école", value: "schoolName" },
  { name: "Abréviation", value: "slug" },
];

const LIMIT = 10;

// 🔹 Variants pour animations Framer Motion
const fadeVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

export default function School() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // ✅ Récupération du state Redux
  const {
    schools,
    loading,
    page,
    totalPages,
    search,
    promoterName,
    sort,
    sortOrder,
  } = useSelector((state) => state.school);

  // ✅ Charger les écoles au montage ou quand tri/pagination change
  useEffect(() => {
    dispatch(
      fetchAllSchool({
        page,
        limit: LIMIT,
        sort,
        sortOrder,
        promoterName: "",
        search: "", // pas de recherche automatique
      })
    );
  }, [dispatch, page, sort, sortOrder]);

  // === Pagination ===
  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      dispatch(setPage(newPage));
    }
  };

  // === Recherche soumise ===
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    dispatch(setPage(1)); // reset à la page 1
    dispatch(
      fetchAllSchool({
        page: 1,
        limit: LIMIT,
        search,
        sort,
        sortOrder,
        promoterName,
      })
    );
  };

  // === Reset recherche ===
  const handleReset = () => {
    dispatch(setSearch(""));
    dispatch(setPromoterName(""));
    dispatch(setPage(1));
    dispatch(
      fetchAllSchool({
        page: 1,
        limit: LIMIT,
        search: "",
        sort,
        sortOrder,
        promoterName: "",
      })
    );
  };

  return (
    <>
      <div className="sm:justify-between sm:items-center mb-8">
        <div className="mb-4 sm:mb-0">
          <h1 className="text-2xl md:text-3xl text-sky-800 dark:text-gray-100 font-bold">
            Liste des écoles
          </h1>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div
            key="skeleton"
            variants={fadeVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="col-span-full xl:col-span-8 bg-white dark:bg-gray-800 shadow-sm rounded-xl p-3"
          >
            {/* Skeleton */}
            <div className="flex flex-wrap mb-4 items-center gap-3">
              <div className="h-10 w-72 bg-gray-200 dark:bg-gray-700 rounded"></div>
              <div className="h-10 w-28 bg-gray-200 dark:bg-gray-700 rounded"></div>
              <div className="h-10 w-48 bg-gray-200 dark:bg-gray-700 rounded"></div>
              <div className="h-10 w-48 bg-gray-200 dark:bg-gray-700 rounded"></div>
              <div className="h-10 w-32 bg-gray-200 dark:bg-gray-700 rounded"></div>
            </div>
            <div className="overflow-x-auto">
              <table className="table-auto w-full">
                <thead className="text-xs uppercase text-white bg-sky-900 dark:bg-gray-700">
                  <tr>
                    {[...Array(9)].map((_, i) => (
                      <th key={i} className="p-2">
                        <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded"></div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[...Array(5)].map((_, row) => (
                    <tr key={row}>
                      {[...Array(9)].map((_, col) => (
                        <td key={col} className="p-2">
                          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        ) : schools?.length > 0 ? (
          <motion.div
            key="table"
            variants={fadeVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="col-span-full xl:col-span-8 bg-white dark:bg-gray-800 shadow-sm rounded-xl"
          >
            <div className="p-3">
              {/* Barre de recherche et filtres */}
              <form onSubmit={handleSearchSubmit} className="flex flex-wrap gap-4 mb-6">
                <input
                  type="text"
                  placeholder="Rechercher une école..."
                  value={search}
                  onChange={(e) => dispatch(setSearch(e.target.value))}
                  className="px-3 py-2 border rounded-lg w-64 dark:bg-gray-700 dark:text-white"
                />

                <input
                  type="text"
                  placeholder="Nom du promoteur..."
                  value={promoterName}
                  onChange={(e) => dispatch(setPromoterName(e.target.value))}
                  className="px-3 py-2 border rounded-lg w-64 dark:bg-gray-700 dark:text-white"
                />

                <button
                  type="submit"
                  className="px-4 py-2 bg-sky-900 text-white rounded-lg hover:bg-green-800"
                >
                  Rechercher
                </button>

                <Listbox
                  value={sort}
                  onChange={(value) => {
                    dispatch(setSort(value));
                    dispatch(setPage(1));
                  }}
                >
                  <div className="relative">
                    <Listbox.Button className="flex items-center px-3 py-2 border rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white">
                      {sortOptions.find((o) => o.value === sort)?.name || "Trier par"}
                      <ChevronsUpDown className="h-4 w-4 text-gray-500 ml-2" />
                    </Listbox.Button>
                    <Listbox.Options className="absolute mt-1 w-48 bg-white dark:bg-gray-700 border rounded-lg shadow-lg z-10">
                      {sortOptions.map((option) => (
                        <Listbox.Option
                          key={option.value}
                          value={option.value}
                          className="cursor-pointer px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600"
                        >
                          {option.name}
                        </Listbox.Option>
                      ))}
                    </Listbox.Options>
                  </div>
                </Listbox>

                <button
                  type="button"
                  onClick={() => {
                    dispatch(setSortOrder(sortOrder === "asc" ? "desc" : "asc"));
                    dispatch(setPage(1));
                  }}
                  className="flex items-center px-3 py-2 border rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600"
                >
                  {sortOrder === "asc" ? (
                    <>
                      <ArrowUp className="h-4 w-4 mr-1" /> Ascendant
                    </>
                  ) : (
                    <>
                      <ArrowDown className="h-4 w-4 mr-1" /> Descendant
                    </>
                  )}
                </button>
              </form>

              {/* Tableau des écoles */}
              <div className="overflow-x-auto">
                <table className="table-auto w-full dark:text-gray-300">
                  <thead className="text-xs uppercase text-white bg-sky-900 dark:bg-gray-700">
                    <tr>
                      <th className="p-2 text-left">N°</th>
                      <th className="p-2 text-left">Nom</th>
                      <th className="p-2 text-center">Abréviation</th>
                      <th className="p-2 text-center">Promoteur</th>
                      <th className="p-2 text-center">Créé</th>
                      <th className="p-2 text-center">Status</th>
                      <th className="p-2 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm font-medium divide-y divide-gray-100 dark:divide-gray-700/60">
                    {schools?.map((item, i) => (
                      <tr key={item._id}>
                        <td className="p-2">{(page - 1) * LIMIT + i + 1}</td>
                        <td className="p-2">{item.schoolName}</td>
                        <td className="p-2 text-center">{item.slug}</td>
                        <td className="p-2 text-center">{item?.promoter?.firstname || "—"} {item?.promoter?.name || "—"} {item?.promoter?.lastname || "—"}</td>
                        <td className="p-2 text-center">
                          {new Date(item.createdAt).toLocaleDateString()}
                        </td>
                        <td className="p-2 text-center">
                          {item?.isLocked ? (
                            <span className="text-red-600">Désactivé</span>
                          ) : (
                            <span className="text-green-800">Actif</span>
                          )}
                        </td>
                        <td className="p-2">
                          <div className="flex justify-center space-x-2">
                            <Pencil
                              className="cursor-pointer text-blue-600"
                              onClick={() => navigate(`/edit-school/${item._id}`)}
                            />
                            <Eye
                              className="cursor-pointer text-yellow-600"
                              onClick={() => navigate(`/details-school/${item._id}`)}
                            />
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className="flex justify-between items-center mt-6">
                <button
                  disabled={page <= 1}
                  onClick={() => handlePageChange(page - 1)}
                  className="px-4 py-2 border rounded-lg disabled:opacity-50"
                >
                  Précédent
                </button>
                <span className="text-gray-700 dark:text-gray-300">
                  Page {page} / {totalPages}
                </span>
                <button
                  disabled={page >= totalPages}
                  onClick={() => handlePageChange(page + 1)}
                  className="px-4 py-2 border rounded-lg disabled:opacity-50"
                >
                  Suivant
                </button>
              </div>
            </div>
          </motion.div>
        ) : (
          <div
            className="bg-yellow-100 border border-yellow-400 text-yellow-800 mt-4 px-4 py-3 rounded relative"
            role="alert"
          >
            <span className="block sm:inline">
              Aucun promoteur trouvé pour cette recherche.
            </span>
            <button
              onClick={handleReset}
              className="ml-4 px-3 py-1 bg-sky-900 text-white rounded hover:bg-green-800"
            >
              Retour à la liste complète
            </button>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
