/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type User = {
    readonly id?: number;
    /**
     * Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.
     */
    username: string;
    password: string;
}
