import { Movie } from '../../Generated';

export const MovieEditRoute = 'MovieEdit';

export interface MovieEditParamsRoute {
  title: string;
  movie: Movie;
  updateMovies(movie: Movie, newMovie: Movie): void;
  deleteMovies(movie: Movie): void;
  createMovies(movie: Movie): void;
}
