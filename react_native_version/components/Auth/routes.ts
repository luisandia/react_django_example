export const authRouteName = 'Auth';

export interface AuthParamsRoute {
  title?: string;
}

export const authRoute = (
  params?: AuthParamsRoute,
): [typeof authRouteName, AuthParamsRoute?] => [authRouteName, params];

// export const EditFastRouteMap
//   [routeName]: AuthParamsRoute | undefined,
