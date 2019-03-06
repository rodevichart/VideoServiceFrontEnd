import React from "react";
import Form from "./common/form";
import Joi from "joi-browser";
import { getGenres } from "../services/fakeGenreService";
import { saveMovie, getMovie } from "../services/fakeMovieService";

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

  componentDidMount() {
    const movieId = this.props.match.params.id;

    if (movieId !== "new") {
      const movie = getMovie(movieId);
      if (!movie) return this.props.history.replace("/not-found");
      const mapedMovie = this.mapToViewMode(movie);

      this.setState({ data: mapedMovie });
    } else {
      this.setState({ data: {} });
    }
    // const geners = [{ _id: "", name: "" }, ...getGenres()];
    const geners = getGenres();
    this.setState({ geners });
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
    id: Joi.string(),
    name: Joi.string()
      .required()
      .label("Title"),
    genreId: Joi.string()
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

  doSubmit = () => {
    //call the server
    const movie = this.state.data;
    saveMovie(movie);
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
