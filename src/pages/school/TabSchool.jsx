import React, { useState, useRef, useEffect } from "react";



const TabSchool = () => {
    const tabs = [
{ id: 'cycle', label: 'Cycle organisé' },
{ id: 'option', label: 'Option' },
{ id: 'salle', label: 'Salle de classe' },
{ id: 'eleves', label: 'Éleves' },
];


const [active, setActive] = useState(tabs[0].id);
const tabRefs = useRef([]);


useEffect(() => {
// focus active tab for accessibility when changed programmatically
const idx = tabs.findIndex(t => t.id === active);
if (tabRefs.current[idx]) tabRefs.current[idx].focus();
}, [active]);


const onKeyDown = (e, index) => {
// keyboard navigation: ArrowLeft / ArrowRight / Home / End
if (e.key === 'ArrowRight') {
e.preventDefault();
const next = (index + 1) % tabs.length;
setActive(tabs[next].id);
}
if (e.key === 'ArrowLeft') {
e.preventDefault();
const prev = (index - 1 + tabs.length) % tabs.length;
setActive(tabs[prev].id);
}
if (e.key === 'Home') {
e.preventDefault();
setActive(tabs[0].id);
}
if (e.key === 'End') {
e.preventDefault();
setActive(tabs[tabs.length - 1].id);
}
};
  return (
    <div className="max-w-4xl mx-auto p-4">
<div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-4">
{/* Tab list */}
<div role="tablist" aria-label="Onglets cycle" className="flex gap-2 overflow-x-auto">
{tabs.map((t, i) => {
const isActive = t.id === active;
return (
<button
key={t.id}
ref={el => (tabRefs.current[i] = el)}
role="tab"
aria-selected={isActive}
aria-controls={`panel-${t.id}`}
id={`tab-${t.id}`}
tabIndex={isActive ? 0 : -1}
onClick={() => setActive(t.id)}
onKeyDown={e => onKeyDown(e, i)}
className={`relative whitespace-nowrap px-4 py-2 rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-400
${isActive ? 'bg-indigo-600 text-white shadow-md' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
>
{t.label}
{/* small active indicator */}
{isActive && (
<span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-3 h-1 rounded-sm bg-indigo-600" aria-hidden />
)}
</button>
);
})}
</div>


{/* Panels */}
<div className="mt-6">
<div
id="panel-cycle"
role="tabpanel"
aria-labelledby="tab-cycle"
hidden={active !== 'cycle'}
className={`transition-opacity duration-200 ${active === 'cycle' ? 'opacity-100' : 'opacity-0'}`}
>
<h3 className="text-lg font-semibold">Cycle organisé</h3>
<p className="mt-2 text-sm text-gray-600 dark:text-gray-300">Contenu lié au cycle organisé. Place ici les champs ou les tableaux que tu veux (ex : nom du cycle, durée, dates...).</p>
</div>


<div
id="panel-option"
role="tabpanel"
aria-labelledby="tab-option"
hidden={active !== 'option'}
className={`transition-opacity duration-200 ${active === 'option' ? 'opacity-100' : 'opacity-0'}`}
>
<h3 className="text-lg font-semibold">Option</h3>
<p className="mt-2 text-sm text-gray-600 dark:text-gray-300">Ici tu peux lister ou gérer les options (ex : filières, modules, spécialités).</p>
</div>


<div
id="panel-salle"
role="tabpanel"
aria-labelledby="tab-salle"
hidden={active !== 'salle'}
className={`transition-opacity duration-200 ${active === 'salle' ? 'opacity-100' : 'opacity-0'}`}
>
<h3 className="text-lg font-semibold">Salle de classe</h3>
<p className="mt-2 text-sm text-gray-600 dark:text-gray-300">Gestion des salles: numéro, capacité, équipements, etc.</p>
</div>


<div
id="panel-eleves"
role="tabpanel"
aria-labelledby="tab-eleves"
hidden={active !== 'eleves'}
className={`transition-opacity duration-200 ${active === 'eleves' ? 'opacity-100' : 'opacity-0'}`}
>
<h3 className="text-lg font-semibold">Éleves</h3>
<p className="mt-2 text-sm text-gray-600 dark:text-gray-300">Liste des élèves ou résumé (nombre total, par option, par cycle...).</p>
</div>
</div>
</div>
</div>
  )
}

export default TabSchool
