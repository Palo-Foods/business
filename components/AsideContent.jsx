import React from "react";
import Link from "next/link";
import { MdOutlineLogout } from "react-icons/md";
import {
  MdOutlineSettings,
  MdOutlinePayment,
  MdOutlineShoppingBag,
  MdBikeScooter,
  MdOutlineStore,
  MdDashboard,
} from "react-icons/md";
import { useRouter } from "next/router";
import { useAuth } from "../hooks/auth/useAuth";

const menus = [
  { name: "Dashboard", link: "dashboard", icon: <MdDashboard size={16} /> },
  {
    name: "Businesses",
    link: "businesses",
    icon: <MdOutlineStore size={18} />,
  },
  {
    name: "Riders",
    link: "riders",
    icon: <MdBikeScooter size={16} />,
  },
  { name: "Orders", link: "orders", icon: <MdOutlineShoppingBag size={16} /> },
  { name: "Payments", link: "payments", icon: <MdOutlinePayment size={16} /> },
  { name: "Settings", link: "account", icon: <MdOutlineSettings size={16} /> },
];

const AsideContent = () => {
  const { user, auth } = useAuth();
  const router = useRouter();
  //handle login
  const handleLogout = async (e) => {
    e.preventDefault();
    await auth.signOut();
    router.push("/");
  };
  return (
    <>
      <div className="mb-3 border-bottom py-2">
        <p className="small text-muted mb-2">Profile</p>
        <div className="ps-3">
          <h5>{user?.fullName}</h5>
          <p className="small mb-0">Joined</p>
          <p className="small">12th April 1622</p>
        </div>
      </div>
      <div className="mb-3 border-bottom">
        <p className="small text-muted mb-2">Menu</p>
        {menus?.map((menu) => (
          <span key={menu.name}>
            <Link href={`/${menu.link}`}>
              <a
                className={`nav-link ms-md-0 d-flex align-items-center my-0 ${
                  router?.pathname.slice(1) === menu.link
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
        onClick={handleLogout}>
        <span className="me-md-1">
          <MdOutlineLogout size={16} />
        </span>
        <span className="m-2 d-md-block">Log out</span>
      </a>
    </>
  );
};

export default AsideContent;
