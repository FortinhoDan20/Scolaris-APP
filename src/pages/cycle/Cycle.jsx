import React, { useEffect } from "react";
import {
  FilePlus2,
  LockKeyhole,
  LockKeyholeOpen,
  Pencil,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { getAllCycles } from "../../feautres/cycle/cycleSlice";

// 🦴 Composant skeleton pour une ligne du tableau
const SkeletonRow = () => (
  <tr className="animate-pulse">
    {[...Array(7)].map((_, i) => (
      <td key={i} className="p-2">
        <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-full"></div>
      </td>
    ))}
  </tr>
);

const Cycle = () => {
  const { cycles, loading } = useSelector((state) => state.cycle);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getAllCycles(id));
  }, [dispatch, id]);

  return (
    <>
      <div className="sm:justify-between sm:items-center mb-8">
        {/* Titre */}
        <div className="mb-4 sm:mb-0">
          <h1 className="text-2xl md:text-3xl text-sky-800 dark:text-gray-100 font-bold">
            Les Cycles Organisés
          </h1>
        </div>

        {/* Bouton "Nouvelle" */}
        <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
          <NavLink to="/new-promoter">
            <button className="btn bg-sky-900 text-gray-100 hover:bg-green-800 dark:bg-gray-100 dark:text-gray-800 dark:hover:bg-white mt-2 mx-5 py-2">
              <FilePlus2 />
              <span className="max-xs:sr-only">&nbsp; Nouvelle</span>
            </button>
          </NavLink>
        </div>
      </div>

      <div className="col-span-full xl:col-span-8 bg-white dark:bg-gray-800 shadow-sm rounded-xl">
        <div className="p-3 overflow-x-auto">
          {/* Tableau complet */}
          <table className="table-auto w-full dark:text-gray-300">
            {/* En-têtes */}
            <thead className="text-xs uppercase text-white dark:text-gray-500 bg-sky-900 dark:bg-gray-700 dark:bg-opacity-50 rounded-sm">
              <tr>
                <th className="p-2 text-left">N°</th>
                <th className="p-2 text-left">Nom</th>
                <th className="p-2 text-center">Actions</th>
              </tr>
            </thead>

            {/* Corps du tableau */}
            <tbody className="text-sm font-medium divide-y divide-gray-100 dark:divide-gray-700/60">
              {loading ? (
                // 💀 Skeleton Loader pendant le chargement
                [...Array(5)].map((_, i) => <SkeletonRow key={i} />)
              ) : cycles?.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center py-6 text-gray-500">
                    Aucun cycle disponible.
                  </td>
                </tr>
              ) : (
                cycles.map((item, i) => (
                  <tr key={item._id}>
                    <td className="p-2">{i + 1}</td>
                    <td className="p-2">{item.name}</td>

                    <td className="p-2">
                      <div className="flex justify-center space-x-2">
                        {item.isLocked ? (
                          <LockKeyholeOpen
                            className="cursor-pointer text-green-600"
                            onClick={() =>
                              navigate(`/view-option/${item._id}`)
                            }
                          />
                        ) : (
                          <>
                            <Pencil
                              className="cursor-pointer text-blue-600"
                              onClick={() =>
                                navigate(`/updated-promoter/${item._id}`)
                              }
                            />
                            <LockKeyhole
                              className="cursor-pointer text-red-600"
                              onClick={() =>
                                navigate(`/updated-option/${item._id}`)
                              }
                            />
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Cycle;
