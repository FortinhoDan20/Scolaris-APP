import {
  Eye,
  FilePlus2,
  Pencil,
} from "lucide-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { fetchClassroomBySchoolId } from "../../feautres/classroom/classroomSlice";

const LIMIT = 10;

const Classroom = () => {
  const { classrooms, page, totalPages, loading, error } = useSelector(
    (state) => state.classroom
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    dispatch(
      fetchClassroomBySchoolId({
        id,
        params: { page, limit: LIMIT },
      })
    );
  }, [dispatch, id, page]);

  // Pagination avec ellipses
  const renderPageNumbers = () => {
    let pages = [];
    const maxPagesToShow = 5;

    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) pages.push(renderPageButton(i));
    } else {
      pages.push(renderPageButton(1));
      if (page > 3) pages.push(<span key="start-ellipsis" className="px-2 text-gray-500">...</span>);
      let start = Math.max(2, page - 1);
      let end = Math.min(totalPages - 1, page + 1);
      for (let i = start; i <= end; i++) pages.push(renderPageButton(i));
      if (page < totalPages - 2) pages.push(<span key="end-ellipsis" className="px-2 text-gray-500">...</span>);
      pages.push(renderPageButton(totalPages));
    }
    return pages;
  };

  const renderPageButton = (i) => (
    <button
      key={i}
      onClick={() => dispatch(fetchClassroomBySchoolId({ id, params: { page: i, limit: LIMIT } }))}
      className={`px-3 py-1 rounded-md mx-1 ${i === page ? "bg-sky-900 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"}`}
    >
      {i}
    </button>
  );

  // Skeleton réaliste et interactif
  const renderTableSkeleton = () =>
    Array.from({ length: LIMIT }).map((_, idx) => (
      <tr
        key={idx}
        className="animate-pulse hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer transition-colors"
      >
        <td className="p-2">
          <div className="h-4 w-6 bg-gray-300 rounded"></div>
        </td>
        <td className="p-2 text-center">
          <div className="h-4 w-16 bg-gray-300 rounded mx-auto"></div>
        </td>
        <td className="p-2">
          <div className="h-4 w-24 bg-gray-300 rounded"></div>
        </td>
        <td className="p-2">
          <div className="flex space-x-2 justify-center">
            <div className="h-4 w-4 bg-gray-300 rounded animate-pulse"></div>
            <div className="h-4 w-4 bg-gray-300 rounded animate-pulse"></div>
          </div>
        </td>
      </tr>
    ));

  // Skeleton header
  const renderHeaderSkeleton = () => (
    <div className="sm:justify-between sm:items-center mb-8 animate-pulse">
      <div className="mb-4 sm:mb-0">
        <div className="h-6 w-48 bg-gray-300 rounded"></div>
      </div>
      <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
        <div className="h-10 w-32 bg-gray-300 rounded"></div>
      </div>
    </div>
  );

  // Skeleton pagination
  const renderPaginationSkeleton = () => (
    <div className="flex justify-center items-center mt-6 space-x-2 animate-pulse">
      {Array.from({ length: 5 }).map((_, idx) => (
        <div key={idx} className="h-8 w-8 bg-gray-300 rounded"></div>
      ))}
    </div>
  );

  return (
    <>
      {/* Header */}
      {loading ? renderHeaderSkeleton() : (
        <div className="sm:justify-between sm:items-center mb-8">
          <div className="mb-4 sm:mb-0">
            <h1 className="text-2xl md:text-3xl text-sky-800 dark:text-gray-100 font-bold">
              Les salles de classe
            </h1>
          </div>
          <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
            <NavLink to="/new-classroom">
              <button className="btn bg-sky-900 text-gray-100 hover:bg-green-800 dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-white float-end mt-2 mx-5 py-2 flex items-center gap-2">
                <FilePlus2 className="w-4 h-4" />
                <span>Nouvelle</span>
              </button>
            </NavLink>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="col-span-full xl:col-span-8 bg-white dark:bg-gray-800 shadow-sm rounded-xl">
        <div className="p-3 overflow-x-auto">
          <table className="table-auto w-full dark:text-gray-300">
            <thead className="text-xs uppercase text-white dark:text-gray-500 bg-sky-900 dark:bg-gray-700 dark:bg-opacity-50 rounded-sm">
              <tr>
                <th className="p-2 text-left">N°</th>
                <th className="p-2 text-center">Cycle</th>
                <th className="p-2 text-left">Classe</th>
                <th className="p-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm font-medium divide-y divide-gray-100 dark:divide-gray-700/60">
              {loading && renderTableSkeleton()}
              {error && <tr><td colSpan="4" className="text-center py-4 text-red-500">{error}</td></tr>}
              {!loading && !error && classrooms?.length > 0 ? (
                classrooms.map((item, i) => (
                  <tr key={item._id} className="hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors cursor-pointer">
                    <td className="p-2">{(page - 1) * LIMIT + i + 1}</td>
                    <td className="p-2 text-center">{item?.cycle?.name}</td>
                    <td className="p-2">{item.classroom}</td>
                    <td className="p-2">
                      <div className="flex space-x-2">
                        <Pencil className="cursor-pointer text-blue-600" onClick={() => navigate(`/edit-classroom/${item._id}`)} />
                        <Eye className="cursor-pointer text-yellow-600" onClick={() => navigate(`/details-classroom/${item._id}`)} />
                      </div>
                    </td>
                  </tr>
                ))
              ) : (!loading && !error && (
                <tr><td colSpan="4" className="text-center py-4 text-gray-500">Aucune salle de classe trouvée.</td></tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      {loading ? renderPaginationSkeleton() : (
        <div className="flex justify-center items-center mt-6 space-x-2">
          <button
            disabled={page <= 1}
            onClick={() => dispatch(fetchClassroomBySchoolId({ id, params: { page: page - 1, limit: LIMIT } }))}
            className={`px-4 py-2 rounded-md ${page <= 1 ? "bg-gray-300 text-gray-600 cursor-not-allowed" : "bg-sky-900 text-white hover:bg-sky-700"}`}
          >
            Précédent
          </button>

          {renderPageNumbers()}

          <button
            disabled={page >= totalPages}
            onClick={() => dispatch(fetchClassroomBySchoolId({ id, params: { page: page + 1, limit: LIMIT } }))}
            className={`px-4 py-2 rounded-md ${page >= totalPages ? "bg-gray-300 text-gray-600 cursor-not-allowed" : "bg-sky-900 text-white hover:bg-sky-700"}`}
          >
            Suivant
          </button>
        </div>
      )}
    </>
  );
};

export default Classroom;
