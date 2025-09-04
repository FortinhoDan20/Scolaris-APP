import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000"})

  API.interceptors.request.use((req) => {
    const profile = localStorage.getItem("profile")
    console.log("profile :", profile)
    if(profile) {
        const token = JSON.parse(profile)?.token
        console.log("token in redux :", token)
        if(token){
            req.headers.Authorization = `Bearer ${token}`
            console.log(" req.headers.auth :", req.headers.Authorization)
        }
    }
    return req
})  

/*     API.interceptors.request.use((req) => {
        console.log("localStorage: ", JSON.parse(localStorage.getItem("profile")).token )
    if(localStorage.getItem("profile")){
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem("profile")).token }`
    }

    return req
})  */

//Auth 
export const loginOwner = (formData) => API.post('/api/owner/login', formData)

//Rooter for owner
/*
GET /api/owners?search=dan&isLocked=false&page=1&limit=5&sortBy=name&order=asc
*/
export const getAllOwners = () => API.get(`/api/owner/`)
export const fetchAllOwners = (params) => API.get(`/api/owner/all`, { params })
export const getOwner = (id) => API.get(`/api/owner/${id}`)
export const updateOwner = (id, data) => API.put(`/api/owner/${id}`, data);