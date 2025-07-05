/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type CallingCancelRequest = {
    /**
     * 发起信令的用户ID
     */
    callerId?: number;
    /**
     * 处理信令的用户ID
     */
    receiverId?: number;
    /**
     * 会话id
     */
    sessionId?: number;
    /**
     * 通话请求的过期时间戳
     */
    expireTime?: number;
    /**
     * 会话类型 1一对一通话 2群聊
     */
    sessionType?: number;
    /**
     * 挂断原因：1-正常挂断，2-网络问题，3-其他原因
     */
    cancelReason?: number;
};

