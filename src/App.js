import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router";
import { ToastContainer } from "react-toastify";
import { getCurrentUser } from "./services/userService";
import Movies from "./components/movies";
import MovieForm from "./components/movieForm";
import Logout from "./components/logout";
import LoginForm from "./components/loginForm";
import RegistrationForm from "./components/registerForm";
import Customers from "./components/customers";
import Rentals from "./components/rentals";
import NotFound from "./components/notFound";
import NavBar from "./components/navBar";
import ProtectedRoute from "./components/common/protectedRoute";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

class App extends Component {
  componentDidMount() {
    const user = getCurrentUser();
    this.setState({ user });
  }

  static displayName = App.name;
  state = {};
  render() {
    const { user } = this.state;

    return (
      <React.Fragment>
        <ToastContainer />
        <NavBar user={user} />
        <main className="container">
          <Switch>
            <Route path="/login" component={LoginForm} />
            <Route path="/logout" component={Logout} />
            <Route path="/register" component={RegistrationForm} />
            <ProtectedRoute path="/movies/:id" component={MovieForm} />
            <Route path="/movies/new" component={MovieForm} />
            <Route
              path="/movies"
              render={props => <Movies {...props} user={user} />}
            />
            <Route path="/customers" component={Customers} />
            <Route path="/rentals" component={Rentals} />
            <Route path="/not-found" component={NotFound} />
            <Redirect from="/" exact to="/movies" />
            <Redirect to="/not-found" />
          </Switch>
        </main>
      </React.Fragment>
    );
  }
}
export default App;
