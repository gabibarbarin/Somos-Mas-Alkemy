import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import {
  BackofficeNavigation,
  Testimonials,
  ContactList,
  ListUser,
  Categories,
  ActivityDetail,
  EditNameOrganization,
  Members,
  FormEditSlide,
  DetailsCardBackofice,
} from "../../components";
import { Activities } from "../../components/Activities";
import { Profile } from "../index";
import NewsBackoffice from "../../components/NewsBackoffice";
import { useSelector } from "react-redux";

const BackOffice = () => {
  const { isLogged, user } = useSelector((state) => state.user_auth);
  return (
    <BackofficeNavigation>
      <Switch>
        <Route exact path="/backoffice">
          <Redirect to="/backoffice/news" />
        </Route>
        <Route exact path="/backoffice/news">
          <div className="section-title">
            <h2>Novedades</h2>
          </div>
          <div className="section-content flex-grow-1 vh-100 overflow-auto">
            <NewsBackoffice />
          </div>
        </Route>
        <Route path="/backoffice/news/:id">
          <div className="section-title">
            <h2>Novedades</h2>
          </div>
          <div className="section-content flex-grow-1 vh-100 overflow-auto">
            <DetailsCardBackofice section="news" />
          </div>
        </Route>
        <Route exact path="/backoffice/categories">
          <div className="section-title">
            <h2>Categorias</h2>
          </div>
          <div className="section-content flex-grow-1 vh-100 overflow-auto">
            <Categories />
          </div>
        </Route>
        <Route exact path="/backoffice/activities">
          <div className="section-title">
            <h2>Actividades</h2>
          </div>
          <div className="section-content flex-grow-1 vh-100 overflow-auto">
            <Activities />
          </div>
        </Route>
        <Route path="/backoffice/activities/:id">
          <div className="section-title">
            <h2>Detalle de actividades</h2>
          </div>
          <div className="section-content flex-grow-1 vh-100 overflow-auto">
            <ActivityDetail />
          </div>
        </Route>
        <Route path="/backoffice/edit-organization">
          <div className="section-title">
            <h2>Organización</h2>
          </div>
          <div className="section-content flex-grow-1 vh-100 overflow-auto">
            <EditNameOrganization />
          </div>
        </Route>
        <Route exact path="/backoffice/testimonials">
          <div className="section-title">
            <h2>Testimonios</h2>
          </div>
          <div className="section-content flex-grow-1 vh-100 overflow-auto">
            <Testimonials />
          </div>
        </Route>
        <Route exact path="/backoffice/testimonials/:id">
          <div className="section-title">
            <h2>Testimonios</h2>
          </div>
          <div className="section-content flex-grow-1 vh-100 overflow-auto">
            <DetailsCardBackofice section="testimonials" />
          </div>
        </Route>
        <Route path="/backoffice/slides">
          <div className="section-title">
            <h2>Slides</h2>
          </div>
          <div className="section-content flex-grow-1 vh-100 overflow-auto">
            <FormEditSlide />
          </div>
        </Route>
        <Route path="/backoffice/users">
          <div className="section-title">
            <h2>Usuarios</h2>
          </div>
          <div className="section-content flex-grow-1 vh-100 overflow-auto">
            <ListUser />
          </div>
        </Route>
        <Route path="/backoffice/members">
          <div className="section-title">
            <h2>Miembros</h2>
          </div>
          <div className="section-content flex-grow-1 vh-100 overflow-auto">
            <Members />
          </div>
        </Route>
        <Route path="/backoffice/profile">
          <div className="section-title">
            <h2>Perfil de {user?.firstName}</h2>
          </div>
          <div className="section-content flex-grow-1 vh-100 overflow-auto">
            <Profile />
          </div>
        </Route>
        <Route path="/backoffice/contacts">
          <div className="section-title">
            <h2>Contactos</h2>
          </div>
          <div className="section-content flex-grow-1 vh-100 overflow-auto">
            <ContactList />
          </div>
        </Route>
      </Switch>
    </BackofficeNavigation>
  );
};
export default BackOffice;

//! SUGERENCIA de como deberia implementarse la navegacion del backoffice
/*const SectioRouter = ({
  component: Component,
  title,
  children,
  to,
  ...rest
}) => {
  return (
    <Route {...rest} exact path={to} component={Component} title={title}>
      <div>
        <h2 className='section-title'>{title}</h2>
      </div>
      <div className='section-content  flex-grow-1 overflow-auto'>
        {Component ? <Component /> : children}
      </div>
    </Route>
  );
};*/
