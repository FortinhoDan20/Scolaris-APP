import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { Loader2, Save, ArrowLeft, ChevronsUpDown } from "lucide-react";
import {  getOwner, ownerUpdated,  } from "../../../feautres/owner/ownerSlice";
import { Listbox } from "@headlessui/react";

const roleOptions = [
  { value: "admin", label: "Administrateur" },
  { value: "operateur", label: "Opérateur de saisie" }
];

const EditOwner = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { owner, loading, error } = useSelector((state) => state.owner);

  const [formData, setFormData] = useState({
    name: "",
    username: "",
    role: "",
  });

  const [selected, setSelected] = useState(roleOptions[0]);

  useEffect(() => {
    if (id) {
      dispatch(getOwner(id));
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (owner) {
      const currentRole =
        roleOptions.find((r) => r.value === owner.role) || roleOptions[0];
      setSelected(currentRole);
      setFormData({
        name: owner.name || "",
        username: owner.username || "",
        role: owner.role || "",
      });
    }
  }, [owner]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("form :", formData, id);
    dispatch(ownerUpdated({ id, formData})).then((res) => {
      if (!res.error) {
        navigate(-1); // retour à la liste
      }
    });

  /*        dispatch(updateOwner({ id, formData })).then((res) => {
      if (!res.error) {
        navigate(-1); // retour à la liste
      }
    });  */
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-10 px-6">
      <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
        {/* Header */}
        <div className="flex items-center justify-between border-b pb-4 mb-6 ">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
            Modifier l'utilisateur
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
          <form onSubmit={handleSubmit} className="space-y-6" autoComplete="off">
            {/* Nom complet */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Nom complet
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="mt-1 block w-full rounded-xl border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2"
                placeholder="Entrez le nom complet"
                required
              />
            </div>

            {/* Nom d'utilisateur */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Nom d'utilisateur
              </label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="mt-1 block w-full rounded-xl border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2"
                placeholder="Identifiant"
                required
              />
            </div>

            {/* Rôle */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Rôle
              </label>
              <div className="w-full">
                <Listbox
                  value={selected}
                  onChange={(value) => {
                    setSelected(value);
                    setFormData({ ...formData, role: value.value });
                  }}
                >
                  <div className="relative">
                    <Listbox.Button className="w-full flex justify-between items-center p-2.5 border rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white">
                      {selected.label}
                      <ChevronsUpDown className="h-4 w-4 text-gray-500" />
                    </Listbox.Button>
                    <Listbox.Options className="absolute mt-1 w-full bg-white dark:bg-gray-700 rounded-lg shadow-lg z-50">
                      {roleOptions.map((opt) => (
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
            </div>

            {/* Bouton submit */}
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={loading}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl shadow hover:bg-blue-700 disabled:opacity-50 transition"
              >
                {loading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <Save className="w-5 h-5" />
                )}
                Modifier
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default EditOwner;
