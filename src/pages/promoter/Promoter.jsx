import { FilePlus2 } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";

const Promoter = () => {
       const navigate = useNavigate();
  return (
    <>
      <div className="sm:justify-between sm:items-center mb-8">
        {/* Title */}
        <div className="mb-4 sm:mb-0">
          <h1 className="text-2xl md:text-3xl text-sky-800 dark:text-gray-100 font-bold">
            Liste des Promoteurs
          </h1>
        </div>

        {/* Actions */}
        <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
          <button
            onClick={() => navigate(`/new-promoter`)}
            className="btn bg-sky-900 text-gray-100 hover:bg-green-800 float-end mt-2 mx-5 py-2 px-4 rounded-lg flex items-center"
          >
            <FilePlus2 />
            <span className="ml-2">Nouveau</span>
          </button>
        </div>
      </div>


    </>
  );
};

export default Promoter;
