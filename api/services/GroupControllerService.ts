/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ApiResultCursorPageBaseResponseRoomResponse } from '../models/ApiResultCursorPageBaseResponseRoomResponse';
import type { ApiResultRoomResponse } from '../models/ApiResultRoomResponse';
import type { ApiResultVoid } from '../models/ApiResultVoid';
import type { RoomCreateRequest } from '../models/RoomCreateRequest';
import type { RoomPageRequest } from '../models/RoomPageRequest';
import type { RoomUpdateRequest } from '../models/RoomUpdateRequest';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class GroupControllerService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * 更新群组信息
     * @param requestBody
     * @returns ApiResultRoomResponse OK
     * @throws ApiError
     */
    public updateGroup(
        requestBody: RoomUpdateRequest,
    ): CancelablePromise<ApiResultRoomResponse> {
        return this.httpRequest.request({
            method: 'PUT',
            url: '/capi/group',
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
     * 创建群组
     * @param requestBody
     * @returns ApiResultRoomResponse OK
     * @throws ApiError
     */
    public createGroup(
        requestBody: RoomCreateRequest,
    ): CancelablePromise<ApiResultRoomResponse> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/capi/group',
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
     * 获取群组信息
     * @param groupId
     * @returns ApiResultRoomResponse OK
     * @throws ApiError
     */
    public getGroupInfo(
        groupId: number,
    ): CancelablePromise<ApiResultRoomResponse> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/capi/group/{groupId}',
            path: {
                'groupId': groupId,
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
     * 删除群组
     * @param groupId
     * @returns ApiResultVoid OK
     * @throws ApiError
     */
    public deleteGroup(
        groupId: number,
    ): CancelablePromise<ApiResultVoid> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/capi/group/{groupId}',
            path: {
                'groupId': groupId,
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
     * 分页获取群组列表
     * @param request
     * @returns ApiResultCursorPageBaseResponseRoomResponse OK
     * @throws ApiError
     */
    public getUserGroups(
        request: RoomPageRequest,
    ): CancelablePromise<ApiResultCursorPageBaseResponseRoomResponse> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/capi/group/page',
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
