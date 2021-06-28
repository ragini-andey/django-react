import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AddProject from "./components/add-project.component";
import Project from "./components/project.component";
import ProjectsList from "./components/project-list.component";
import TasksList from "./components/tasks.component";

class App extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/projects"} className="navbar-brand">
            DjangoUI
          </Link>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/projects"} className="nav-link">
                Projects
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/add"} className="nav-link">
                Add project
              </Link>
            </li>
          </div>
        </nav>

        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/projects"]} component={ProjectsList} />
            <Route exact path="/add" component={AddProject} />
            <Route path="/projects/:id/tasks/" component={TasksList} />
            <Route path="/projects/:id" component={Project} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
