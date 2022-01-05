# Circle Auth

Circle Auth - Node.js client for [Circle Auth API](https://circleauth.gocircle.ai/docs/)
<br>

Circle Auth allows you to quickly implement userless/passwordless login and 2FA (no more paying for SMS to have 2FA)
<br>

We recommend using our [Circle Auth Wrapper](https://github.com/circlesystems/circleauth-wrapper) instead of this module.

## Installation

First make sure to get your credentials on [Circle Auth Console](https://console.gocircle.ai/), if you want to test first, use [Circle Auth - Demo](https://circleauth.gocircle.ai/demo)

### For [Node.js](https://nodejs.org/)

#### npm

Install it via:

```shell
npm install @circlesystems/circleauth --save
```

## Getting Started

Please follow the [installation](#installation) instruction and execute the following JS code:

```javascript
var circleauth = require('@circlesystems/circleauth');

var api = new circleauth.CircleAuthApi()
var body = new circleauth.Create2FARequest(); // {Create2FARequest} 
var x_ua_appKey = "x_ua_appKey_example"; // {String} Application `appKey`

api.create2FA(body, x_ua_appKey).then(function(data) {
  console.log('API called successfully. Returned data: ' + data);
}, function(error) {
  console.error(error);
});

```

## Documentation for API Endpoints

All URIs are relative to *https://circleauth.gocircle.ai/api*

Class | Method | HTTP request | Description
------------ | ------------- | ------------- | -------------
*CircleAuth.CircleAuthApi* | [**create2FA**](docs/CircleAuthApi.md#create2FA) | **POST** /2fa/create/ | Create 2FA
*CircleAuth.CircleAuthApi* | [**expireUserSession**](docs/CircleAuthApi.md#expireUserSession) | **POST** user/session/expire | Expire User Session
*CircleAuth.CircleAuthApi* | [**getSession**](docs/CircleAuthApi.md#getSession) | **GET** /session/ | Get Session
*CircleAuth.CircleAuthApi* | [**getUserSession**](docs/CircleAuthApi.md#getUserSession) | **GET** user/session | Get User Session

## Documentation for Models

 - [CircleAuth.Create2FARequest](docs/Create2FARequest.md)
 - [CircleAuth.Create2FAResponse](docs/Create2FAResponse.md)
 - [CircleAuth.ExpireUserSessionRequest](docs/ExpireUserSessionRequest.md)
 - [CircleAuth.ExpireUserSessionRequestData](docs/ExpireUserSessionRequestData.md)
 - [CircleAuth.ExpireUserSessionResponse](docs/ExpireUserSessionResponse.md)
 - [CircleAuth.ExpireUserSessionResponseData](docs/ExpireUserSessionResponseData.md)
 - [CircleAuth.GetSessionResponse](docs/GetSessionResponse.md)
 - [CircleAuth.GetSessionResponseData](docs/GetSessionResponseData.md)
 - [CircleAuth.GetUserSessionResponse](docs/GetUserSessionResponse.md)
 - [CircleAuth.GetUserSessionResponseData](docs/GetUserSessionResponseData.md)
 - [CircleAuth.Model2FARequestData](docs/Model2FARequestData.md)
 - [CircleAuth.Model2FAResponseData](docs/Model2FAResponseData.md)
 - [CircleAuth.ResponseError](docs/ResponseError.md)


## Distribuition

1.  Update package `version` at `package.json`.
2.  Open terminal and run `npm publish`.
3.  Visit https://www.npmjs.com/package/@circlesystems/cicleauth to check latest version.
