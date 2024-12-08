// Admin Imports
import MainDashboard from "views/admin/default";
import Profile from "views/admin/profile";
import UsersPage from "views/admin/users";
import PostsPage from "views/admin/posts";

// Auth Imports
import SignIn from "views/auth/SignIn";

// Icon Imports
import { MdHome, MdPerson, MdLock, MdPostAdd } from "react-icons/md";
import { RiUserSettingsFill } from "react-icons/ri";

const routes = [
  {
    name: "Dashboard",
    layout: "/admin",
    path: "default",
    icon: <MdHome className="h-6 w-6" />,
    component: <MainDashboard />,
    sidebar: true,
  },
  
  {
    name: "Profile",
    layout: "/admin",
    path: "profile",
    icon: <MdPerson className="h-6 w-6" />,
    component: <Profile />,
    sidebar: true,
  },
  {
    name: "Users Management",
    layout: "/admin",
    path: "users",
    icon: <RiUserSettingsFill className="h-6 w-6" />,
    component: <UsersPage />,
    sidebar: true,
  },
  {
    name: "Posts Management",
    layout: "/admin",
    path: "posts",
    icon: <MdPostAdd className="h-6 w-6" />,
    component: <PostsPage />,
    sidebar: true,
  },
 
  {
    name: "Sign In",
    layout: "/auth",
    path: "sign-in",
    icon: <MdLock className="h-6 w-6" />,
    component: <SignIn />,
  },

];
export default routes;
