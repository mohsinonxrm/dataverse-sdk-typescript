---
"@mohsinonxrm/dataverse-sdk-actions": minor
"@mohsinonxrm/dataverse-sdk-functions": minor
"@mohsinonxrm/dataverse-sdk-messages": minor
---

Generated types follow the CSDL `Nullable` default and type base-typed parameters with `@odata.type` (#73).

- Complex-type and entity-type properties are optional unless the CSDL marks them `Nullable="false"`. Before, every property was required, so a `QueryExpression`, `ColumnSet` or `PagingInfo` needed every field (or a cast).
- A type with a generated base type extends it (`QueryExpression extends QueryBase`, `StringAttributeMetadata extends AttributeMetadata`, `email extends activitypointer`).
- A base type also gets a `Typed<Name>` union of its concrete types, each with a required `"@odata.type"` literal (`TypedQueryBase`, `TypedActivitypointer`, `TypedAttributeMetadata`, …). Parameters declared with a base type use it: `QueryExpressionToFetchXml`, `BackgroundSendEmail`, `BulkDetectDuplicates`, `FullTextSearchKnowledgeArticle`, `PropagateByExpression`, `SendBulkMail` and `Validate` (actions and messages) and the `Rollup` function. Dataverse rejects these values without `@odata.type` (HTTP 400), so the compiler now requires it.
