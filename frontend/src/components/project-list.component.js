import React, { Component } from "react";
import ProjectDataService from "../services/project.service";
import { Link } from "react-router-dom";

export default class ProjectsList extends Component {
  constructor(props) {
    super(props);

    this.retrieveProjects = this.retrieveProjects.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveProject = this.setActiveProject.bind(this);

    this.state = {
      projects: [],
      currentProject: null,
      currentIndex: -1
    };
  }

  componentDidMount() {
    this.retrieveProjects();
  }

  retrieveProjects() {
    ProjectDataService.getAll()
      .then(response => {
        this.setState({
          projects: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveProjects();
    this.setState({
      currentProject: null,
      currentIndex: -1
    });
  }

  setActiveProject(project, index) {
    this.setState({
      currentProject: project,
      currentIndex: index
    });
  }

  

  render() {
    const {projects, currentProject, currentIndex } = this.state;

    return (
      <div className="list row">
         
        <div className="col-md-6">
          <h4>Project List</h4>

          <ul className="list-group">
            {projects &&
              projects.map((project, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveProject(project, index)}
                  key={index}
                >
                  {project.title}
                </li>
              ))}
          </ul>

        </div>
        <div className="col-md-6">
          {currentProject ? (
            <div>
              <h4>Project</h4>
              <div>
                <label>
                  <strong>Title:</strong>
                </label>{" "}
                {currentProject.title}
              </div>
              <div>
                <label>
                  <strong>Description:</strong>
                </label>{" "}
                {currentProject.description}
              </div>
              <div>
                <label>
                  <strong>Status:</strong>
                </label>{" "}
                {currentProject.published ? "Published" : "Pending"}
              </div>

              <Link
                to={"/projects/" + currentProject.id}
                className="badge badge-warning"
              >
                Edit
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on a project...</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}
