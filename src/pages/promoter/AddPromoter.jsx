import { Listbox } from "@headlessui/react";
import {
  ArrowLeft,
  ChevronsUpDown,
  Save,
  AlertCircle,
} from "lucide-react";
import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { addPromoter } from "../../feautres/promoter/promoterSlice";

const initialState = {
  firstname: "",
  name: "",
  lastname: "",
  gender: "",
  phone: "",
  email: "",
  schoolName: "",
  slug: "",
  address: "",
  username: "",
  password: "",
  confirmPassword: "",
};

const genderOptions = [
  { value: "", label: "Choisissez le genre" },
  { value: "M", label: "Masculin" },
  { value: "F", label: "Féminin" },
];

const AddPromoter = () => {
  const [formData, setFormData] = useState(initialState);
  const [selected, setSelected] = useState(genderOptions[0]);
  const [errors, setErrors] = useState({});
  const inputRefs = useRef({});
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.promoter);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validateForm = () => {
    let newErrors = {};
    const requiredFields = [
      "firstname",
      "name",
      "phone",
      "email",
      "schoolName",
      "address",
      "username",
      "password",
      "confirmPassword",
    ];

    requiredFields.forEach((field) => {
      if (!formData[field]) {
        newErrors[field] = "Ce champ est requis";
      }
    });

    if (
      formData.password &&
      formData.confirmPassword &&
      formData.password !== formData.confirmPassword
    ) {
      newErrors.confirmPassword = "Les mots de passe ne correspondent pas";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      const firstErrorField = Object.keys(newErrors)[0];
      if (inputRefs.current[firstErrorField]) {
        inputRefs.current[firstErrorField].focus();
      }
      return false;
    }

    return true;
  };

const handleSubmit = (e) => {
  e.preventDefault();

  // 1️⃣ Validation des champs
  if (!validateForm()) {
    toast.error("Veuillez corriger les erreurs avant de continuer");
    return;
  }

  // 2️⃣ S'assurer que le genre a une valeur par défaut si non choisi
  const submitData = {
    ...formData,
    gender: formData.gender || "M", // Masculin par défaut
  };

  // 3️⃣ Dispatch du thunk addPromoter
  dispatch(addPromoter(submitData))
    .unwrap() // pour gérer la promesse
    .then(() => {
      toast.success("Promoteur ajouté avec succès !");
      navigate(-1); // retour à la page précédente
    })
    .catch((err) => {
      console.error("Erreur lors de l'ajout :", err);
      // L'erreur est déjà affichée par toast dans le thunk
    });
};

  const inputClass = (field) =>
    `w-full p-3 rounded-xl shadow-sm transition focus:ring-2 focus:ring-blue-500 focus:outline-none ${
      errors[field]
        ? "border border-red-500 bg-red-50"
        : "border border-gray-300 bg-white dark:bg-gray-700"
    }`;

  // Skeleton component
  const SkeletonLine = ({ width = "full", height = 5, className = "" }) => (
    <div
      className={`bg-gray-300 dark:bg-gray-600 rounded-xl animate-pulse ${className}`}
      style={{ width: width === "full" ? "100%" : width, height }}
    />
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800 py-10 px-6">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b pb-4 mb-6">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
            Nouveau Promoteur
          </h1>
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-1 text-gray-600 dark:text-gray-300 hover:text-blue-600 transition"
          >
            <ArrowLeft className="w-5 h-5" />
            Retour
          </button>
        </div>

        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-2 text-red-600 font-medium py-3"
          >
            <AlertCircle className="w-5 h-5" />
            {error}
          </motion.div>
        )}

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="space-y-8"
          autoComplete="off"
        >
          {/* Promoteur */}
          <span className="text-xl font-semibold text-gray-800 dark:text-gray-100">
            1. Informations du Promoteur
          </span>
          <div className="bg-gray-50 dark:bg-gray-700 shadow-inner p-6 rounded-2xl grid grid-cols-1 md:grid-cols-2 gap-6">
            {loading
              ? <>
                  <SkeletonLine height={48} />
                  <SkeletonLine height={48} />
                  <SkeletonLine height={48} />
                  <SkeletonLine height={48} />
                  <SkeletonLine height={48} />
                  <SkeletonLine height={48} />
                </>
              : ["firstname", "name", "lastname", "phone", "email"].map(
                  (field, idx) => (
                    <div key={idx}>
                      <input
                        ref={(el) => (inputRefs.current[field] = el)}
                        type={field === "phone" ? "tel" : "text"}
                        name={field}
                        placeholder={
                          field === "firstname"
                            ? "Prénom"
                            : field === "name"
                            ? "Nom"
                            : field === "lastname"
                            ? "Postnom"
                            : field === "phone"
                            ? "Téléphone"
                            : "Email"
                        }
                        value={formData[field]}
                        onChange={handleChange}
                        className={inputClass(field)}
                      />
                      {errors[field] && (
                        <motion.p
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="text-red-500 text-sm mt-1"
                        >
                          {errors[field]}
                        </motion.p>
                      )}
                    </div>
                  )
                )}

            {/* Genre */}
            {!loading && (
              <div className="w-full">
                <Listbox
                  value={selected}
                  onChange={(value) => {
                    setSelected(value);
                    setFormData({ ...formData, gender: value.value });
                  }}
                >
                  <div className="relative">
                    <Listbox.Button className="w-full flex justify-between items-center p-3 border rounded-xl bg-gray-50 dark:bg-gray-600 text-gray-900 dark:text-white">
                      {selected.label}
                      <ChevronsUpDown className="h-4 w-4 text-gray-500" />
                    </Listbox.Button>
                    <Listbox.Options className="absolute mt-1 w-full bg-white dark:bg-gray-700 rounded-xl shadow-lg z-50">
                      {genderOptions.map((opt) => (
                        <Listbox.Option
                          key={opt.value}
                          value={opt}
                          className="cursor-pointer select-none p-2 hover:bg-gray-100 dark:hover:bg-gray-600"
                        >
                          {opt.label}
                        </Listbox.Option>
                      ))}
                    </Listbox.Options>
                  </div>
                </Listbox>
              </div>
            )}
          </div>

          {/* École */}
          <span className="text-xl font-semibold text-gray-800 dark:text-gray-100">
            2. Informations sur l&apos;École
          </span>
          <div className="bg-gray-50 dark:bg-gray-700 shadow-inner p-6 rounded-2xl grid grid-cols-1 gap-6">
            {loading
              ? <>
                  <SkeletonLine height={48} />
                  <SkeletonLine height={48} />
                  <SkeletonLine height={48} />
                </>
              : ["schoolName", "slug", "address"].map((field, idx) => (
                  <div key={idx}>
                    <input
                      ref={(el) => (inputRefs.current[field] = el)}
                      type="text"
                      name={field}
                      placeholder={
                        field === "schoolName"
                          ? "Nom de l'école"
                          : field === "slug"
                          ? "Slug (identifiant unique)"
                          : "Adresse"
                      }
                      value={formData[field]}
                      onChange={handleChange}
                      className={inputClass(field)}
                    />
                    {errors[field] && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors[field]}
                      </p>
                    )}
                  </div>
                ))}
          </div>

          {/* Compte utilisateur */}
          <span className="text-xl font-semibold text-gray-800 dark:text-gray-100">
            3. Informations du Compte Utilisateur
          </span>
          <div className="bg-gray-50 dark:bg-gray-700 shadow-inner p-6 rounded-2xl grid grid-cols-1 gap-6">
            {loading
              ? <>
                  <SkeletonLine height={48} />
                  <SkeletonLine height={48} />
                  <SkeletonLine height={48} />
                </>
              : ["username", "password", "confirmPassword"].map((field, idx) => (
                  <div key={idx}>
                    <input
                      ref={(el) => (inputRefs.current[field] = el)}
                      type={field === "username" ? "text" : "password"}
                      name={field}
                      placeholder={
                        field === "username"
                          ? "Nom d'utilisateur"
                          : field === "password"
                          ? "Mot de passe"
                          : "Confirmer le mot de passe"
                      }
                      value={formData[field]}
                      onChange={handleChange}
                      className={inputClass(field)}
                    />
                    {errors[field] && (
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-red-500 text-sm mt-1"
                      >
                        {errors[field]}
                      </motion.p>
                    )}
                  </div>
                ))}
          </div>

          {/* Submit */}
          {!loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-end"
            >
              <button
                type="submit"
                className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl shadow-lg hover:bg-blue-700 transition"
              >
                <Save className="w-5 h-5" />
                Enregistrer
              </button>
            </motion.div>
          )}
        </form>
      </motion.div>
    </div>
  );
};

export default AddPromoter;
