import router from "@/router";
import {
  mdiAccountEdit,
  mdiCog,
  mdiStar,
  mdiComment,
  mdiLogout,
  mdiAccountPlus,
  mdiLogin,
} from "@mdi/js";

const handleProfile = () => {
  // Kod obsługi dla profilu
  console.log("Profile clicked");
};

const handleSettings = () => {
  // Kod obsługi dla ustawień
  console.log("Settings clicked");
};

const handleFavorites = () => {
  // Kod obsługi dla ulubionych
  console.log("Favorites clicked");
};

const handleComments = () => {
  // Kod obsługi dla komentarzy
  console.log("Comments clicked");
};

const handleLogout = (router) => {
  router.push("/logout");
  console.log("Logout clicked");
};

const handleLogin = (router) => {
  router.push("/login");
  console.log("Login clicked");
};

const handleRegister = () => {
  // Kod obsługi dla rejestracji
  console.log("Register clicked");
};

export const headerLoggedItems = [
  { name: "Profile", icon: mdiAccountEdit, action: handleProfile },
  { name: "Settings", icon: mdiCog, action: handleSettings },
  { name: "Favorites", icon: mdiStar, action: handleFavorites },
  { name: "Comments", icon: mdiComment, action: handleComments },
  { name: "Logout", icon: mdiLogout, action: () => handleLogout(router) },
];

export const headerNotLoggedItems = [
  { name: "Login", icon: mdiLogin, action: () => handleLogin(router) },
  { name: "Register", icon: mdiAccountPlus, action: handleRegister },
];
