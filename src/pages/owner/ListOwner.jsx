import React, { useEffect, useState } from "react";
import {
  ChevronsUpDown,
  Eye,
  FilePlus2,
  Lock,
  LockOpen,
  Pencil,
  Unlock,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchAll, lockAnUnlockOwner } from "../../feautres/owner/ownerSlice";
import { Listbox } from "@headlessui/react";

const sortFieldOptions = [
  { value: "createdAt", label: "Date de création" },
  { value: "name", label: "Nom" },
  { value: "username", label: "Identifiant" },
  { value: "role", label: "Rôle" },
];

const LIMIT = 10;

const ListOwner = () => {
  const { owners, page, totalPages, loading, error } = useSelector(
    (state) => state.owner
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [sortField, setSortField] = useState(sortFieldOptions[0]);
  const [sortOrder, setSortOrder] = useState("desc");

  useEffect(() => {
    dispatch(
      fetchAll({
        page: 1,
        limit: LIMIT,
        search,
        sortField: sortField.value,
        sortOrder,
      })
    );
  }, [dispatch, sortField, sortOrder]);

  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(
      fetchAll({
        page: 1,
        limit: LIMIT,
        search,
        sortField: sortField.value,
        sortOrder,
      })
    );
  };

  const handleReset = () => {
    setSearch("");
    setSortField(sortFieldOptions[0]);
    setSortOrder("desc");
    dispatch(
      fetchAll({
        page: 1,
        limit: LIMIT,
        search: "",
        sortField: "createdAt",
        sortOrder: "desc",
      })
    );
  };

  const toggleSortOrder = () => {
    setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
  };

  const toggleOwner = (id) => {
    dispatch(lockAnUnlockOwner(id));
  };

  if (error) return <p className="text-red-500">Erreur: {error}</p>;

  return (
    <>
      <div className="sm:justify-between sm:items-center mb-8">
        <div className="mb-4 sm:mb-0">
          <h1 className="text-2xl md:text-3xl text-sky-800 dark:text-gray-100 font-bold">
            Liste des Utilisateurs
          </h1>
        </div>

        <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
          <button
            onClick={() => navigate(`/add-owner/`)}
            className="btn bg-sky-900 text-gray-100 hover:bg-green-800 float-end mt-2 mx-5 py-2 px-4 rounded-lg flex items-center"
          >
            <FilePlus2 />
            <span className="ml-2">Nouveau</span>
          </button>
        </div>
      </div>

      {loading ? (
        <div className="col-span-full xl:col-span-8 bg-white dark:bg-gray-800 shadow-sm rounded-xl animate-pulse p-3">
          {/* Skeleton barre de recherche et filtres */}
          <div className="flex flex-wrap mb-4 items-center gap-3">
            <div className="h-10 w-72 bg-gray-200 dark:bg-gray-700 rounded"></div>
            <div className="h-10 w-28 bg-gray-200 dark:bg-gray-700 rounded"></div>
            <div className="h-10 w-48 bg-gray-200 dark:bg-gray-700 rounded"></div>
            <div className="h-10 w-48 bg-gray-200 dark:bg-gray-700 rounded"></div>
            <div className="h-10 w-32 bg-gray-200 dark:bg-gray-700 rounded"></div>
          </div>

          {/* Skeleton tableau */}
          <div className="overflow-x-auto">
            <table className="table-auto w-full">
              <thead className="text-xs uppercase text-white bg-sky-900 dark:bg-gray-700">
                <tr>
                  {[...Array(6)].map((_, i) => (
                    <th key={i} className="p-2">
                      <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded"></div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[...Array(5)].map((_, row) => (
                  <tr key={row}>
                    {[...Array(6)].map((_, col) => (
                      <td key={col} className="p-2">
                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : owners?.length > 0 ? (
        <div className="col-span-full xl:col-span-8 bg-white dark:bg-gray-800 shadow-sm rounded-xl">
          <div className="p-3">
            <form
              onSubmit={handleSearch}
              className="flex flex-wrap mb-4 items-center gap-3"
            >
              <input
                type="text"
                placeholder="Rechercher un owner..."
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

              <div className="relative w-48">
                <Listbox value={sortField} onChange={setSortField}>
                  <div className="relative">
                    <Listbox.Button className="w-full flex justify-between items-center p-2.5 border rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white">
                      {sortField.label}
                      <ChevronsUpDown className="h-4 w-4 text-gray-500" />
                    </Listbox.Button>
                    <Listbox.Options className="absolute mt-1 w-full bg-white dark:bg-gray-700 rounded-lg shadow-lg z-50">
                      {sortFieldOptions.map((opt) => (
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

              <button
                type="button"
                onClick={toggleSortOrder}
                className="px-4 py-2 border rounded-lg bg-gray-200 hover:bg-gray-300"
              >
                {sortOrder === "asc" ? "⬆️ Ascendant" : "⬇️ Descendant"}
              </button>
            </form>

            <div className="overflow-x-auto">
              <table className="table-auto w-full dark:text-gray-300">
                <thead className="text-xs uppercase text-white bg-sky-900 dark:bg-gray-700">
                  <tr>
                    <th className="p-2 text-left">N°</th>
                    <th className="p-2 text-left">Nom</th>
                    <th className="p-2 text-center">Identifiant</th>
                    <th className="p-2 text-center">Rôle utilisateur</th>
                    <th className="p-2 text-center">Status</th>
                    <th className="p-2 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="text-sm font-medium divide-y divide-gray-100 dark:divide-gray-700/60">
                  {owners.map((item, i) => (
                    <tr key={item._id}>
                      <td className="p-2">{(page - 1) * LIMIT + i + 1}</td>
                      <td className="p-2">{item.name}</td>
                      <td className="p-2 text-center">{item.username}</td>
                      <td className="p-2 text-center">{item.role}</td>
                      <td className="p-2 text-center">
                        {item.isLocked ? (
                          <span className="text-red-600">Désactivé</span>
                        ) : (
                          <span className="text-green-800">Actif</span>
                        )}
                      </td>
                      <td className="p-2">
                        <div className="flex justify-center space-x-2">
                          <Pencil
                            className="cursor-pointer text-blue-600"
                            onClick={() => navigate(`/edit-owner/${item._id}`)}
                          />
                          <Eye
                            className="cursor-pointer text-yellow-600"
                            onClick={() =>
                              navigate(`/details-owner/${item._id}`)
                            }
                          />
                          {item.isLocked ? (
                            <Unlock
                              onClick={() => toggleOwner(item._id)}
                              className="w-5 h-5 text-green-600 cursor-pointer"
                            />
                          ) : (
                            <Lock
                              onClick={() => toggleOwner(item._id)}
                              className="w-5 h-5 text-red-600 cursor-pointer"
                            />
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex space-x-2 mt-4 justify-center">
              {Array.from({ length: totalPages }).map((_, index) => (
                <button
                  key={index + 1}
                  onClick={() =>
                    dispatch(
                      fetchAll({
                        page: index + 1,
                        limit: LIMIT,
                        search,
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
        </div>
      ) : (
        <div
          className="bg-yellow-100 border border-yellow-400 text-yellow-800 mt-4 px-4 py-3 rounded relative"
          role="alert"
        >
          <span className="block sm:inline">
            Aucun utilisateur trouvé pour cette recherche.
          </span>
          <button
            onClick={handleReset}
            className="ml-4 px-3 py-1 bg-sky-900 text-white rounded hover:bg-green-800"
          >
            Retour à la liste complète
          </button>
        </div>
      )}
    </>
  );
};

export default ListOwner;
