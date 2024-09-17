import { Route, Switch } from "react";
import { Home } from "./components/Home";
import "./App.css";

const App = () => {
  return (
    <Switch>
      <Route exact path="/" components={Home} />;
    </Switch>
  );
};

export default App;
