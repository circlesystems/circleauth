# Unicauth.Create2FAResponse

## Properties
Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**data** | [**Model2FAResponseData**](Model2FAResponseData.md) |  | 
**signature** | **String** | This signature can be obtained by getting the content from &#x60;data&#x60; as a not formatted string then generate a &#x60;HMAC SHA256 Base64&#x60; encoded data. To see some example e more explanations, please check the [Signature](#section/Signature) section. | 
