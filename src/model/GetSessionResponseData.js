/*
 * unicauth
 *  # Signature We use [digital signatures](https://en.wikipedia.org/wiki/Digital_signature) to avoid [man-in-the-middle attacks](https://en.wikipedia.org/wiki/Man-in-the-middle_attack), every call or response has a signature that can be validated to ensure the data came from the trusted part.  #### Read and Write Keys <p>These keys are used for signing and verifying the requests/responses. The <u>Write Key is used when you send</u>   information to the API, so the API is sure that you are making the request. The <u>Read Key is used to verify   the information received</u> from the API, so you can be sure that the information was not altered.</p>  #### Getting the Query String Data To generate a signature for the URL's Query String you need to get all the Query String starting from `?` and ignoring the final `&signature={signatureData}`.  Example:<br> ```https://unicauth.com/api/session/?s=session2qs3gABWMRwsFD7nhW5QndSYpmDpi18Ry&signature=Se8SkYSkrMegn9Ydea8aFKzygR037D3lLg5OxUwSSYg=```<br><br> For this URL the data to encode is:<br> ``` const dataToEncrypt = \"?s=session2qs3gABWMRwsFD7nhW5QndSYpmDpi18Ry\"; ``` <br>  #### Getting the JSON Data To generate a signature for the JSON you need to get all the information inside the ```data``` key. This data must not be formatted.  Example:<br> ```{\"data\":{\"returnUrl\":\"https://circleauth.gocircle.ai/demo/\",\"question\":\"Allow this operation?\",\"customID\":\"any-custom-data\",\"userID\":\"6a731465539d9ca2776fdeec709bce4ac5a420426a803b0dc937521352972b8b\"},\"signature\":\"7OQSfVnOzkvuyqtasb8J+q/3os/u85R3X1UoKQxtRRE=\"}```<br><br> For this URL the data to encode is:<br> ``` const dataToEncrypt = JSON.stringify(json.data); ``` <br>  #### Signing the Data After getting the data, you can generate the signature by using ```HMAC SHA256 Base64``` encoding like the Node.js example bellow: ``` const crypto = require('crypto');  // {key} Use writeKey when sending data to Circle Auth. Use readKey when reading data received from Circle Auth. const hash = crypto.createHmac('sha256', \"{key}\").update(dataToEncrypt).digest('base64'); ```  For more ```HMAC SHA256 Base64``` examples please visit [Joe Kampschmidt's Code](https://www.jokecamp.com/blog/examples-of-creating-base64-hashes-using-hmac-sha256-in-different-languages/) or [Google Maps URL Signing Samples](http://googlemaps.github.io/url-signing/index.html).<br> For online crypto testing you can visit [DevLang](https://www.devglan.com/online-tools/hmac-sha256-online) and use *Output Text Format* as *Base64*.  # Errors The API uses standard HTTP status codes to indicate the success or failure of the API call. The body of the response will be JSON in the following format: ``` {   \"error\": \"something went wrong\" } ```  # Login Authentication To authenticate using Circle Auth you can just open the `Login URL` provided to you when you create a new Application in our [Console](https://console.unicauth.com).<br> Here is one example of `Login URL`: ``` https://unicauth.com/login/app9KrRWQS9DjtpzNgWcbHNt68S7Y1DfUJJV ```  #### Data Return <section id=\"section-auth-return\">   <p class=\"mt-3\">After calling the <code>Login URL</code> and accepting the login on Circle Auth App, the page will be redirected to the <code>returnUrl</code> configured on our <a href=\"https://console.unicauth.com\">Console</a>.</p>   <p>Here is one example of a redirected URL:</p>   <div>     <div class=\"bd-clipboard\"><button type=\"button\" class=\"btn-clipboard\" title=\"\" data-bs-original-title=\"Copy to clipboard\">Copy</button></div>     <pre><code id=\"codeRedirectedUrl\" class=\"language-uri word-break\">https://circleauth.gocircle.ai/demo/?<span class=\"token tag\">userID</span>=<span class=\"token attr-value\">6a731465539d9ca2776fdeec709bce4ac5a420426a803b0dc937521352972b8b</span>&<span class=\"token tag\">sessionID</span>=<span class=\"token attr-value\">session2U6ZYCXhqdgB2RH7vrKF1iwox7arXiotC</span>&<span class=\"token tag\">authID</span>=<span class=\"token attr-value\">authRNozDyooWYpTQyvGpNdbtTRc9wESs96T</span>&<span class=\"token tag\">type</span>=<span class=\"token attr-value\">login</span>&<span class=\"token tag\">signature</span>=<span class=\"token attr-value\">toHO3MTtz6/W3sL8y20vRTMa90z/IwYCiGLacTLHE5c=</span></code></pre>   </div>    <h5 id=\"auth-validate-signature\" class=\"mt-5\">Validating the Signature<a class=\"anchorjs-link \" aria-label=\"Anchor\" data-anchorjs-icon=\"#\" href=\"#auth-validate-signature\"></a></h5>    <p class=\"mt-3\">This validation uses the data from the returned URL above and apply the code from the <a href=\"#section/Signature\">Signature</a> section.</p>   <div>   <div class=\"bd-clipboard\"><button type=\"button\" class=\"btn-clipboard\" title=\"\" data-bs-original-title=\"Copy to clipboard\">Copy</button></div>   <pre><code id=\"codeCheckSignature\" class=\"language-js\">var crypto = require('crypto'); // {readKey} Use your readKey available at Console. const hash = crypto.createHmac('sha256', '{readKey}')   .update('?userID=6a731465539d9ca2776fdeec709bce4ac5a420426a803b0dc937521352972b8b&sessionID=session2U6ZYCXhqdgB2RH7vrKF1iwox7arXiotC&authID=authRNozDyooWYpTQyvGpNdbtTRc9wESs96T&type=login')   .digest('base64'); //validate if signatures are equals if (hash === 'toHO3MTtz6/W3sL8y20vRTMa90z/IwYCiGLacTLHE5c=') {   //do your stuff }</code></pre>   </div> </section> <br><br>  #### Styling <section id=\"section-auth-styling\">   <p>Here are the styles to be used for the Circle Auth login button:</p>   <ul class=\"nav nav-tabs\" id=\"nav-tab\" role=\"tablist\">     <li class=\"nav-item\">       <a class=\"nav-link active\" id=\"nav-darktheme-tab\" data-toggle=\"tab\" href=\"#nav-darktheme\" role=\"tab\" aria-controls=\"nav-darktheme\" aria-selected=\"true\">Dark Theme</a>     </li>     <li class=\"nav-item\">       <a class=\"nav-link\" id=\"nav-lighttheme-tab\" data-toggle=\"tab\" href=\"#nav-lighttheme\" role=\"tab\" aria-controls=\"nav-lighttheme\" aria-selected=\"false\">Light Theme</a>     </li>   </ul>   <div class=\"tab-content\" id=\"nav-tabContent\">     <div class=\"tab-pane fade show active\" id=\"nav-darktheme\" role=\"tabpanel\" aria-labelledby=\"nav-darktheme-tab\">       <div class=\"bd-example\">         <button class=\"unicauth-ui-button unicauth-ui-button-dark\"><span class=\"unicauth-ui-icon-wrapper\"><img class=\"unicauth-ui-icon\" alt=\"\" src=\"https://circleauth.gocircle.ai/files/logo.svg\"></span><span class=\"unicauth-ui-text unicauth-ui-text-long\">Login with Circle Auth</span><span class=\"unicauth-ui-text unicauth-ui-text-short\">Circle Auth</span></button>       </div>       <div>         <div class=\"bd-clipboard\"><button type=\"button\" class=\"btn-clipboard\" title=\"\" data-bs-original-title=\"Copy to clipboard\">Copy</button></div>         <pre class=\"no-gap\"><code class=\"language-markup line-break\"><xmp><button class=\"unicauth-ui-button unicauth-ui-button-dark\"><span class=\"unicauth-ui-icon-wrapper\"><img class=\"unicauth-ui-icon\" alt=\"\" src=\"https://circleauth.gocircle.ai/files/logo.svg\"></span><span class=\"unicauth-ui-text unicauth-ui-text-long\">Login with Circle Auth</span><span class=\"unicauth-ui-text unicauth-ui-text-short\">Circle Auth</span></button></xmp></code></pre>       </div>     </div>     <div class=\"tab-pane fade\" id=\"nav-lighttheme\" role=\"tabpanel\" aria-labelledby=\"nav-lighttheme-tab\">       <div class=\"bd-example\">         <button class=\"unicauth-ui-button unicauth-ui-button-light\"><span class=\"unicauth-ui-icon-wrapper\"><img class=\"unicauth-ui-icon\" alt=\"\" src=\"https://circleauth.gocircle.ai/files/logo.svg\"></span><span class=\"unicauth-ui-text unicauth-ui-text-long\">Login with Circle Auth</span><span class=\"unicauth-ui-text unicauth-ui-text-short\">Circle Auth</span></button>       </div>       <div>         <div class=\"bd-clipboard\"><button type=\"button\" class=\"btn-clipboard\" title=\"\" data-bs-original-title=\"Copy to clipboard\">Copy</button></div>         <pre class=\"no-gap\"><code class=\"language-markup line-break\"><xmp><button class=\"unicauth-ui-button unicauth-ui-button-light\"><span class=\"unicauth-ui-icon-wrapper\"><img class=\"unicauth-ui-icon\" alt=\"\" src=\"https://circleauth.gocircle.ai/files/logo.svg\"></span><span class=\"unicauth-ui-text unicauth-ui-text-long\">Login with Circle Auth</span><span class=\"unicauth-ui-text unicauth-ui-text-short\">Circle Auth</span></button></xmp></code></pre>       </div>     </div>   </div>   <p>The styles used in these examples can be found <a href=\"../demo/files/unicauth-ui.css\">here</a>.</p> </section>  # Factor Authentication The call to authenticate the factor is similar to the [Login Authenticatication](#section/Login-Authentication), but you have to use the `data.factorUrl` returned from the [2FA creation](#operation/Create2FA).  ##### Calling the `factorUrl` After creating the factor authentication, you will receive the `factorUrl` to be opened by the user for his acceptance.<br>  ##### Data Return After the user accepts the factor authentication on Circle Auth App, the page will be redirected to the `returnUrl` with the [parameters](#operation/2FAWebhook) (check the [2FA creation](#operation/Create2FA) section for the `returnUrl` creation). <p>Here is one example of the redirected URL:</p> <div>   <div class=\"bd-clipboard\"><button type=\"button\" class=\"btn-clipboard\" title=\"\" data-bs-original-title=\"Copy to clipboard\">Copy</button></div>   <pre><code id=\"codeRedirectedUrl2fa\" class=\"language-uri word-break\">https://circleauth.gocircle.ai/demo/?<span class=\"token tag\">userID</span>=<span class=\"token attr-value\">6a731465539d9ca2776fdeec709bce4ac5a420426a803b0dc937521352972b8b</span>&<span class=\"token tag\">sessionID</span>=<span class=\"token attr-value\">session5mCrfGYEW7zJ68i7zwUhBuBxNiYpABobw</span>&<span class=\"token tag\">authID</span>=<span class=\"token attr-value\">authPT9zzReqtp5Sq4ogEaNmP1tsrtm1ssmsQ</span>&<span class=\"token tag\">type</span>=<span class=\"token attr-value\">twoFactor</span>&<span class=\"token tag\">customID</span>=<span class=\"token attr-value\">any-custom-data</span>&<span class=\"token tag\">signature</span>=<span class=\"token attr-value\">69XzMPOPuAStHcMJub4LaC56u8cnYyiZH+C7cteIed0=</span></code></pre> </div> <p></p> 
 *
 * OpenAPI spec version: 1.0.0
 * Contact: info@unicauth.com
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 *
 * Swagger Codegen version: 3.0.26
 *
 * Do not edit the class manually.
 *
 */
import {
  ApiClient
} from '../ApiClient';

/**
 * The GetSessionResponseData model module.
 * @module model/GetSessionResponseData
 * @version 1.0.0
 */
export class GetSessionResponseData {
  /**
   * Constructs a new <code>GetSessionResponseData</code>.
   * @alias module:model/GetSessionResponseData
   * @class
   * @param authID {String} 
   * @param miliUnixtime {Number} 
   * @param returnUrl {String} 
   * @param sessionID {String} 
   * @param type {module:model/GetSessionResponseData.TypeEnum} 
   * @param userID {String} 
   * @param adminUserID {Boolean}
   * @param denyAuthorize {Boolean}
   * @param email {Boolean}
   * @param phone {Boolean}
   * @param userHashedEmails {Array.<String>}
   */
  constructor(authID, miliUnixtime, returnUrl, sessionID, type, userID, adminUserID, denyAuthorize, email, phone, userHashedEmails) {
    this.authID = authID;
    this.miliUnixtime = miliUnixtime;
    this.returnUrl = returnUrl;
    this.sessionID = sessionID;
    this.type = type;
    this.userID = userID;
    this.adminUserID = adminUserID;
    this.denyAuthorize = denyAuthorize;
    this.email = email;
    this.phone = phone;
    this.userHashedEmails = userHashedEmails;
  }

  /**
   * Constructs a <code>GetSessionResponseData</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/GetSessionResponseData} obj Optional instance to populate.
   * @return {module:model/GetSessionResponseData} The populated <code>GetSessionResponseData</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new GetSessionResponseData();
      if (data.hasOwnProperty('authID'))
        obj.authID = ApiClient.convertToType(data['authID'], 'String');
      if (data.hasOwnProperty('miliUnixtime'))
        obj.miliUnixtime = ApiClient.convertToType(data['miliUnixtime'], 'Number');
      if (data.hasOwnProperty('returnUrl'))
        obj.returnUrl = ApiClient.convertToType(data['returnUrl'], 'String');
      if (data.hasOwnProperty('sessionID'))
        obj.sessionID = ApiClient.convertToType(data['sessionID'], 'String');
      if (data.hasOwnProperty('type'))
        obj.type = ApiClient.convertToType(data['type'], 'String');
      if (data.hasOwnProperty('userID'))
        obj.userID = ApiClient.convertToType(data['userID'], 'String');
      if (data.hasOwnProperty('adminUserID'))
        obj.adminUserID = ApiClient.convertToType(data['adminUserID'], 'Boolean');
      if (data.hasOwnProperty('denyAuthorize'))
        obj.denyAuthorize = ApiClient.convertToType(data['denyAuthorize'], 'Boolean');
      if (data.hasOwnProperty('email'))
        obj.email = ApiClient.convertToType(data['email'], 'Boolean');
      if (data.hasOwnProperty('phone'))
        obj.phone = ApiClient.convertToType(data['phone'], 'Boolean');
      if (data.hasOwnProperty('userHashedEmails'))
        obj.userHashedEmails = ApiClient.convertToType(data['userHashedEmails'], ['String']);
    }
    return obj;
  }
}

/**
 * @member {String} authID
 */
GetSessionResponseData.prototype.authID = undefined;

/**
 * @member {Number} miliUnixtime
 */
GetSessionResponseData.prototype.miliUnixtime = undefined;

/**
 * @member {String} returnUrl
 */
GetSessionResponseData.prototype.returnUrl = undefined;

/**
 * @member {String} sessionID
 */
GetSessionResponseData.prototype.sessionID = undefined;

/**
 * @member {Boolean} adminUserID
 */
GetSessionResponseData.prototype.adminUserID = undefined;

/**
 * @member {Boolean} denyAuthorize
 */
GetSessionResponseData.prototype.denyAuthorize = undefined;

/**
 * @member {Boolean} email
 */
GetSessionResponseData.prototype.email = undefined;

/**
 * @member {Boolean} phone
 */
GetSessionResponseData.prototype.phone = undefined;

/**
 * @member {Array.<String>} phone
 */
GetSessionResponseData.prototype.userHashedEmails = undefined;

/**
 * Allowed values for the <code>type</code> property.
 * @enum {String}
 * @readonly
 */
GetSessionResponseData.TypeEnum = {
  /**
   * value: "login"
   * @const
   */
  login: "login",

  /**
   * value: "twoFactor"
   * @const
   */
  twoFactor: "twoFactor",

  /**
   * value: "authorization"
   * @const
   */
  authorization: "authorization"

};
/**
 * @member {module:model/GetSessionResponseData.TypeEnum} type
 */
GetSessionResponseData.prototype.type = undefined;

/**
 * @member {String} userID
 */
GetSessionResponseData.prototype.userID = undefined;