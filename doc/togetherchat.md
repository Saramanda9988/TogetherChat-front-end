# OpenAPI definition


**简介**:OpenAPI definition


**HOST**:http://localhost:8081


**联系人**:


**Version**:v0


**接口路径**:/v3/api-docs/togetherchat


[TOC]






# CallController


## 结束通话(备用)


**接口地址**:`/capi/call/cancel`


**请求方式**:`POST`


**请求数据类型**:`application/x-www-form-urlencoded,application/json`


**响应数据类型**:`*/*`


**接口描述**:<p>挂断正在进行的通话</p>



**请求示例**:


```javascript
{
  "callerId": 0,
  "receiverId": 0,
  "sessionId": 0,
  "expireTime": 0,
  "sessionType": 0,
  "cancelReason": 0
}
```


**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|callingCancelRequest|CallingCancelRequest|body|true|CallingCancelRequest|CallingCancelRequest|
|&emsp;&emsp;callerId|发起信令的用户ID||false|integer(int64)||
|&emsp;&emsp;receiverId|处理信令的用户ID||false|integer(int64)||
|&emsp;&emsp;sessionId|会话id||false|integer(int64)||
|&emsp;&emsp;expireTime|通话请求的过期时间戳||false|integer(int64)||
|&emsp;&emsp;sessionType|会话类型 1一对一通话 2群聊||false|integer(int32)||
|&emsp;&emsp;cancelReason|挂断原因：1-正常挂断，2-网络问题，3-其他原因||false|integer(int32)||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|ApiResultVoid|
|400|Bad Request|ApiResult|
|405|Method Not Allowed|ApiResultVoid|
|429|Too Many Requests|ApiResultObject|
|500|Internal Server Error|ApiResult|


**响应状态码-200**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|success|成功标识true or false|boolean||
|errCode|错误码|integer(int32)|integer(int32)|
|errMsg|错误消息|string||
|data|返回对象|object||


**响应示例**:
```javascript
{
	"success": true,
	"errCode": 0,
	"errMsg": "",
	"data": {}
}
```


**响应状态码-400**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|success|成功标识true or false|boolean||
|errCode|错误码|integer(int32)|integer(int32)|
|errMsg|错误消息|string||
|data|返回对象|object||


**响应示例**:
```javascript
{
	"success": true,
	"errCode": 0,
	"errMsg": "",
	"data": {}
}
```


**响应状态码-405**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|success|成功标识true or false|boolean||
|errCode|错误码|integer(int32)|integer(int32)|
|errMsg|错误消息|string||
|data|返回对象|object||


**响应示例**:
```javascript
{
	"success": true,
	"errCode": 0,
	"errMsg": "",
	"data": {}
}
```


**响应状态码-429**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|success|成功标识true or false|boolean||
|errCode|错误码|integer(int32)|integer(int32)|
|errMsg|错误消息|string||
|data|返回对象|object||


**响应示例**:
```javascript
{
	"success": true,
	"errCode": 0,
	"errMsg": "",
	"data": {}
}
```


**响应状态码-500**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|success|成功标识true or false|boolean||
|errCode|错误码|integer(int32)|integer(int32)|
|errMsg|错误消息|string||
|data|返回对象|object||


**响应示例**:
```javascript
{
	"success": true,
	"errCode": 0,
	"errMsg": "",
	"data": {}
}
```


## 获取通话历史


**接口地址**:`/capi/call/history`


**请求方式**:`POST`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:<p>获取用户的通话历史记录</p>



**请求参数**:


暂无


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|ApiResultListSessionResponse|
|400|Bad Request|ApiResult|
|405|Method Not Allowed|ApiResultVoid|
|429|Too Many Requests|ApiResultObject|
|500|Internal Server Error|ApiResult|


**响应状态码-200**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|success|成功标识true or false|boolean||
|errCode|错误码|integer(int32)|integer(int32)|
|errMsg|错误消息|string||
|data|返回对象|array|SessionResponse|
|&emsp;&emsp;sessionId|会话ID|integer(int64)||
|&emsp;&emsp;callType|通话类型：1-语音通话，2-视频通话|integer(int32)||
|&emsp;&emsp;creatorId|创建者用户ID|integer(int64)||
|&emsp;&emsp;subject|会话主题 单独通话不需要|string||
|&emsp;&emsp;status|会话状态 0等待 1进行 2结束|integer(int32)||
|&emsp;&emsp;createTime|开始时间|string(date-time)||
|&emsp;&emsp;endTime|结束时间|string(date-time)||


**响应示例**:
```javascript
{
	"success": true,
	"errCode": 0,
	"errMsg": "",
	"data": [
		{
			"sessionId": 0,
			"callType": 0,
			"creatorId": 0,
			"subject": "",
			"status": 0,
			"createTime": "",
			"endTime": ""
		}
	]
}
```


**响应状态码-400**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|success|成功标识true or false|boolean||
|errCode|错误码|integer(int32)|integer(int32)|
|errMsg|错误消息|string||
|data|返回对象|object||


**响应示例**:
```javascript
{
	"success": true,
	"errCode": 0,
	"errMsg": "",
	"data": {}
}
```


**响应状态码-405**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|success|成功标识true or false|boolean||
|errCode|错误码|integer(int32)|integer(int32)|
|errMsg|错误消息|string||
|data|返回对象|object||


**响应示例**:
```javascript
{
	"success": true,
	"errCode": 0,
	"errMsg": "",
	"data": {}
}
```


**响应状态码-429**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|success|成功标识true or false|boolean||
|errCode|错误码|integer(int32)|integer(int32)|
|errMsg|错误消息|string||
|data|返回对象|object||


**响应示例**:
```javascript
{
	"success": true,
	"errCode": 0,
	"errMsg": "",
	"data": {}
}
```


**响应状态码-500**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|success|成功标识true or false|boolean||
|errCode|错误码|integer(int32)|integer(int32)|
|errMsg|错误消息|string||
|data|返回对象|object||


**响应示例**:
```javascript
{
	"success": true,
	"errCode": 0,
	"errMsg": "",
	"data": {}
}
```


## 发起通话(备用)


**接口地址**:`/capi/call/initiate`


**请求方式**:`POST`


**请求数据类型**:`application/x-www-form-urlencoded,application/json`


**响应数据类型**:`*/*`


**接口描述**:<p>发起语音或视频通话</p>



**请求示例**:


```javascript
{
  "callerId": 0,
  "receiverId": [],
  "type": 0,
  "callType": 0,
  "sessionType": 0,
  "subject": "",
  "expireTime": 0,
  "extra": 0
}
```


**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|callingRequest|CallingRequest|body|true|CallingRequest|CallingRequest|
|&emsp;&emsp;callerId|发起信令的用户ID||false|integer(int64)||
|&emsp;&emsp;receiverId|处理信令的用户ID||false|array|integer(int64)|
|&emsp;&emsp;type|信令类型||false|integer(int32)||
|&emsp;&emsp;callType|通话类型：1-语音通话，2-视频通话||false|integer(int32)||
|&emsp;&emsp;sessionType|会话类型 1一对一通话 2群聊||false|integer(int32)||
|&emsp;&emsp;subject|会话主题 单独通话不需要||false|string||
|&emsp;&emsp;expireTime|通话请求的过期时间戳||false|integer(int64)||
|&emsp;&emsp;extra|额外信息||false|integer(int32)||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|ApiResultVoid|
|400|Bad Request|ApiResult|
|405|Method Not Allowed|ApiResultVoid|
|429|Too Many Requests|ApiResultObject|
|500|Internal Server Error|ApiResult|


**响应状态码-200**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|success|成功标识true or false|boolean||
|errCode|错误码|integer(int32)|integer(int32)|
|errMsg|错误消息|string||
|data|返回对象|object||


**响应示例**:
```javascript
{
	"success": true,
	"errCode": 0,
	"errMsg": "",
	"data": {}
}
```


**响应状态码-400**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|success|成功标识true or false|boolean||
|errCode|错误码|integer(int32)|integer(int32)|
|errMsg|错误消息|string||
|data|返回对象|object||


**响应示例**:
```javascript
{
	"success": true,
	"errCode": 0,
	"errMsg": "",
	"data": {}
}
```


**响应状态码-405**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|success|成功标识true or false|boolean||
|errCode|错误码|integer(int32)|integer(int32)|
|errMsg|错误消息|string||
|data|返回对象|object||


**响应示例**:
```javascript
{
	"success": true,
	"errCode": 0,
	"errMsg": "",
	"data": {}
}
```


**响应状态码-429**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|success|成功标识true or false|boolean||
|errCode|错误码|integer(int32)|integer(int32)|
|errMsg|错误消息|string||
|data|返回对象|object||


**响应示例**:
```javascript
{
	"success": true,
	"errCode": 0,
	"errMsg": "",
	"data": {}
}
```


**响应状态码-500**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|success|成功标识true or false|boolean||
|errCode|错误码|integer(int32)|integer(int32)|
|errMsg|错误消息|string||
|data|返回对象|object||


**响应示例**:
```javascript
{
	"success": true,
	"errCode": 0,
	"errMsg": "",
	"data": {}
}
```


# GroupController


## 创建群组


**接口地址**:`/capi/group`


**请求方式**:`POST`


**请求数据类型**:`application/x-www-form-urlencoded,application/json`


**响应数据类型**:`*/*`


**接口描述**:


**请求示例**:


```javascript
{
  "name": "",
  "description": "",
  "avatar": "",
  "type": 0,
  "memberIds": []
}
```


**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|roomCreateRequest|创建群组请求|body|true|RoomCreateRequest|RoomCreateRequest|
|&emsp;&emsp;name|群组名称||true|string||
|&emsp;&emsp;description|群组简介||false|string||
|&emsp;&emsp;avatar|群组头像URL||false|string||
|&emsp;&emsp;type|群组类型||false|integer(int32)||
|&emsp;&emsp;memberIds|初始成员用户ID列表||false|array|integer(int64)|


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|ApiResultRoomResponse|
|400|Bad Request|ApiResult|
|405|Method Not Allowed|ApiResultVoid|
|429|Too Many Requests|ApiResultObject|
|500|Internal Server Error|ApiResult|


**响应状态码-200**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|success|成功标识true or false|boolean||
|errCode|错误码|integer(int32)|integer(int32)|
|errMsg|错误消息|string||
|data||RoomResponse|RoomResponse|
|&emsp;&emsp;id|群组ID|integer(int64)||
|&emsp;&emsp;name|群组名称|string||
|&emsp;&emsp;creatorId|创建者用户ID|integer(int64)||
|&emsp;&emsp;description|群组简介|string||
|&emsp;&emsp;avatar|群组头像URL|string||
|&emsp;&emsp;createdAt|创建时间|string(date-time)||
|&emsp;&emsp;updatedAt|最后更新时间|string(date-time)||
|&emsp;&emsp;memberCount|成员数量|integer(int32)||


**响应示例**:
```javascript
{
	"success": true,
	"errCode": 0,
	"errMsg": "",
	"data": {
		"id": 0,
		"name": "",
		"creatorId": 0,
		"description": "",
		"avatar": "",
		"createdAt": "",
		"updatedAt": "",
		"memberCount": 0
	}
}
```


**响应状态码-400**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|success|成功标识true or false|boolean||
|errCode|错误码|integer(int32)|integer(int32)|
|errMsg|错误消息|string||
|data|返回对象|object||


**响应示例**:
```javascript
{
	"success": true,
	"errCode": 0,
	"errMsg": "",
	"data": {}
}
```


**响应状态码-405**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|success|成功标识true or false|boolean||
|errCode|错误码|integer(int32)|integer(int32)|
|errMsg|错误消息|string||
|data|返回对象|object||


**响应示例**:
```javascript
{
	"success": true,
	"errCode": 0,
	"errMsg": "",
	"data": {}
}
```


**响应状态码-429**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|success|成功标识true or false|boolean||
|errCode|错误码|integer(int32)|integer(int32)|
|errMsg|错误消息|string||
|data|返回对象|object||


**响应示例**:
```javascript
{
	"success": true,
	"errCode": 0,
	"errMsg": "",
	"data": {}
}
```


**响应状态码-500**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|success|成功标识true or false|boolean||
|errCode|错误码|integer(int32)|integer(int32)|
|errMsg|错误消息|string||
|data|返回对象|object||


**响应示例**:
```javascript
{
	"success": true,
	"errCode": 0,
	"errMsg": "",
	"data": {}
}
```


## 更新群组信息


**接口地址**:`/capi/group`


**请求方式**:`PUT`


**请求数据类型**:`application/x-www-form-urlencoded,application/json`


**响应数据类型**:`*/*`


**接口描述**:


**请求示例**:


```javascript
{
  "id": 0,
  "name": "",
  "description": "",
  "avatar": ""
}
```


**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|roomUpdateRequest|更新群组请求|body|true|RoomUpdateRequest|RoomUpdateRequest|
|&emsp;&emsp;id|群组ID||true|integer(int64)||
|&emsp;&emsp;name|群组名称||false|string||
|&emsp;&emsp;description|群组简介||false|string||
|&emsp;&emsp;avatar|群组头像URL||false|string||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|ApiResultRoomResponse|
|400|Bad Request|ApiResult|
|405|Method Not Allowed|ApiResultVoid|
|429|Too Many Requests|ApiResultObject|
|500|Internal Server Error|ApiResult|


**响应状态码-200**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|success|成功标识true or false|boolean||
|errCode|错误码|integer(int32)|integer(int32)|
|errMsg|错误消息|string||
|data||RoomResponse|RoomResponse|
|&emsp;&emsp;id|群组ID|integer(int64)||
|&emsp;&emsp;name|群组名称|string||
|&emsp;&emsp;creatorId|创建者用户ID|integer(int64)||
|&emsp;&emsp;description|群组简介|string||
|&emsp;&emsp;avatar|群组头像URL|string||
|&emsp;&emsp;createdAt|创建时间|string(date-time)||
|&emsp;&emsp;updatedAt|最后更新时间|string(date-time)||
|&emsp;&emsp;memberCount|成员数量|integer(int32)||


**响应示例**:
```javascript
{
	"success": true,
	"errCode": 0,
	"errMsg": "",
	"data": {
		"id": 0,
		"name": "",
		"creatorId": 0,
		"description": "",
		"avatar": "",
		"createdAt": "",
		"updatedAt": "",
		"memberCount": 0
	}
}
```


**响应状态码-400**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|success|成功标识true or false|boolean||
|errCode|错误码|integer(int32)|integer(int32)|
|errMsg|错误消息|string||
|data|返回对象|object||


**响应示例**:
```javascript
{
	"success": true,
	"errCode": 0,
	"errMsg": "",
	"data": {}
}
```


**响应状态码-405**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|success|成功标识true or false|boolean||
|errCode|错误码|integer(int32)|integer(int32)|
|errMsg|错误消息|string||
|data|返回对象|object||


**响应示例**:
```javascript
{
	"success": true,
	"errCode": 0,
	"errMsg": "",
	"data": {}
}
```


**响应状态码-429**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|success|成功标识true or false|boolean||
|errCode|错误码|integer(int32)|integer(int32)|
|errMsg|错误消息|string||
|data|返回对象|object||


**响应示例**:
```javascript
{
	"success": true,
	"errCode": 0,
	"errMsg": "",
	"data": {}
}
```


**响应状态码-500**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|success|成功标识true or false|boolean||
|errCode|错误码|integer(int32)|integer(int32)|
|errMsg|错误消息|string||
|data|返回对象|object||


**响应示例**:
```javascript
{
	"success": true,
	"errCode": 0,
	"errMsg": "",
	"data": {}
}
```


## 获取群组信息


**接口地址**:`/capi/group/{groupId}`


**请求方式**:`GET`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:


**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|groupId||path|true|integer(int64)||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|ApiResultRoomResponse|
|400|Bad Request|ApiResult|
|405|Method Not Allowed|ApiResultVoid|
|429|Too Many Requests|ApiResultObject|
|500|Internal Server Error|ApiResult|


**响应状态码-200**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|success|成功标识true or false|boolean||
|errCode|错误码|integer(int32)|integer(int32)|
|errMsg|错误消息|string||
|data||RoomResponse|RoomResponse|
|&emsp;&emsp;id|群组ID|integer(int64)||
|&emsp;&emsp;name|群组名称|string||
|&emsp;&emsp;creatorId|创建者用户ID|integer(int64)||
|&emsp;&emsp;description|群组简介|string||
|&emsp;&emsp;avatar|群组头像URL|string||
|&emsp;&emsp;createdAt|创建时间|string(date-time)||
|&emsp;&emsp;updatedAt|最后更新时间|string(date-time)||
|&emsp;&emsp;memberCount|成员数量|integer(int32)||


**响应示例**:
```javascript
{
	"success": true,
	"errCode": 0,
	"errMsg": "",
	"data": {
		"id": 0,
		"name": "",
		"creatorId": 0,
		"description": "",
		"avatar": "",
		"createdAt": "",
		"updatedAt": "",
		"memberCount": 0
	}
}
```


**响应状态码-400**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|success|成功标识true or false|boolean||
|errCode|错误码|integer(int32)|integer(int32)|
|errMsg|错误消息|string||
|data|返回对象|object||


**响应示例**:
```javascript
{
	"success": true,
	"errCode": 0,
	"errMsg": "",
	"data": {}
}
```


**响应状态码-405**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|success|成功标识true or false|boolean||
|errCode|错误码|integer(int32)|integer(int32)|
|errMsg|错误消息|string||
|data|返回对象|object||


**响应示例**:
```javascript
{
	"success": true,
	"errCode": 0,
	"errMsg": "",
	"data": {}
}
```


**响应状态码-429**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|success|成功标识true or false|boolean||
|errCode|错误码|integer(int32)|integer(int32)|
|errMsg|错误消息|string||
|data|返回对象|object||


**响应示例**:
```javascript
{
	"success": true,
	"errCode": 0,
	"errMsg": "",
	"data": {}
}
```


**响应状态码-500**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|success|成功标识true or false|boolean||
|errCode|错误码|integer(int32)|integer(int32)|
|errMsg|错误消息|string||
|data|返回对象|object||


**响应示例**:
```javascript
{
	"success": true,
	"errCode": 0,
	"errMsg": "",
	"data": {}
}
```


## 删除群组


**接口地址**:`/capi/group/{groupId}`


**请求方式**:`DELETE`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:


**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|groupId||path|true|integer(int64)||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|ApiResultVoid|
|400|Bad Request|ApiResult|
|405|Method Not Allowed|ApiResultVoid|
|429|Too Many Requests|ApiResultObject|
|500|Internal Server Error|ApiResult|


**响应状态码-200**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|success|成功标识true or false|boolean||
|errCode|错误码|integer(int32)|integer(int32)|
|errMsg|错误消息|string||
|data|返回对象|object||


**响应示例**:
```javascript
{
	"success": true,
	"errCode": 0,
	"errMsg": "",
	"data": {}
}
```


**响应状态码-400**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|success|成功标识true or false|boolean||
|errCode|错误码|integer(int32)|integer(int32)|
|errMsg|错误消息|string||
|data|返回对象|object||


**响应示例**:
```javascript
{
	"success": true,
	"errCode": 0,
	"errMsg": "",
	"data": {}
}
```


**响应状态码-405**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|success|成功标识true or false|boolean||
|errCode|错误码|integer(int32)|integer(int32)|
|errMsg|错误消息|string||
|data|返回对象|object||


**响应示例**:
```javascript
{
	"success": true,
	"errCode": 0,
	"errMsg": "",
	"data": {}
}
```


**响应状态码-429**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|success|成功标识true or false|boolean||
|errCode|错误码|integer(int32)|integer(int32)|
|errMsg|错误消息|string||
|data|返回对象|object||


**响应示例**:
```javascript
{
	"success": true,
	"errCode": 0,
	"errMsg": "",
	"data": {}
}
```


**响应状态码-500**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|success|成功标识true or false|boolean||
|errCode|错误码|integer(int32)|integer(int32)|
|errMsg|错误消息|string||
|data|返回对象|object||


**响应示例**:
```javascript
{
	"success": true,
	"errCode": 0,
	"errMsg": "",
	"data": {}
}
```


## 分页获取群组列表


**接口地址**:`/capi/group/page`


**请求方式**:`GET`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:


**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|request|群组分页请求|query|true|RoomPageRequest|RoomPageRequest|
|&emsp;&emsp;cursor|游标（上次翻页的最后一条记录的标识）||false|number(double)||
|&emsp;&emsp;pageSize|每页大小||false|integer(int32)||
|&emsp;&emsp;keyword|群组名称关键字||false|string||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|ApiResultCursorPageBaseResponseRoomResponse|
|400|Bad Request|ApiResult|
|405|Method Not Allowed|ApiResultVoid|
|429|Too Many Requests|ApiResultObject|
|500|Internal Server Error|ApiResult|


**响应状态码-200**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|success|成功标识true or false|boolean||
|errCode|错误码|integer(int32)|integer(int32)|
|errMsg|错误消息|string||
|data||CursorPageBaseResponseRoomResponse|CursorPageBaseResponseRoomResponse|
|&emsp;&emsp;cursor|游标（下次翻页带上这参数）|number(double)||
|&emsp;&emsp;isLast|是否最后一页|boolean||
|&emsp;&emsp;list|群组信息响应|array|RoomResponse|
|&emsp;&emsp;&emsp;&emsp;id|群组ID|integer||
|&emsp;&emsp;&emsp;&emsp;name|群组名称|string||
|&emsp;&emsp;&emsp;&emsp;creatorId|创建者用户ID|integer||
|&emsp;&emsp;&emsp;&emsp;description|群组简介|string||
|&emsp;&emsp;&emsp;&emsp;avatar|群组头像URL|string||
|&emsp;&emsp;&emsp;&emsp;createdAt|创建时间|string||
|&emsp;&emsp;&emsp;&emsp;updatedAt|最后更新时间|string||
|&emsp;&emsp;&emsp;&emsp;memberCount|成员数量|integer||


**响应示例**:
```javascript
{
	"success": true,
	"errCode": 0,
	"errMsg": "",
	"data": {
		"cursor": 0,
		"isLast": true,
		"list": [
			{
				"id": 0,
				"name": "",
				"creatorId": 0,
				"description": "",
				"avatar": "",
				"createdAt": "",
				"updatedAt": "",
				"memberCount": 0
			}
		]
	}
}
```


**响应状态码-400**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|success|成功标识true or false|boolean||
|errCode|错误码|integer(int32)|integer(int32)|
|errMsg|错误消息|string||
|data|返回对象|object||


**响应示例**:
```javascript
{
	"success": true,
	"errCode": 0,
	"errMsg": "",
	"data": {}
}
```


**响应状态码-405**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|success|成功标识true or false|boolean||
|errCode|错误码|integer(int32)|integer(int32)|
|errMsg|错误消息|string||
|data|返回对象|object||


**响应示例**:
```javascript
{
	"success": true,
	"errCode": 0,
	"errMsg": "",
	"data": {}
}
```


**响应状态码-429**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|success|成功标识true or false|boolean||
|errCode|错误码|integer(int32)|integer(int32)|
|errMsg|错误消息|string||
|data|返回对象|object||


**响应示例**:
```javascript
{
	"success": true,
	"errCode": 0,
	"errMsg": "",
	"data": {}
}
```


**响应状态码-500**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|success|成功标识true or false|boolean||
|errCode|错误码|integer(int32)|integer(int32)|
|errMsg|错误消息|string||
|data|返回对象|object||


**响应示例**:
```javascript
{
	"success": true,
	"errCode": 0,
	"errMsg": "",
	"data": {}
}
```


# GroupMemberController


## 添加群组成员


**接口地址**:`/capi/groupMember`


**请求方式**:`POST`


**请求数据类型**:`application/x-www-form-urlencoded,application/json`


**响应数据类型**:`*/*`


**接口描述**:


**请求示例**:


```javascript
{
  "groupId": 0,
  "userIds": []
}
```


**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|roomMemberAddRequest|添加群组成员请求|body|true|RoomMemberAddRequest|RoomMemberAddRequest|
|&emsp;&emsp;groupId|群组ID||true|integer(int64)||
|&emsp;&emsp;userIds|要添加的用户ID列表||true|array|integer(int64)|


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|ApiResultVoid|
|400|Bad Request|ApiResult|
|405|Method Not Allowed|ApiResultVoid|
|429|Too Many Requests|ApiResultObject|
|500|Internal Server Error|ApiResult|


**响应状态码-200**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|success|成功标识true or false|boolean||
|errCode|错误码|integer(int32)|integer(int32)|
|errMsg|错误消息|string||
|data|返回对象|object||


**响应示例**:
```javascript
{
	"success": true,
	"errCode": 0,
	"errMsg": "",
	"data": {}
}
```


**响应状态码-400**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|success|成功标识true or false|boolean||
|errCode|错误码|integer(int32)|integer(int32)|
|errMsg|错误消息|string||
|data|返回对象|object||


**响应示例**:
```javascript
{
	"success": true,
	"errCode": 0,
	"errMsg": "",
	"data": {}
}
```


**响应状态码-405**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|success|成功标识true or false|boolean||
|errCode|错误码|integer(int32)|integer(int32)|
|errMsg|错误消息|string||
|data|返回对象|object||


**响应示例**:
```javascript
{
	"success": true,
	"errCode": 0,
	"errMsg": "",
	"data": {}
}
```


**响应状态码-429**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|success|成功标识true or false|boolean||
|errCode|错误码|integer(int32)|integer(int32)|
|errMsg|错误消息|string||
|data|返回对象|object||


**响应示例**:
```javascript
{
	"success": true,
	"errCode": 0,
	"errMsg": "",
	"data": {}
}
```


**响应状态码-500**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|success|成功标识true or false|boolean||
|errCode|错误码|integer(int32)|integer(int32)|
|errMsg|错误消息|string||
|data|返回对象|object||


**响应示例**:
```javascript
{
	"success": true,
	"errCode": 0,
	"errMsg": "",
	"data": {}
}
```


## 更新群组成员角色


**接口地址**:`/capi/groupMember`


**请求方式**:`PUT`


**请求数据类型**:`application/x-www-form-urlencoded,application/json`


**响应数据类型**:`*/*`


**接口描述**:


**请求示例**:


```javascript
{
  "groupId": 0,
  "userId": 0,
  "role": 0
}
```


**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|roomMemberUpdateRequest|更新群组成员角色请求|body|true|RoomMemberUpdateRequest|RoomMemberUpdateRequest|
|&emsp;&emsp;groupId|群组ID||true|integer(int64)||
|&emsp;&emsp;userId|要更新的用户ID||true|integer(int64)||
|&emsp;&emsp;role|新的角色类型||true|integer(int32)||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|ApiResultVoid|
|400|Bad Request|ApiResult|
|405|Method Not Allowed|ApiResultVoid|
|429|Too Many Requests|ApiResultObject|
|500|Internal Server Error|ApiResult|


**响应状态码-200**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|success|成功标识true or false|boolean||
|errCode|错误码|integer(int32)|integer(int32)|
|errMsg|错误消息|string||
|data|返回对象|object||


**响应示例**:
```javascript
{
	"success": true,
	"errCode": 0,
	"errMsg": "",
	"data": {}
}
```


**响应状态码-400**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|success|成功标识true or false|boolean||
|errCode|错误码|integer(int32)|integer(int32)|
|errMsg|错误消息|string||
|data|返回对象|object||


**响应示例**:
```javascript
{
	"success": true,
	"errCode": 0,
	"errMsg": "",
	"data": {}
}
```


**响应状态码-405**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|success|成功标识true or false|boolean||
|errCode|错误码|integer(int32)|integer(int32)|
|errMsg|错误消息|string||
|data|返回对象|object||


**响应示例**:
```javascript
{
	"success": true,
	"errCode": 0,
	"errMsg": "",
	"data": {}
}
```


**响应状态码-429**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|success|成功标识true or false|boolean||
|errCode|错误码|integer(int32)|integer(int32)|
|errMsg|错误消息|string||
|data|返回对象|object||


**响应示例**:
```javascript
{
	"success": true,
	"errCode": 0,
	"errMsg": "",
	"data": {}
}
```


**响应状态码-500**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|success|成功标识true or false|boolean||
|errCode|错误码|integer(int32)|integer(int32)|
|errMsg|错误消息|string||
|data|返回对象|object||


**响应示例**:
```javascript
{
	"success": true,
	"errCode": 0,
	"errMsg": "",
	"data": {}
}
```


## 移除群组成员


**接口地址**:`/capi/groupMember`


**请求方式**:`DELETE`


**请求数据类型**:`application/x-www-form-urlencoded,application/json`


**响应数据类型**:`*/*`


**接口描述**:


**请求示例**:


```javascript
{
  "groupId": 0,
  "userId": 0
}
```


**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|roomMemberRemoveRequest|移除群组成员请求|body|true|RoomMemberRemoveRequest|RoomMemberRemoveRequest|
|&emsp;&emsp;groupId|群组ID||true|integer(int64)||
|&emsp;&emsp;userId|要移除的用户ID||true|integer(int64)||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|ApiResultVoid|
|400|Bad Request|ApiResult|
|405|Method Not Allowed|ApiResultVoid|
|429|Too Many Requests|ApiResultObject|
|500|Internal Server Error|ApiResult|


**响应状态码-200**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|success|成功标识true or false|boolean||
|errCode|错误码|integer(int32)|integer(int32)|
|errMsg|错误消息|string||
|data|返回对象|object||


**响应示例**:
```javascript
{
	"success": true,
	"errCode": 0,
	"errMsg": "",
	"data": {}
}
```


**响应状态码-400**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|success|成功标识true or false|boolean||
|errCode|错误码|integer(int32)|integer(int32)|
|errMsg|错误消息|string||
|data|返回对象|object||


**响应示例**:
```javascript
{
	"success": true,
	"errCode": 0,
	"errMsg": "",
	"data": {}
}
```


**响应状态码-405**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|success|成功标识true or false|boolean||
|errCode|错误码|integer(int32)|integer(int32)|
|errMsg|错误消息|string||
|data|返回对象|object||


**响应示例**:
```javascript
{
	"success": true,
	"errCode": 0,
	"errMsg": "",
	"data": {}
}
```


**响应状态码-429**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|success|成功标识true or false|boolean||
|errCode|错误码|integer(int32)|integer(int32)|
|errMsg|错误消息|string||
|data|返回对象|object||


**响应示例**:
```javascript
{
	"success": true,
	"errCode": 0,
	"errMsg": "",
	"data": {}
}
```


**响应状态码-500**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|success|成功标识true or false|boolean||
|errCode|错误码|integer(int32)|integer(int32)|
|errMsg|错误消息|string||
|data|返回对象|object||


**响应示例**:
```javascript
{
	"success": true,
	"errCode": 0,
	"errMsg": "",
	"data": {}
}
```


## 分页获取群组成员列表


**接口地址**:`/capi/groupMember/page`


**请求方式**:`GET`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:


**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|request|群组成员分页请求|query|true|RoomMemberPageRequest|RoomMemberPageRequest|
|&emsp;&emsp;cursor|游标（上次翻页的最后一条记录的标识）||false|number(double)||
|&emsp;&emsp;pageSize|每页大小||false|integer(int32)||
|&emsp;&emsp;groupId|群组ID||true|integer(int64)||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|ApiResultCursorPageBaseResponseRoomMember|
|400|Bad Request|ApiResult|
|405|Method Not Allowed|ApiResultVoid|
|429|Too Many Requests|ApiResultObject|
|500|Internal Server Error|ApiResult|


**响应状态码-200**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|success|成功标识true or false|boolean||
|errCode|错误码|integer(int32)|integer(int32)|
|errMsg|错误消息|string||
|data||CursorPageBaseResponseRoomMember|CursorPageBaseResponseRoomMember|
|&emsp;&emsp;cursor|游标（下次翻页带上这参数）|number(double)||
|&emsp;&emsp;isLast|是否最后一页|boolean||
|&emsp;&emsp;list|数据列表|array|RoomMember|
|&emsp;&emsp;&emsp;&emsp;memberId|成员关系ID|integer||
|&emsp;&emsp;&emsp;&emsp;roomId|群组ID|integer||
|&emsp;&emsp;&emsp;&emsp;userId|用户ID|integer||
|&emsp;&emsp;&emsp;&emsp;nickname|群昵称|string||
|&emsp;&emsp;&emsp;&emsp;role|成员角色|integer||
|&emsp;&emsp;&emsp;&emsp;joinTime|加入时间|string||


**响应示例**:
```javascript
{
	"success": true,
	"errCode": 0,
	"errMsg": "",
	"data": {
		"cursor": 0,
		"isLast": true,
		"list": [
			{
				"memberId": 0,
				"roomId": 0,
				"userId": 0,
				"nickname": "",
				"role": 0,
				"joinTime": ""
			}
		]
	}
}
```


**响应状态码-400**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|success|成功标识true or false|boolean||
|errCode|错误码|integer(int32)|integer(int32)|
|errMsg|错误消息|string||
|data|返回对象|object||


**响应示例**:
```javascript
{
	"success": true,
	"errCode": 0,
	"errMsg": "",
	"data": {}
}
```


**响应状态码-405**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|success|成功标识true or false|boolean||
|errCode|错误码|integer(int32)|integer(int32)|
|errMsg|错误消息|string||
|data|返回对象|object||


**响应示例**:
```javascript
{
	"success": true,
	"errCode": 0,
	"errMsg": "",
	"data": {}
}
```


**响应状态码-429**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|success|成功标识true or false|boolean||
|errCode|错误码|integer(int32)|integer(int32)|
|errMsg|错误消息|string||
|data|返回对象|object||


**响应示例**:
```javascript
{
	"success": true,
	"errCode": 0,
	"errMsg": "",
	"data": {}
}
```


**响应状态码-500**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|success|成功标识true or false|boolean||
|errCode|错误码|integer(int32)|integer(int32)|
|errMsg|错误消息|string||
|data|返回对象|object||


**响应示例**:
```javascript
{
	"success": true,
	"errCode": 0,
	"errMsg": "",
	"data": {}
}
```


# UserController


## 获取指定用户信息


**接口地址**:`/capi/user/info/{id}`


**请求方式**:`GET`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:<p>获取指定用户信息</p>



**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|id||path|true|integer(int64)||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|ApiResultUserInfoResponse|
|400|Bad Request|ApiResult|
|405|Method Not Allowed|ApiResultVoid|
|429|Too Many Requests|ApiResultObject|
|500|Internal Server Error|ApiResult|


**响应状态码-200**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|success|成功标识true or false|boolean||
|errCode|错误码|integer(int32)|integer(int32)|
|errMsg|错误消息|string||
|data||UserInfoResponse|UserInfoResponse|
|&emsp;&emsp;userId|用户的uid，全局唯一|integer(int64)||
|&emsp;&emsp;username|用户名|string||
|&emsp;&emsp;avatar|头像的url|string||
|&emsp;&emsp;activeStatus|1在线 2离线|string(byte)||
|&emsp;&emsp;lastLoginTime|最后一次上下线时间|string(date-time)||


**响应示例**:
```javascript
{
	"success": true,
	"errCode": 0,
	"errMsg": "",
	"data": {
		"userId": 0,
		"username": "",
		"avatar": "",
		"activeStatus": "",
		"lastLoginTime": ""
	}
}
```


**响应状态码-400**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|success|成功标识true or false|boolean||
|errCode|错误码|integer(int32)|integer(int32)|
|errMsg|错误消息|string||
|data|返回对象|object||


**响应示例**:
```javascript
{
	"success": true,
	"errCode": 0,
	"errMsg": "",
	"data": {}
}
```


**响应状态码-405**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|success|成功标识true or false|boolean||
|errCode|错误码|integer(int32)|integer(int32)|
|errMsg|错误消息|string||
|data|返回对象|object||


**响应示例**:
```javascript
{
	"success": true,
	"errCode": 0,
	"errMsg": "",
	"data": {}
}
```


**响应状态码-429**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|success|成功标识true or false|boolean||
|errCode|错误码|integer(int32)|integer(int32)|
|errMsg|错误消息|string||
|data|返回对象|object||


**响应示例**:
```javascript
{
	"success": true,
	"errCode": 0,
	"errMsg": "",
	"data": {}
}
```


**响应状态码-500**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|success|成功标识true or false|boolean||
|errCode|错误码|integer(int32)|integer(int32)|
|errMsg|错误消息|string||
|data|返回对象|object||


**响应示例**:
```javascript
{
	"success": true,
	"errCode": 0,
	"errMsg": "",
	"data": {}
}
```


## 获取当前用户信息


**接口地址**:`/capi/user/info/me`


**请求方式**:`GET`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:<p>获取当前用户信息</p>



**请求参数**:


暂无


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|ApiResultUserInfoResponse|
|400|Bad Request|ApiResult|
|405|Method Not Allowed|ApiResultVoid|
|429|Too Many Requests|ApiResultObject|
|500|Internal Server Error|ApiResult|


**响应状态码-200**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|success|成功标识true or false|boolean||
|errCode|错误码|integer(int32)|integer(int32)|
|errMsg|错误消息|string||
|data||UserInfoResponse|UserInfoResponse|
|&emsp;&emsp;userId|用户的uid，全局唯一|integer(int64)||
|&emsp;&emsp;username|用户名|string||
|&emsp;&emsp;avatar|头像的url|string||
|&emsp;&emsp;activeStatus|1在线 2离线|string(byte)||
|&emsp;&emsp;lastLoginTime|最后一次上下线时间|string(date-time)||


**响应示例**:
```javascript
{
	"success": true,
	"errCode": 0,
	"errMsg": "",
	"data": {
		"userId": 0,
		"username": "",
		"avatar": "",
		"activeStatus": "",
		"lastLoginTime": ""
	}
}
```


**响应状态码-400**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|success|成功标识true or false|boolean||
|errCode|错误码|integer(int32)|integer(int32)|
|errMsg|错误消息|string||
|data|返回对象|object||


**响应示例**:
```javascript
{
	"success": true,
	"errCode": 0,
	"errMsg": "",
	"data": {}
}
```


**响应状态码-405**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|success|成功标识true or false|boolean||
|errCode|错误码|integer(int32)|integer(int32)|
|errMsg|错误消息|string||
|data|返回对象|object||


**响应示例**:
```javascript
{
	"success": true,
	"errCode": 0,
	"errMsg": "",
	"data": {}
}
```


**响应状态码-429**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|success|成功标识true or false|boolean||
|errCode|错误码|integer(int32)|integer(int32)|
|errMsg|错误消息|string||
|data|返回对象|object||


**响应示例**:
```javascript
{
	"success": true,
	"errCode": 0,
	"errMsg": "",
	"data": {}
}
```


**响应状态码-500**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|success|成功标识true or false|boolean||
|errCode|错误码|integer(int32)|integer(int32)|
|errMsg|错误消息|string||
|data|返回对象|object||


**响应示例**:
```javascript
{
	"success": true,
	"errCode": 0,
	"errMsg": "",
	"data": {}
}
```


## 用户登录


**接口地址**:`/capi/user/login`


**请求方式**:`POST`


**请求数据类型**:`application/x-www-form-urlencoded,application/json`


**响应数据类型**:`*/*`


**接口描述**:<p>用户登录接口 注意：后端返回的 token 不携带Bearer前缀</p>



**请求示例**:


```javascript
{
  "username": "",
  "password": ""
}
```


**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|userLoginRequest|UserLoginRequest|body|true|UserLoginRequest|UserLoginRequest|
|&emsp;&emsp;username|登录的用户名||true|string||
|&emsp;&emsp;password|登录的用户密码，进行了加密传输||true|string||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|ApiResultLoginInfoResponse|
|400|Bad Request|ApiResult|
|405|Method Not Allowed|ApiResultVoid|
|429|Too Many Requests|ApiResultObject|
|500|Internal Server Error|ApiResult|


**响应状态码-200**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|success|成功标识true or false|boolean||
|errCode|错误码|integer(int32)|integer(int32)|
|errMsg|错误消息|string||
|data||LoginInfoResponse|LoginInfoResponse|
|&emsp;&emsp;userId|用户的uid，全局唯一|integer(int64)||
|&emsp;&emsp;username|用户名|string||
|&emsp;&emsp;avatar|用户头像|string||
|&emsp;&emsp;activeStatus|1在线 2离线|integer(int32)||
|&emsp;&emsp;lastLoginTime|最后一次上下线时间|string(date-time)||
|&emsp;&emsp;accessToken|access_token 注意：后端返回的 token 不携带Bearer前缀|string||


**响应示例**:
```javascript
{
	"success": true,
	"errCode": 0,
	"errMsg": "",
	"data": {
		"userId": 0,
		"username": "",
		"avatar": "",
		"activeStatus": 0,
		"lastLoginTime": "",
		"accessToken": ""
	}
}
```


**响应状态码-400**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|success|成功标识true or false|boolean||
|errCode|错误码|integer(int32)|integer(int32)|
|errMsg|错误消息|string||
|data|返回对象|object||


**响应示例**:
```javascript
{
	"success": true,
	"errCode": 0,
	"errMsg": "",
	"data": {}
}
```


**响应状态码-405**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|success|成功标识true or false|boolean||
|errCode|错误码|integer(int32)|integer(int32)|
|errMsg|错误消息|string||
|data|返回对象|object||


**响应示例**:
```javascript
{
	"success": true,
	"errCode": 0,
	"errMsg": "",
	"data": {}
}
```


**响应状态码-429**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|success|成功标识true or false|boolean||
|errCode|错误码|integer(int32)|integer(int32)|
|errMsg|错误消息|string||
|data|返回对象|object||


**响应示例**:
```javascript
{
	"success": true,
	"errCode": 0,
	"errMsg": "",
	"data": {}
}
```


**响应状态码-500**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|success|成功标识true or false|boolean||
|errCode|错误码|integer(int32)|integer(int32)|
|errMsg|错误消息|string||
|data|返回对象|object||


**响应示例**:
```javascript
{
	"success": true,
	"errCode": 0,
	"errMsg": "",
	"data": {}
}
```


## 退出登录


**接口地址**:`/capi/user/logout`


**请求方式**:`GET`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:<p>退出登录</p>



**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|refresh_token||cookie|true|string||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|ApiResultVoid|
|400|Bad Request|ApiResult|
|405|Method Not Allowed|ApiResultVoid|
|429|Too Many Requests|ApiResultObject|
|500|Internal Server Error|ApiResult|


**响应状态码-200**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|success|成功标识true or false|boolean||
|errCode|错误码|integer(int32)|integer(int32)|
|errMsg|错误消息|string||
|data|返回对象|object||


**响应示例**:
```javascript
{
	"success": true,
	"errCode": 0,
	"errMsg": "",
	"data": {}
}
```


**响应状态码-400**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|success|成功标识true or false|boolean||
|errCode|错误码|integer(int32)|integer(int32)|
|errMsg|错误消息|string||
|data|返回对象|object||


**响应示例**:
```javascript
{
	"success": true,
	"errCode": 0,
	"errMsg": "",
	"data": {}
}
```


**响应状态码-405**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|success|成功标识true or false|boolean||
|errCode|错误码|integer(int32)|integer(int32)|
|errMsg|错误消息|string||
|data|返回对象|object||


**响应示例**:
```javascript
{
	"success": true,
	"errCode": 0,
	"errMsg": "",
	"data": {}
}
```


**响应状态码-429**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|success|成功标识true or false|boolean||
|errCode|错误码|integer(int32)|integer(int32)|
|errMsg|错误消息|string||
|data|返回对象|object||


**响应示例**:
```javascript
{
	"success": true,
	"errCode": 0,
	"errMsg": "",
	"data": {}
}
```


**响应状态码-500**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|success|成功标识true or false|boolean||
|errCode|错误码|integer(int32)|integer(int32)|
|errMsg|错误消息|string||
|data|返回对象|object||


**响应示例**:
```javascript
{
	"success": true,
	"errCode": 0,
	"errMsg": "",
	"data": {}
}
```


## 刷新token


**接口地址**:`/capi/user/refresh`


**请求方式**:`POST`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:<p>刷新token接口 注意：后端返回的 token 不携带Bearer前缀</p>



**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|refresh_token||cookie|true|string||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|ApiResultString|
|400|Bad Request|ApiResult|
|405|Method Not Allowed|ApiResultVoid|
|429|Too Many Requests|ApiResultObject|
|500|Internal Server Error|ApiResult|


**响应状态码-200**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|success|成功标识true or false|boolean||
|errCode|错误码|integer(int32)|integer(int32)|
|errMsg|错误消息|string||
|data|返回对象|string||


**响应示例**:
```javascript
{
	"success": true,
	"errCode": 0,
	"errMsg": "",
	"data": ""
}
```


**响应状态码-400**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|success|成功标识true or false|boolean||
|errCode|错误码|integer(int32)|integer(int32)|
|errMsg|错误消息|string||
|data|返回对象|object||


**响应示例**:
```javascript
{
	"success": true,
	"errCode": 0,
	"errMsg": "",
	"data": {}
}
```


**响应状态码-405**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|success|成功标识true or false|boolean||
|errCode|错误码|integer(int32)|integer(int32)|
|errMsg|错误消息|string||
|data|返回对象|object||


**响应示例**:
```javascript
{
	"success": true,
	"errCode": 0,
	"errMsg": "",
	"data": {}
}
```


**响应状态码-429**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|success|成功标识true or false|boolean||
|errCode|错误码|integer(int32)|integer(int32)|
|errMsg|错误消息|string||
|data|返回对象|object||


**响应示例**:
```javascript
{
	"success": true,
	"errCode": 0,
	"errMsg": "",
	"data": {}
}
```


**响应状态码-500**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|success|成功标识true or false|boolean||
|errCode|错误码|integer(int32)|integer(int32)|
|errMsg|错误消息|string||
|data|返回对象|object||


**响应示例**:
```javascript
{
	"success": true,
	"errCode": 0,
	"errMsg": "",
	"data": {}
}
```


## 用户注册


**接口地址**:`/capi/user/register`


**请求方式**:`POST`


**请求数据类型**:`application/x-www-form-urlencoded,application/json`


**响应数据类型**:`*/*`


**接口描述**:<p>用户注册接口</p>



**请求示例**:


```javascript
{
  "username": "",
  "password": ""
}
```


**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|userRegisterRequest|UserRegisterRequest|body|true|UserRegisterRequest|UserRegisterRequest|
|&emsp;&emsp;username|用户名||true|string||
|&emsp;&emsp;password|密码||true|string||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|ApiResultVoid|
|400|Bad Request|ApiResult|
|405|Method Not Allowed|ApiResultVoid|
|429|Too Many Requests|ApiResultObject|
|500|Internal Server Error|ApiResult|


**响应状态码-200**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|success|成功标识true or false|boolean||
|errCode|错误码|integer(int32)|integer(int32)|
|errMsg|错误消息|string||
|data|返回对象|object||


**响应示例**:
```javascript
{
	"success": true,
	"errCode": 0,
	"errMsg": "",
	"data": {}
}
```


**响应状态码-400**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|success|成功标识true or false|boolean||
|errCode|错误码|integer(int32)|integer(int32)|
|errMsg|错误消息|string||
|data|返回对象|object||


**响应示例**:
```javascript
{
	"success": true,
	"errCode": 0,
	"errMsg": "",
	"data": {}
}
```


**响应状态码-405**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|success|成功标识true or false|boolean||
|errCode|错误码|integer(int32)|integer(int32)|
|errMsg|错误消息|string||
|data|返回对象|object||


**响应示例**:
```javascript
{
	"success": true,
	"errCode": 0,
	"errMsg": "",
	"data": {}
}
```


**响应状态码-429**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|success|成功标识true or false|boolean||
|errCode|错误码|integer(int32)|integer(int32)|
|errMsg|错误消息|string||
|data|返回对象|object||


**响应示例**:
```javascript
{
	"success": true,
	"errCode": 0,
	"errMsg": "",
	"data": {}
}
```


**响应状态码-500**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|success|成功标识true or false|boolean||
|errCode|错误码|integer(int32)|integer(int32)|
|errMsg|错误消息|string||
|data|返回对象|object||


**响应示例**:
```javascript
{
	"success": true,
	"errCode": 0,
	"errMsg": "",
	"data": {}
}
```