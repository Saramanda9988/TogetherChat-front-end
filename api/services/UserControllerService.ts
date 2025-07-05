/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ApiResultLoginInfoResponse } from '../models/ApiResultLoginInfoResponse';
import type { ApiResultString } from '../models/ApiResultString';
import type { ApiResultUserInfoResponse } from '../models/ApiResultUserInfoResponse';
import type { ApiResultVoid } from '../models/ApiResultVoid';
import type { UserLoginRequest } from '../models/UserLoginRequest';
import type { UserRegisterRequest } from '../models/UserRegisterRequest';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class UserControllerService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * 用户注册
     * 用户注册接口
     * @param requestBody
     * @returns ApiResultVoid OK
     * @throws ApiError
     */
    public register(
        requestBody: UserRegisterRequest,
    ): CancelablePromise<ApiResultVoid> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/capi/user/register',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request`,
                405: `Method Not Allowed`,
                429: `Too Many Requests`,
                500: `Internal Server Error`,
            },
        });
    }
    /**
     * 刷新token
     * 刷新token接口 注意：后端返回的 token 不携带Bearer前缀
     * @param refreshToken
     * @returns ApiResultString OK
     * @throws ApiError
     */
    public refreshToken(
        refreshToken: string,
    ): CancelablePromise<ApiResultString> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/capi/user/refresh',
            cookies: {
                'refresh_token': refreshToken,
            },
            errors: {
                400: `Bad Request`,
                405: `Method Not Allowed`,
                429: `Too Many Requests`,
                500: `Internal Server Error`,
            },
        });
    }
    /**
     * 用户登录
     * 用户登录接口 注意：后端返回的 token 不携带Bearer前缀
     * @param requestBody
     * @returns ApiResultLoginInfoResponse OK
     * @throws ApiError
     */
    public login(
        requestBody: UserLoginRequest,
    ): CancelablePromise<ApiResultLoginInfoResponse> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/capi/user/login',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request`,
                405: `Method Not Allowed`,
                429: `Too Many Requests`,
                500: `Internal Server Error`,
            },
        });
    }
    /**
     * 退出登录
     * 退出登录
     * @param refreshToken
     * @returns ApiResultVoid OK
     * @throws ApiError
     */
    public logout(
        refreshToken: string,
    ): CancelablePromise<ApiResultVoid> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/capi/user/logout',
            cookies: {
                'refresh_token': refreshToken,
            },
            errors: {
                400: `Bad Request`,
                405: `Method Not Allowed`,
                429: `Too Many Requests`,
                500: `Internal Server Error`,
            },
        });
    }
    /**
     * 获取指定用户信息
     * 获取指定用户信息
     * @param id
     * @returns ApiResultUserInfoResponse OK
     * @throws ApiError
     */
    public getUserInfo(
        id: number,
    ): CancelablePromise<ApiResultUserInfoResponse> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/capi/user/info/{id}',
            path: {
                'id': id,
            },
            errors: {
                400: `Bad Request`,
                405: `Method Not Allowed`,
                429: `Too Many Requests`,
                500: `Internal Server Error`,
            },
        });
    }
    /**
     * 获取当前用户信息
     * 获取当前用户信息
     * @returns ApiResultUserInfoResponse OK
     * @throws ApiError
     */
    public getUserInfo1(): CancelablePromise<ApiResultUserInfoResponse> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/capi/user/info/me',
            errors: {
                400: `Bad Request`,
                405: `Method Not Allowed`,
                429: `Too Many Requests`,
                500: `Internal Server Error`,
            },
        });
    }
}
