import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useMachineState } from "../../context/state";

export default function PrivateRoute(props) {
  const state = useMachineState();

  let { user } = state.context;

  if (props.auth && !user) {
    return <Redirect to="/login" />;
  } else if (props.guest && user) {
    return <Redirect to="/" />;
  } else {
    return <Route component={props.component} {...props} />;
  }
}
