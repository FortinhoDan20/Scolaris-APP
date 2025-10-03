import { Listbox } from "@headlessui/react";
import { ArrowLeft, ChevronsUpDown } from "lucide-react";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
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
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState(initialState);
  const [selected, setSelected] = useState(genderOptions[0]);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // ⬇️ récupère le loading depuis Redux
  const { loading } = useSelector((state) => state.promoter);

  const steps = ["Promoteur", "École", "Compte utilisateur", "Confirmation"];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const isStepValid = () => {
    if (step === 1) {
      return (
        formData.firstname.trim() !== "" &&
        formData.gender.trim() !== "" &&
        formData.phone.trim() !== ""
      );
    }
    if (step === 2) {
      return formData.schoolName.trim() !== "";
    }
    if (step === 3) {
      return (
        formData.username.trim() !== "" &&
        formData.password.trim() !== "" &&
        formData.confirmPassword.trim() !== ""
      );
    }
    return true;
  };

  const handleNext = () => {
    if (isStepValid()) {
      setStep(step + 1);
    } else {
      toast.error("Veuillez remplir tous les champs obligatoires !");
    }
  };

  const handlePrevious = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(addPromoter({ formData, toast })).then((res) => {
      if (!res.error) {
        navigate(-1);
      }
    });
  };

  const progress = (step / steps.length) * 100;

  return (
    <>
      <div className="sm:justify-between sm:items-center mb-8">
        <div className="mb-4 sm:mb-0">
          <h1 className="text-2xl md:text-3xl text-sky-800 dark:text-gray-100 font-bold">
            Nouveau Promoteur
          </h1>
        </div>
        <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
          <button
            onClick={() => navigate(-1)}
            className="btn bg-sky-900 text-gray-100 hover:bg-green-800 float-end mt-2 mx-5 py-2 px-4 rounded-lg flex items-center"
          >
            <ArrowLeft className="w-5 h-5" />
            Retour
          </button>
        </div>
      </div>

      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-10 px-6">
        <div className="max-w-[750px] mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-3 mb-8">
            <div
              className="bg-blue-600 h-3 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            ></div>
          </div>

          {/* Steps Indicator */}
          <div className="flex justify-between items-center mb-8">
            {steps.map((label, index) => (
              <div key={index} className="flex-1 flex flex-col items-center">
                <div
                  className={`w-10 h-10 flex items-center justify-center rounded-full text-white font-bold ${
                    step === index + 1
                      ? "bg-blue-600"
                      : step > index + 1
                      ? "bg-green-500"
                      : "bg-gray-400"
                  }`}
                >
                  {index + 1}
                </div>
                <p className="text-sm mt-2">{label}</p>
              </div>
            ))}
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Step 1 */}
            {step === 1 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="firstname"
                  placeholder="Prénom *"
                  value={formData.firstname}
                  onChange={handleChange}
                  className="border p-2 rounded-lg w-full"
                  required
                />
                <input
                  type="text"
                  name="name"
                  placeholder="Nom"
                  value={formData.name}
                  onChange={handleChange}
                  className="border p-2 rounded-lg w-full"
                />
                <input
                  type="text"
                  name="lastname"
                  placeholder="Post-nom"
                  value={formData.lastname}
                  onChange={handleChange}
                  className="border p-2 rounded-lg w-full"
                />
                <div className="relative">
                  <Listbox
                    value={selected}
                    onChange={(value) => {
                      setSelected(value);
                      setFormData({ ...formData, gender: value.value });
                    }}
                  >
                    <div className="relative">
                      <Listbox.Button className="border p-2 rounded-lg w-full flex justify-between items-center">
                        {selected.label}
                        <ChevronsUpDown className="w-5 h-5" />
                      </Listbox.Button>
                      <Listbox.Options className="absolute mt-1 bg-white dark:bg-gray-700 border rounded-lg w-full shadow-lg z-10">
                        {genderOptions.map((option) => (
                          <Listbox.Option
                            key={option.value}
                            value={option}
                            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer"
                          >
                            {option.label}
                          </Listbox.Option>
                        ))}
                      </Listbox.Options>
                    </div>
                  </Listbox>
                </div>
                <input
                  type="text"
                  name="phone"
                  placeholder="Téléphone *"
                  value={formData.phone}
                  onChange={handleChange}
                  className="border p-2 rounded-lg w-full"
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  className="border p-2 rounded-lg w-full"
                />
              </div>
            )}

            {/* Step 2 */}
            {step === 2 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="schoolName"
                  placeholder="Nom de l'école *"
                  value={formData.schoolName}
                  onChange={handleChange}
                  className="border p-2 rounded-lg w-full"
                  required
                />
                <input
                  type="text"
                  name="slug"
                  placeholder="Slug"
                  value={formData.slug}
                  onChange={handleChange}
                  className="border p-2 rounded-lg w-full"
                />
                <input
                  type="text"
                  name="address"
                  placeholder="Adresse"
                  value={formData.address}
                  onChange={handleChange}
                  className="border p-2 rounded-lg w-full"
                />
              </div>
            )}

            {/* Step 3 */}
            {step === 3 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="username"
                  placeholder="Nom d'utilisateur *"
                  value={formData.username}
                  onChange={handleChange}
                  className="border p-2 rounded-lg w-full"
                  required
                />
                <input
                  type="password"
                  name="password"
                  placeholder="Mot de passe *"
                  value={formData.password}
                  onChange={handleChange}
                  className="border p-2 rounded-lg w-full"
                  required
                />
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirmer le mot de passe *"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="border p-2 rounded-lg w-full"
                  required
                />
              </div>
            )}

            {/* Step 4 */}
            {step === 4 && (
              <div className="p-6 bg-gray-100 dark:bg-gray-700 rounded-lg">
                <h2 className="text-lg font-bold mb-6 text-gray-900 dark:text-gray-100 text-center">
                  ✅ Confirmation des informations saisies
                </h2>

                <div className="overflow-x-auto">
                  <table className="w-full border-collapse rounded-lg overflow-hidden shadow">
                    <tbody>
                      {/* Promoteur */}
                      <tr className="bg-blue-100 dark:bg-blue-800">
                        <td
                          colSpan={2}
                          className="px-4 py-2 font-semibold text-blue-900 dark:text-blue-100"
                        >
                          👤 Informations Promoteur
                        </td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2 font-medium">Prénom</td>
                        <td className="px-4 py-2">{formData.firstname}</td>
                      </tr>
                      <tr className="bg-gray-50 dark:bg-gray-600">
                        <td className="px-4 py-2 font-medium">Nom</td>
                        <td className="px-4 py-2">{formData.name}</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2 font-medium">Postnom</td>
                        <td className="px-4 py-2">{formData.lastname}</td>
                      </tr>
                      <tr className="bg-gray-50 dark:bg-gray-600">
                        <td className="px-4 py-2 font-medium">Genre</td>
                        <td className="px-4 py-2">
                          {formData.gender === "M" ? "Masculin" : "Féminin"}
                        </td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2 font-medium">Téléphone</td>
                        <td className="px-4 py-2">{formData.phone}</td>
                      </tr>
                      <tr className="bg-gray-50 dark:bg-gray-600">
                        <td className="px-4 py-2 font-medium">Email</td>
                        <td className="px-4 py-2">{formData.email || "N/A"}</td>
                      </tr>

                      {/* École */}
                      <tr className="bg-green-100 dark:bg-green-800">
                        <td
                          colSpan={2}
                          className="px-4 py-2 font-semibold text-green-900 dark:text-green-100"
                        >
                          🏫 Informations École
                        </td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2 font-medium">
                          Nom de l’école
                        </td>
                        <td className="px-4 py-2">{formData.schoolName}</td>
                      </tr>
                      <tr className="bg-gray-50 dark:bg-gray-600">
                        <td className="px-4 py-2 font-medium">Abréviation</td>
                        <td className="px-4 py-2">{formData.slug || "N/A"}</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2 font-medium">Adresse</td>
                        <td className="px-4 py-2">
                          {formData.address || "N/A"}
                        </td>
                      </tr>

                      {/* Compte utilisateur */}
                      <tr className="bg-purple-100 dark:bg-purple-800">
                        <td
                          colSpan={2}
                          className="px-4 py-2 font-semibold text-purple-900 dark:text-purple-100"
                        >
                          🔑 Compte Utilisateur
                        </td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2 font-medium">
                          Nom d’utilisateur
                        </td>
                        <td className="px-4 py-2">{formData.username}</td>
                      </tr>
                      <tr className="bg-gray-50 dark:bg-gray-600">
                        <td className="px-4 py-2 font-medium">Mot de passe</td>
                        <td className="px-4 py-2">******</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-6">
              {step > 1 && (
                <button
                  type="button"
                  onClick={handlePrevious}
                  className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600"
                >
                  Précédent
                </button>
              )}

              {step < 4 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  disabled={loading}
                  className={`px-6 py-2 rounded-lg text-white ml-auto ${
                    isStepValid() && !loading
                      ? "bg-blue-600 hover:bg-blue-700"
                      : "bg-gray-400 cursor-not-allowed"
                  }`}
                >
                  Suivant
                </button>
              ) : (
                <button
                  type="button" // ✅ change submit → button
                  onClick={handleSubmit} // ✅ on déclenche manuellement
                  disabled={loading}
                  className={`px-6 py-2 rounded-lg text-white flex items-center justify-center gap-2 ${
                    loading
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-green-600 hover:bg-green-700"
                  }`}
                >
                  {loading && (
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  )}
                  {loading ? "Soumission..." : "Soumettre"}
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddPromoter;
