import profile from "../assets/images/profile.png";
import report from "../assets/images/report.png";
import donate from "../assets/images/donate.png";
import settings from "../assets/images/settings.png";
import logout from "../assets/images/log-out.png";

export const sidebarList = [
  {
    title: "Dashboard",
    icon: (
      <img className="w-4 h-4 object-contain" src={report} alt="dashboard" />
    ),
    url: "/admin/dashboard",
  },
  {
    title: "Administrator",
    icon: <img className="w-4 h-4 object-contain" src={profile} alt="user" />,
    url: "/admin/administrators",
  },
  {
    title: "Users",
    icon: <img className="w-4 h-4 object-contain" src={profile} alt="user" />,
    url: "/admin/users",
  },
  {
    title: "Partners",
    icon: <img className="w-4 h-4 object-contain" src={donate} alt="Partner" />,
    url: "/admin/partners",
  },
  {
    title: "settings",
    icon: (
      <img className="w-4 h-4 object-contain" src={settings} alt="settings" />
    ),
    url: "/admin/settings",
  },
  {
    title: "logout",
    icon: <img className="w-4 h-4 object-contain" src={logout} alt="logout" />,
    url: "",
  },
];
