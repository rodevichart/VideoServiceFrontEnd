import React, { Component } from "react";
import http from "../services/httpService";
import { getMovies } from "../services/fakeMovieService";
import Pagination from "./common/pagination";
import ListGroup from "./common/listGroup";
import SearchBox from "./common/searchBox";
import MoviesTable from "./moviesTable";
import { paginate } from "../utils/paginate";
import { getGenres } from "../services/fakeGenreService";
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
    sortColumn: { path: "name", order: "asc" }
  };
  // async componentDidMount() {
  //   const moviesResponse = await http.get("http://localhost/api/movies");
  //   const { data: movies } = moviesResponse;
  //   const genreResponse = await http.get("http://localhost/api/genres");
  //   let { data: geners } = genreResponse;
  //   geners = [{ id: "", name: "All Genres" }, ...geners];
  //   this.setState({ movies, geners });
  // }

  componentDidMount() {
    const geners = [{ _id: "", name: "All Genres" }, ...getGenres()];
    this.setState({ movies: getMovies(), geners });
  }

  handleDelete = movieId => {
    // deleteMovie(movieId);
    //TODO from _id to id
    const movies = this.state.movies.filter(movie => movie.id !== movieId);
    this.setState({ movies });
  };

  handleLike = movie => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };

  handlePageChange = page => {
    this.setState({ currentPage: page });
  };

  handleFilterItemChange = filterItem => {
    this.setState({
      selectedGenre: filterItem,
      searchQuery: "",
      currentPage: 1
    });
  };

  handleSort = sortColumn => {
    this.setState({ sortColumn });
  };

  handleSearch = query => {
    this.setState({ searchQuery: query, selectedGenre: null, currentPage: 1 });
  };

  getPageData = () => {
    const {
      pageSize,
      currentPage,
      selectedGenre,
      searchQuery,
      sortColumn,
      movies: allMovies
    } = this.state;

    console.log(searchQuery);

    let filtered = allMovies;

    if (searchQuery)
      filtered = allMovies.filter(movie =>
        movie.name.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    else if (selectedGenre && selectedGenre.id)
      allMovies.filter(movie => movie.genre.id === selectedGenre.id);

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const movies = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: movies };
  };

  render() {
    const { length: count } = this.state.movies;
    const { pageSize, currentPage, geners, sortColumn } = this.state;
    if (count === 0) return <p>There are no movies in the database</p>;

    const { totalCount, searchQuery, data: movies } = this.getPageData();

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
          <NavLink to="/movies/new" className="btn btn-primary">
            New Movie
          </NavLink>
          <p>Showing {totalCount} movies in the database.</p>
          <SearchBox value={searchQuery} onChange={this.handleSearch} />
          <MoviesTable
            movies={movies}
            sortColumn={sortColumn}
            onSort={this.handleSort}
            onLike={this.handleLike}
            onDelete={this.handleDelete}
          />
          <Pagination
            itemsCount={totalCount}
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
