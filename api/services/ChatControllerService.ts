/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ApiResultCursorPageBaseResponseMessage } from '../models/ApiResultCursorPageBaseResponseMessage';
import type { ApiResultMessage } from '../models/ApiResultMessage';
import type { ApiResultVoid } from '../models/ApiResultVoid';
import type { ChatMessageDeleteRequest } from '../models/ChatMessageDeleteRequest';
import type { ChatMessagePageRequest } from '../models/ChatMessagePageRequest';
import type { ChatMessageRequest } from '../models/ChatMessageRequest';
import type { ChatMessageUpdateRequest } from '../models/ChatMessageUpdateRequest';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class ChatControllerService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * @param messageId
     * @returns ApiResultMessage OK
     * @throws ApiError
     */
    public getMessageDetail(
        messageId: number,
    ): CancelablePromise<ApiResultMessage> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/capi/chat/message',
            query: {
                'messageId': messageId,
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
     * @param requestBody
     * @returns ApiResultVoid OK
     * @throws ApiError
     */
    public updateMessage(
        requestBody: ChatMessageUpdateRequest,
    ): CancelablePromise<ApiResultVoid> {
        return this.httpRequest.request({
            method: 'PUT',
            url: '/capi/chat/message',
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
     * @param requestBody
     * @returns ApiResultVoid OK
     * @throws ApiError
     */
    public sendMessage(
        requestBody: ChatMessageRequest,
    ): CancelablePromise<ApiResultVoid> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/capi/chat/message',
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
     * @param requestBody
     * @returns ApiResultVoid OK
     * @throws ApiError
     */
    public deleteMessage(
        requestBody: ChatMessageDeleteRequest,
    ): CancelablePromise<ApiResultVoid> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/capi/chat/message',
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
     * @param request
     * @returns ApiResultCursorPageBaseResponseMessage OK
     * @throws ApiError
     */
    public getMessageList(
        request: ChatMessagePageRequest,
    ): CancelablePromise<ApiResultCursorPageBaseResponseMessage> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/capi/chat/message/page',
            query: {
                'request': request,
            },
            errors: {
                400: `Bad Request`,
                405: `Method Not Allowed`,
                429: `Too Many Requests`,
                500: `Internal Server Error`,
            },
        });
    }
}
