import React, { Component } from "react";
import ProjectDataService from "../services/project.service";
import { Link } from "react-router-dom";

export default class TasksList extends Component {
  constructor(props) {
    super(props);

    this.retrieveTasks = this.retrieveTasks.bind(this);
    
    this.state = {
      tasks: []
    };
  }

  componentDidMount() {
    this.retrieveTasks(this.props.match.params.id);
  }

  retrieveTasks(id) {
    ProjectDataService.getTasks(id)
      .then(response => {
        this.setState({
          tasks: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }


  

  render() {
    const {tasks} = this.state;

    return (
      <div className="list row">
         
        <div className="col-md-8">
          <h4>Tasks List</h4>

          <table class="table table-bordered table-striped">
            <thead class="thead-dark">
              <tr>
                <th>Task id</th><th> Title </th><th> Description </th><th> status </th>
              </tr>
            </thead>
            {tasks &&
              tasks.map((task, index) => (
                <tr>
                  <td>{task.id}</td><td> {task.title} </td><td> {task.description} </td><td> {task.status} </td>
                </tr>
              ))}
          </table>

        </div>
        
      </div>
    );
  }
}
