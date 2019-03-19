import http from "./httpService";
import { genreApiEndPoint } from "../config.json";

export async function getGenres() {
  const data = await http.get(genreApiEndPoint);
  return data;
}
