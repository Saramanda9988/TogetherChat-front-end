/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type ChatMessageRequest = {
    /**
     * 房间id
     */
    groupId: number;
    /**
     * 消息类型
     */
    messageType: number;
    /**
     * 消息内容
     */
    content: string;
    /**
     * 回复的消息id,如果没有别传就好
     */
    replayMessageId?: number;
    /**
     * 消息内容，类型不同传值不同.
     */
    body: Record<string, any>;
};

