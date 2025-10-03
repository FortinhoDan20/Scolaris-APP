import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, CloudCog } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addPromoter } from "../../feautres/promoter/promoterSlice";

const PromoterAdd = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
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
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

    const navigate = useNavigate();
    const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addPromoter({ formData, toast })).then((res) => {
          if (!res.error) {
            navigate(-1);
          }
        });
   
  };

  const variants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

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
    
    <div className="min-h-screen bg-gray-100 flex items-start justify-center">
      <div className="max-w-2xl w-full mx-auto mt-4 p-6 bg-white shadow-lg rounded-2xl">
        {/* Progress bar */}
        <div className="flex items-center mb-6">
          {["Promoteur", "École", "Compte", "Confirmation"].map((label, index) => {
            const s = index + 1;
            return (
              <div key={s} className="flex-1">
                <div
                  className={`w-10 h-10 flex items-center justify-center rounded-full mx-auto ${
                    step >= s
                      ? "bg-blue-600 text-white"
                      : "bg-gray-300 text-gray-600"
                  }`}
                >
                  {s}
                </div>
                <p className="text-center text-xs mt-1">{label}</p>
                {s < 4 && (
                  <div
                    className={`h-1 mt-2 ${
                      step > s ? "bg-blue-600" : "bg-gray-300"
                    }`}
                  ></div>
                )}
              </div>
            );
          })}
        </div>

        <form onSubmit={handleSubmit}>
          <AnimatePresence mode="wait">
            {/* Step 1 */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial="initial"
                animate="animate"
                exit="exit"
                variants={variants}
                transition={{ duration: 0.4 }}
              >
                <h2 className="text-2xl font-bold mb-6 text-gray-800">
                  Informations du Promoteur
                </h2>
                <div className="bg-gray-50 shadow-inner p-6 rounded-2xl grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="firstname"
                    placeholder="Prénom"
                    value={formData.firstname}
                    onChange={handleChange}
                    className="w-full p-3 border rounded-lg"
                    required
                  />
                  <input
                    type="text"
                    name="name"
                    placeholder="Nom"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full p-3 border rounded-lg"
                    required
                  />
                  <input
                    type="text"
                    name="lastname"
                    placeholder="Postnom"
                    value={formData.lastname}
                    onChange={handleChange}
                    className="w-full p-3 border rounded-lg"
                  />
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className="w-full p-3 border rounded-lg"
                    required
                  >
                    <option value="">Sexe</option>
                    <option value="male">Homme</option>
                    <option value="female">Femme</option>
                  </select>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Téléphone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full p-3 border rounded-lg"
                    required
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full p-3 border rounded-lg"
                    required
                  />
                </div>
              </motion.div>
            )}

            {/* Step 2 */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial="initial"
                animate="animate"
                exit="exit"
                variants={variants}
                transition={{ duration: 0.4 }}
              >
                <h2 className="text-2xl font-bold mb-6 text-gray-800">
                  Informations sur l&apos;École
                </h2>
                <div className="bg-gray-50 shadow-inner p-6 rounded-2xl grid grid-cols-1 gap-4">
                  <input
                    type="text"
                    name="schoolName"
                    placeholder="Nom de l'école"
                    value={formData.schoolName}
                    onChange={handleChange}
                    className="w-full p-3 border rounded-lg"
                    required
                  />
                  <input
                    type="text"
                    name="slug"
                    placeholder="Slug (identifiant unique)"
                    value={formData.slug}
                    onChange={handleChange}
                    className="w-full p-3 border rounded-lg"
                  />
                  <input
                    type="text"
                    name="address"
                    placeholder="Adresse"
                    value={formData.address}
                    onChange={handleChange}
                    className="w-full p-3 border rounded-lg"
                    required
                  />
                </div>
              </motion.div>
            )}

            {/* Step 3 */}
            {step === 3 && (
              <motion.div
                key="step3"
                initial="initial"
                animate="animate"
                exit="exit"
                variants={variants}
                transition={{ duration: 0.4 }}
              >
                <h2 className="text-2xl font-bold mb-6 text-gray-800">
                  Informations du Compte Utilisateur
                </h2>
                <div className="bg-gray-50 shadow-inner p-6 rounded-2xl grid grid-cols-1 gap-4">
                  <input
                    type="text"
                    name="username"
                    placeholder="Nom d'utilisateur"
                    value={formData.username}
                    onChange={handleChange}
                    className="w-full p-3 border rounded-lg"
                    required
                  />
                  <input
                    type="password"
                    name="password"
                    placeholder="Mot de passe"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full p-3 border rounded-lg"
                    required
                  />
                  <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirmer le mot de passe"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="w-full p-3 border rounded-lg"
                    required
                  />
                </div>
              </motion.div>
            )}

            {/* Step 4 */}
            {step === 4 && (
              <motion.div
                key="step4"
                initial="initial"
                animate="animate"
                exit="exit"
                variants={variants}
                transition={{ duration: 0.4 }}
              >
                <h2 className="text-2xl font-bold mb-6 text-gray-800">
                  Confirmation des informations
                </h2>

                <div className="bg-gray-50 shadow-inner p-6 rounded-2xl space-y-6">
                  {/* Promoteur */}
                  <div>
                    <h3 className="font-semibold text-lg text-blue-700 border-b pb-2 mb-3">
                      Promoteur
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 text-gray-700">
                      <p><span className="font-medium">Prénom:</span> {formData.firstname}</p>
                      <p><span className="font-medium">Nom:</span> {formData.name}</p>
                      <p><span className="font-medium">Postnom:</span> {formData.lastname}</p>
                      <p><span className="font-medium">Genre:</span> {formData.gender}</p>
                      <p><span className="font-medium">Téléphone:</span> {formData.phone}</p>
                      <p><span className="font-medium">Email:</span> {formData.email}</p>
                    </div>
                  </div>

                  {/* École */}
                  <div>
                    <h3 className="font-semibold text-lg text-blue-700 border-b pb-2 mb-3">
                      École
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 text-gray-700">
                      <p><span className="font-medium">Nom:</span> {formData.schoolName}</p>
                      <p><span className="font-medium">Slug:</span> {formData.slug}</p>
                      <p className="md:col-span-2"><span className="font-medium">Adresse:</span> {formData.address}</p>
                    </div>
                  </div>

                  {/* Compte utilisateur */}
                  <div>
                    <h3 className="font-semibold text-lg text-blue-700 border-b pb-2 mb-3">
                      Compte utilisateur
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 text-gray-700">
                      <p><span className="font-medium">Nom d’utilisateur:</span> {formData.username}</p>
                      <p><span className="font-medium">Mot de passe:</span> ********</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation buttons */}
          <div className="flex justify-between mt-6">
            {step > 1 && (
              <button
                type="button"
                onClick={prevStep}
                className="px-6 py-2 bg-gray-400 hover:bg-gray-500 text-white rounded-lg"
              >
                Précédent
              </button>
            )}
            {step < 4 ? (
              <button
                type="button"
                onClick={nextStep}
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg ml-auto"
              >
                Suivant
              </button>
            ) : (
              <button
                type="submit"
                className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg ml-auto"
              >
                Confirmer
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
    </>
  );
};

export default PromoterAdd;
