import React from "react";
import Link from "next/link";
import { MdSearch, MdNotifications } from "react-icons/md";
import Spinner from "./ui/Spinner";
import { useAuth } from "../hooks/auth/useAuth";
import { useStates } from "../hooks/useStates";

function Header() {
  const { auth, loading } = useAuth();
  const { router } = useStates();

  //handle login
  const handleLogout = async (e) => {
    e.preventDefault();
    await auth.signOut();
    router.push("/");
  };

  return (
    <header>
      <nav className="navbar navbar-expand-sm navbar-light bg-white border-bottom fixed-top">
        <div className="container-fluid px-md-3">
          <a className="navbar-brand" href="#">
            Palo
          </a>
          <button
            className="navbar-toggler d-lg-none border-0"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapsibleNavId"
            aria-controls="collapsibleNavId"
            aria-expanded="false"
            aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
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
    </header>
  );
}

export default Header;
