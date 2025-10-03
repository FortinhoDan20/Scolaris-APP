import {
  FilePlus2,
  ChevronsUpDown,
  Eye,
  Pencil,
  ArrowUp,
  ArrowDown,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllPromoters } from "../../feautres/promoter/promoterSlice";
import { Listbox } from "@headlessui/react";
import { motion, AnimatePresence } from "framer-motion";

const genders = [
  { value: "all", label: "Tous" },
  { value: "M", label: "Hommes" },
  { value: "F", label: "Femmes" },
];

const sortFields = [
  { value: "createdAt", label: "Date" },
  { value: "name", label: "Nom" },
  { value: "lastname", label: "Prénom" },
];

const LIMIT = 10;

// 🔹 Variante plus légère pour Framer Motion
const fadeVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.2, ease: "easeInOut" } },
  exit: { opacity: 0, transition: { duration: 0.15, ease: "easeInOut" } },
};

const Promoter = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [gender, setGender] = useState(genders[0]);
  const [sortField, setSortField] = useState(sortFields[0]);
  const [sortOrder, setSortOrder] = useState("asc");

  const { page, totalPages, error, promoters = [], loading } = useSelector(
    (state) => state.promoter
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(
        fetchAllPromoters({
          page,
          limit: LIMIT,
          search,
          gender: gender.value || "all",
          sortField: sortField.value,
          sortOrder,
        })
      );
    }, 500);
    return () => clearTimeout(timer);
  }, [dispatch, page, search, gender, sortField, sortOrder]);

  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(
      fetchAllPromoters({
        page: 1,
        limit: LIMIT,
        search,
        gender: gender.value,
        sortField: sortField.value,
        sortOrder,
      })
    );
  };

  const handleReset = () => {
    setSearch("");
    setGender(genders[0]);
    setSortField(sortFields[0]);
    setSortOrder("asc");
    dispatch(
      fetchAllPromoters({
        page: 1,
        limit: LIMIT,
        search: "",
        gender: "all",
        sortField: "createdAt",
        sortOrder: "asc",
      })
    );
  };

  const toggleSortOrder = () => {
    setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
  };

  if (error) return <p className="text-red-500">Erreur: {error}</p>;

  return (
    <>
      <div className="sm:justify-between sm:items-center mb-8">
        <div className="mb-4 sm:mb-0">
          <h1 className="text-2xl md:text-3xl text-sky-800 dark:text-gray-100 font-bold">
            Liste des Promoteurs
          </h1>
        </div>
        <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
          <button
            onClick={() => navigate(`/new-promoter/`)}
            className="btn bg-sky-900 text-gray-100 hover:bg-green-800 float-end mt-2 mx-5 py-2 px-4 rounded-lg flex items-center"
          >
            <FilePlus2 />
            <span className="ml-2">Nouveau</span>
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {loading ? (
          // 🔹 Skeleton plus simple (sans animate-pulse)
          <motion.div
            key="skeleton"
            variants={fadeVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="col-span-full xl:col-span-8 bg-white dark:bg-gray-800 shadow-sm rounded-xl p-3"
          >
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
        ) : promoters?.length > 0 ? (
          // 🔹 Tableau avec fade simple
          <motion.div
            key="table"
            variants={fadeVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="col-span-full xl:col-span-8 bg-white dark:bg-gray-800 shadow-sm rounded-xl"
          >
            <div className="p-3">
              {/* 🔹 Barre de recherche et filtres */}
              <form
                onSubmit={handleSearch}
                className="flex flex-wrap mb-4 items-center gap-3"
              >
                <input
                  type="text"
                  placeholder="Rechercher un promoteur..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-72 p-2 border rounded-lg outline-none"
                />
                <button
                  type="submit"
                  className="px-4 py-2 btn bg-sky-900 text-gray-100 hover:bg-green-800 rounded-lg"
                >
                  Rechercher
                </button>

                {/* 🔹 Tri */}
                <div className="relative w-48">
                  <Listbox value={sortField} onChange={setSortField}>
                    <div className="relative">
                      <Listbox.Button className="w-full flex justify-between items-center p-2.5 border rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white">
                        {sortField.label}
                        <ChevronsUpDown className="h-4 w-4 text-gray-500" />
                      </Listbox.Button>
                      <Listbox.Options className="absolute mt-1 w-full bg-white dark:bg-gray-700 rounded-lg shadow-lg z-50">
                        {sortFields.map((opt) => (
                          <Listbox.Option
                            key={opt.value}
                            value={opt}
                            className="cursor-pointer select-none p-2 hover:bg-gray-100 dark:hover:bg-gray-600"
                          >
                            {({ selected }) => (
                              <span className={selected ? "font-semibold" : ""}>
                                {opt.label}
                              </span>
                            )}
                          </Listbox.Option>
                        ))}
                      </Listbox.Options>
                    </div>
                  </Listbox>
                </div>

                {/* 🔹 Genre */}
                <div className="relative w-48">
                  <Listbox value={gender} onChange={setGender}>
                    <div className="relative">
                      <Listbox.Button className="w-full flex justify-between items-center p-2.5 border rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white">
                        {gender.label}
                        <ChevronsUpDown className="h-4 w-4 text-gray-500" />
                      </Listbox.Button>
                      <Listbox.Options className="absolute mt-1 w-full bg-white dark:bg-gray-700 rounded-lg shadow-lg z-50">
                        {genders.map((opt) => (
                          <Listbox.Option
                            key={opt.value}
                            value={opt}
                            className="cursor-pointer select-none p-2 hover:bg-gray-100 dark:hover:bg-gray-600"
                          >
                            {({ selected }) => (
                              <span className={selected ? "font-semibold" : ""}>
                                {opt.label}
                              </span>
                            )}
                          </Listbox.Option>
                        ))}
                      </Listbox.Options>
                    </div>
                  </Listbox>
                </div>

                {/* 🔹 Ordre asc/desc */}
                <button
                  type="button"
                  onClick={toggleSortOrder}
                  className="px-4 py-2 border rounded-lg bg-gray-200 hover:bg-gray-300 flex items-center"
                >
                  {sortOrder === "asc" ? (
                    <ArrowUp className="h-4 w-4 mr-1" />
                  ) : (
                    <ArrowDown className="h-4 w-4 mr-1" />
                  )}
                  {sortOrder === "asc" ? "Ascendant" : "Descendant"}
                </button>
              </form>

              {/* 🔹 Tableau des promoteurs */}
              <div className="overflow-x-auto">
                <table className="table-auto w-full dark:text-gray-300">
                  <thead className="text-xs uppercase text-white bg-sky-900 dark:bg-gray-700">
                    <tr>
                      <th className="p-2 text-left">N°</th>
                      <th className="p-2 text-left">Nom</th>
                      <th className="p-2 text-center">Postnom</th>
                      <th className="p-2 text-center">Prénom</th>
                      <th className="p-2 text-center">Genre</th>
                      <th className="p-2 text-center">Téléphone</th>
                      <th className="p-2 text-center">E-mail</th>
                      <th className="p-2 text-center">Status</th>
                      <th className="p-2 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm font-medium divide-y divide-gray-100 dark:divide-gray-700/60">
                    {promoters?.map((item, i) => (
                      <tr key={item._id}>
                        <td className="p-2">
                          {(page - 1) * LIMIT + i + 1}
                        </td>
                        <td className="p-2">{item.name}</td>
                        <td className="p-2 text-center">{item.lastname}</td>
                        <td className="p-2 text-center">{item.firstname}</td>
                        <td className="p-2 text-center">{item.gender}</td>
                        <td className="p-2 text-center">{item.phone}</td>
                        <td className="p-2 text-center">{item.email}</td>
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
                              onClick={() =>
                                navigate(`/edit-promoter/${item._id}`)
                              }
                            />
                            <Eye
                              className="cursor-pointer text-yellow-600"
                              onClick={() =>
                                navigate(`/details-promoter/${item._id}`)
                              }
                            />
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* 🔹 Pagination */}
              <div className="flex space-x-2 mt-4 justify-center">
                {Array.from({ length: totalPages }).map((_, index) => (
                  <button
                    key={index + 1}
                    onClick={() =>
                      dispatch(
                        fetchAllPromoters({
                          page: index + 1,
                          limit: LIMIT,
                          search,
                          gender: gender.value,
                          sortField: sortField.value,
                          sortOrder,
                        })
                      )
                    }
                    className={`px-4 py-2 rounded ${
                      page === index + 1
                        ? "bg-blue-600 text-white"
                        : "bg-gray-200 hover:bg-gray-300"
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}
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
};

export default Promoter;
