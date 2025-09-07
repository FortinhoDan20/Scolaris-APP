import { ArrowLeft, FilePlus2 } from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AddPromoter = () => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  // Champs promoteur
  const [firstname, setFirstname] = useState("");
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [gender, setGender] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  // Champs école
  const [schoolName, setSchoolName] = useState("");
  const [schoolAddress, setSchoolAddress] = useState("");

  // Champs utilisateur
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

   const navigate = useNavigate();

  // Étapes
  const steps = ["Promoteur", "École", "Compte utilisateur", "Confirmation"];

  // 👉 Version simplifiée (pas de validation)
  const handleNext = () => {
    if (step < 4) setStep(step + 1);
  };

  const handlePrevious = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      toast.success("Promoteur enregistré avec succès !");
      setStep(1);
    } catch (error) {
      toast.error("Erreur lors de l’enregistrement.");
    } finally {
      setLoading(false);
    }
  };

  // Progression (%)
  const progress = (step / steps.length) * 100;

  return (
    <>
          <div className="sm:justify-between sm:items-center mb-8">
            {/* Title */}
            <div className="mb-4 sm:mb-0">
              <h1 className="text-2xl md:text-3xl text-sky-800 dark:text-gray-100 font-bold">
                Nouveau Promoteur
              </h1>
            </div>
    
            {/* Actions */}
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
      <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
       

        {/* Progress bar */}
        <div className="w-full bg-gray-200 rounded-full h-3 mb-8">
          <div
            className="bg-blue-600 h-3 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        {/* Étapes en cercle */}
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

        {/* Formulaire multi-étapes */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Step 1 : Promoteur */}
          {step === 1 && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Prénom
                </label>
                <input
                  type="text"
                  value={firstname}
                  onChange={(e) => setFirstname(e.target.value)}
                  placeholder="Entrez le prénom"
                  className="w-full rounded-lg border px-3 py-2 shadow-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Nom
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Entrez le nom"
                  className="w-full rounded-lg border px-3 py-2 shadow-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Postnom
                </label>
                <input
                  type="text"
                  value={lastname}
                  onChange={(e) => setLastname(e.target.value)}
                  placeholder="Entrez le postnom"
                  className="w-full rounded-lg border px-3 py-2 shadow-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Genre
                </label>
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="w-full rounded-lg border px-3 py-2 shadow-sm"
                >
                  <option value="">Sélectionnez le genre</option>
                  <option value="M">Masculin</option>
                  <option value="F">Féminin</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Téléphone
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+243 000000000"
                  className="w-full rounded-lg border px-3 py-2 shadow-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Entrez votre adresse e-mail"
                  className="w-full rounded-lg border px-3 py-2 shadow-sm"
                />
              </div>
            </div>
          )}

          {/* Step 2 : École */}
          {step === 2 && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Nom de l’école
                </label>
                <input
                  type="text"
                  value={schoolName}
                  onChange={(e) => setSchoolName(e.target.value)}
                  placeholder="Entrez le nom de l’école"
                  className="w-full rounded-lg border px-3 py-2 shadow-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Adresse de l’école
                </label>
                <input
                  type="text"
                  value={schoolAddress}
                  onChange={(e) => setSchoolAddress(e.target.value)}
                  placeholder="Entrez l’adresse de l’école"
                  className="w-full rounded-lg border px-3 py-2 shadow-sm"
                />
              </div>
            </div>
          )}

          {/* Step 3 : Compte utilisateur */}
          {step === 3 && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Nom d’utilisateur
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Entrez le nom d’utilisateur"
                  className="w-full rounded-lg border px-3 py-2 shadow-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Mot de passe
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Entrez le mot de passe"
                  className="w-full rounded-lg border px-3 py-2 shadow-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Confirmer mot de passe
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirmez le mot de passe"
                  className="w-full rounded-lg border px-3 py-2 shadow-sm"
                />
              </div>
            </div>
          )}

          {/* Step 4 : Confirmation */}
          {step === 4 && (
            <div className="bg-gray-50 p-4 rounded-lg">
              <h2 className="text-lg font-semibold mb-4">
                Confirmer les informations
              </h2>
              <ul className="space-y-2">
                <li>
                  <strong>Nom complet :</strong> {firstname} {name} {lastname}
                </li>
                <li>
                  <strong>Genre :</strong> {gender}
                </li>
                <li>
                  <strong>Téléphone :</strong> {phone}
                </li>
                <li>
                  <strong>Email :</strong> {email}
                </li>
                <li>
                  <strong>École :</strong> {schoolName} ({schoolAddress})
                </li>
                <li>
                  <strong>Compte utilisateur :</strong> {username}
                </li>
              </ul>
            </div>
          )}

          {/* Boutons navigation */}
          <div className="flex justify-between mt-6">
            {step > 1 && (
              <button
                type="button"
                onClick={handlePrevious}
                className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition"
              >
                Précédent
              </button>
            )}

            {step < 4 ? (
              <button
                type="button"
                onClick={handleNext}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition ml-auto"
              >
                Suivant
              </button>
            ) : (
              <button
                type="submit"
                disabled={loading}
                className={`px-6 py-2 rounded-lg text-white ${
                  loading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-green-600 hover:bg-green-700"
                }`}
              >
                {loading ? "Enregistrement..." : "Soumettre"}
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
