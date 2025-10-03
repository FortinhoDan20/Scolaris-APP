import React, { useState } from 'react';
import { RefreshCw } from "lucide-react";

const Maintenance = () => {
  const [loading, setLoading] = useState(false);

  const handleReload = async () => {
    setLoading(true);
    console.log("refresh")
 
    try {
      // On teste si l'API répond
      const res = await fetch("http://localhost:5000/api/testConnexion"); // à adapter selon ton backend
      if (res.ok) {
        window.location.href = "/login";
      } else {
        setLoading(false);
      }
    } catch (err) {
      setLoading(false);
    } 
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 text-center px-4 animate-fade-in">
      <div className="bg-white shadow-lg rounded-2xl p-10 max-w-md w-full">
        <div className="flex justify-center mb-6">
          <div className="p-6 bg-red-100 rounded-full animate-bounce">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 text-red-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        </div>

        <h1 className="text-2xl font-bold text-gray-800">
          🚧 Service en Maintenance
        </h1>
        <p className="text-gray-600 mt-2">
          Notre base de données est momentanément indisponible.  
          Nous travaillons pour rétablir le service rapidement.
        </p>

        <button
          onClick={handleReload}
          disabled={loading}
          className={`mt-6 inline-flex items-center gap-2 px-6 py-2 rounded-xl shadow-md transition duration-300
            ${loading 
              ? "bg-gray-400 cursor-not-allowed" 
              : "bg-red-600 hover:bg-red-700 text-white font-medium"}`}
        >
          <RefreshCw className={`w-5 h-5 ${loading && "animate-spin"}`} />
          {loading ? "Vérification..." : "Réessayer"}
        </button>
      </div>

      <p className="mt-6 text-gray-500 text-sm">
        Merci de votre patience 💙 – L’équipe technique
      </p>
    </div>
  );
};

export default Maintenance;
