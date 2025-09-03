import { X } from "lucide-react";
import React, { useState, useEffect } from "react";

const DetailsOwner = ({ setOpenModalDetails, id }) => {

          useEffect(() => {
        if (id) {
          // 👉 Ici tu peux faire un appel API ou Redux pour récupérer les données du owner
          // Exemple :
          // dispatch(fetchById(id)).then((res) => {
          //   const owner = res.payload;
          //   setFormData({
          //     name: owner.name,
          //     username: owner.username,
          //     role: owner.role,
          //   });
          //   const roleFound = roleOptions.find(r => r.value === owner.role);
          //   if (roleFound) setSelected(roleFound);
          // });
        }
      }, [id]);
  return (
   <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg w-full max-w-2xl p-6 relative">
        {/* Bouton fermer */}
        <button
          onClick={() => setOpenModalDetails(false)}
          className="absolute top-4 right-4 text-gray-500 hover:text-red-600"
        >
          <X size={22} />
        </button>

        <h2 className="text-xl font-bold mb-4 text-sky-800 dark:text-gray-100">
          Information sur l'utilisateur 
        </h2>
        <hr />

 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <p className="text-sm text-gray-500">Nom complet</p>
          <p className="text-lg font-medium">
            Dan Fortinho Vihamba
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-500">Identifiant</p>
          <p className="text-lg font-medium">
            dan
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-500">Rôle</p>
          <p className="text-lg font-medium">
           admin
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-500">Etat Utilisateur</p>
          <p className="text-lg font-medium">
            Actif
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-500">Téléphone</p>
          <p className="text-lg font-medium">
           +243 000000000
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-500">Créé le</p>
          <p className="text-lg font-medium">
            20/05/2025
          </p>
        </div>
      </div>
       
      </div>
    </div>
  )
}

export default DetailsOwner