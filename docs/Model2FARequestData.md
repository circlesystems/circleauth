# CircleAuth.Model2FARequestData

## Properties
Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**customID** | **String** | The customID parameter can be anything to track back to your system. Example: &#x60;session-123&#x60; | 
**returnUrl** | **String** | The return URL that will be used for redirection when the 2FA is accepted. | 
**webhookUrl** | **String** | Webhook URL to send data when 2FA is accepted. Check out [2FA Webhook](#operation/2FAWebhook) for request specification. | [optional] 
**phone** | **String** | The phone number that you want the acceptance of the question. &lt;br&gt;Must start with &#x60;+&#x60; (plus sign) and the country code. &lt;br&gt;You cannot send the &#x60;email&#x60; and the &#x60;phone&#x60;, you have to send one or another. | [optional] 
**email** | **String** | The e-mail address that you want the acceptance of the question. &lt;br&gt;You cannot send the &#x60;email&#x60; and the &#x60;phone&#x60;, you have to send one or another. | [optional] 
**question** | **String** | This is the question you will make to the user. Example: &#x60;Confirm 1 BTC withdrawal?&#x60; | 
**userID** | **String** | The userID that you want the acceptance of the question. &lt;br&gt;If the user that scans the code is not the same as this &#x60;userID&#x60;, he will not be able to accept your question. &lt;br&gt;You don&#x27;t need this parameter if you use the &#x60;email&#x60; or &#x60;phone&#x60;. But if you add this parameter, both checks (&#x60;userID&#x60; plus &#x60;email&#x60;/&#x60;phone&#x60;) will happen. | [optional] 
**mobileReturnUrl** | **String** | This URL, with the [same parameters](#operation/2FAWebhook) as the &#x60;returnUrl&#x60; or &#x60;webhookUrl&#x60;, will be triggered by the user&#x27;s app after his factor acceptance. This is usually done when making an app-to-app call. You can use, for example, &#x60;your_app://path&#x60; (Deep Link). | [optional] 
