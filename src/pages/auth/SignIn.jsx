import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { signIn } from "../../feautres/auth/authSlice";
import { motion } from "framer-motion";
import { User, Lock, Sun, Moon } from "lucide-react";

const initialState = {
  username: "",
  password: "",
};

const SignIn = () => {
  const [formValue, setFormValue] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [darkMode, setDarkMode] = useState(false);
   const [message, setMessage] = useState("");
  const { username, password } = formValue;
  const { error, loading } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Dark/Light toggle
  const toggleDarkMode = () => setDarkMode(!darkMode);
  useEffect(() => {
    if (darkMode) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [darkMode]);

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const validate = () => {
    const newErrors = {};
    if (!username) newErrors.username = "Le nom utilisateur est requis";
    if (!password) newErrors.password = "Le mot de passe est requis";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!navigator.onLine) {
      setMessage("⚠️ Pas de connexion Internet. Vérifie ta connexion.");
      return;
    }
    if (!validate()) return;
    dispatch(signIn({ formValue, navigate, toast }));
    handleClear();
  };

  const handleClear = () => setFormValue(initialState);

  return (
    <>
      {/* Overlay Loading */}
      {loading && (
        <div className="absolute inset-0 bg-white/60 dark:bg-black/50 backdrop-blur-sm flex items-center justify-center z-10">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
            className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full"
          />
        </div>
      )}

      <section className="bg-gray-50 dark:bg-gray-900 min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          whileHover={{ y: -5 }}
          className="w-full sm:max-w-md lg:max-w-lg bg-white dark:bg-gray-800 rounded-xl shadow-3xl p-6 sm:p-8 relative
                     hover:shadow-blue-500/50 transition-all duration-300"
        >
          {/* Toggle Dark/Light */}
          <button
            onClick={toggleDarkMode}
            className="absolute top-4 right-4 p-2 rounded-full bg-gray-200 dark:bg-gray-700 transition-all hover:scale-110"
          >
            {darkMode ? (
              <Sun size={20} className="text-yellow-400" />
            ) : (
              <Moon size={20} className="text-gray-800 dark:text-white" />
            )}
          </button>

          {/* Logo and Title */}
          <div className="text-center mb-6">
            <img
              className="w-14 h-14 mx-auto mb-2"
              src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
              alt="logo"
            />
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
              CONNEXION
            </h1>
          </div>

          <form className="space-y-5">
            {/* Username Field */}
            <div className="relative">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Nom utilisateur
              </label>
              <motion.div
                animate={{ x: errors.username ? [0, -3, 3, -3, 3, 0] : 0 }}
                whileFocus={{ x: 5 }}
                transition={{ duration: 0.4 }}
                className="absolute top-1/2 left-4 -translate-y-1/2"
              >
                <User
                  size={22}
                  className={`transition-all duration-300 ${
                    username || errors.username
                      ? "text-blue-500 scale-110"
                      : "text-gray-400 dark:text-gray-300"
                  }`}
                />
              </motion.div>
              <input
                type="text"
                name="username"
                value={username}
                onChange={onInputChange}
                placeholder="Nom utilisateur"
                className={`pl-14 bg-gray-50 border ${
                  errors.username ? "border-red-500" : "border-gray-300"
                } text-gray-900 dark:text-white rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 sm:p-4
                  focus:translate-x-1 focus:ring-2 transition-all dark:bg-gray-700
                  focus:shadow-blue-500/30 focus:shadow-md`}
                required
              />
              {errors.username && (
                <p className="text-red-500 text-sm mt-1">{errors.username}</p>
              )}
            </div>

            {/* Password Field */}
            <div className="relative">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Mot de passe
              </label>
              <motion.div
                animate={{ x: errors.password ? [0, -3, 3, -3, 3, 0] : 0 }}
                whileFocus={{ x: 5 }}
                transition={{ duration: 0.4 }}
                className="absolute top-1/2 left-4 -translate-y-1/2"
              >
                <Lock
                  size={22}
                  className={`transition-all duration-300 ${
                    password || errors.password
                      ? "text-blue-500 scale-110"
                      : "text-gray-400 dark:text-gray-300"
                  }`}
                />
              </motion.div>
              <input
                type="password"
                name="password"
                value={password}
                onChange={onInputChange}
                placeholder="••••••••"
                className={`pl-14 bg-gray-50 border ${
                  errors.password ? "border-red-500" : "border-gray-300"
                } text-gray-900 dark:text-white rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 sm:p-4
                  focus:translate-x-1 focus:ring-2 transition-all dark:bg-gray-700
                  focus:shadow-blue-500/30 focus:shadow-md`}
                required
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              onClick={handleSubmit}
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.03, backgroundColor: "#2563eb" }}
              animate={loading ? { scale: [1, 1.05, 1] } : {}}
              transition={{ repeat: loading ? Infinity : 0, duration: 0.8 }}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 sm:py-4 px-4 rounded-lg text-lg sm:text-xl transition-all"
            >
              Se connecter
            </motion.button>

            {error && <p className="text-red-500 text-center mt-2">{error}</p>}
          </form>
        </motion.div>
      </section>
    </>
  );
};

export default SignIn;
