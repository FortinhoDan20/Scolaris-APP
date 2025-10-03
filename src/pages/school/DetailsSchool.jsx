import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { User, MapPin, AtSign, Phone, Calendar } from "lucide-react";
import { motion } from "framer-motion";
import { getSchool } from "../../feautres/school/schoolSlice";
import Option from "../options/Option";
import Classroom from "../classroom/Classroom";
import StatStudents from "../student/StatStudents";
import Cycle from "../cycle/Cycle";

const SkeletonCard = () => (
  <div className="p-6 bg-gray-200 dark:bg-gray-700 rounded-lg shadow animate-pulse mb-8">
    <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded w-1/3 mb-4"></div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-full"></div>
      ))}
    </div>
  </div>
);

const DetailsSchool = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { school, loading, error } = useSelector((state) => state.school);

  const [active, setActive] = useState("cycle");

  const tabs = [
    { id: "cycle", label: "Cycle organisé", icon: <Calendar /> },
    { id: "option", label: "Option", icon: <User /> },
    { id: "salle", label: "Salle de classe", icon: <MapPin /> },
    { id: "eleves", label: "Élèves", icon: <User /> },
  ];

  useEffect(() => {
    dispatch(getSchool(id));
  }, [dispatch, id]);

  if (loading) return <div className="p-6 space-y-6"><SkeletonCard /></div>;
  if (error) return <div className="text-red-500 mt-10 text-center">{error}</div>;
  if (!school) return <div className="text-center mt-10">Aucune donnée trouvée</div>;

  const infoItems = [
    { icon: <User className="w-5 h-5 text-blue-500" />, label: "Nom de l'école", value: school.schoolName || "-" },
    { icon: <User className="w-5 h-5 text-green-500" />, label: "Abbréviation", value: school.slug || "-" },
    { icon: <MapPin className="w-5 h-5 text-purple-500" />, label: "Adresse", value: school.address || "-" },
    { icon: <Phone className="w-5 h-5 text-yellow-500" />, label: "Téléphone", value: school?.promoter?.phone || "-" },
    { icon: <AtSign className="w-5 h-5 text-red-500" />, label: "Email", value: school.email || "-" },
    { 
      icon: <User className="w-5 h-5 text-pink-500" />, 
      label: "Responsable", 
      value: `${school?.promoter?.name || ""} ${school?.promoter?.lastname || ""} ${school?.promoter?.firstname || ""}`.trim() || "-" 
    },
    { icon: <Calendar className="w-5 h-5 text-gray-500" />, label: "Créé le", value: school.createdAt ? new Date(school.createdAt).toLocaleDateString() : "-" },
    { icon: <Calendar className="w-5 h-5 text-gray-500" />, label: "Mis à jour le", value: school.updatedAt ? new Date(school.updatedAt).toLocaleDateString() : "-" },
  ];

  const classData = school?.classes || []; // [{cycle, option, className, students: []}]

  return (
    <div className="p-6 bg-gray-50 dark:bg-gray-900 min-h-screen text-gray-900 dark:text-gray-100">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 px-4 py-2 bg-blue-600 text-white rounded shadow hover:bg-blue-700 transition"
      >
        Retour
      </button>

      {/* Bloc infos principales */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 mb-6"
      >
        <h2 className="text-2xl font-semibold mb-4">Détails de l'école</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {infoItems.map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-2 p-2 bg-gray-50 dark:bg-gray-700 rounded hover:bg-gray-100 dark:hover:bg-gray-600 transition"
            >
              {item.icon}
              <span className="font-medium">{item.label}:</span> <span>{item.value}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Tabs modernes cartes horizontales */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6"
      >
        <div className="flex flex-wrap gap-4 mb-6">
          {tabs.map((t) => {
            const isActive = t.id === active;
            return (
              <button
                key={t.id}
                onClick={() => setActive(t.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all shadow-sm hover:shadow-md ${
                  isActive
                    ? "bg-indigo-600 text-white shadow-lg"
                    : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                }`}
              >
                {t.icon}
                <span>{t.label}</span>
              </button>
            );
          })}
        </div>

        {/* Panels dynamiques */}
        <div>
          {/* Cycle */}
          {active === "cycle" && (
            <div>
              <Cycle/>
              <ul className="list-disc pl-5 text-sm text-gray-600 dark:text-gray-300">
                {[...new Set(classData.map(c => c.cycle))].map((cycle, idx) => (
                  <li key={idx}>{cycle}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Option */}
          {active === "option" && (
            <div>
              <Option/>
              <ul className="list-disc pl-5 text-sm text-gray-600 dark:text-gray-300">
                {[...new Set(classData.map(c => c.option))].map((opt, idx) => (
                  <li key={idx}>{opt}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Salle */}
          {active === "salle" && (
            <div>
              <Classroom/>
              <ul className="list-disc pl-5 text-sm text-gray-600 dark:text-gray-300">
                {classData.map((c, idx) => (
                  <li key={idx}>{c.className} ({c.students?.length || 0} élèves)</li>
                ))}
              </ul>
            </div>
          )}

          {/* Élèves */}
          {active === "eleves" && (
            <div>
              <StatStudents/>
              <ul className="list-disc pl-5 text-sm text-gray-600 dark:text-gray-300">
                {classData.flatMap(c => c.students?.map(s => s.name || "-") || []).map((e, idx) => (
                  <li key={idx}>{e}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default DetailsSchool;
