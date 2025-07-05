/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { FileMessage } from './FileMessage';
import type { ForwardMessage } from './ForwardMessage';
import type { ImageMessage } from './ImageMessage';
/**
 * 不同类型消息持有的额外信息
 */
export type MessageExtra = {
    fileMessage?: FileMessage;
    imageMessage?: ImageMessage;
    forwardMessage?: ForwardMessage;
};

