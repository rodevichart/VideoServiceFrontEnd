import React, { Component } from "react";
import { Link } from "react-router-dom";
import Like from "./common/like";
import Table from "./common/table";

class MoviesTable extends Component {
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
    },
    {
      key: "delete",
      content: movie => (
        <button
          onClick={() =>
            //TODO from _id to id
            this.props.onDelete(movie.id)
          }
          className="btn btn-sm btn-danger"
        >
          Delete
        </button>
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
