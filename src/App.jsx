import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import "./css/style.css";

import "./charts/ChartjsConfig";

// Import pages
import Dashboard from "./pages/Dashboard";
import MainLayout from "./layout/MainLayout";
import SignIn from "./pages/auth/SignIn";
import { ToastContainer } from "react-toastify";
import { useDispatch } from "react-redux";
import { setOwner } from "./feautres/auth/authSlice";
import PrivateRoute from "./privateRoute/PrivateRoute";
import Forbidden403 from "./pages/errors/Forbidden403";
import Owner from "./pages/owner/Owner";
import ListOwner from "./pages/owner/ListOwner";
import AddOwner from "./pages/owner/AddOwner";
import DetailsOwner from "./pages/owner/modal/DetailsOwner";
import EditOwner from "./pages/owner/modal/EditOwner";
import AddPromoter from "./pages/promoter/AddPromoter";
import Promoter from "./pages/promoter/Promoter";
import TabSchool from "./pages/school/TabSchool";

function App() {
  const location = useLocation();
  const connected = JSON.parse(localStorage.getItem("profile"));
  const dispatch = useDispatch();

  useEffect(() => {
    document.querySelector("html").style.scrollBehavior = "auto";
    window.scroll({ top: 0 });
    document.querySelector("html").style.scrollBehavior = "";
  }, [location.pathname]); // triggered on route change

    // Restaure l'utilisateur connecté depuis le localStorage
    useEffect(() => {
    if (connected) {
      dispatch(setOwner(connected));
    }
  }, []);
  return (
    <>
     <ToastContainer />
      <Routes>
        <Route path="/" element={<PrivateRoute><MainLayout /></PrivateRoute>}>
          <Route index element={<Dashboard />} />
          <Route path="/list-users" element={<PrivateRoute ><ListOwner /></PrivateRoute>}/>
          <Route path="/new-owner" element={<PrivateRoute ><AddOwner /></PrivateRoute>}/>
           <Route path="/details-owner/:id" element={<PrivateRoute ><DetailsOwner /></PrivateRoute>}/>
           <Route path="/edit-owner/:id" element={<PrivateRoute ><EditOwner /></PrivateRoute>}/>
           <Route path="/add-owner/" element={<PrivateRoute ><AddOwner /></PrivateRoute>}/>
           <Route path="/new-promoter/" element={<PrivateRoute ><AddPromoter /></PrivateRoute>}/>
           <Route path="/list-promoter/" element={<PrivateRoute ><Promoter /></PrivateRoute>}/>
           <Route path="/details-school/" element={<PrivateRoute ><TabSchool /></PrivateRoute>}/>
        </Route>
        <Route path="/403" element={<Forbidden403 />} />
        <Route path="/login" element={<SignIn />}></Route>
      </Routes>
    </>
  );
}

export default App;
