import React from "react";
import Form from "./common/form";
import Joi from "joi-browser";
import { getGenres } from "../services/fakeGenreService";
import { saveMovie } from "../services/fakeMovieService";

class MovieForm extends Form {
  state = {
    geners: [],
    data: { name: "", genreId: "", numberInStock: "", dailyRentalRate: "" },
    errors: {}
  };

  componentDidMount() {
    const geners = [{ _id: "", name: "" }, ...getGenres()];
    // const geners = [...getGenres()];
    this.setState({ geners });
  }

  schema = {
    name: Joi.string()
      .required()
      .label("Title"),
    genreId: Joi.string()
      .required()
      .label("Genre"),
    numberInStock: Joi.number()
      .integer()
      .min(1)
      .max(100)
      .required()
      .label("Number in Stock"),
    dailyRentalRate: Joi.number()
      .min(1)
      .max(10)
      .required()
      .label("Daily Rental Rate")
  };

  doSubmit = () => {
    //call the server
    const movie = this.state.data;
    console.log(movie);

    saveMovie(movie);
  };
  mapToViewMode(movie) {
    return {
      id: movie.id,
      title: movie.title,
      genreId: movie.genre.id,
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate
    };
  }
  render() {
    return (
      <div>
        <h1>Movie Form</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("name", "Title")}
          {this.renderDropDown(this.state.geners, "Genre")}
          {this.renderInput("numberInStock", "Number in Stock")}
          {this.renderInput("dailyRentalRate", "Daily Rental Rate")}
          {this.renderButton("Save")}
        </form>
      </div>
    );
  }
}

export default MovieForm;
