/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ApiResultCursorPageBaseResponseRoomMember } from '../models/ApiResultCursorPageBaseResponseRoomMember';
import type { ApiResultVoid } from '../models/ApiResultVoid';
import type { RoomMemberAddRequest } from '../models/RoomMemberAddRequest';
import type { RoomMemberPageRequest } from '../models/RoomMemberPageRequest';
import type { RoomMemberRemoveRequest } from '../models/RoomMemberRemoveRequest';
import type { RoomMemberUpdateRequest } from '../models/RoomMemberUpdateRequest';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class GroupMemberControllerService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * 更新群组成员角色
     * @param requestBody
     * @returns ApiResultVoid OK
     * @throws ApiError
     */
    public updateMemberRole(
        requestBody: RoomMemberUpdateRequest,
    ): CancelablePromise<ApiResultVoid> {
        return this.httpRequest.request({
            method: 'PUT',
            url: '/capi/groupMember',
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
     * 添加群组成员
     * @param requestBody
     * @returns ApiResultVoid OK
     * @throws ApiError
     */
    public addGroupMembers(
        requestBody: RoomMemberAddRequest,
    ): CancelablePromise<ApiResultVoid> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/capi/groupMember',
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
     * 移除群组成员
     * @param requestBody
     * @returns ApiResultVoid OK
     * @throws ApiError
     */
    public removeGroupMember(
        requestBody: RoomMemberRemoveRequest,
    ): CancelablePromise<ApiResultVoid> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/capi/groupMember',
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
     * 分页获取群组成员列表
     * @param request
     * @returns ApiResultCursorPageBaseResponseRoomMember OK
     * @throws ApiError
     */
    public getGroupMembers(
        request: RoomMemberPageRequest,
    ): CancelablePromise<ApiResultCursorPageBaseResponseRoomMember> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/capi/groupMember/page',
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
