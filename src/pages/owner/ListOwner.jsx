import React, { useEffect, useState } from "react";
import {
  ChevronsUpDown,
  Eye,
  FilePlus2,
  LockOpen,
  Pencil,
  Save,
  X,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { fetchAll, lockAnUnlockOwner } from "../../feautres/owner/ownerSlice";
import { Listbox } from "@headlessui/react";

const sortFieldOptions = [
  { value: "createdAt", label: "Date de création" },
  { value: "name", label: "Nom" },
  { value: "username", label: "Identifiant" },
  { value: "role", label: "Rôle" },
];
const ListOwner = () => {
  const { owners, page, totalPages, loading, error } = useSelector(
    (state) => state.owner
  );

  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [openModalDetails, setOpenModalDetails] = useState(false);
  const [selectedOwnerId, setSelectedOwnerId] = useState(null);
  // États locaux
  const [search, setSearch] = useState("");
  const [sortField, setSortField] = useState(sortFieldOptions[0]);
  const [sortOrder, setSortOrder] = useState("desc");

  // Charger la liste
  useEffect(() => {
    dispatch(
      fetchAll({
        page: 1,
        limit: 10,
        search,
        sortField: sortField.value, // on passe seulement la "value"
        sortOrder,
      })
    );
  }, [dispatch, sortField, sortOrder]);

  // Recherche
  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(fetchAll({ page: 1, limit: 10, search, sortField, sortOrder }));
  };

  // Toggle ordre
  const toggleSortOrder = () => {
    setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
  };

  //toggle lock and unlock owner
  const toogleOwner = (id) => {
    dispatch(lockAnUnlockOwner(id))
  //  console.log("toogle owner id:", id)
  }
  if (loading) {
    return (
      <div className="absolute inset-0 bg-white/60 backdrop-blur-sm flex items-center justify-center z-10">
        <svg
          className="w-10 h-10 animate-spin"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden
        >
          <circle
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeOpacity="0.25"
            strokeWidth="4"
          />
          <path
            d="M22 12a10 10 0 00-10-10"
            stroke="currentColor"
            strokeWidth="4"
            strokeLinecap="round"
          />
        </svg>
        <span className="sr-only">Chargement…</span>
      </div>
    );
  }

  if (error) return <p className="text-red-500">Erreur: {error}</p>;

  return (
    <>
      <div className="sm:justify-between sm:items-center mb-8">
        {/* Title */}
        <div className="mb-4 sm:mb-0">
          <h1 className="text-2xl md:text-3xl text-sky-800 dark:text-gray-100 font-bold">
            Liste des Utilisateurs
          </h1>
        </div>

        {/* Actions */}
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

      {/* === Modal === */}
      {/*       {openModal && <AddOwner setOpenModal={setOpenModal} />}
      {openModalEdit && (
        <EditOwner setOpenModalEdit={setOpenModalEdit} id={selectedOwnerId} />
      )}
      {openModalDetails && (
        <DetailsOwner
          setOpenModalDetails={setOpenModalDetails}
          id={selectedOwnerId}
        />
      )} */}

      {owners?.length > 0 ? (
        <div className="col-span-full xl:col-span-8 bg-white dark:bg-gray-800 shadow-sm rounded-xl">
          <div className="p-3">
            {/* 🔍 Barre de recherche + Tri */}
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

              {/* Listbox tri */}
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

              {/* Ordre */}
              <button
                type="button"
                onClick={toggleSortOrder}
                className="px-4 py-2 border rounded-lg bg-gray-200 hover:bg-gray-300"
              >
                {sortOrder === "asc" ? "⬆️ Ascendant" : "⬇️ Descendant"}
              </button>
            </form>

            {/* Table */}
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
                  {owners?.map((item, i) => (
                    <tr key={item._id}>
                      <td className="p-2">{i + 1}</td>
                      <td className="p-2">{item.name}</td>
                      <td className="p-2 text-center">{item.username}</td>
                      <td className="p-2 text-center">{item.role}</td>
                      <td className="p-2 text-center">{item.isLocked == true ?(<span className=" text-red-600">Désactivé</span>) : (<span className=" text-green-800">Actif</span>)}</td>

                      <td className="p-2">
                        <div className="flex justify-center space-x-2">
                          <Pencil
                            className="cursor-pointer text-blue-600"
                            /*    onClick={() => {
                              setSelectedOwnerId(item._id); // on stocke l'id du owner
                              setOpenModalEdit(true); // on ouvre le modal édition
                            }} */
                            onClick={() => navigate(`/edit-owner/${item._id}`)}
                          />
                          <Eye
                            className="cursor-pointer text-yellow-600"
                            /* onClick={() => {
                              setSelectedOwnerId(item._id); // on stocke l'id du owner
                              setOpenModalDetails(true); // on ouvre le modal édition
                            }} */
                            onClick={() =>
                              navigate(`/details-owner/${item._id}`)
                            }
                          />
                          {item.isLocked == true ? (
                            <LockOpen
                              onClick={() =>
                               toogleOwner(item._id)
                              }
                              className="cursor-pointer text-red-600"
                            />
                          ) : (
                            <LockOpen
                              onClick={() =>
                                toogleOwner(item._id)
                               
                              }
                              className="cursor-pointer text-green-600"
                            />
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex space-x-2 mt-4 justify-center">
              {Array.from({ length: totalPages }).map((_, index) => (
                <button
                  key={index + 1}
                  onClick={() =>
                    dispatch(
                      fetchAll({
                        page: index + 1,
                        limit: 10,
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
          className="bg-red-100 border border-red-400 text-red-700 mt-4 px-4 py-3 rounded relative"
          role="alert"
        >
          <span className="block sm:inline">
            Il n’y a aucun utilisateur pour l'instant.
          </span>
        </div>
      )}
    </>
  );
};

export default ListOwner;
