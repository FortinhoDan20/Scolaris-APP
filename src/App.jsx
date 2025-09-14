import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import "./css/style.css";

import "./charts/ChartjsConfig";

// Import pages
import Dashboard from "./pages/Dashboard";
import MainLayout from "./layout/MainLayout";
import SignIn from "./pages/auth/SignIn";
import { ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
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
import DetailsPromoter from "./pages/promoter/DetailsPromoter";

function App() {
  const location = useLocation();
   const { auth } = useSelector((state) => ({ ...state}))
  const connected = JSON.parse(localStorage.getItem("profile"));
  const dispatch = useDispatch();

  useEffect(() => {
    document.querySelector("html").style.scrollBehavior = "auto";
    window.scroll({ top: 0 });
    document.querySelector("html").style.scrollBehavior = "";
  }, [location.pathname]); // triggered on route change

  console.log("auth :", !auth.owner ? ("vide"):("connecters") )

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
        <Route path="/" element={!auth.owner ?  <SignIn/> :  <MainLayout />}>
          <Route index element={!auth.owner ?  <SignIn/> : <Dashboard />} />
          <Route path="/list-users" element={<ListOwner />}/>
          <Route path="/new-owner" element={!auth.owner ?  <SignIn/> : <AddOwner />}/>
           <Route path="/details-owner/:id" element={!auth.owner ?  <SignIn/> : <DetailsOwner />}/>
           <Route path="/edit-owner/:id" element={!auth.owner ?  <SignIn/> : <EditOwner />}/>
           <Route path="/add-owner/" element={!auth.owner ?  <SignIn/> : <AddOwner />}/>
           <Route path="/new-promoter/" element={!auth.owner ?  <SignIn/> : <AddPromoter />}/>
           <Route path="/list-promoter/" element={!auth.owner ?  <SignIn/> : <Promoter />}/>
           <Route path="/details-promoter/:id" element={!auth.owner ?  <SignIn/> : <DetailsPromoter />}/>
           <Route path="/details-school/" element={!auth.owner ?  <SignIn/> : <TabSchool />}/>
        </Route>

        <Route path="/403" element={<Forbidden403 />} />
        <Route path="/login" element={<SignIn />}></Route>
      </Routes>
    </>
  );
}

export default App;
