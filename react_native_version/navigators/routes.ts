import { AuthParamsRoute, authRouteName } from '../components/Auth/routes';
import {
  MovieDetailRoute,
  MovieParamsRoute,
} from '../components/MovieDetail/routes';
import {
  MovieEditParamsRoute,
  MovieEditRoute,
} from '../components/MovieEdit/routes';
import {
  MovieListParamsRoute,
  MovieListRoute,
} from '../components/MovieList/routes';

export type StackParamList = {
  [MovieListRoute]: MovieListParamsRoute | undefined;
  [MovieDetailRoute]: MovieParamsRoute;
  [MovieEditRoute]: MovieEditParamsRoute;
  [authRouteName]: AuthParamsRoute | undefined;
};
