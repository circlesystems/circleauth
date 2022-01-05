# CircleAuth.Create2FARequest

## Properties
Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**data** | [**Model2FARequestData**](Model2FARequestData.md) |  | 
**signature** | **String** | This signature can be obtained by getting the content from the &#x60;data&#x60; then generate a &#x60;HMAC SHA256 Base64&#x60; encoded data. Please check the [Signature](#section/Signature) section. | 
