import React from "react";
import { Information, UserForm } from "../../components";
import { Switch, Route } from "react-router-dom";

function Profile() {
  return (
    <div style={{ height: "90%" }}>
      <Switch>
        <Route exact path="/backoffice/profile/" component={Information} />
        <Route  path="/backoffice/profile/edit" component={UserForm} />
      </Switch>
    </div>
  );
}

export default Profile;
