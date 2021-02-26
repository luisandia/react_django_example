/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Movie } from '../models/Movie';
import type { Rating } from '../models/Rating';
import type { User } from '../models/User';
import { request as __request } from '../core/request';

export class ApiService {

    /**
     * @returns User
     * @throws ApiError
     */
    public static async listUsers(): Promise<Array<User>> {
        const result = await __request({
            method: 'GET',
            path: `/api/users/`,
        });
        return result.body;
    }

    /**
     * @param requestBody
     * @returns User
     * @throws ApiError
     */
    public static async createUser(
        requestBody?: User,
    ): Promise<User> {
        const result = await __request({
            method: 'POST',
            path: `/api/users/`,
            body: requestBody,
        });
        return result.body;
    }

    /**
     * @param id A unique integer value identifying this user.
     * @returns User
     * @throws ApiError
     */
    public static async retrieveUser(
        id: string,
    ): Promise<User> {
        const result = await __request({
            method: 'GET',
            path: `/api/users/${id}/`,
        });
        return result.body;
    }

    /**
     * @param id A unique integer value identifying this user.
     * @param requestBody
     * @returns User
     * @throws ApiError
     */
    public static async updateUser(
        id: string,
        requestBody?: User,
    ): Promise<User> {
        const result = await __request({
            method: 'PUT',
            path: `/api/users/${id}/`,
            body: requestBody,
        });
        return result.body;
    }

    /**
     * @param id A unique integer value identifying this user.
     * @param requestBody
     * @returns User
     * @throws ApiError
     */
    public static async partialUpdateUser(
        id: string,
        requestBody?: User,
    ): Promise<User> {
        const result = await __request({
            method: 'PATCH',
            path: `/api/users/${id}/`,
            body: requestBody,
        });
        return result.body;
    }

    /**
     * @param id A unique integer value identifying this user.
     * @returns any
     * @throws ApiError
     */
    public static async destroyUser(
        id: string,
    ): Promise<any> {
        const result = await __request({
            method: 'DELETE',
            path: `/api/users/${id}/`,
        });
        return result.body;
    }

    /**
     * @returns Movie
     * @throws ApiError
     */
    public static async listMovies(): Promise<Array<Movie>> {
        const result = await __request({
            method: 'GET',
            path: `/api/movies/`,
        });
        return result.body;
    }

    /**
     * @param requestBody
     * @returns Movie
     * @throws ApiError
     */
    public static async createMovie(
        requestBody?: Movie,
    ): Promise<Movie> {
        const result = await __request({
            method: 'POST',
            path: `/api/movies/`,
            body: requestBody,
        });
        return result.body;
    }

    /**
     * @param id A unique integer value identifying this movie.
     * @returns Movie
     * @throws ApiError
     */
    public static async retrieveMovie(
        id: string,
    ): Promise<Movie> {
        const result = await __request({
            method: 'GET',
            path: `/api/movies/${id}/`,
        });
        return result.body;
    }

    /**
     * @param id A unique integer value identifying this movie.
     * @param requestBody
     * @returns Movie
     * @throws ApiError
     */
    public static async updateMovie(
        id: string,
        requestBody?: Movie,
    ): Promise<Movie> {
        const result = await __request({
            method: 'PUT',
            path: `/api/movies/${id}/`,
            body: requestBody,
        });
        return result.body;
    }

    /**
     * @param id A unique integer value identifying this movie.
     * @param requestBody
     * @returns Movie
     * @throws ApiError
     */
    public static async partialUpdateMovie(
        id: string,
        requestBody?: Movie,
    ): Promise<Movie> {
        const result = await __request({
            method: 'PATCH',
            path: `/api/movies/${id}/`,
            body: requestBody,
        });
        return result.body;
    }

    /**
     * @param id A unique integer value identifying this movie.
     * @returns any
     * @throws ApiError
     */
    public static async destroyMovie(
        id: string,
    ): Promise<any> {
        const result = await __request({
            method: 'DELETE',
            path: `/api/movies/${id}/`,
        });
        return result.body;
    }

    /**
     * @returns Rating
     * @throws ApiError
     */
    public static async listRatings(): Promise<Array<Rating>> {
        const result = await __request({
            method: 'GET',
            path: `/api/ratings/`,
        });
        return result.body;
    }

    /**
     * @param requestBody
     * @returns Rating
     * @throws ApiError
     */
    public static async createRating(
        requestBody?: Rating,
    ): Promise<Rating> {
        const result = await __request({
            method: 'POST',
            path: `/api/ratings/`,
            body: requestBody,
        });
        return result.body;
    }

    /**
     * @param id A unique integer value identifying this rating.
     * @returns Rating
     * @throws ApiError
     */
    public static async retrieveRating(
        id: string,
    ): Promise<Rating> {
        const result = await __request({
            method: 'GET',
            path: `/api/ratings/${id}/`,
        });
        return result.body;
    }

    /**
     * @param id A unique integer value identifying this rating.
     * @param requestBody
     * @returns Rating
     * @throws ApiError
     */
    public static async updateRating(
        id: string,
        requestBody?: Rating,
    ): Promise<Rating> {
        const result = await __request({
            method: 'PUT',
            path: `/api/ratings/${id}/`,
            body: requestBody,
        });
        return result.body;
    }

    /**
     * @param id A unique integer value identifying this rating.
     * @param requestBody
     * @returns Rating
     * @throws ApiError
     */
    public static async partialUpdateRating(
        id: string,
        requestBody?: Rating,
    ): Promise<Rating> {
        const result = await __request({
            method: 'PATCH',
            path: `/api/ratings/${id}/`,
            body: requestBody,
        });
        return result.body;
    }

    /**
     * @param id A unique integer value identifying this rating.
     * @returns any
     * @throws ApiError
     */
    public static async destroyRating(
        id: string,
    ): Promise<any> {
        const result = await __request({
            method: 'DELETE',
            path: `/api/ratings/${id}/`,
        });
        return result.body;
    }

    /**
     * @param id A unique integer value identifying this movie.
     * @param requestBody
     * @returns Movie
     * @throws ApiError
     */
    public static async rateMovieMovie(
        id: string,
        requestBody?: Movie,
    ): Promise<Movie> {
        const result = await __request({
            method: 'POST',
            path: `/api/movies/${id}/rate_movie/`,
            body: requestBody,
        });
        return result.body;
    }

}