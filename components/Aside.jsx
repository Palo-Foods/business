import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useAuth } from "../hooks/auth/useAuth";
import {
  MdDashboard,
  MdLogout,
  MdOutlineStore,
  MdOutlineShoppingBag,
  MdOutlineSettings,
  MdOutlinePayment,
  MdGroups,
} from "react-icons/md";

const menus = [
  { name: "Dashboard", link: "dashboard", icon: <MdDashboard size={20} /> },
  {
    name: "Managers",
    link: "managers",
    icon: <MdGroups size={20} />,
  },
  {
    name: "Businesses",
    link: "businesses",
    icon: <MdOutlineStore size={20} />,
  },
  { name: "Orders", link: "orders", icon: <MdOutlineShoppingBag size={20} /> },
  { name: "Payments", link: "payments", icon: <MdOutlinePayment size={20} /> },
  { name: "Settings", link: "account", icon: <MdOutlineSettings size={20} /> },
];

function Aside() {
  const router = useRouter();
  const user = useAuth();

  return (
    <div
      className="nav flex-column nav-pills p-1 p-md-3 mt-5"
      id="v-pills-tab"
      role="tablist"
      aria-orientation="vertical">
      <div className="overflow-auto mt-2" id="asideScroll">
        {menus.map((menu) => (
          <span key={menu.name}>
            <Link href={`/${menu.link}`}>
              <a
                className={`nav-link text-center ms-md-0 d-flex align-items-center px-3 px-md-2 text-center my-0 ${
                  router?.route.slice(1).includes(menu.link)
                    ? "active"
                    : "text-black"
                } mb-1 py-1`}
                type="button"
                role="tab"
                aria-selected="true">
                <span className="me-md-1 text-center">{menu?.icon}</span>
                <span className="h6 m-2 d-none d-md-block">{menu.name}</span>
              </a>
            </Link>
          </span>
        ))}
        <a
          className="nav-link text-center ms-md-0 d-flex align-items-center px-3 px-md-2 text-center my-0 text-black mb-1 py-1"
          type="button"
          role="tab"
          aria-selected="true">
          <span className="me-md-1 text-center">
            <MdLogout size={20} />
          </span>
          <span className="h6 m-2 d-none d-md-block">Logout</span>
        </a>
      </div>
    </div>
  );
}

export default Aside;
