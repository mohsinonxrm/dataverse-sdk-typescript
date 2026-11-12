---
"@mohsinonxrm/dataverse-sdk-actions": minor
"@mohsinonxrm/dataverse-sdk-functions": minor
"@mohsinonxrm/dataverse-sdk-messages": minor
---

The CSDL enums (`AttributeTypeCode`, `EntityFilters`, `AccessRights`, …) are const objects and a type of the same name instead of TypeScript `enum`s (#479). The values are the same numbers in 2.x, so `AttributeTypeCode.String`, `x: AttributeTypeCode` and `EntityFilters.Entity | EntityFilters.Attributes` compile and are sent exactly as before; a parameter still takes the member name too (`"Entity"`). A flags enum (`IsFlags="true"`, such as `EntityFilters` and `AccessRights`) is typed `number`; another enum's type is the union of its values.

What no longer works: the reverse mapping (`AttributeTypeCode[14]` to get `"String"`), and assigning a plain `number` that isn't a member to a non-flags enum type. In 3.0 the values become the member names, which the Web API reads and writes (as the metadata package's enums already are).
