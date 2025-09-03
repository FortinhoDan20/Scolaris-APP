import { ChevronsUpDown, ListChecks, Loader, Save } from "lucide-react";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
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
  return (
    <>
      <div className=" sm:justify-between sm:items-center mb-8">
        {/* Left: Title */}
        <div className="mb-4 sm:mb-0">
          <h1 className="text-2xl md:text-3xl text-gray-800 dark:text-gray-100 font-bold">
            Mettre à jour le promoteur
          </h1>
        </div>

        {/* Right: Actions */}
        <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
          <NavLink to="/list-promoter">
            <button className="btn bg-blue-900 text-gray-100 hover:bg-green-800 dark:bg-gray-100 dark:text-gray-00 dark:hover:bg-white float-end  mt-2 mx-5 py-2">
              <ListChecks
                style={{
                  fontSize: "1px",
                }}
              />
              <span className="max-xs:sr-only">
                {" "}
                &nbsp; Liste des Promoteurs
              </span>
            </button>
          </NavLink>
          {/* Filter button */}
        </div>
      </div>
      <div className="col-span-full xl:col-span-8 bg-white dark:bg-gray-800 shadow-sm rounded-xl">
        <div className="p-3">
          {/* Table */}

          <div className="overflow-x-auto">
            <form className="space-y-4 md:space-y-6">
              <span>1. Information sur le promoteur</span>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Prénom
                </label>
                <input
                  type="text"
                  name="firstname"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Entrez le prénom du promoteur"
                  required
                  //value={firstname}
                  //onChange={onInputChange}
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Nom
                </label>
                <input
                  type="text"
                  name="name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Entrez le nom du promoteur"
                  required
                  //value={name}
                  //onChange={onInputChange}
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Post-nom
                </label>
                <input
                  type="text"
                  name="lastname"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Entrez le post-nom du promoteur"
                  required
                  // value={lastname}
                  // onChange={onInputChange}
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
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Téléphone
                </label>
                <input
                  type="text"
                  name="phone"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="+243 000000000"
                  required
                  // value={phone}
                  // onChange={onInputChange}
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  E-mail
                </label>
                <input
                  type="email"
                  name="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Entrez l'adresse email du promoteur"
                  required
                  // value={email}
                  // onChange={onInputChange}
                />
              </div>

              <br />

              <button
                className="btn bg-sky-900  text-gray-100 hover:bg-green-800 dark:bg-gray-100 dark:text-gray-00 dark:hover:bg-white   mt-2 mx-5 py-2"
                //onClick={handleSubmit}
              >
                <Save
                  style={{
                    fontSize: "1px",
                  }}
                />

                <span className="max-xs:sr-only"> &nbsp; Mettre à jour</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddOwner;
