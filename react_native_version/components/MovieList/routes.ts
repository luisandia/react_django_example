import { Movie } from '../../Generated';

export const MovieListRoute = 'MovieList';

export interface MovieListParamsRoute {
  title: string;
  updateMovies?(movie: Movie, newMovie: Movie): void;
  deleteMovies?(movie: Movie): void;
  createMovies?(movie: Movie): void;
}
