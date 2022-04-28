import React from "react";
import Link from "next/link";
import Spinner from "./ui/Spinner";
import { useAuth } from "../hooks/auth/useAuth";
import { useRouter } from "next/router";
import {
  MdOutlineSettings,
  MdOutlinePayment,
  MdOutlineShoppingBag,
  MdGroups,
  MdOutlineStore,
  MdOutlineLogout,
  MdDashboard,
  MdNotifications,
  MdOutlineMenu,
} from "react-icons/md";

const menus = [
  { name: "Dashboard", link: "dashboard", icon: <MdDashboard size={20} /> },
  {
    name: "Businesses",
    link: "businesses",
    icon: <MdOutlineStore size={20} />,
  },
  { name: "Orders", link: "orders", icon: <MdOutlineShoppingBag size={20} /> },
  { name: "Payments", link: "payments", icon: <MdOutlinePayment size={20} /> },
  { name: "Settings", link: "account", icon: <MdOutlineSettings size={20} /> },
];

function Header() {
  const { user, auth, loading } = useAuth();
  const router = useRouter();

  //handle login
  const handleLogout = async (e) => {
    e.preventDefault();
    await auth.signOut();
    router.push("/");
  };

  return (
    <header>
      <nav className="navbar navbar-expand-sm navbar-light bg-white border-bottom fixed-top">
        <div className="container-lg">
          <a
            className="me-3 text-black"
            data-bs-toggle="offcanvas"
            href="#offcanvasExample"
            role="button"
            aria-controls="offcanvasExample">
            <MdOutlineMenu size={25} />
          </a>
          <Link href="/">
            <a className="navbar-brand h4 mb-0" href="#">
              Palo
            </a>
          </Link>

          <div className="collapse navbar-collapse" id="collapsibleNavId">
            <ul className="navbar-nav ms-auto mt-2 mt-lg-0">
              <li className="nav-item me-md-3 d-none">
                <a className="nav-link" href="#">
                  Link
                </a>
              </li>
              <li className="nav-item dropdown me-md-2 pt-1">
                <a
                  className="nav-link position-relative"
                  href="#"
                  id="dropdownId"
                  data-bs-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false">
                  <span className="ms-md-5 fw-bold position-relative">
                    <MdNotifications size={20} className="text-black" />
                    <span className="position-absolute top-0 start-100 translate-middle">
                      <small
                        className="badge rounded-pill bg-danger text-white px-1 pb-1 fw-normal"
                        id="notificationNumber">
                        {2}
                      </small>
                      <span className="visually-hidden">notifications</span>
                    </span>
                  </span>
                </a>
                <div
                  className="dropdown-menu dropdown-menu-end"
                  aria-labelledby="dropdownId">
                  <Link href="/">
                    <a className="dropdown-item" href="#">
                      Message
                    </a>
                  </Link>
                  <a className="dropdown-item" href="#" onClick={handleLogout}>
                    Message
                  </a>
                </div>
              </li>

              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="dropdownId"
                  data-bs-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false">
                  <img
                    src="/images/profile.jpg"
                    width={30}
                    height={30}
                    className="rounded-circle img-fluid"
                    style={{ objectFit: "scale-down" }}
                  />
                </a>
                <div
                  className="dropdown-menu dropdown-menu-end"
                  aria-labelledby="dropdownId">
                  <Link href="/account">
                    <a className="dropdown-item" href="#">
                      Settings
                    </a>
                  </Link>
                  <a className="dropdown-item" href="#" onClick={handleLogout}>
                    {loading && <Spinner />} Logout
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div
        className="offcanvas offcanvas-start"
        tabIndex="-1"
        id="offcanvasExample"
        aria-labelledby="offcanvasExampleLabel">
        <div className="offcanvas-header ms-auto">
          <button
            type="button"
            className="btn-close text-reset"
            data-bs-dismiss="offcanvas"
            aria-label="Close"></button>
        </div>
        <div className="offcanvas-body overflow-auto pt-0">
          <div className="mb-3 border-bottom">
            <p className="small text-muted mb-2">Profile</p>
            <div className="ps-3">
              <h5>{user?.fullName}</h5>
              <p className="small mb-0">Joined</p>
              <p className="small">12th April 2022</p>
            </div>
          </div>
          <div className="mb-3 border-bottom">
            <p className="small text-muted mb-2">Menu</p>
            {menus.map((menu) => (
              <span key={menu.name}>
                <Link href={`/${menu.link}`}>
                  <a
                    className={`nav-link ms-md-0 d-flex align-items-center my-0 ${
                      router?.query.page === menu.link
                        ? "text-white bg-primary rounded"
                        : "text-black"
                    } mb-1 py-1`}
                    type="button"
                    role="tab"
                    aria-selected="true">
                    <span className="me-md-1">{menu?.icon}</span>
                    <span className="h6 m-2">{menu.name}</span>
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
              <MdOutlineLogout size={20} />
            </span>
            <span className="h6 m-2 d-md-block">
              {loading && <Spinner />} Log out
            </span>
          </a>
        </div>
      </div>
    </header>
  );
}

export default Header;
