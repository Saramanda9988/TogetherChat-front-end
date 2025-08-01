/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BaseHttpRequest } from './core/BaseHttpRequest';
import type { OpenAPIConfig } from './core/OpenAPI';
import { FetchHttpRequest } from './core/FetchHttpRequest';
import { CallControllerService } from './services/CallControllerService';
import { ChatControllerService } from './services/ChatControllerService';
import { GroupControllerService } from './services/GroupControllerService';
import { GroupMemberControllerService } from './services/GroupMemberControllerService';
import { UserControllerService } from './services/UserControllerService';
type HttpRequestConstructor = new (config: OpenAPIConfig) => BaseHttpRequest;
export class TogetherChat {
    public readonly callController: CallControllerService;
    public readonly chatController: ChatControllerService;
    public readonly groupController: GroupControllerService;
    public readonly groupMemberController: GroupMemberControllerService;
    public readonly userController: UserControllerService;
    public readonly request: BaseHttpRequest;
    constructor(config?: Partial<OpenAPIConfig>, HttpRequest: HttpRequestConstructor = FetchHttpRequest) {
        this.request = new HttpRequest({
            BASE: config?.BASE ?? 'http://localhost:8081',
            VERSION: config?.VERSION ?? '0',
            WITH_CREDENTIALS: config?.WITH_CREDENTIALS ?? false,
            CREDENTIALS: config?.CREDENTIALS ?? 'include',
            TOKEN: config?.TOKEN,
            USERNAME: config?.USERNAME,
            PASSWORD: config?.PASSWORD,
            HEADERS: config?.HEADERS,
            ENCODE_PATH: config?.ENCODE_PATH,
        });
        this.callController = new CallControllerService(this.request);
        this.chatController = new ChatControllerService(this.request);
        this.groupController = new GroupControllerService(this.request);
        this.groupMemberController = new GroupMemberControllerService(this.request);
        this.userController = new UserControllerService(this.request);
    }
}

