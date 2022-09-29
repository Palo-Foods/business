import React from "react";
import Link from "next/link";
import { MdOutlineLogout } from "react-icons/md";
import {
  MdOutlineSettings,
  MdOutlineShoppingBag,
  MdOutlineStore,
  MdDashboard,
} from "react-icons/md";
import { useUser } from "../hooks/useUser";
import { useStates } from "../hooks/useStates";

const menus = [
  { name: "Dashboard", link: "dashboard", icon: <MdDashboard size={14} /> },
  {
    name: "Products",
    link: "products",
    icon: <MdOutlineStore size={14} />,
  },
  { name: "Orders", link: "orders", icon: <MdOutlineShoppingBag size={14} /> },
 /*  { name: "Payments", link: "payments", icon: <MdOutlinePayment size={14} /> }, */
  { name: "Settings", link: "account", icon: <MdOutlineSettings size={14} /> },
];

const AsideContent = () => {
  const { user, signOut } = useUser("user");
  const { router } = useStates()
  
  return (
    <>
      <div className="mb-3 border-bottom py-2">
        <p className="small text-muted mb-2">Profile</p>
        <div className="ps-3">
          <p className="small mb-0">{user?.businessName}</p>
          <p className="small mb-0 text-muted">Joined</p>
          <p className="small">{user?.createdAt}</p>
        </div>
      </div>
      <div className="mb-3 border-bottom">
        <p className="small text-muted mb-2">Menu</p>
        {menus?.map((menu) => (
          <span key={menu.name}>
            <Link href={`/${menu.link}`}>
              <a
                className={`nav-link ms-md-0 d-flex align-items-center my-0 ${
                  router?.pathname.includes(menu.link)
                    ? "active fw-bold"
                    : "text-black fw-normal"
                } mb-1 py-1`}
                type="button"
                role="tab"
                aria-selected="true">
                <span className="me-md-1">{menu?.icon}</span>
                <span className="m-2">{menu.name}</span>
              </a>
            </Link>
          </span>
        ))}
      </div>
      <a
        className="nav-link ms-md-0 d-flex align-items-center my-0 text-black
            mb-1 py-1"
        type="button"
        role="tab"
        aria-selected="true"
        onClick={signOut}>
        <span className="me-md-1">
          <MdOutlineLogout size={14} />
        </span>
        <span className="m-2 d-md-block">Log out</span>
      </a>
    </>
  );
};

export default AsideContent;
