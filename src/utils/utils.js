import {
  mdiAccountEdit,
  mdiCog,
  mdiStar,
  mdiComment,
  mdiLogout,
  mdiAccountPlus,
  mdiLogin
} from "@mdi/js";

export const itemIconMapHeaderLogged = {
  Profile: mdiAccountEdit,
  Settings: mdiCog,
  Favorites: mdiStar,
  Comments: mdiComment,
  Logout: mdiLogout,
};

export const itemIconMapHeaderNotLogged = {
  Login: mdiLogin,
  Register: mdiAccountPlus,
};