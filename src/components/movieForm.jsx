import React from "react";
import Form from "./common/form";
import Joi from "joi-browser";
// import { getGenres } from "../services/fakeGenreService";
// import { saveMovie, getMovie } from "../services/fakeMovieService";
import { getMovieById, saveMovie } from "../services/movieService";
import { getGenres } from "../services/genreService";

class MovieForm extends Form {
  state = {
    data: {
      id: "",
      name: "",
      genreId: "",
      numberInStock: "",
      rate: ""
    },
    geners: [],
    errors: {}
  };

  async populateGenres() {
    const genreResponse = await getGenres();
    const { data: geners } = genreResponse;
    this.setState({ geners });
  }

  async populateMovies(movieId) {
    try {
      if (movieId === "new") {
        this.setState({ data: {} });
        return;
      }

      const { data: movie } = await getMovieById(movieId);
      const mapedMovie = this.mapToViewMode(movie);
      this.setState({ data: mapedMovie });
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        this.props.history.replace("/not-found");
    }
  }

  async componentDidMount() {
    const movieId = this.props.match.params.id;
    await this.populateMovies(movieId);
    await this.populateGenres();
  }

  mapToViewMode(movie) {
    return {
      id: movie.id,
      name: movie.name,
      genreId: movie.genre.id,
      numberInStock: movie.numberInStock,
      rate: movie.rate
    };
  }

  schema = {
    id: Joi.number(),
    name: Joi.string()
      .required()
      .label("Title"),
    genreId: Joi.number()
      .required()
      .label("Genre"),
    numberInStock: Joi.number()
      .min(1)
      .max(100)
      .required()
      .label("Number in Stock"),
    rate: Joi.number()
      .min(1)
      .max(10)
      .required()
      .label("Daily Rental Rate")
  };

  doSubmit = async () => {
    //call the server
    const movie = this.state.data;
    // saveMovie(movie);
    const savedMovie = await saveMovie(movie);
    console.log(savedMovie);

    this.props.history.push("/movies");
  };

  render() {
    return (
      <div>
        <h1>Movie Form</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("name", "Title")}
          {this.renderSelect(this.state.geners, "genreId", "Genre")}
          {this.renderInput("numberInStock", "Number in Stock")}
          {this.renderInput("rate", "Daily Rental Rate")}
          {this.renderButton("Save")}
        </form>
      </div>
    );
  }
}

export default MovieForm;
