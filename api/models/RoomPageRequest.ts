/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * 群组分页请求
 */
export type RoomPageRequest = {
    /**
     * 游标（上次翻页的最后一条记录的标识）
     */
    cursor?: number;
    /**
     * 每页大小
     */
    pageSize?: number;
    /**
     * 群组名称关键字
     */
    keyword?: string;
};

