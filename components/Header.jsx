import React from "react";
import Link from "next/link";
import { MdSearch } from "react-icons/md";

function Header() {
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
            data-toggle="collapse"
            data-target="#collapsibleNavId"
            aria-controls="collapsibleNavId"
            aria-expanded="false"
            aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="collapsibleNavId">
            <form className="form-inline my-2 my-lg-0">
              <div className="input-group">
                <div className="input-group-text border-end-0 bg-white">
                  <MdSearch size={24} />
                </div>
                <input
                  type="text"
                  className="form-control border-start-0"
                  aria-label="Text input with radio button"
                />
              </div>
            </form>
            <ul className="navbar-nav ms-auto mt-2 mt-lg-0">
              <li className="nav-item me-md-3">
                <a className="nav-link" href="#">
                  Link
                </a>
              </li>
              <li className="nav-item me-md-3">
                <a className="nav-link">Help</a>
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
                  <a className="dropdown-item" href="#">
                    Logout
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
