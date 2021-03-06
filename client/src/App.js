import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import Home from "./components/Home/Home";
import NotFound from "./components/NotFound/NotFound";
import Profile from "./components/Profile/Profile";
import Header from "./components/Header/Header";
import CreateAccount from "./components/CreateAccount/CreateAccount";
import PrivateRoute from './privateRoute/PrivateRoute';

const App = () => {
  return (
    <Router>
      <div className="App">
        <Header />
        
        <div className="route-path">
          <Switch>
            <Route path="/" exact
              component={Home}
            />
            <Route path="/login" exact
              component={Login}
            />
            <Route path="/signup" exact
              component={Signup}
            />
            <PrivateRoute path="/profile" exact
              component={Profile}
            />
            <PrivateRoute path="/account/open" exact
              component={CreateAccount}
            />
            <Route path="*" exact
              component={NotFound}
            />
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
