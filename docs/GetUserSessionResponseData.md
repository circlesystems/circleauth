# Unicauth.GetUserSessionResponseData

## Properties
Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**sessionID** | **String** |  | 
**userID** | **String** |  | 
**startAt** | **Number** | Unixtime in milliseconds | 
**status** | **String** | &#x60;usedOnce&#x60; will return only for the first [Factor Authentication](#section/Factor-Authentication), after that the session will automatically expire.  | 
**expiredAt** | **Number** | Unixtime in milliseconds. Only sent when the &#x60;status&#x60; value is &#x60;expired&#x60;. | [optional] 

<a name="StatusEnum"></a>
## Enum: StatusEnum

* `active` (value: `"active"`)
* `usedOnce` (value: `"usedOnce"`)
* `expired` (value: `"expired"`)

