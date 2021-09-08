# Unic Auth

UnicAuth - Node.js client

Unic Auth allows you to quickly implement userless/passwordless login and 2FA (no more paying for SMS to have 2FA)
<br>

This SDK is generated for [Unic Auth API](https://unicauth.com/alpha/docs/files/unicauth.yaml) version: 1.0.0

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
var unicauth = require('unicauth');

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

## Signature
We use [digital signatures](https://en.wikipedia.org/wiki/Digital_signature) to avoid [man-in-the-middle attacks](https://en.wikipedia.org/wiki/Man-in-the-middle_attack), every call or response has a signature that can be validated to ensure the data came from the trusted part.

#### Read and Write Keys
<p>These keys are used for signing and verifying the requests/responses. The <u>Write Key is used when you send</u>
  information to the API, so the API is sure that you are making the request. The <u>Read Key is used to verify
  the information received</u> from the API, so you can be sure that the information was not altered.</p>

#### Getting the Query String Data
To generate a signature for the URL's Query String you need to get all the Query String starting from `?` and ignoring the final `&signature={signatureData}`.

Example:<br>
```https://unicauth.com/api/session/?s=session2qs3gABWMRwsFD7nhW5QndSYpmDpi18Ry&signature=Se8SkYSkrMegn9Ydea8aFKzygR037D3lLg5OxUwSSYg=```<br><br>
For this URL the data to encode is:<br>
```
const dataToEncrypt = "?s=session2qs3gABWMRwsFD7nhW5QndSYpmDpi18Ry";
```
<br>

#### Getting the JSON Data
To generate a signature for the JSON you need to get all the information inside the ```data``` key. This data must not be formatted.

Example:<br>
```{"data":{"returnUrl":"https://unicauth.com/alpha/demo/","question":"Allow this operation?","customID":"any-custom-data","userID":"6a731465539d9ca2776fdeec709bce4ac5a420426a803b0dc937521352972b8b"},"signature":"7OQSfVnOzkvuyqtasb8J+q/3os/u85R3X1UoKQxtRRE="}```<br><br>
For this URL the data to encode is:<br>
```
const dataToEncrypt = JSON.stringify(json.data);
```
<br>

#### Signing the Data
After getting the data, you can generate the signature by using ```HMAC SHA256 Base64``` encoding like the Node.js example bellow:
```
const crypto = require('crypto');

// {key} Use writeKey when sending data to Unic Auth. Use readKey when reading data received from Unic Auth.
const hash = crypto.createHmac('sha256', "{key}").update(dataToEncrypt).digest('base64');
```

For more ```HMAC SHA256 Base64``` examples please visit [Joe Kampschmidt's Code](https://www.jokecamp.com/blog/examples-of-creating-base64-hashes-using-hmac-sha256-in-different-languages/) or [Google Maps URL Signing Samples](http://googlemaps.github.io/url-signing/index.html).<br>
For online crypto testing you can visit [DevLang](https://www.devglan.com/online-tools/hmac-sha256-online) and use *Output Text Format* as *Base64*.

## Errors
The API uses standard HTTP status codes to indicate the success or failure of the API call. The body of the response will be JSON in the following format:
```
{
  "error": "something went wrong"
}
```

## Login Authentication
To authenticate using Unic Auth you can just open the `Login URL` provided to you when you create a new Application in our [Console](https://console.unicauth.com).<br>
Here is one example of `Login URL`:
```
https://unicauth.com/login/app9KrRWQS9DjtpzNgWcbHNt68S7Y1DfUJJV
```

#### Data Return
<section id="section-auth-return">
  <p class="mt-3">After calling the <code>Login URL</code> and accepting the login on Unic Auth App, the page will be redirected to the <code>returnUrl</code> configured on our <a href="https://console.unicauth.com">Console</a>.</p>
  <p>Here is one example of a redirected URL:</p>
  <div>
    <pre><code id="codeRedirectedUrl" class="language-uri word-break">https://unicauth.com/alpha/demo/?<span class="token tag">userID</span>=<span class="token attr-value">6a731465539d9ca2776fdeec709bce4ac5a420426a803b0dc937521352972b8b</span>&<span class="token tag">sessionID</span>=<span class="token attr-value">session2U6ZYCXhqdgB2RH7vrKF1iwox7arXiotC</span>&<span class="token tag">authID</span>=<span class="token attr-value">authRNozDyooWYpTQyvGpNdbtTRc9wESs96T</span>&<span class="token tag">type</span>=<span class="token attr-value">login</span>&<span class="token tag">signature</span>=<span class="token attr-value">toHO3MTtz6/W3sL8y20vRTMa90z/IwYCiGLacTLHE5c=</span></code></pre>
  </div>

  <h5 id="auth-validate-signature" class="mt-5">Validating the Signature<a class="anchorjs-link " aria-label="Anchor" data-anchorjs-icon="#" href="#auth-validate-signature"></a></h5>

  <p class="mt-3">This validation uses the data from the returned URL above and apply the code from the <a href="#section/Signature">Signature</a> section.</p>
  <div>
  <pre><code id="codeCheckSignature" class="language-js">var crypto = require('crypto');
// {readKey} Use your readKey available at Console.
const hash = crypto.createHmac('sha256', '{readKey}')
  .update('?userID=6a731465539d9ca2776fdeec709bce4ac5a420426a803b0dc937521352972b8b&sessionID=session2U6ZYCXhqdgB2RH7vrKF1iwox7arXiotC&authID=authRNozDyooWYpTQyvGpNdbtTRc9wESs96T&type=login')
  .digest('base64');
//validate if signatures are equals
if (hash === 'toHO3MTtz6/W3sL8y20vRTMa90z/IwYCiGLacTLHE5c=') {
  //do your stuff
}</code></pre>
  </div>
</section>
<br><br>

## Factor Authentication
The call to authenticate the factor is similar to the [Login Authenticatication](#section/Login-Authentication), but you have to use the `data.factorUrl` returned from the [2FA creation](#operation/Create2FA).

##### Calling the `factorUrl`
After creating the factor authentication, you will receive the `factorUrl` to be opened by the user for his acceptance.<br>

##### Data Return
After the user accepts the factor authentication on Unic Auth App, the page will be redirected to the `returnUrl` with the [parameters](#operation/2FAWebhook) (check the [2FA creation](#operation/Create2FA) section for the `returnUrl` creation).
<p>Here is one example of the redirected URL:</p>
<div>
  <pre><code id="codeRedirectedUrl2fa" class="language-uri word-break">https://unicauth.com/alpha/demo/?<span class="token tag">userID</span>=<span class="token attr-value">6a731465539d9ca2776fdeec709bce4ac5a420426a803b0dc937521352972b8b</span>&<span class="token tag">sessionID</span>=<span class="token attr-value">session5mCrfGYEW7zJ68i7zwUhBuBxNiYpABobw</span>&<span class="token tag">authID</span>=<span class="token attr-value">authPT9zzReqtp5Sq4ogEaNmP1tsrtm1ssmsQ</span>&<span class="token tag">type</span>=<span class="token attr-value">twoFactor</span>&<span class="token tag">customID</span>=<span class="token attr-value">any-custom-data</span>&<span class="token tag">signature</span>=<span class="token attr-value">69XzMPOPuAStHcMJub4LaC56u8cnYyiZH+C7cteIed0=</span></code></pre>
</div>
<p></p>
