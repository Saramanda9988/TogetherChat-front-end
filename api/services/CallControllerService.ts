/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ApiResultListSessionResponse } from '../models/ApiResultListSessionResponse';
import type { ApiResultSessionInfoResponse } from '../models/ApiResultSessionInfoResponse';
import type { ApiResultVoid } from '../models/ApiResultVoid';
import type { CallingCancelRequest } from '../models/CallingCancelRequest';
import type { CallingRequest } from '../models/CallingRequest';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class CallControllerService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * 发起通话
     * 发起语音或视频通话
     * @param requestBody
     * @returns ApiResultSessionInfoResponse OK
     * @throws ApiError
     */
    public initiateCall(
        requestBody: CallingRequest,
    ): CancelablePromise<ApiResultSessionInfoResponse> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/capi/call/initiate',
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
     * 获取通话历史
     * 获取用户的通话历史记录
     * @returns ApiResultListSessionResponse OK
     * @throws ApiError
     */
    public getCallHistory(): CancelablePromise<ApiResultListSessionResponse> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/capi/call/history',
            errors: {
                400: `Bad Request`,
                405: `Method Not Allowed`,
                429: `Too Many Requests`,
                500: `Internal Server Error`,
            },
        });
    }
    /**
     * 结束通话
     * 挂断正在进行的通话
     * @param requestBody
     * @returns ApiResultVoid OK
     * @throws ApiError
     */
    public endCall(
        requestBody: CallingCancelRequest,
    ): CancelablePromise<ApiResultVoid> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/capi/call/cancel',
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
}
