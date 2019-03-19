import http from "./httpService";
import { movieApiEndPoint } from "../config.json";

function movieUrl(id) {
  return `${movieApiEndPoint}/${id}`;
}

export function getMovies({
  genreId = null,
  search = "",
  orderColumn = 0,
  isSortAscending = true,
  pageIndex = 1,
  pageSize = 10
} = {}) {
  return http.get(movieApiEndPoint, {
    params: {
      search,
      orderColumn,
      isSortAscending,
      genreId,
      pageIndex,
      pageSize
    }
  });
}

export function removeMovie(movieId) {
  return http.delete(movieUrl(movieId));
}

export function getMovieById(movieId) {
  return http.get(movieUrl(movieId));
}

export function saveMovie(movie) {
  if (movie.id) {
    const body = { ...movie };
    delete body.id;
    return http.put(movieUrl(movie.id), body);
  }

  return http.post(movieApiEndPoint + "/add", movie);
}
