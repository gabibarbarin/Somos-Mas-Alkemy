import React, { useEffect } from "react";
import { PrivateRouter } from "./PrivateRoutes";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { RegisterForm, LoginForm, Err404 } from "../components";
import { BackOffice, ContactPage, Home, News, UsPage } from "../Pages";
import { useSelector, useDispatch } from "react-redux";
import { getAllService } from "../services";
import { fillUserData } from "../store/authSlice";
import TestimonialsPage from "../Pages/Testimonials";

const AppRouter = () => {
  const { isLogged, user } = useSelector((state) => state.user_auth);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchMe = async () => {
      const response = await getAllService("auth/me");
      dispatch(fillUserData(response.data));
    };
    if (!user.firstName && isLogged) {
      fetchMe();
    }
  }, [dispatch, isLogged, user]);
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/novedades" component={News} />
        <Route exact path="/register" component={RegisterForm} />
        <Route exact path="/login" component={LoginForm} />
        <PrivateRouter path="/backoffice" component={BackOffice} />
        <Route exact path="/testimonios" component={TestimonialsPage} />
        <Route exact path="/nosotros" component={UsPage} />
        <Route path="/contacto" component={ContactPage} />
        <Route exact path="/us" component={UsPage} />
        <Route component={Err404} />
      </Switch>
    </Router>
  );
};

export default AppRouter;
