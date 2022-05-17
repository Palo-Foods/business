import React from "react";
import Link from "next/link";
import { MdOutlineLogout } from "react-icons/md";
import {
  MdOutlineSettings,
  MdOutlinePayment,
  MdOutlineShoppingBag,
  MdOutlineShoppingBasket,
  MdOutlineDashboard,
  MdOutlinePhotoAlbum,
} from "react-icons/md";
import { useSessionStorage } from "../hooks/useSession";
import { useLogout } from "../hooks/auth/useLogout";
import { useStates } from "../hooks/useStates";

const menus = [
  {
    name: "Dashboard",
    link: "home",
    icon: <MdOutlineDashboard size={14} />,
  },

  { name: "Orders", link: "orders", icon: <MdOutlineShoppingBag size={14} /> },
  {
    name: "Products",
    link: "products",
    icon: <MdOutlineShoppingBasket size={16} />,
  },
  {
    name: "Media",
    link: "media",
    icon: <MdOutlinePhotoAlbum size={16} />,
  },
  { name: "Payments", link: "payments", icon: <MdOutlinePayment size={14} /> },
  { name: "Settings", link: "account", icon: <MdOutlineSettings size={14} /> },
];

const AsideContent = () => {
  const { user } = useSessionStorage();

  const { logOut } = useLogout();

  const { router } = useStates();

  //handle login
  const handleLogout = async (e) => {
    e.preventDefault();
    await logOut();
    router.push("/");
  };

  const handleRoute = (page) => {
    router.push("/[route]/[page]", `/dashboard/${page}`);
  };

  return (
    <>
      <div className="mb-3 border-bottom">
        <p className="small text-muted mb-2">Profile</p>
        <div className="ps-3">
          <h5>{user?.fullName}</h5>
          <p className="small mb-0">Joined</p>
          <p className="small">12th April 2022</p>
        </div>
      </div>
      <div className="my-3 border-bottom pb-2">
        <p className="small text-muted mb-2">Menu</p>
        {menus?.map((menu) => (
          <span key={menu.name}>
          
              <a
              onClick={() => handleRoute(menu.link)}
                className={`nav-link ms-md-0 d-flex align-items-center my-0 ${
                  router?.query.page?.includes(menu.link)
                    ? "active fw-bold"
                    : "text-black fw-normal"
                } py-0`}
                type="button"
                role="tab"
                aria-selected="true"
                data-bs-dismiss="offcanvas">
                <span className="me-md-1">{menu?.icon}</span>
                <span className="m-2">{menu.name}</span>
              </a>
            
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
          <MdOutlineLogout size={14} />
        </span>
        <span className="m-2 d-md-block">Log out</span>
      </a>
    </>
  );
};

export default AsideContent;
