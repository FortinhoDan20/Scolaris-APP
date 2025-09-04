import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { Loader2, Save, ArrowLeft, ChevronsUpDown } from "lucide-react";
import { Listbox } from "@headlessui/react";

const initialState = {
  firstname: "",
  name: "",
  lastname: "",
  sex: "",
  phone: "",
  email: "",
};
const sexOptions = [
  { value: "", label: "Entrez le genre" },
  { value: "M", label: "Masculin" },
  { value: "F", label: "Féminin" },
];

const AddOwner = () => {
  const [selected, setSelected] = useState(sexOptions[0]);

    const [formData, setFormData] = useState({
      name: "",
      email: "",
      username: "",
      role: "",
      sexOptions:[0]
    });
   const { owner, loading, error } = useSelector((state) => state.owner);
    const dispatch = useDispatch();
     const navigate = useNavigate();
     

       const handleChange = (e) => {
         setFormData({ ...formData, [e.target.name]: e.target.value });
       };
     
       const handleSubmit = (e) => {
         e.preventDefault();
         console.log("data form")
   /*       dispatch(updateOwner({ id, data: formData })).then((res) => {
           if (!res.error) {
             navigate(-1); // retour à la liste
           }
         }); */
       };
  return (
    <>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-10 px-6">
      <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
        {/* Header */}
        <div className="flex items-center justify-between border-b pb-4 mb-6 ">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
           Nouvel Utilisateur
          </h1>
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-1 text-gray-600 dark:text-gray-300 hover:text-blue-600 transition"
          >
            <ArrowLeft className="w-5 h-5" />
            Retour
          </button>
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex justify-center items-center py-10">
            <Loader2 className="w-6 h-6 animate-spin text-blue-500" />
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="text-center text-red-500 font-medium py-4">
            {error}
          </div>
        )}

        {/* Form */}
        {!loading && (
          <form className="space-y-4 md:space-y-6">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Nom et Postnom
                </label>
                <input
                  type="text"
                  name="name"
                value={formData.name}
                onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Entrez le nom complet"
                  required
                  
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Identifiant
                </label>
                <input
                  type="text"
                  name="username"
                value={formData.username}
                onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Entrez l'identifiant"
                  required
                  //value={name}
                  //onChange={onInputChange}
                />
              </div>

              <div className="w-full">
                <Listbox value={formData.sexOptions} onChange={handleChange}>
                  <div className="relative">
                    <Listbox.Button className="w-full flex justify-between items-center p-2.5 border rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white">
                      {selected.label}
                      <ChevronsUpDown className="h-4 w-4 text-gray-500" />
                    </Listbox.Button>
                    <Listbox.Options className="absolute mt-1 w-full bg-white dark:bg-gray-700 rounded-lg shadow-lg z-50">
                      {sexOptions.map((opt) => (
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


              <br />

    <div className="flex justify-end items-start">
  <button
    className="bg-sky-900 text-gray-100 hover:bg-green-800 py-2 px-4 rounded-lg flex items-center shadow"
  >
    <Save className="w-4 h-4" />
    <span className="ml-2">Enregistrer</span>
  </button>
</div>

            </form>
        )}
      </div>
    </div>
    </>
  );
};

export default AddOwner;
