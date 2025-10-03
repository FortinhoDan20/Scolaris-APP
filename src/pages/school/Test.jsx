 {/* === Barre de recherche & filtres === */}
      <form onSubmit={handleSearchSubmit} className="flex flex-wrap gap-4 mb-6">
        {/* Recherche école */}
        <input
          type="text"
          placeholder="Rechercher une école..."
          value={search}
          onChange={(e) => dispatch(setSearch(e.target.value))}
          className="px-3 py-2 border rounded-lg w-64 dark:bg-gray-700 dark:text-white"
        />

        {/* Recherche promoteur */}
        <input
          type="text"
          placeholder="Nom du promoteur..."
          value={promoterName}
          onChange={(e) => dispatch(setPromoterName(e.target.value))}
          className="px-3 py-2 border rounded-lg w-64 dark:bg-gray-700 dark:text-white"
        />

        <button
          type="submit"
          className="px-4 py-2 bg-sky-900 text-white rounded-lg hover:bg-green-800"
        >
          Rechercher
        </button>

        {/* Sélecteur champ de tri */}
        <Listbox
          value={sort}
          onChange={(value) => {
            dispatch(setSort(value));
            dispatch(setPage(1));
          }}
        >
          <div className="relative">
            <Listbox.Button className="flex items-center px-3 py-2 border rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white">
              {sortOptions.find((o) => o.value === sort)?.name || "Trier par"}
              <ChevronsUpDown className="h-4 w-4 text-gray-500 ml-2" />
            </Listbox.Button>
            <Listbox.Options className="absolute mt-1 w-48 bg-white dark:bg-gray-700 border rounded-lg shadow-lg z-10">
              {sortOptions.map((option) => (
                <Listbox.Option
                  key={option.value}
                  value={option.value}
                  className="cursor-pointer px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600"
                >
                  {option.name}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </div>
        </Listbox>

        {/* Bouton asc/desc */}
        <button
          type="button"
          onClick={() => {
            dispatch(setSortOrder(sortOrder === "asc" ? "desc" : "asc"));
            dispatch(setPage(1));
          }}
          className="flex items-center px-3 py-2 border rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600"
        >
          {sortOrder === "asc" ? (
            <>
              <ArrowUp className="h-4 w-4 mr-1" /> Ascendant
            </>
          ) : (
            <>
              <ArrowDown className="h-4 w-4 mr-1" /> Descendant
            </>
          )}
        </button>
      </form>

      {/* === Table des écoles === */}
      {loading ? (
        <div className="flex justify-center py-10">
          <Loader className="animate-spin h-6 w-6 text-gray-500" />
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="table-auto w-full dark:text-gray-300">
            <thead className="text-xs uppercase text-white bg-sky-900 dark:bg-gray-700">
              <tr>
                <th className="p-2 text-left">N°</th>
                <th className="p-2 text-left">Nom</th>
                <th className="p-2 text-center">Abréviation</th>
                <th className="p-2 text-center">Promoteur</th>
                <th className="p-2 text-center">Créé</th>
                <th className="p-2 text-center">Status</th>
                <th className="p-2 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm font-medium divide-y divide-gray-100 dark:divide-gray-700/60">
              {schools?.map((item, i) => (
                <tr key={item._id}>
                  <td className="p-2">{(page - 1) * LIMIT + i + 1}</td>
                  <td className="p-2">{item.schoolName}</td>
                  <td className="p-2 text-center">{item.slug}</td>
                  <td className="p-2 text-center">
                    {item?.promoter?.firstname || "—"}
                  </td>
                  <td className="p-2 text-center">
                    {new Date(item.createdAt).toLocaleDateString()}
                  </td>
                  <td className="p-2 text-center">
                    {item?.isLocked ? (
                      <span className="text-red-600">Désactivé</span>
                    ) : (
                      <span className="text-green-800">Actif</span>
                    )}
                  </td>
                  <td className="p-2">
                    <div className="flex justify-center space-x-2">
                      <Pencil
                        className="cursor-pointer text-blue-600"
                        onClick={() => navigate(`/edit-promoter/${item._id}`)}
                      />
                      <Eye
                        className="cursor-pointer text-yellow-600"
                        onClick={() => navigate(`/details-promoter/${item._id}`)}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* === Pagination === */}
      <div className="flex justify-between items-center mt-6">
        <button
          disabled={page <= 1}
          onClick={() => handlePageChange(page - 1)}
          className="px-4 py-2 border rounded-lg disabled:opacity-50"
        >
          Précédent
        </button>
        <span className="text-gray-700 dark:text-gray-300">
          Page {page} / {totalPages}
        </span>
        <button
          disabled={page >= totalPages}
          onClick={() => handlePageChange(page + 1)}
          className="px-4 py-2 border rounded-lg disabled:opacity-50"
        >
          Suivant
        </button>
      </div>
