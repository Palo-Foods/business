import React from "react";
import Link from "next/link";
import { MdNotifications, MdOutlineMenu } from "react-icons/md";
import Aside from "./Aside";

function Header() {
  return (
    <header>
      <nav className="navbar navbar-expand-sm navbar-light bg-white border-bottom">
        <div className="container-fluid">
          <a
            className="me-3 text-black d-lg-none"
            data-bs-toggle="offcanvas"
            href="#offcanvasExample"
            role="button"
            aria-controls="offcanvasExample">
            <MdOutlineMenu size={25} />
          </a>
          <Link href="/">
            <a className="navbar-brand h4 mb-0 me-auto" href="#">
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
                  <a className="dropdown-item" href="#">
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
                </div>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <Aside />
    </header>
  );
}

export default Header;
