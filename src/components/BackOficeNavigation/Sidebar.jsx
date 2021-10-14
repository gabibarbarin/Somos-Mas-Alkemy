import React from "react";
import { NavLink,Link , useHistory} from "react-router-dom";
import "./style.css";

import {
  ImTree,
  FiUsers,
  GoX,
  BiMessageSquareDetail,
  BsNewspaper,
  TiThListOutline,
  IoMdPeople,
  VscChecklist,
  ImImages,
  GoSignOut,
} from "../../icons";

const adminList = [
  { title: "Novedades", icon: BsNewspaper, path: "/backoffice/news" },
  { title: "Actvidades", icon: VscChecklist, path: "/backoffice/activities" },
  {
    title: "Categorias",
    icon: TiThListOutline,
    path: "/backoffice/categories",
  },
  {
    title: "Testimonios",
    icon: BiMessageSquareDetail,
    path: "/backoffice/testimonials",
  },
  {
    title: "Organizacion",
    icon: ImTree,
    path: "/backoffice/edit-organization",
  },
  { title: "Slides", icon: ImImages, path: "/backoffice/slides" },
  { title: "Usuarios", icon: FiUsers, path: "/backoffice/users" },
  { title: "Miembros", icon: IoMdPeople, path: "/backoffice/members" },
  { title: "Contactos", icon: IoMdPeople, path: "/backoffice/contacts" },
  { title: "Mi perfil", icon: IoMdPeople, path: "/backoffice/profile" },
];
const standardList = [
  { title: "Mi perfil", icon: IoMdPeople, path: "/backoffice/profile" },
];

const Sidebar = ({ user, isOpen, closeSidebar }) => {
  const history = useHistory();
  const items = user.isAdmin ? adminList : standardList;
  const handleLogout = () => {
    history.push("/");
  };
  return (
    <div
      id="sidebar"
      className={`bottom-0 top-0 flex-shrink-0 d-flex ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } shadow-lg`}
    >
      <div className="sidebar-content" 
      // style={{ backgroundColor: "yellow" }} //mira esto octavio
      >
        <div className="flex flex-column ">
          <button className="close-button d-md-none" onClick={closeSidebar}>
            <GoX className="icon" />
          </button>
          {/* LOGO */}
          <div className="logo">
            <img src="/assets/logo.png" alt="" />
          </div>

          {/* LINKS */}
          <div className="links">
            {items.map(({ icon: Icon, title, path }, index) => (
              <NavLink to={path} key={index}>
                <Icon className="icon" />
                <span>{title}</span>
              </NavLink>
            ))}
          </div>
          </div>

        <div className="profile-section mt-3">
          <div className="d-flex align-items-center">
            <img src={user.image} alt="" />
            <div className="d-flex flex-column ms-2">
              <span className="username">
                {user.firstName} {user.lastName}
              </span>
              <p className="user-role">
                User role: <span>{user.isAdmin ? "ADMIN" : "STANDARD"}</span>
              </p>
            </div>
          </div>
          <Link onClick={handleLogout} to="#!">
            <GoSignOut className="icon" />
          </Link>
        </div>

      </div>
    </div>
  );
};

export default Sidebar;
