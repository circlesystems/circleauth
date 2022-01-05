# CircleAuth.CircleAuthApi

All URIs are relative to *https://circleauth.gocircle.ai/api*

Method | HTTP request | Description
------------- | ------------- | -------------
[**create2FA**](CircleAuthApi.md#create2FA) | **POST** /2fa/create/ | Create 2FA
[**expireUserSession**](CircleAuthApi.md#expireUserSession) | **POST** user/session/expire | Expire User Session
[**getSession**](CircleAuthApi.md#getSession) | **GET** /session/ | Get Session
[**getUserSession**](CircleAuthApi.md#getUserSession) | **GET** user/session | Get User Session

<a name="create2FA"></a>
# **create2FA**
> Create2FAResponse create2FA(body, x_ua_appKey)

Create 2FA

This endpoint creates a new factor authorization URL.

### Example
```javascript
import {CircleAuth} from 'circleauth';

let apiInstance = new CircleAuth.CircleAuthApi();
let body = new CircleAuth.Create2FARequest(); // Create2FARequest | 
let x_ua_appKey = "x_ua_appKey_example"; // String | Application `appKey`

apiInstance.create2FA(body, x_ua_appKey).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **body** | [**Create2FARequest**](Create2FARequest.md)|  | 
 **x_ua_appKey** | **String**| Application &#x60;appKey&#x60; | 

### Return type

[**Create2FAResponse**](Create2FAResponse.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="expireUserSession"></a>
# **expireUserSession**
> ExpireUserSessionResponse expireUserSession(body, x_ua_appKey)

Expire User Session

### Example
```javascript
import {CircleAuth} from 'circleauth';

let apiInstance = new CircleAuth.CircleAuthApi();
let body = new CircleAuth.ExpireUserSessionRequest(); // ExpireUserSessionRequest | 
let x_ua_appKey = "x_ua_appKey_example"; // String | Application `appKey`

apiInstance.expireUserSession(body, x_ua_appKey).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **body** | [**ExpireUserSessionRequest**](ExpireUserSessionRequest.md)|  | 
 **x_ua_appKey** | **String**| Application &#x60;appKey&#x60; | 

### Return type

[**ExpireUserSessionResponse**](ExpireUserSessionResponse.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="getSession"></a>
# **getSession**
> GetSessionResponse getSession(x_ua_appKey, s, signature)

Get Session

### Example
```javascript
import {CircleAuth} from 'circleauth';

let apiInstance = new CircleAuth.CircleAuthApi();
let x_ua_appKey = "x_ua_appKey_example"; // String | Application `appKey`
let s = "s_example"; // String | `sessionID` to retrieve. This information comes from the [Login Authentication Return](#section/Login-Authentication) and [Factor Authentication Return](#section/Factor-Authentication).
let signature = "signature_example"; // String | [Signature](#section/Signature) generated from the Query string.

apiInstance.getSession(x_ua_appKey, s, signature).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **x_ua_appKey** | **String**| Application &#x60;appKey&#x60; | 
 **s** | **String**| &#x60;sessionID&#x60; to retrieve. This information comes from the [Login Authentication Return](#section/Login-Authentication) and [Factor Authentication Return](#section/Factor-Authentication). | 
 **signature** | **String**| [Signature](#section/Signature) generated from the Query string. | 

### Return type

[**GetSessionResponse**](GetSessionResponse.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a name="getUserSession"></a>
# **getUserSession**
> GetUserSessionResponse getUserSession(x_ua_appKey, sessionID, userID, signature)

Get User Session

### Example
```javascript
import {CircleAuth} from 'circleauth';

let apiInstance = new CircleAuth.CircleAuthApi();
let x_ua_appKey = "x_ua_appKey_example"; // String | Application `appKey`
let sessionID = "sessionID_example"; // String | `sessionID` to retrieve. This information comes from the [Login Authentication Return](#section/Login-Authentication) and [Factor Authentication Return](#section/Factor-Authentication).
let userID = "userID_example"; // String | `userID` to retrieve. This information comes from the [Login Authentication Return](#section/Login-Authentication) and [Factor Authentication Return](#section/Factor-Authentication).
let signature = "signature_example"; // String | [Signature](#section/Signature) generated from the Query string.

apiInstance.getUserSession(x_ua_appKey, sessionID, userID, signature).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **x_ua_appKey** | **String**| Application &#x60;appKey&#x60; | 
 **sessionID** | **String**| &#x60;sessionID&#x60; to retrieve. This information comes from the [Login Authentication Return](#section/Login-Authentication) and [Factor Authentication Return](#section/Factor-Authentication). | 
 **userID** | **String**| &#x60;userID&#x60; to retrieve. This information comes from the [Login Authentication Return](#section/Login-Authentication) and [Factor Authentication Return](#section/Factor-Authentication). | 
 **signature** | **String**| [Signature](#section/Signature) generated from the Query string. | 

### Return type

[**GetUserSessionResponse**](GetUserSessionResponse.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

