import React, { Component } from "react";

class Like extends Component {
  render() {
    const { onClick, liked } = this.props;
    return (
      <div>
        <i
          onClick={onClick}
          style={{ cursor: "pointer" }}
          className={this.getHeartClasses()}
          aria-hidden="true"
        />
      </div>
    );
  }

  getHeartClasses() {
    let classes = "fa fa-heart";
    return (classes += !this.props.liked ? "-o" : "");
  }
}

export default Like;
