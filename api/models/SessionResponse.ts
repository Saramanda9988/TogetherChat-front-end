/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * 返回对象
 */
export type SessionResponse = {
    /**
     * 会话ID
     */
    sessionId?: number;
    /**
     * 通话类型：1-语音通话，2-视频通话
     */
    callType?: number;
    /**
     * 创建者用户ID
     */
    creatorId?: number;
    /**
     * 会话主题 单独通话不需要
     */
    subject?: string;
    /**
     * 会话状态 0等待 1进行 2结束
     */
    status?: number;
    /**
     * 开始时间
     */
    createTime?: string;
    /**
     * 结束时间
     */
    endTime?: string;
};

