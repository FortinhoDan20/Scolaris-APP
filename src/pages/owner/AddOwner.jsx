import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Loader2, Save, ArrowLeft, ChevronsUpDown } from "lucide-react";
import { Listbox } from "@headlessui/react";
import { addOwner } from "../../feautres/owner/ownerSlice";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

const roleOptions = [
  { value: "", label: "Choisissez un rôle utilisateur" },
  { value: "admin", label: "Administrateur" },
  { value: "operateur", label: "Opérateur de saisie" },
];

const AddOwner = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.owner);

  const [formData, setFormData] = useState({
    name: "",
    username: "",
    role: "",
  });
  const [selected, setSelected] = useState(roleOptions[0]);
  const [errors, setErrors] = useState({});
  const inputRefs = useRef({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Le nom est requis";
    if (!formData.username.trim()) newErrors.username = "L'identifiant est requis";
    if (!formData.role) newErrors.role = "Le rôle est requis";

    setErrors(newErrors);

    // Focus automatique sur le premier champ en erreur
    const firstErrorField = Object.keys(newErrors)[0];
    if (firstErrorField && inputRefs.current[firstErrorField]) {
      inputRefs.current[firstErrorField].focus();
    }

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    dispatch(addOwner({ formData, toast })).then((res) => {
      if (!res.error) navigate(-1);
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-10 px-6">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b pb-4 mb-6">
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

        {/* Error général */}
        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-red-500 font-medium py-4"
          >
            {error}
          </motion.div>
        )}

        {/* Loading spinner */}
        {loading ? (
          <div className="flex justify-center items-center py-10">
            <Loader2 className="w-10 h-10 animate-spin text-blue-500" />
          </div>
        ) : (
          <motion.form
            onSubmit={handleSubmit}
            className="space-y-6"
            autoComplete="off"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {/* Nom complet */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Nom complet
              </label>
              <input
                ref={(el) => (inputRefs.current.name = el)}
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`mt-1 block w-full rounded-xl border p-2 sm:text-sm shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white ${
                  errors.name ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Entrez le nom complet"
              />
              {errors.name && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4 }}
                  className="text-red-500 text-sm mt-1"
                >
                  {errors.name}
                </motion.p>
              )}
            </div>

            {/* Nom d'utilisateur */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Nom d'utilisateur
              </label>
              <input
                ref={(el) => (inputRefs.current.username = el)}
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className={`mt-1 block w-full rounded-xl border p-2 sm:text-sm shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white ${
                  errors.username ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Identifiant"
              />
              {errors.username && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4 }}
                  className="text-red-500 text-sm mt-1"
                >
                  {errors.username}
                </motion.p>
              )}
            </div>

            {/* Rôle */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Rôle
              </label>
              <Listbox
                value={selected}
                onChange={(value) => {
                  setSelected(value);
                  setFormData({ ...formData, role: value.value });
                  setErrors({ ...errors, role: "" });
                }}
              >
                <div className="relative">
                  <Listbox.Button
                    className={`w-full flex justify-between items-center p-2.5 border rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white ${
                      errors.role ? "border-red-500" : "border-gray-300"
                    }`}
                  >
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
                          <span className={selected ? "font-semibold" : ""}>{opt.label}</span>
                        )}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </div>
              </Listbox>
              {errors.role && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4 }}
                  className="text-red-500 text-sm mt-1"
                >
                  {errors.role}
                </motion.p>
              )}
            </div>

            {/* Bouton submit */}
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={loading}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl shadow hover:bg-blue-700 disabled:opacity-50 transition"
              >
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                Enregistrer
              </button>
            </div>
          </motion.form>
        )}
      </motion.div>
    </div>
  );
};

export default AddOwner;
