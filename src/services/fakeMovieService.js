import * as genresAPI from "./fakeGenreService";

const movies = [
  {
    id: "5b21ca3eeb7f6fbccd471815",
    name: "Terminator",
    genre: {
      id: "5b21ca3eeb7f6fbccd471818",
      name: "Action"
    },
    numberInStock: 6,
    rate: 2.5,
    publishDate: "2018-01-03T19:04:28.809Z",
    liked: "true"
  },
  {
    id: "5b21ca3eeb7f6fbccd471816",
    name: "Die Hard",
    genre: {
      id: "5b21ca3eeb7f6fbccd471818",
      name: "Action"
    },
    numberInStock: 5,
    rate: 2.5
  },
  {
    id: "5b21ca3eeb7f6fbccd471817",
    name: "Get Out",
    genre: {
      id: "5b21ca3eeb7f6fbccd471820",
      name: "Thriller"
    },
    numberInStock: 8,
    rate: 3.5
  },
  {
    id: "5b21ca3eeb7f6fbccd471819",
    name: "Trip to Italy",
    genre: {
      id: "5b21ca3eeb7f6fbccd471814",
      name: "Comedy"
    },
    numberInStock: 7,
    rate: 3.5
  },
  {
    id: "5b21ca3eeb7f6fbccd47181a",
    name: "Airplane",
    genre: {
      id: "5b21ca3eeb7f6fbccd471814",
      name: "Comedy"
    },
    numberInStock: 7,
    rate: 3.5
  },
  {
    id: "5b21ca3eeb7f6fbccd47181b",
    name: "Wedding Crashers",
    genre: {
      id: "5b21ca3eeb7f6fbccd471814",
      name: "Comedy"
    },
    numberInStock: 7,
    rate: 3.5
  },
  {
    id: "5b21ca3eeb7f6fbccd47181e",
    name: "Gone Girl",
    genre: {
      id: "5b21ca3eeb7f6fbccd471820",
      name: "Thriller"
    },
    numberInStock: 7,
    rate: 4.5
  },
  {
    id: "5b21ca3eeb7f6fbccd47181f",
    name: "The Sixth Sense",
    genre: {
      id: "5b21ca3eeb7f6fbccd471820",
      name: "Thriller"
    },
    numberInStock: 4,
    rate: 3.5
  },
  {
    id: "5b21ca3eeb7f6fbccd471821",
    name: "The Avengers",
    genre: {
      id: "5b21ca3eeb7f6fbccd471818",
      name: "Action"
    },
    numberInStock: 7,
    rate: 3.5
  }
];

export function getMovies() {
  return movies;
}

export function getMovie(id) {
  return movies.find(m => m.id === id);
}

export function saveMovie(movie) {
  let movieInDb = movies.find(m => m.id === movie.id) || {};
  movieInDb.name = movie.name;
  movieInDb.genre = genresAPI.genres.find(g => g.id === movie.genreId);
  movieInDb.numberInStock = movie.numberInStock;
  movieInDb.rate = movie.rate;

  if (!movieInDb.id) {
    movieInDb.id = Date.now().toString();
    movies.push(movieInDb);
  }

  return movieInDb;
}

export function deleteMovie(id) {
  let movieInDb = movies.find(m => m._id === id);
  movies.splice(movies.indexOf(movieInDb), 1);
  return movieInDb;
}
