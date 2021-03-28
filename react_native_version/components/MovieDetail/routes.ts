import { Movie } from '../../Generated';

export const MovieDetailRoute = 'MovieDetail';

export interface MovieParamsRoute {
  title: string;
  movie: Movie;
}
