/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * 更新群组成员角色请求
 */
export type RoomMemberUpdateRequest = {
    /**
     * 群组ID
     */
    groupId: number;
    /**
     * 要更新的用户ID
     */
    userId: number;
    /**
     * 新的角色类型
     */
    role: number;
};

