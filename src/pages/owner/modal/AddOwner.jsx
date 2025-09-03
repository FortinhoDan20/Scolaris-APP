import { ChevronsUpDown, Save, X } from "lucide-react";
import React, { useState } from "react";
import { Listbox } from "@headlessui/react";

const initialState = {
  name: "",
  username: "",
  password: "",
  role: "",
};


const roleOptions = [
  { value: "", label: "Entrez le genre" },
  { value: "admin", label: "administrateur" },
  { value: "operateur", label: "operateur" },
];
const AddOwner = ({ setOpenModal }) => {
  const [selected, setSelected] = useState(roleOptions[0]);
  //const [openModal, setOpenModal] = useState(false);
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg w-full max-w-2xl p-6 relative">
        {/* Bouton fermer */}
        <button
          onClick={() => setOpenModal(false)}
          className="absolute top-4 right-4 text-gray-500 hover:text-red-600"
        >
          <X size={22} />
        </button>

        <h2 className="text-xl font-bold mb-4 text-sky-800 dark:text-gray-100">
          Nouvel Utilisateur
        </h2>
       <hr/> 

        {/* Formulaire */}
        <form className="space-y-4 md:space-y-6 overflow-y-auto max-h-[70vh] pr-2 mt-4">
          <div>
            <input
              type="text"
              name="firstname"
              className="w-full p-2 border rounded-lg dark:bg-gray-700"
              placeholder="Entrez le nom complet de l'utilsateur"
              required
            />
          </div>

          <div>
            <input
              type="text"
              name="name"
              className="w-full p-2 border rounded-lg dark:bg-gray-700"
              placeholder="Entrez l'identifiant"
              required
            />
          </div>



          <div className="w-full">
            <Listbox value={selected} onChange={setSelected}>
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


          {/* Bouton enregistrer */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="flex items-center gap-2 bg-sky-900 text-white px-4 py-2 rounded-lg hover:bg-green-800"
            >
              <Save size={18} />
              <span>Enregistrer</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddOwner;
