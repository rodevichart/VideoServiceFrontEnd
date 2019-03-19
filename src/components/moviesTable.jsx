import React, { Component } from "react";
import { Link } from "react-router-dom";
import Like from "./common/like";
import Table from "./common/table";
import { getCurrentUser } from "../services/userService";

class MoviesTable extends Component {
  constructor() {
    super();
    const user = getCurrentUser();
    if (user && user.role === "Admin") this.columns.push(this.deleteColumn);
  }

  deleteColumn = {
    key: "delete",
    content: movie => (
      <button
        onClick={() => this.props.onDelete(movie.id)}
        className="btn btn-sm btn-danger"
      >
        Delete
      </button>
    )
  };

  columns = [
    {
      path: "name",
      lable: "Title",
      content: movie => <Link to={`/movies/${movie.id}`}>{movie.name}</Link>
    },
    { path: "genre.name", lable: "Genre" },
    { path: "numberInStock", lable: "Stock" },
    { path: "rate", lable: "Rate" },
    {
      key: "like",
      content: movie => (
        <Like onClick={() => this.props.onLike(movie)} liked={movie.liked} />
      )
    }
  ];

  render() {
    const { movies, onSort, sortColumn } = this.props;

    return (
      <Table
        columns={this.columns}
        sortColumn={sortColumn}
        data={movies}
        onSort={onSort}
      />
    );
  }
}

export default MoviesTable;
