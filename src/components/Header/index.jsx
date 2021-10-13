import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import "./style.css";
import { HiUser, HiClipboardList, HiOutlineLogout } from "../../icons";
import { useDispatch, useSelector } from "react-redux";
import { resetUserData } from "../../store/authSlice";
import MercadopagoModal from "../../components/MercadopagoModal";
import { useLocation } from "react-router-dom";

const LINKS = [
  { name: "Inicio", route: "/" },
  {
    name: "Testimonios",
    route: "/testimonios",
  },
  {
    name: "Nosotros",
    route: "/nosotros",
  },
  {
    name: "Servicios",
    route: "/servicios",
  },

  {
    name: "Contenido",
    route: "/contenido",
  },
  {
    name: "Contacto",
    route: "/contacto",
  },
];

const Header = (props) => {
  const { isLogged, user } = useSelector((state) => state.user_auth);
  const [publicInfo, setPublicInfo] = useState(null);
  const dispatch = useDispatch();

  const handleLogout = () => {
    localStorage.removeItem("token_id");
    dispatch(resetUserData());
  };
  useEffect(() => {
    const info = { logo: "./assets/logo-sm.png", links: LINKS };
    setPublicInfo(info);
  }, []);
  const location = useLocation().pathname;
  return (
    <nav className="navbar navbar-expand-lg navbar-light shadow-sm">
      <div className="container-fluid flex align-items-center py-1">
        <NavLink to="/">
          <img
            src={publicInfo && publicInfo.logo}
            className="navbar-logo"
            alt=""
          />
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse ms-lg-4 mt-2 mt-lg-0  "
          id="navbarSupportedContent"
        >
          <ul className="navbar-nav me-auto text-md ms-lg-3 mt-1 mb-2 mb-lg-0">
            {publicInfo &&
              publicInfo.links.map((link, index) => (
                <li key={index}>
                  <NavLink
                    to={link.route}
                    className="nav-item me-0 me-lg-3 d-block mb-1 mb-lg-0"
                    activeClassName={location == link.route && "active"}
                  >
                    {link.name}
                  </NavLink>
                </li>
              ))}

            <hr
              className="d-lg-none dropdown-divider"
              style={{ marginLeft: "-1.25rem", marginRight: "-0.725rem" }}
            />
          </ul>
          <div>
            {!isLogged ? (
              <div className="d-flex align-items-center gap-2">
                <Link
                  to="/register"
                  className="button secondary-btn flex-grow-1"
                >
                  Registrarse
                </Link>
                <Link to="/login" className="button primary-btn flex-grow-1">
                  Iniciar Sesión
                </Link>
              </div>
            ) : (
              <div className=" d-flex align-items-center justify-content-between profile-menu">
                <div className="me-4">
                  <MercadopagoModal />
                </div>
                <div className="dropdown d-none d-lg-flex align-items-center">
                  <a
                    className="header-username"
                    href="#"
                    role="button"
                    id="dropdownMenuLink"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    {user?.firstName} {user?.lastName}
                  </a>
                  <a
                    className="user-image overflow-hidden rounded-circle border  "
                    href="#"
                    role="button"
                    id="dropdownMenuLink"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <img src={user.image} alt="" />
                  </a>

                  <ul
                    className="dropdown-menu dropdown-menu-end"
                    aria-labelledby="dropdownMenuLink"
                  >
                    <li>
                      <Link
                        className="dropdown-item d-flex align-items-center h-100"
                        to="/backoffice/profile"
                      >
                        <HiUser className="me-2 h-100 text-secondary" />
                        Mi perfil
                      </Link>
                    </li>
                    {user?.isAdmin && (
                      <li>
                        <Link className="dropdown-item" to="/backoffice">
                          <HiClipboardList className="me-2 h-100 text-secondary" />
                          Ir a Backoffice
                        </Link>
                      </li>
                    )}

                    <li>
                      <Link
                        className="dropdown-item"
                        onClick={handleLogout}
                        to="#!"
                      >
                        <HiOutlineLogout className="me-2 h-100 text-secondary" />
                        Cerrar sesión
                      </Link>
                    </li>
                  </ul>
                </div>
                <div className="d-flex d-lg-none align-items-center justify-content-between flex-grow-1">
                  <div className="d-flex align-items-center user ">
                    <button className="d-block user-image overflow-hidden rounded-circle border ">
                      <img src={user.image} alt="" />
                    </button>
                    <div className="d-lg-none d-flex flex-column ms-2 user-details justify-content-center">
                      <Link className="user-name" to="/backoffice/profile">
                        {user?.firstName} {user?.lastName}
                      </Link>
                      <span className="user-email">{user?.email}</span>
                    </div>
                  </div>
                  <div className="mobile-buttons">
                    {user?.isAdmin && (
                      <Link to="/backoffice/news">
                        <HiClipboardList className=" icon me-2 h-100 text-secondary" />
                      </Link>
                    )}

                    <Link onClick={handleLogout} to="#!">
                      <HiOutlineLogout className=" icon me-2 h-100 text-secondary" />
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
