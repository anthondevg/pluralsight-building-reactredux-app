import React, { Component } from "react";
import { connect } from "react-redux";
import * as courseActions from "../../redux/actions/courseAction";
import * as authorActions from "../../redux/actions/authorActions";
import { bindActionCreators } from "redux";
import CouseList from "./CourseList";

class CoursesPage extends Component {
  componentDidMount() {
    const { courses, authors, actions } = this.props;

    if (courses.length === 0) {
      actions.loadCourses().catch((error) => {
        alert("loading courses failed!", error);
      });
    }

    if (authors.length === 0) {
      actions.loadAuthors().catch((error) => {
        alert("loading authors failed!", error);
      });
    }
  }
  render() {
    return (
      <>
        <h2>Courses</h2>
        <CouseList courses={this.props.courses} />
      </>
    );
  }
}

function mapStateToProps(state) {
  return {
    courses:
      state.authors.length === 0
        ? []
        : state.courses.map((course) => {
            return {
              ...course,
              authorName: state.authors.find((a) => a.id === course.authorId)
                .name,
            };
          }),
    authors: state.authors,
  };
}

// manual mapping
// function mapDispatchToProps(dispatch) {
//   return {
//     createCourse: (course) => dispatch(courseActions.createCourse(course)),
//   };
// }

// bindActionCreators
function mapDispatchToProps(dispatch) {
  return {
    actions: {
      loadCourses: bindActionCreators(courseActions.loadCourses, dispatch),
      loadAuthors: bindActionCreators(authorActions.loadAuthors, dispatch),
    },
  };
}

// object form
// const mapDispatchToProps = {
//   createCourse: courseActions.createCourse,
// };

export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);
