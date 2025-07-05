/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type CallingRequest = {
    /**
     * 发起信令的用户ID
     */
    callerId?: number;
    /**
     * 处理信令的用户ID
     */
    receiverId?: Array<number>;
    /**
     * 信令类型
     */
    type?: number;
    /**
     * 通话类型：1-语音通话，2-视频通话
     */
    callType?: number;
    /**
     * 会话类型 1一对一通话 2群聊
     */
    sessionType?: number;
    /**
     * 会话主题 单独通话不需要
     */
    subject?: string;
    /**
     * 通话请求的过期时间戳
     */
    expireTime?: number;
    /**
     * 额外信息
     */
    extra?: number;
};

