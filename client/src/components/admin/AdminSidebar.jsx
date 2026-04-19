import React from "react";
import { assets } from "../../assets/assets";
import {
  LayoutDashboardIcon,
  ListCollapseIcon,
  ListIcon,
  PlusSquareIcon,
} from "lucide-react";
import { NavLink } from "react-router-dom";

const AdminSidebar = () => {
  const user = {
    firstname: "Admin",
    lastname: "User",
    imageUrl: assets.profile,
  };

  const adminNavlinks = [
    { name: "Dashboard", path: "/admin", icon: LayoutDashboardIcon },
    { name: "Add Shows", path: "/admin/add-shows", icon: PlusSquareIcon },
    { name: "List Shows", path: "/admin/list-shows", icon: ListIcon },
    { name: "List Bookings", path: "/admin/list-bookings", icon: ListCollapseIcon },
  ];

  return (
    <div className="w-64 min-h-screen bg-[#0f0f0f] border-r border-red-600/20 flex flex-col items-center py-8">

      {/* 👤 Profile */}
      <img
        className="h-16 w-16 rounded-full object-cover border-2 border-red-500"
        src={user.imageUrl}
        alt="profile"
      />

      <p className="mt-3 text-lg font-semibold">
        {user.firstname} {user.lastname}
      </p>

      {/* 🔗 Nav Links */}
      <div className="w-full mt-8 flex flex-col gap-2">
        {adminNavlinks.map((link, index) => {
          const Icon = link.icon;

          return (
            <NavLink
              key={index}
              to={link.path}
              end
              className={({ isActive }) =>
                `relative flex items-center gap-3 px-6 py-3 text-sm transition ${
                  isActive
                    ? "bg-red-600/20 text-red-500"
                    : "text-gray-400 hover:bg-red-600/10 hover:text-white"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <Icon className="w-5 h-5" />

                  <span>{link.name}</span>

                  {/* 🔴 Active Indicator */}
                  {isActive && (
                    <span className="absolute right-0 w-1 h-8 bg-red-500 rounded-l"></span>
                  )}
                </>
              )}
            </NavLink>
          );
        })}
      </div>
    </div>
  );
};

export default AdminSidebar;