import React, { Component } from "react";
import { getMovies, removeMovie } from "../services/movieService";
import { getGenres } from "../services/genreService";
// import { getMovies } from "../services/fakeMovieService";
import Pagination from "./common/pagination";
import ListGroup from "./common/listGroup";
import SearchBox from "./common/searchBox";
import MoviesTable from "./moviesTable";
import { paginate } from "../utils/paginate";
import { toast } from "react-toastify";
// import { getGenres } from "../services/fakeGenreService";
import { NavLink } from "react-router-dom";
import _ from "lodash";

class Movies extends Component {
  state = {
    movies: [],
    geners: [],
    searchQuery: "",
    selectedGenre: null,
    currentPage: 1,
    pageSize: 4,
    totalRecords: 0,
    sortColumn: { path: "name", order: "asc" }
  };

  isSortingDirectionAscending(sortDirection) {
    return sortDirection === "asc";
  }

  async fetchMovie() {
    const {
      selectedGenre,
      searchQuery: search,
      sortColumn,
      currentPage: pageIndex,
      pageSize
    } = this.state;
    var genreId = selectedGenre === null ? null : selectedGenre.id;
    var orderColumn = sortColumn.path;
    var isSortAscending = this.isSortingDirectionAscending(sortColumn.order);
    const {
      data: { items, totalItems }
    } = await getMovies({
      search,
      orderColumn,
      isSortAscending,
      pageIndex,
      pageSize,
      genreId
    });
    this.setState({ movies: items, totalRecords: totalItems });
  }

  async componentDidMount() {
    await this.fetchMovie();
    const { data } = await getGenres();
    const geners = [{ id: "", name: "All Genres" }, ...data];
    this.setState({ geners });
  }

  handleDelete = async movieId => {
    const originalMovies = this.state.movies;

    const movies = this.state.movies.filter(movie => movie.id !== movieId);
    this.setState({ movies });

    try {
      await removeMovie(movieId);
    } catch (ex) {
      if (ex.response && ex.response.status === 400) toast("Bad Movie Id!");
      else if (ex.response.status === 403) {
        toast("Forbidden");
      } else {
        toast("Something failed while deleting a movie!");
      }
      this.setState({ movies: originalMovies });
    }
  };

  handleLike = movie => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };

  handlePageChange = async page => {
    await this.setState({ currentPage: page });
    await this.fetchMovie();
  };

  handleFilterItemChange = async filterItem => {
    await this.setState({ selectedGenre: filterItem, currentPage: 1 });
    await this.fetchMovie();
  };

  handleSort = async sortColumn => {
    await this.setState({ sortColumn: sortColumn, currentPage: 1 });
    await this.fetchMovie();
  };

  handleSearch = async query => {
    await this.setState({ searchQuery: query, currentPage: 1 });
    await this.fetchMovie();
  };

  render() {
    const {
      pageSize,
      currentPage,
      geners,
      sortColumn,
      totalRecords: count
    } = this.state;
    const { user } = this.props;
    // const role = user.role;

    if (count === 0) return <p>There are no movies in the database</p>;
    const { searchQuery, movies } = this.state;
    return (
      <div className="row">
        <div className="col-2">
          <ListGroup
            onFilterItemChange={this.handleFilterItemChange}
            selectedItem={this.state.selectedGenre}
            items={geners}
          />
        </div>
        <div className="col">
          {user && user.role === "Admin" && (
            <NavLink to="/movies/new" className="btn btn-primary">
              New Movie
            </NavLink>
          )}
          <p>Showing {this.state.totalRecords} movies in the database.</p>
          <SearchBox value={searchQuery} onChange={this.handleSearch} />
          <MoviesTable
            movies={movies}
            sortColumn={sortColumn}
            onSort={this.handleSort}
            onLike={this.handleLike}
            onDelete={this.handleDelete}
          />
          <Pagination
            itemsCount={this.state.totalRecords}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
          />
        </div>
      </div>
    );
  }
}

export default Movies;
