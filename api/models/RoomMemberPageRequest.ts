/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * 群组成员分页请求
 */
export type RoomMemberPageRequest = {
    /**
     * 游标（上次翻页的最后一条记录的标识）
     */
    cursor?: number;
    /**
     * 每页大小
     */
    pageSize?: number;
    /**
     * 群组ID
     */
    groupId: number;
};

