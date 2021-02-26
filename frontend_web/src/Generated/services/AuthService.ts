/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AuthToken } from '../models/AuthToken';
import { request as __request } from '../core/request';

export class AuthService {

    /**
     * @param requestBody
     * @returns AuthToken
     * @throws ApiError
     */
    public static async createAuthToken(
        requestBody?: AuthToken,
    ): Promise<AuthToken> {
        const result = await __request({
            method: 'POST',
            path: `/auth/`,
            body: requestBody,
        });
        return result.body;
    }

}