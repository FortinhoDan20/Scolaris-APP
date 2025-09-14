import React, { useEffect, useState } from "react";
import {
  Eye,
  FilePlus2,
  LockKeyhole,
  LockKeyholeOpen,
  Pencil,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { fetchAll, getAllOwners } from "../../feautres/owner/ownerSlice";

const Owner = () => {
  const {
    owners,
    page,
    totalPages,
    loading,
    error,
  } = useSelector((state) => state.owner);
  const dispatch = useDispatch();

  // États locaux pour filtres
  const [search, setSearch] = useState("");
  const [sortField, setSortField] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("desc");

  useEffect(() => {
    //dispatch(getAllOwners());
    dispatch(fetchAll({ page: 1, limit: 10, search: "" }));
  }, [dispatch]);

  // Fonction recherche
  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(fetchAll({ page: 1, limit: 5, search }));
  };

  if (loading) return <p className="text-blue-500">Chargement...</p>;
  if (error) return <p className="text-red-500">Erreur: {error}</p>;

  return (
    <>
      {loading && (
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
      )}
      <div className=" sm:justify-between sm:items-center mb-8">
        {/* Left: Title */}
        <div className="mb-4 sm:mb-0">
          <h1 className="text-2xl md:text-3xl text-sky-800 dark:text-gray-100 font-bold">
            Liste des Utilisateursx
          </h1>
        </div>
        {/* Barre de recherche */}

        {/* Right: Actions */}
        <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
          {/* Filter button */}
          <NavLink to="/new-owner">
            <button className="btn bg-sky-900 text-gray-100 hover:bg-green-800 float-end  mt-2 mx-5 py-2">
              <FilePlus2
                style={{
                  fontSize: "1px",
                }}
              />

              <span className="max-xs:sr-only"> &nbsp; Nouveaux</span>
            </button>
          </NavLink>
        </div>
      </div>
      {owners?.owners?.length > 0 ? (
        <div className="col-span-full xl:col-span-8 bg-white dark:bg-gray-800 shadow-sm rounded-xl">
          <div className="p-3">
            {/* Table */}
            <div className="col-span-full xl:col-span-8 bg-white dark:bg-gray-800 shadow-sm rounded-xl">
              <div className="p-3">
                {/* Table */}
                {/* 🔍 Barre de recherche */}
                <form
                  onSubmit={handleSearch}
                  className="flex mb-4 items-center"
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
                    className="ml-2 px-4 py-2 btn bg-sky-900 text-gray-100 hover:bg-green-800 rounded-lg "
                  >
                    Rechercher
                  </button>
                </form>
                <div className="overflow-x-auto">
                  <table className="table-auto w-full dark:text-gray-300">
                    {/* Table header */}
                    <thead className="text-xs uppercase  text-white dark:text-gray-500 bg-sky-900 dark:bg-gray-700 dark:bg-opacity-50 rounded-sm">
                      <tr>
                        <th className="p-2">
                          <div className="font-semibold text-left">N°</div>
                        </th>
                        <th className="p-2">
                          <div className="font-semibold text-left">Nom </div>
                        </th>
                        <th className="p-2">
                          <div className="font-semibold text-center">
                            Identifiant
                          </div>
                        </th>
                        <th className="p-2">
                          <div className="font-semibold text-center">
                            Rôle utilisateur
                          </div>
                        </th>

                        <th className="p-2">
                          <div className="font-semibold text-center">
                            Actions
                          </div>
                        </th>
                      </tr>
                    </thead>
                    {loading ? (
                      <>
                        {loading && (
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
                        )}
                      </>
                    ) : (
                      <>
                        {/* fetch data here*/}
                        {owners?.owners?.map((item, i) => {
                          return (
                            <>
                              <tbody className="text-sm font-medium divide-y divide-gray-100 dark:divide-gray-700/60">
                                <tr key={item._id}>
                                  <td className="p-2">
                                    <div className="text-gray-800 dark:text-gray-100">
                                      {i + 1}
                                    </div>
                                  </td>
                                  <td className="p-2">
                                    <div className="text-gray-800 dark:text-gray-100">
                                      {item.name}
                                    </div>
                                  </td>
                                  <td className="p-2">
                                    <div className="text-center">
                                      {item.username}
                                    </div>
                                  </td>
                                  <td className="p-2">
                                    <div className="text-center">
                                      {item.role}
                                    </div>
                                  </td>

                                  <td className="p-2 ">
                                    <div className=" space-x-2 text-center flex justify-center">
                                      <Pencil
                                        style={{
                                          fontSize: "1px",
                                          color: "blue",
                                          cursor: "pointer",
                                        }}
                                        className="cursor-pointer"
                                        onClick={() => {
                                          navigate(
                                            `/edit-owner/${item._id}`
                                          );
                                        }}
                                      />
                                      <Eye
                                        style={{
                                          fontSize: "1px",
                                          color: "green",
                                          cursor: "pointer",
                                        }}
                                        className="cursor-pointer"
                                        onClick={() => {
                                          navigate(
                                            `/details-owner/${item._id}`
                                          );
                                        }}
                                      />
                                    </div>
                                  </td>
                                </tr>
                              </tbody>
                            </>
                          );
                        })}
                      </>
                    )}
                  </table>
                </div>
                {/* Pagination */}
                <div className="flex space-x-2 mt-4  justify-center">
                  {Array.from({ length: totalPages }).map((_, index) => (
                    <button
                      key={index + 1}
                      onClick={() => dispatch(setPage(index + 1))}
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
          </div>
        </div>
      ) : (
        <div
          className="bg-red-100 border border-red-400 text-red-700 mt-4 px-4 py-3 rounded relative"
          role="alert"
        >
          <strong className="font-bold"> </strong>
          <span className="block sm:inline">
            Il y a aucun utilisateur pour l'instant.
          </span>
          <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
            <svg
              className="fill-current h-6 w-6 text-red-500"
              role="button"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <title>Close</title>
              <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
            </svg>
          </span>
        </div>
      )}
    </>
  );
};

export default Owner;
