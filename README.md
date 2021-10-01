# Unic Auth

Unic Auth - Node.js client for [Unic Auth API](https://unicauth.com/alpha/docs/)
<br>

Unic Auth allows you to quickly implement userless/passwordless login and 2FA (no more paying for SMS to have 2FA)
<br>

We recommend using our [Unic Auth Wrapper](https://github.com/habloapp/unicauth-wrapper) instead of this module.

## Installation

First make sure to get your credentials on [Unic Auth](https://console.unicauth.com/), if you want to test first, use [Unic Auth - Demo](https://unicauth.com/demo)

### For [Node.js](https://nodejs.org/)

#### npm

Install it via:

```shell
npm install @habloapp/unicauth --save
```

## Getting Started

Please follow the [installation](#installation) instruction and execute the following JS code:

```javascript
var unicauth = require('@habloapp/unicauth');

var api = new unicauth.UnicAuthApi()
var body = new unicauth.Create2FARequest(); // {Create2FARequest} 
var x_ua_appKey = "x_ua_appKey_example"; // {String} Application `appKey`

api.create2FA(body, x_ua_appKey).then(function(data) {
  console.log('API called successfully. Returned data: ' + data);
}, function(error) {
  console.error(error);
});

```

## Documentation for API Endpoints

All URIs are relative to *https://unicauth.com/api*

Class | Method | HTTP request | Description
------------ | ------------- | ------------- | -------------
*Unicauth.UnicAuthApi* | [**create2FA**](docs/UnicAuthApi.md#create2FA) | **POST** /2fa/create/ | Create 2FA
*Unicauth.UnicAuthApi* | [**expireUserSession**](docs/UnicAuthApi.md#expireUserSession) | **POST** user/session/expire | Expire User Session
*Unicauth.UnicAuthApi* | [**getSession**](docs/UnicAuthApi.md#getSession) | **GET** /session/ | Get Session
*Unicauth.UnicAuthApi* | [**getUserSession**](docs/UnicAuthApi.md#getUserSession) | **GET** user/session | Get User Session

## Documentation for Models

 - [Unicauth.Create2FARequest](docs/Create2FARequest.md)
 - [Unicauth.Create2FAResponse](docs/Create2FAResponse.md)
 - [Unicauth.ExpireUserSessionRequest](docs/ExpireUserSessionRequest.md)
 - [Unicauth.ExpireUserSessionRequestData](docs/ExpireUserSessionRequestData.md)
 - [Unicauth.ExpireUserSessionResponse](docs/ExpireUserSessionResponse.md)
 - [Unicauth.ExpireUserSessionResponseData](docs/ExpireUserSessionResponseData.md)
 - [Unicauth.GetSessionResponse](docs/GetSessionResponse.md)
 - [Unicauth.GetSessionResponseData](docs/GetSessionResponseData.md)
 - [Unicauth.GetUserSessionResponse](docs/GetUserSessionResponse.md)
 - [Unicauth.GetUserSessionResponseData](docs/GetUserSessionResponseData.md)
 - [Unicauth.Model2FARequestData](docs/Model2FARequestData.md)
 - [Unicauth.Model2FAResponseData](docs/Model2FAResponseData.md)
 - [Unicauth.ResponseError](docs/ResponseError.md)


## Distribuition

1.  Update package `version` at `package.json`.
2.  Open terminal and run `npm publish`.
3.  Visit https://www.npmjs.com/package/@habloapp/unicauth to check latest version.