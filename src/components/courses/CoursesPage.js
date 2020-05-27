import React, { Component } from "react";

export default class CoursesPage extends Component {
  state = {
    course: {
      title: "",
    },
  };

  handleChange = (event) => {
    // este paso es necesario para poder modificar los nested objects
    // si simplemente se usa setState los nested objects no se actualizaran
    // this.state.course.title es un nested object

    // spread operator crea una copia del estado y posteriormente se setea en el estado ese nuevo objeto
    const course = { ...this.state.course, title: event.target.value };
    this.setState({ course });
  };
  handleSubmit = (event) => {
    event.preventDefault();
    alert(this.state.course.title);
    const course = { ...this.state.course, title: "" };
    this.setState({
      course,
    });
  };
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h2>Courses</h2>
        <h3>Add Course</h3>
        <input
          type="text"
          onChange={this.handleChange}
          value={this.state.course.title}
        />
        <input type="submit" value="Add" />
      </form>
    );
  }
}
