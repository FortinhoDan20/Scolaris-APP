import React, { useEffect } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode"; // ✅ Import nommé

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
import PromoterAdd from "./pages/promoter/PromoterAdd";
import DetailsSchool from "./pages/school/DetailsSchool";
import School from "./pages/school/School";
import Maintenance from "./pages/maintenance/Maintenance";

function App() {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { auth } = useSelector((state) => ({ ...state }));

  const connected = JSON.parse(localStorage.getItem("profile"));
  useEffect(() => {
    document.querySelector("html").style.scrollBehavior = "auto";
    window.scroll({ top: 0 });
    document.querySelector("html").style.scrollBehavior = "";
  }, [location.pathname]); // triggered on route change



  // Restaure l'utilisateur connecté depuis le localStorage
  useEffect(() => {
    if (connected?.token) {
      try {
        const decoded = jwtDecode(connected.token);
        const isExpired = decoded.exp * 1000 < Date.now();
        if (isExpired) {
          localStorage.removeItem("profile");
          navigate("/login");
        } else {
          dispatch(setOwner(connected));
        }
      } catch (error) {
        localStorage.removeItem("profile");
        navigate("/login");
      }
    }
  }, [dispatch, navigate]);
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/" element={!auth.owner ? <SignIn /> : <MainLayout />}>
          <Route index element={!auth.owner ? <SignIn /> : <Dashboard />} />
          <Route path="/list-users" element={<ListOwner />} />
          <Route
            path="/new-owner"
            element={!auth.owner ? <SignIn /> : <AddOwner />}
          />
          <Route
            path="/details-owner/:id"
            element={!auth.owner ? <SignIn /> : <DetailsOwner />}
          />
          <Route
            path="/edit-owner/:id"
            element={!auth.owner ? <SignIn /> : <EditOwner />}
          />
          <Route
            path="/add-owner/"
            element={!auth.owner ? <SignIn /> : <AddOwner />}
          />
          <Route
            path="/new-promoter/"
            element={!auth.owner ? <SignIn /> : <AddPromoter />}
          />
          <Route
            path="/list-promoter/"
            element={!auth.owner ? <SignIn /> : <Promoter />}
          />
          <Route
            path="/details-promoter/:id"
            element={!auth.owner ? <SignIn /> : <DetailsPromoter />}
          />
          <Route
            path="/details-school/:id"
            element={!auth.owner ? <SignIn /> : <DetailsSchool />}
          />
          <Route
            path="/list-school"
            element={!auth.owner ? <SignIn /> : <School />}
          />
        </Route>

        <Route path="/403" element={<Forbidden403 />} />
        <Route path="/maintenance" element={<Maintenance />} />
        <Route path="/login" element={<SignIn />}></Route>
      </Routes>
    </>
  );
}

export default App;
