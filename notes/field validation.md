## validateFields ( Object fields, Object fieldData )

* If required field, check if in `fields`
* Check if field is proper type (number or string)
* If number, check if value is at least `min`
* If number, check if value is no greater than `max`
* If string, check if length is at least `min`
* If string, check if length is no greater than `max`


#### Errors

ERR_NONE
ERR_REQUIRED
ERR_WRONG_TYPE
ERR_TOO_LOW
ERR_TOO_HIGH


#### fieldData

```js
{
	fieldName:
	{
		type: FIELD_TYPE_STR,

		required: true,

		min: 1,
		max: 32,

		defaultValue: 'Some default value',
	},
}
```
