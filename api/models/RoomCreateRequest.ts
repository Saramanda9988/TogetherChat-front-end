/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * 创建群组请求
 */
export type RoomCreateRequest = {
    /**
     * 群组名称
     */
    name: string;
    /**
     * 群组简介
     */
    description?: string;
    /**
     * 群组头像URL
     */
    avatar?: string;
    /**
     * 群组类型
     */
    type?: number;
    /**
     * 初始成员用户ID列表
     */
    memberIds?: Array<number>;
};

