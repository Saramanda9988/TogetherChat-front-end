/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * 添加群组成员请求
 */
export type RoomMemberAddRequest = {
    /**
     * 群组ID
     */
    groupId: number;
    /**
     * 要添加的用户ID列表
     */
    userIds: Array<number>;
};

