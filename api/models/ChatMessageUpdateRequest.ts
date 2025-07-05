/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { MessageExtra } from './MessageExtra';
export type ChatMessageUpdateRequest = {
    /**
     * 全局的ID，全局唯一，用于表示
     */
    messageID: number;
    /**
     * 用于确定用户发送的消息顺序，是万有一失的严格递增，session级别的Id
     */
    syncId: number;
    /**
     * 消息的房间号
     */
    groupId: number;
    /**
     * 用户id
     */
    userId: number;
    /**
     * 内容
     */
    content?: string;
    /**
     * 比如说，立绘的抖动，这种
     */
    specialEffects?: number;
    /**
     * 回复的消息id
     */
    replyMessageId?: number;
    /**
     * 消息类型
     */
    messageType?: number;
    extra?: MessageExtra;
};

