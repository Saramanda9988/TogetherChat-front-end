/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type ChatMessageDeleteRequest = {
    /**
     * 全局的ID，全局唯一，用于表示
     */
    messageID: number;
    /**
     * 消息的房间号
     */
    groupId: number;
    /**
     * 消息所属的用户id
     */
    ownerId: number;
};

