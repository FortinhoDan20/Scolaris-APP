import axios from "axios";

const API = axios.create({ baseURL: "https://scolaris-api.onrender.com" });

// Intercepteur pour ajouter le token avant chaque requête
API.interceptors.request.use((req) => {
  const profile = localStorage.getItem("profile");

  if (profile) {
    const token = JSON.parse(profile)?.token;

    if (token) {
      req.headers.Authorization = `Bearer ${token}`;
    }
  }
  return req;
});

// 🚨 Intercepteur pour gérer la réponse (déconnexion si token expiré)
API.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response && error.response.status === 401) {
      console.warn("Token expiré ou invalide. Déconnexion...");

      // Supprimer les infos de session
      localStorage.removeItem("profile");

      // Redirection vers la page de login
      window.location.href = "/login";
    }
    if (error.response && error.response.status === 503) {
      window.location.href = "/maintenance"; // rediriger l'utilisateur
    }
    return Promise.reject(error);
  }
);

// ================= API CALLS =================

// Auth
export const loginOwner = (formData) => API.post("/api/owner/login", formData);

// Owners
export const getAllOwners = () => API.get(`/api/owner/`);
export const fetchAllOwners = (params) => API.get(`/api/owner/all`, { params });
export const getOwner = (id) => API.get(`/api/owner/${id}`);
export const updateOwner = (formData, id) => API.patch(`/api/owner/${id}`, formData);
export const addNewOnwer = (formData) => API.post("/api/owner/add", formData);
export const toogleOwner = (id) => API.patch(`/api/owner/toggle/${id}`);

// Promoters
export const addPromoter = (formData) => API.post("/api/promoter/add", formData);
export const fetchAllPromoters = (params) => API.get(`/api/promoter/all`, { params });
export const getPromoter = (id) => API.get(`/api/promoter/${id}`);
export const promoterOwner = (formData, id) => API.patch(`/api/promoter/${id}`, formData);
export const newPromoter = (formData) => API.post('/api/promoter/add', formData)

//School

export const getAllSchool = (params) => API.get(`/api/school/all`, { params });
export const getSchool = (id) => API.get(`/api/school/${id}`);
export const toogleSchool = (id) => API.patch(`/api/school/toggle/${id}`);


//Cycle

export const getAllCycle = (id) => API.get(`/api/cycle/all/${id}`,);
export const getCycle = (id) => API.get(`/api/cycle/single/${id}`);
export const addCycle = (id) => API.patch(`/api/cycle/add/${id}`);

//Option

export const getAllOptions = (id) => API.get(`/api/options/school/${id}/all/`,);
export const getOption = (id) => API.get(`/api/options/option/${id}`);
export const addOption = (id) => API.patch(`/api/options/school/${id}/add/`);

//CLassroom

export const getAllClassroom = (id, params) =>  API.get(`/api/classroom/school/${id}/all/`, { params });
export const getClassroom = (id) => API.get(`/api/classroom/option/${id}`);
export const addClassroom = (id) => API.patch(`/api/classroom/school/${id}/add/`);

//test connexion

export const tesConnection = () => API.get(`/api/testConnexion`);