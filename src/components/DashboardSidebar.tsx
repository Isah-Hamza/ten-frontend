import React, { useState, useContext, ReactElement } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import profile from "../assets/images/profile.jpg";
import { Dashboard } from "../contexts/Dashboard";
import { UsersContext } from "../contexts/Users";

type Props = {
  sidebarList?: Array<{
    title: string;
    icon: ReactElement;
    url?: string;
  }>;
};

type LogoutModalProps = {
  handleLogout: () => void;
  cancel: () => void;
};

export const LogoutModal: React.FC<LogoutModalProps> = ({
  handleLogout,
  cancel
}) => (
  <div className="z-10 inset-0 fixed bg-black/50 grid place-content-center">
    <div className="bg-white rounded-md min-h-[250px] grid place-content-center w-96 p-5 text-center">
      <p className="text-xl font-semibold">
        Are you sure you want <br /> to logout?
      </p>
      <div className="flex gap-3 mt-10 justify-center">
        <button
          onClick={handleLogout}
          className="text-sm px-5 py-1 rounded bg-red-500 text-white"
        >
          Yes
        </button>
        <button
          onClick={cancel}
          className="text-sm px-5 py-1 rounded bg-green-500 text-white"
        >
          No
        </button>
      </div>
    </div>
  </div>
);

const DashboardSidebar = ({ sidebarList }: Props) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isDashboardOpen } = useContext(Dashboard);
  const { loggedInUser, setLoggedInUser } = useContext(UsersContext);
  const { occupation, name } = loggedInUser;
  const [logout, setLogout] = useState(false);

  const [activeTab, setActiveTab] = useState(() => {
    let path = location.pathname;
    let currentPath = path.split("/");
    console.log(currentPath);
    return currentPath[currentPath.length - 1];
  });

  function handleNavigate(item: { title: string; url: string }) {
    setActiveTab(item.title);
    navigate(item.url);
  }

  const cancelLogout = () => setLogout(false);
  const handleLogout = () => {
    setLoggedInUser({});
    window.localStorage.removeItem("farcry_user");
    navigate("/");
  };

  return (
    <>
      <aside
        className={`${
          isDashboardOpen ? "left-0" : "left-[-350px]"
        } transition-all duration-500 fixed left-0 top-[80px] z-20 lg:static w-1/5 min-w-[300px] bg-[coral] text-white h-full`}
      >
        <div className="flex gap-3 justify-center py-5">
          <img className="w-10 h-10 rounded-full" src={profile} alt="profile" />
          <div className="flex flex-col">
            <p className="font-medium text-sm">{name || "Dummy Person"}</p>
            <p className="text-xs opacity-70">{occupation || "student"}</p>
          </div>
        </div>
        <div>
          <ul className="flex flex-col gap-5 mt-10">
            {sidebarList?.map((item, idx) => (
              //@ts-ignore
              <li
                onClick={() => {
                  if (item.title !== "logout") {
                    //@ts-ignore
                    handleNavigate(item);
                    return;
                  } else setLogout(true);
                }}
                key={idx}
                className={`${
                  item.title.toLowerCase().includes(activeTab.toLowerCase()) &&
                  "!font-bold translate-x-[7%] shadow-md !opacity-100"
                } 
                     opacity-80 transition-all duration-300 bg-[tomato] cursor-pointer flex py-1 capitalize gap-3 items-center pl-20`}
              >
                {item.icon}
                <p>{item.title}</p>
              </li>
            ))}
          </ul>
        </div>
      </aside>
      {logout ? (
        <LogoutModal handleLogout={handleLogout} cancel={cancelLogout} />
      ) : null}
    </>
  );
};

export default DashboardSidebar;
