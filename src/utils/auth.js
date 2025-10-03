import { jwtDecode } from "jwt-decode";


let logoutTimer = null;

// Vérifie si un token est expiré
export const isTokenExpired = (token) => {
  try {
    const decoded = jwtDecode(token);
    return decoded.exp * 1000 < Date.now();
  } catch (e) {
    return true;
  }
};

// Lance un timer qui déconnecte l'utilisateur quand le token expire
export const startLogoutTimer = (token) => {
  if (!token) return;

  try {
    const decoded = jwtDecode(token);
    const expiryTime = decoded.exp * 1000; // en ms
    const timeRemaining = expiryTime - Date.now();

    if (timeRemaining <= 0) {
      logout();
      return;
    }

    // Nettoyer un timer existant avant d'en créer un nouveau
    if (logoutTimer) clearTimeout(logoutTimer);

    logoutTimer = setTimeout(() => {
      console.warn("Token expiré → déconnexion automatique !");
      logout();
    }, timeRemaining);

    console.log("⏳ Auto logout programmé dans", Math.floor(timeRemaining / 1000), "sec");
  } catch (e) {
    logout();
  }
};

// Déconnecte l'utilisateur (clear localStorage + redirect)
export const logout = () => {
  localStorage.removeItem("profile");
  if (logoutTimer) clearTimeout(logoutTimer);
  window.location.href = "/login";
};
