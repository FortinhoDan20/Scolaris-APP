import {
  Eye,
  FilePlus2,
  LockKeyhole,
  LockKeyholeOpen,
  Pencil,
} from "lucide-react";
import Reac from "react";
import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";

const StatStudents = () => {
  // const { owners, loading } = useSelector((state) => state.owner);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <>
      <div className=" sm:justify-between sm:items-center mb-8">
        {/* Left: Title */}
        <div className="mb-4 sm:mb-0">
          <h1 className="text-2xl md:text-3xl text-sky-800 dark:text-gray-100 font-bold">
            L'effectif des élèves
          </h1>
        </div>

        {/* Right: Actions */}
        <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">


        </div>
      </div>

      <div className="col-span-full xl:col-span-8 bg-white dark:bg-gray-800 shadow-sm rounded-xl">
  <div className="p-3">
    <div className="overflow-x-auto">
      <table className="table-auto w-full dark:text-gray-300 border border-gray-300 dark:border-gray-700 border-collapse">
        <thead className="text-xs uppercase text-white dark:text-gray-500 bg-sky-900 dark:bg-gray-700 dark:bg-opacity-50">
          <tr>
            <th rowSpan={2} className="p-2 border border-gray-300 dark:border-gray-700">
              <div className="font-semibold text-center">N°</div>
            </th>
            <th colSpan={2} className="p-2 text-center border border-gray-300 dark:border-gray-700">
              <div className="font-semibold">Effectif Global Élève</div>
            </th>
            <th colSpan={4} className="p-2 text-center border border-gray-300 dark:border-gray-700">
              <div className="font-semibold">Effectif Inscription</div>
            </th>
            <th rowSpan={2} className="p-2 text-center border border-gray-300 dark:border-gray-700">
              <div className="font-semibold">Actions</div>
            </th>
          </tr>

          <tr>
            {/* Sous-colonnes Effectif Global Élève */}
            <th className="p-2 text-center border border-gray-300 dark:border-gray-700">
              <div className="font-semibold">Année Scolaire</div>
            </th>
            <th className="p-2 text-center border border-gray-300 dark:border-gray-700">
              <div className="font-semibold">Nombre</div>
            </th>

            {/* Sous-colonnes Effectif Inscription */}
            <th className="p-2 text-center border border-gray-300 dark:border-gray-700">
              <div className="font-semibold">Maternelle</div>
            </th>
            <th className="p-2 text-center border border-gray-300 dark:border-gray-700">
              <div className="font-semibold">Primaire</div>
            </th>
            <th className="p-2 text-center border border-gray-300 dark:border-gray-700">
              <div className="font-semibold">Secondaire</div>
            </th>
            <th className="p-2 text-center border border-gray-300 dark:border-gray-700">
              <div className="font-semibold">Total Inscrit</div>
            </th>
          </tr>
        </thead>

        <tbody className="text-sm font-medium divide-y divide-gray-100 dark:divide-gray-700/60">
          {/* Exemple de ligne */}
          <tr>
            <td className="p-2 text-center border border-gray-300 dark:border-gray-700">1</td>
            <td className="p-2 text-center border border-gray-300 dark:border-gray-700">2024-2025</td>
            <td className="p-2 text-center border border-gray-300 dark:border-gray-700">350</td>
            <td className="p-2 text-center border border-gray-300 dark:border-gray-700">120</td>
            <td className="p-2 text-center border border-gray-300 dark:border-gray-700">150</td>
            <td className="p-2 text-center border border-gray-300 dark:border-gray-700">80</td>
            <td className="p-2 text-center border border-gray-300 dark:border-gray-700">350</td>
            <td className="p-2 text-center border border-gray-300 dark:border-gray-700">
              <button className="text-blue-500 hover:underline">Voir</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</div>

    </>
  );
};

export default StatStudents;
