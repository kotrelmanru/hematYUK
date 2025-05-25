import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { SIDE_MENU_DATA } from "../../utils/data";
import { UserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import CharAvatar from "../Cards/CharAvatar";

const SideMenu = ({ onNavigate }) => {
  const { user, clearUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    clearUser();
    navigate("/login");
    onNavigate?.();
  };

  return (
    <aside className="w-64 h-[calc(100vh-61px)] bg-white border-r border-gray-200 sticky top-[61px] z-20 p-6">
      {/* Profile */}
      <div className="flex flex-col items-center mb-8">
        {user?.profileImageUrl ? (
          <img
            src={user.profileImageUrl}
            alt="Profile"
            className="w-20 h-20 rounded-full object-cover mb-3"
          />
        ) : (
          <CharAvatar
            fullName={user?.fullName}
            width="w-20"
            height="h-20"
            style="text-xl"
          />
        )}
        <h5 className="text-gray-800 font-medium">{user?.fullName}</h5>
      </div>

      {/* Menu */}
      <nav className="space-y-2">
        {SIDE_MENU_DATA.map((item, idx) =>
          item.path === "/logout" ? (
            <button
              key={idx}
              onClick={handleLogout}
              className="w-full flex items-center gap-3 text-base font-medium py-2 px-4 rounded-lg transition text-gray-700 hover:bg-green-200"
            >
              <item.icon className="w-5 h-5" />
              <span>{item.label}</span>
            </button>
          ) : (
            <NavLink
              key={idx}
              to={item.path}
              end
              onClick={onNavigate}
              className={({ isActive }) =>
                `w-full flex items-center gap-3 text-base font-medium py-2 px-4 rounded-lg transition
                ${isActive ? "bg-green-500 text-white" : "text-black-700 hover:bg-green-200"}`
              }
            >
              <item.icon className="w-5 h-5" />
              <span>{item.label}</span>
            </NavLink>
          )
        )}
      </nav>
    </aside>
  );
};

export default SideMenu;
