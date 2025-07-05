/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * 返回对象
 */
export type LoginInfoResponse = {
    /**
     * 用户的uid，全局唯一
     */
    userId?: number;
    /**
     * 用户名
     */
    username?: string;
    /**
     * 用户头像
     */
    avatar?: string;
    /**
     * 1在线 2离线
     */
    activeStatus?: number;
    /**
     * 最后一次上下线时间
     */
    lastLoginTime?: string;
    /**
     * access_token 注意：后端返回的 token 不携带Bearer前缀
     */
    accessToken?: string;
};

