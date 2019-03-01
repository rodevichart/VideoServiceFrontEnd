import React, { Component, Fragment } from "react";
import http from "../services/httpService";

class Movies extends Component {
  state = {
    movies: []
  };
  async componentDidMount() {
    const response = await http.get("/api/movies");
    console.log(response);
    const { data: movies } = response;
    this.setState({ movies });
  }
  handleDelete = movieId => {
    // deleteMovie(movieId);
    const movies = this.state.movies.filter(movie => movie.id !== movieId);
    this.setState({ movies });
  };

  render() {
    const { length: count } = this.state.movies;
    if (count === 0) return <p>There are no movies in the database</p>;
    return (
      <div>
        <p>Showing {count} movies in the database.</p>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Title</th>
              <th scope="col">Gener</th>
              <th scope="col">Stock</th>
              <th scope="col">Rate</th>
              <th scope="col" />
            </tr>
          </thead>
          <tbody>
            {this.state.movies.map(movie => (
              <tr key={movie.id}>
                <td>{movie.name}</td>
                <td>{movie.genreName}</td>
                <td>{movie.numberInStock}</td>
                <td>{movie.rate}</td>
                <td>
                  <button
                    onClick={() => this.handleDelete(movie.id)}
                    className="btn btn-sm btn-danger"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Movies;
