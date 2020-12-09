import React from "react";
import "./styles.scss";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// importamos el context
import { AppMachineProvider } from "./context/state";

// vistas
import Home from "./components/Home/";
import Login from "./components/Login/";
import PrivateRoute from "./components/PrivateRoute";

export default function App() {
  return (
    <AppMachineProvider>
      <Router>
        <div className="App">
          <Switch>
            <Route path="/login" component={Login} />
            <PrivateRoute auth path="/">
              <Home />
            </PrivateRoute>
          </Switch>
        </div>
      </Router>
    </AppMachineProvider>
  );
}
