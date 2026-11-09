# @mohsinonxrm/dataverse-sdk-metadata

## 2.0.0

### Major Changes

- 5d6a139: **Breaking.** Metadata updates take the complete definition, and every merge helper reads the latest one (#359).

  - **Full definitions.** A metadata update is a `PUT` that replaces the definition, so a property left out is reset to its default. `updateAttributeDefinition`, `updateGlobalOptionSet`, `updateEntityDefinition`, `updateOneToManyRelationship` and `updateManyToManyRelationship` now take the complete definition with `@odata.type` required: `AttributeMetadataUpdateTypes` (a union discriminated on `@odata.type`, replacing `Partial<AttributeMetadataCreateTypes>`), the new `OptionSetMetadataUpdate` (replacing `Partial<OptionSetMetadata>`), and `EntityMetadataUpdate`, `OneToManyRelationshipMetadataUpdate` and `ManyToManyRelationshipMetadataUpdate`, which are no longer `Partial`. A body of just the changed properties, such as `{ DisplayName }`, no longer compiles. Send a retrieved definition back with its `@odata.type`: `{ ...current, "@odata.type": "Microsoft.Dynamics.CRM.StringAttributeMetadata", MaxLength: 500 }`.
  - **Merge helpers.** New `mergeAndUpdateAttributeDefinition(entity, attribute, changes, options?)`, `mergeAndUpdateRelationship(schemaName, changes, options?)` and `mergeAndUpdateGlobalOptionSet(nameOrMetadataId, changes, options?)` retrieve the current definition, apply `changes` and `PUT` the result. Columns and relationships name their `@odata.type` in `changes`, and the retrieve is cast to it (`…/Microsoft.Dynamics.CRM.StringAttributeMetadata`), so type-specific properties such as `MaxLength` are kept. The global choice helper leaves `Options` out of the `PUT` (options change through `insertOptionValue` and the other option actions). The changes types are `AttributeMetadataChanges`, `RelationshipMetadataChanges`, `OptionSetMetadataChanges` and, for `mergeAndUpdateEntityDefinition`, `EntityMetadataChanges` (it took `EntityMetadataUpdate` before).
  - **`Consistency: Strong`.** Every merge helper, including `mergeAndUpdateEntityDefinition`, reads the current definition with `Consistency: Strong`. Without it, a merge within ~30 seconds of an earlier change could read a cached copy and its `PUT` would undo that change.

- 31b3531: **Breaking.** The create types require what Dataverse needs, and the package exports only metadata types (#385):

  - `EntityMetadataCreate` requires `SchemaName`, `DisplayName`, `DisplayCollectionName`, `OwnershipType`, `IsActivity`, `HasActivities`, `HasNotes` and `Attributes`, which Dataverse rejects a table create without. `Attributes` is a tuple whose first element is the primary name column, the new `PrimaryNameAttributeMetadataCreate` (a text column with `IsPrimaryName: true`); other columns may follow. `EntityMetadataCreate` is now an interface.
  - The column create types (`StringAttributeMetadataCreate`, …) take `IsPrimaryName` only as `false`: a table's primary name column is created with the table, so a table create has exactly one.
  - `AttributeMetadataCreateTypes` no longer includes `LookupAttributeMetadataCreate`, so `createAttributeDefinition()` doesn't accept a lookup: create it with its relationship, as the `Lookup` of `createOneToManyRelationship()`. `LookupAttributeMetadataCreate` is still exported for that.
  - The package exports the metadata types only: the definitions, their create and update payloads, and the parameters and responses of the metadata operations `MetadataClient` calls. The other Web API complex types and enums (about 1,380 of them, such as `WhoAmIResponse` or `AIClassifyResponse`) are no longer exported; import them from `@mohsinonxrm/dataverse-sdk-actions`, `-functions` or `-messages`.
  - `@mohsinonxrm/dataverse-sdk-messages` is no longer a dependency.

- d9eebf3: **2.0.0.** Every package moves to 2.0.0 together. Most of 2.0 fixes code that didn't work against Dataverse in 1.0, and several changes alter existing behaviour. See [docs/migration-2.0.md](https://github.com/mohsinonxrm/dataverse-sdk-typescript/blob/main/docs/migration-2.0.md) for what to change. In short:

  - **Install:** Node 22+. `@azure/msal-browser`, `@azure/msal-node`, and the OpenTelemetry and Azure Monitor packages are now peer dependencies of the auth and telemetry packages (#24, #85, #159).
  - **core:** nothing is logged by default. URLs in logs and telemetry are redacted.
  - **core, retries:** a `Retry-After` beyond `retry.maxRetryAfterMs` (30 s) is returned instead of waited out, and non-idempotent requests aren't replayed after 502/503/504.
  - **core, timeouts:** `timeoutMs` covers the whole request.
  - **core, pipeline:** the default middleware order is ODataHeaders, Retry, Concurrency, Auth, Telemetry, Logging.
  - **core, queries:** query options are encoded with `%20`, and `expand()` calls add up.
  - **core, removed options:** `RetryOptions.delay` and `useExponentialBackoff`, `circuitBreaker`, `bulkhead` and `DataverseError.statusCode` are gone (#285).
  - **errors:** every SDK error extends `DataverseError`. Network failures and aborts are `DataverseNetworkError` and `DataverseAbortError`. A 412 is a `DataverseDuplicateError` only for `0x80040333`.
  - **metadata:** enums are string member names, and creates return the id from `OData-EntityId`.
  - **xrm:** record ids must be GUIDs, and entity sets come from metadata. `execute()` infers its result from the request, and records are `EntityRecord` instead of `any`.
  - **discovery:** `OrganizationDetail` matches the v2.0 response.
  - **actions, functions, messages:**
    - constructors take one object with the parameters by name; a bound operation's record id or entity set comes first, and bulk operations take the entity set first (#96);
    - each binding of an overloaded operation has its own class, and the plain-name classes of bound-only operations are removed (#286);
    - one `EntityReference` for the whole SDK: `createEntityReference` returns the Web API shape and takes an options object (#295);
    - `client.execute()` resolves the operation's value, not the OData envelope: the entity (`null` for a 204), the array, the primitive, or nothing (#300);
    - `toRequestBody()` is removed.

  See each package's CHANGELOG for the full list.

### Minor Changes

- bf38170: Every type the public API uses is now exported, so an app can name it, for example to type a wrapper or a mock (#397):

  - core: `DependencyTelemetry` (what `TelemetryClient.trackDependency` receives, now a named interface), `BuiltInMiddlewareOptions`, and `EqValue` (the values `odata.eq()` / `odata.ne()` take). The per-request retry options are the same `RetryOptions` type as the client's, so there is one `RetryOptions`.
  - batch: `DataverseBatchErrorConstructor`.
  - files: `FileSource` (what `upload()` accepts).
  - generator: `EntityKeyType`, and `RetrieveMetadataChangesResponse` with the metadata detail types it uses.
  - otel, appinsights: their dependency data is core's `DependencyTelemetry`.
  - metadata: `RequiredEntityProperty`.

- a45b788: Typed attribute casts, `LabelLanguages`, a cached entity-set-name lookup, and escaped key values (#65).

  - **Typed casts.** `getAttributeDefinitions()` and `getAttributeDefinition()` take `cast` (for example `"PicklistAttributeMetadata"`, `"LookupAttributeMetadata"`, `"StringAttributeMetadata"`). This reads through the `Microsoft.Dynamics.CRM.<cast>` path segment, so `select` and `expand` can use type-specific properties such as `OptionSet`, `Targets` and `MaxLength`. The result is typed as that metadata type. Both methods now also accept `expand`. New exported types: `AttributeQueryOptions`, `AttributeMetadataCast` and `AttributeMetadataByCast`.
  - **`labelLanguages`.** Every read method accepts `labelLanguages` (one LCID or an array), sent as `LabelLanguages=1033[,…]`. `expand` also accepts an array.
  - **`getEntitySetName(logicalName)`.** Returns the entity set name from metadata, for example `"opportunities"`. The first call loads every table's name in one request and caches it on the `MetadataClient`. A table that isn't in the cache is looked up on its own. `clearEntitySetNameCache()` forgets the cache.
  - **Escaped keys.** Logical names, schema names, option set names and the `GetValid*` parameters are now OData string literals. `'` is doubled, and characters that would end the path are percent-encoded. `getEntityDefinition("x'y")` used to send a malformed URL (400). It now asks for `'x''y'`.

- 92c6fc9: Metadata builders (#345). The `Metadata` object (typed `MetadataBuilders`) has plain functions that return the create
  payloads `MetadataClient` takes, with the `@odata.type`, labels (with their `LanguageCode`),
  `RequiredLevel` and Dataverse's defaults filled in:

  - `Metadata.label(text, lcid?)` or `Metadata.label({ 1033: "Name", 1036: "Nom" })`: a `Label`.
  - `Metadata.entity(schemaName, { displayName, displayCollectionName, primaryName, attributes, … })`:
    an `EntityMetadataCreate`, its primary name column (`Metadata.primaryName`) first.
  - Columns: `Metadata.string`, `memo`, `integer`, `decimal`, `double`, `money`, `dateTime`,
    `boolean`, `picklist`, `multiSelectPicklist`, `file` and `image`, each returning its
    `*AttributeMetadataCreate`. A choice takes its own `options` (labels, or `{ label, value }`) or
    a `globalOptionSetId`, exactly one.
  - `Metadata.lookup(schemaName, { referencingEntity, referencedEntity, relationshipSchemaName, … })`:
    the `OneToManyRelationshipMetadataCreate` that creates the lookup column, for
    `createOneToManyRelationship`.
  - `Metadata.manyToMany` and `Metadata.globalOptionSet` for N:N relationships and global choices.

  The types reject a choice with both its own options and a global choice, the `DateOnly` behavior
  without the `DateOnly` format, `SystemRequired`, and a table without its primary name or with a
  lookup among its columns. At run time a builder throws `DataverseInvalidRequestError` for a schema
  name without the customization prefix, an empty label, a length, precision or range out of
  bounds, duplicate option values and a global choice id that isn't a GUID. Their option types
  (`StringColumnOptions`, `ChoiceColumnOptions`, `LookupColumnOptions`, `EntityDefinitionOptions`, …)
  are exported.

  `getRelationshipByMetadataId(id, { cast })` reads a relationship as `OneToManyRelationshipMetadata` or `ManyToManyRelationshipMetadata`, so their own properties (`ReferencedEntity`, `Entity1LogicalName`, …) can be selected; without the cast, Dataverse refuses them on the base type.

- 757305a: Accurate create and option-value types (#324).

  - **No server-set properties in creates.** `DateTimeAttributeMetadataCreate` no longer requires `MinSupportedValue` and `MaxSupportedValue`, which Dataverse sets, so a date column create type-checks. The create types also leave out the other properties Dataverse sets, or ignores in a create (checked live): `AttributeType`, `AttributeTypeName`, `CanBeSecuredFor*`, `InheritsFrom`, `IsPrimaryId`, `IsRequiredForForm`, `IsValidForForm`, `IsValidForGrid`, `IsValidForRead`, `SourceTypeMask`, a text column's `DatabaseLength` and `IsLocalizable`, a currency column's `CalculationOf` and `IsBaseCurrency`, an option's `MetadataId`, `IsManaged` and `HasChanged`, and on a table `CanTriggerWorkflow`, `IsAIRUpdated`, `IsChildEntity`, `IsEnabledForCharts`, `IsEnabledForTrace`, `IsImportable`, `IsOptimisticConcurrencyEnabled`, `IsStateModelAware` and `LogicalCollectionName`. The polymorphic-lookup parameters leave them out too.
  - **Bind a column to a global choice.** `PicklistAttributeMetadataCreate` and `MultiSelectPicklistAttributeMetadataCreate` take `"GlobalOptionSet@odata.bind": "/GlobalOptionSetDefinitions(<MetadataId>)"` or an `OptionSet` of their own, exactly one; Dataverse rejects a choice column with neither. A column's own `OptionSet` requires `IsGlobal: false`, which Dataverse needs. New exported types: `ChoiceAttributeMetadataCreate`, `LocalOptionSetMetadataCreate`, `OptionMetadataCreate` and `GlobalOptionSetBind`.
  - **Option values on a global choice.** `InsertOptionValueParams`, `UpdateOptionValueParams`, `DeleteOptionValueParams` and `OrderOptionParams` take `OptionSetName` (a global choice) or `EntityLogicalName` and `AttributeLogicalName` (a local choice), exactly one, as a union (`OptionSetTarget`, `LocalOptionSetTarget`, `GlobalOptionSetTarget`). They gain the action's other parameters (`Description`, `Color`, `ExternalValue`, `IsHidden`, `ParentValues`, `SolutionUniqueName`). `UpdateOptionValueParams` requires `MergeLabels`, which Dataverse requires. `InsertStatusValueParams` takes only a table and its `statuscode` column. The `MetadataClient` methods throw `DataverseInvalidRequestError` before sending when both targets, or neither, are given: given both, Dataverse silently changes the global choice.

- 8c50fec: Metadata creates read the new id from `OData-EntityId`, and creates and updates can target a solution (#64).

  - **Ids from the header.** `createEntityDefinition`, `createAttributeDefinition`, `createOneToManyRelationship`, `createManyToManyRelationship` and `createGlobalOptionSet` no longer send `Prefer: return=representation`, which made Dataverse serialize the whole new definition back, or depend on a body. They read the `MetadataId` from the `OData-EntityId` header of the `204 No Content` response, falling back to `MetadataId` in a JSON body. A failed create rejects with the Dataverse error (`DataverseODataError`), and a response with no id at all rejects with `DataverseInvalidRequestError`.
  - **Solutions.** Every create and update takes an optional last argument, `MetadataWriteOptions` (`{ solutionUniqueName }`), sent as the `MSCRM.SolutionUniqueName` header.
  - **`mergeAndUpdateEntityDefinition(logicalName, changes, options?)`.** Metadata updates are `PUT`s that replace the definition, so a partial object resets the properties it leaves out. This new method retrieves the current definition, applies `changes`, and `PUT`s the result. The JSDoc and docs now say this about every `update*` method.

- 38eecbe: Metadata enums are string member names, and the create types model what the Web API needs (#66, #171).

  - **Enums are names (#66).** The Web API reads and writes enum members only by name. Checked live: a create with `"OwnershipType": 1` or `"RequiredLevel": { "Value": 2 }` is rejected (`0x80048d19`), and responses carry `"UserOwned"`. The 61 generated enums (`OwnershipTypes`, `AttributeRequiredLevel`, `StringFormat`, `LogicalOperator`, …) are now string-valued `as const` objects with a matching string-union type. So `OwnershipTypes.UserOwned === "UserOwned"`, either form type-checks, and comparing a retrieved value with a member works. Code that compared with numbers (`entity.OwnershipType === 1`) never matched at runtime, and now fails to compile. Each member's JSDoc keeps its numeric value.
  - **Create types (#171).**
    - New `*AttributeMetadataCreate` types: `StringAttributeMetadataCreate`, `IntegerAttributeMetadataCreate`, `LookupAttributeMetadataCreate`, `PicklistAttributeMetadataCreate`, and the other creatable column types.
    - `AttributeMetadataCreateTypes` is now their union, discriminated on `@odata.type`, so narrowing reaches `MaxLength`, `MinValue` and the other type-specific properties. The abstract `AttributeMetadata` and `EnumAttributeMetadata`, which Dataverse refuses to create, are no longer members.
    - Column, relationship and global choice creates require `@odata.type`, and Dataverse rejects them without it. Table creates accept it optionally.
    - Create types omit server-set properties (`MetadataId`, `ObjectTypeCode`, …).
    - Update types make every property optional and accept a retrieved definition.
    - `Label` and `LocalizedLabel` accept their `@odata.type`, and `LocalizedLabel.Label` and `LanguageCode` are required.
    - `OptionSetType`, `RelationshipType` and `SecurityTypes` are typed with their enums.
  - **Type tests run in CI.** The package's `test` script now also runs `tsd` on `test/types.test-d.ts`.

- 3387804: One `EntityReference` for the whole SDK (#295).

  The actions, functions, messages, entities-runtime and xrm packages each defined their own `EntityReference`, and the actions and messages ones each had their own `unique symbol` brand, so a reference from one package's `createEntityReference` didn't type-check where another package wanted one.

  - **entities-runtime defines it:** `EntityReference`, `createEntityReference`, `getEntitySetNameFromReference`, `EntityReferenceOptions`, `WebApiEntityReference` and `isEntityReference`. It depends only on core, so every package can import it without a cycle.
  - **actions, functions, messages and xrm import and re-export the same ones** (they now depend on entities-runtime), so existing imports keep working and a reference from any package is accepted by every package. The generator no longer writes an `EntityReference.ts` into actions, functions or messages; it writes the entity sets and primary keys `createEntityReference` reads to entities-runtime's `src/generated/entity-tables.ts` (the new `references` target).
  - **Breaking: one signature,** `createEntityReference(logicalName, id, { primaryIdAttribute?, entitySetName?, name? })`. The display name is an option: `createEntityReference("contact", id, "Jane")` becomes `createEntityReference("contact", id, { name: "Jane" })`.
  - **Breaking: always the Web API shape.** entities-runtime's and xrm's references were plain `{ logicalName, id, name?, entitySetName? }` objects. Now every reference is `{ "@odata.type", <primary key> }` with `logicalName`, `id`, `entitySetName` and `name` not enumerable, and `entitySetName` is filled in for the tables in the `$metadata` snapshot, so `formatEntityForWrite()` and `associate()` need no lookup for them.
  - **Breaking: only `createEntityReference` makes one.** A hand-written `{ logicalName, id }` no longer type-checks as a function parameter, an xrm `associate()` reference or an entities-runtime lookup, and `isEntityReference()` (so `formatEntityForWrite()`) also requires `@odata.type`.
  - **metadata:** `src/types` is regenerated from the committed `$metadata` snapshot by `regen`, and CI checks it like the other generated packages. The response types of operations the snapshot doesn't have are removed (`QuerySalesforceUnstructuredDataResponse`, `QueryZendeskUnstructuredArticlesResponse`, the Field Service `msdyn_…Response` types and others), the types the snapshot adds are new, and interface members are in name order.

### Patch Changes

- 8c5cf39: Export `./package.json`, so `require("<package>/package.json")` and tools that read a package's version through it work.
- 6425990: A metadata create no longer waits on cancelling the response body after it has read the new id from `OData-EntityId`. That wait could hang when the response carried a body and the stream had been tee'd, for example by logging.
- 8956dad: `retrieveMetadataChanges()`, `canBeReferenced()`, `canBeReferencing()` and `canManyToMany()` now reach Dataverse (#62, #63).

  - **`retrieveMetadataChanges()` sends a GET.** `RetrieveMetadataChanges` is a Web API function, so the old POST got 404. The query goes as a JSON parameter alias (`GET /RetrieveMetadataChanges(Query=@p1,…)?@p1=<json>`), the version stamp as a string literal, and `DeletedMetadataFilters` as an enum literal (`"Default"`, `"All"`, a comma-separated list of names, or the numeric flag value). Numeric `FilterOperator` and `ConditionOperator` values are sent by name, because Dataverse rejects numbers there.
  - **The eligibility checks send POST.** `CanBeReferenced`, `CanBeReferencing` and `CanManyToMany` are actions, so the old GET with a key predicate got 400. They now send `POST` with `{ "EntityName": "…" }` and still return a `boolean`.
  - **Docs.** The README and `docs/api/metadata-operations.md` show the positional `(query, clientVersionStamp?, deletedMetadataFilters?)` signature, `{ Type, Value }` condition values, and the `boolean` and `string[]` return types.

- d3fb786: `CreateCustomerRelationshipsParams` and `CreatePolymorphicLookupAttributeParams` now match the actions' parameters: `Lookup` is a `ComplexLookupAttributeMetadata` (`Targets`, `Format`, `RequiredLevel`, `@odata.type`, ...), `OneToManyRelationships` are `ComplexOneToManyRelationshipMetadata` (`CascadeConfiguration`, `ReferencedAttribute`, ...), and both accept `SolutionUniqueName`.
- 6bbb784: Declare `engines: { "node": ">=22" }`. Node 18 and Node 20 are end of life (April 2025 and April 2026). CI now tests on Node 22, 24 and 26. Installing on an older Node shows an engine warning, or fails with `engine-strict`.
- ab96b11: Keys and literals are built with core's `odataKey` / `odataLiteral` (#53).

  - **metadata.** The local key escaper is gone. Relationship `MetadataId` keys must be GUIDs, and `DeletedMetadataFilters` must be enum member names or numbers (comma-separated for several); anything else throws `DataverseInvalidRequestError` instead of reaching the URL.
  - **xrm.** Record ids (including related ids and the `assign` owner bind) must be GUIDs, with or without braces, and a malformed one throws `DataverseInvalidRequestError` before a request is sent. `disassociate` with an empty `relatedId` is now rejected instead of removing the whole navigation reference. The `EntityDefinitions` lookup uses `odataKey`.

- Updated dependencies [9bb1db9]
- Updated dependencies [ca11ddf]
- Updated dependencies [aec5a48]
- Updated dependencies [83f2256]
- Updated dependencies [f780438]
- Updated dependencies [c262ad7]
- Updated dependencies [f900b0c]
- Updated dependencies [9d1e26d]
- Updated dependencies [78e7716]
- Updated dependencies [a32fd68]
- Updated dependencies [b1f2738]
- Updated dependencies [e606f24]
- Updated dependencies [eb27877]
- Updated dependencies [afb5242]
- Updated dependencies [60ccef3]
- Updated dependencies [7096f24]
- Updated dependencies [08efbd7]
- Updated dependencies [6b0dc00]
- Updated dependencies [4c62fee]
- Updated dependencies [1848068]
- Updated dependencies [c3337f8]
- Updated dependencies [63ee065]
- Updated dependencies [39b3917]
- Updated dependencies [f988456]
- Updated dependencies [bf38170]
- Updated dependencies [8c5cf39]
- Updated dependencies [2bb4ed3]
- Updated dependencies [7b1ef12]
- Updated dependencies [c426eac]
- Updated dependencies [0bfa5fe]
- Updated dependencies [02038b3]
- Updated dependencies [7e13e73]
- Updated dependencies [4f96909]
- Updated dependencies [ac42045]
- Updated dependencies [e3dcff1]
- Updated dependencies [1ca3a58]
- Updated dependencies [254a8ec]
- Updated dependencies [6bbb784]
- Updated dependencies [dd2acd8]
- Updated dependencies [652ad75]
- Updated dependencies [329c0b0]
- Updated dependencies [608d915]
- Updated dependencies [9728b8c]
- Updated dependencies [d9eebf3]
- Updated dependencies [365ceca]
- Updated dependencies [3d4614d]
- Updated dependencies [61bd4aa]
- Updated dependencies [4e804b4]
- Updated dependencies [b040687]
- Updated dependencies [496b4cb]
- Updated dependencies [d3a1a01]
- Updated dependencies [2d4323f]
- Updated dependencies [e237826]
- Updated dependencies [ff655da]
- Updated dependencies [6df2528]
- Updated dependencies [a464f3a]
- Updated dependencies [b1bd587]
  - @mohsinonxrm/dataverse-sdk-core@2.0.0

## 2.0.0-beta.1

### Minor Changes

- 92c6fc9: Metadata builders (#345). The `Metadata` object (typed `MetadataBuilders`) has plain functions that return the create
  payloads `MetadataClient` takes, with the `@odata.type`, labels (with their `LanguageCode`),
  `RequiredLevel` and Dataverse's defaults filled in:

  - `Metadata.label(text, lcid?)` or `Metadata.label({ 1033: "Name", 1036: "Nom" })`: a `Label`.
  - `Metadata.entity(schemaName, { displayName, displayCollectionName, primaryName, attributes, … })`:
    an `EntityMetadataCreate`, its primary name column (`Metadata.primaryName`) first.
  - Columns: `Metadata.string`, `memo`, `integer`, `decimal`, `double`, `money`, `dateTime`,
    `boolean`, `picklist`, `multiSelectPicklist`, `file` and `image`, each returning its
    `*AttributeMetadataCreate`. A choice takes its own `options` (labels, or `{ label, value }`) or
    a `globalOptionSetId`, exactly one.
  - `Metadata.lookup(schemaName, { referencingEntity, referencedEntity, relationshipSchemaName, … })`:
    the `OneToManyRelationshipMetadataCreate` that creates the lookup column, for
    `createOneToManyRelationship`.
  - `Metadata.manyToMany` and `Metadata.globalOptionSet` for N:N relationships and global choices.

  The types reject a choice with both its own options and a global choice, the `DateOnly` behavior
  without the `DateOnly` format, `SystemRequired`, and a table without its primary name or with a
  lookup among its columns. At run time a builder throws `DataverseInvalidRequestError` for a schema
  name without the customization prefix, an empty label, a length, precision or range out of
  bounds, duplicate option values and a global choice id that isn't a GUID. Their option types
  (`StringColumnOptions`, `ChoiceColumnOptions`, `LookupColumnOptions`, `EntityDefinitionOptions`, …)
  are exported.

  `getRelationshipByMetadataId(id, { cast })` reads a relationship as `OneToManyRelationshipMetadata` or `ManyToManyRelationshipMetadata`, so their own properties (`ReferencedEntity`, `Entity1LogicalName`, …) can be selected; without the cast, Dataverse refuses them on the base type.

### Patch Changes

- Updated dependencies [9bb1db9]
- Updated dependencies [83f2256]
- Updated dependencies [f780438]
- Updated dependencies [e606f24]
- Updated dependencies [f988456]
- Updated dependencies [1ca3a58]
- Updated dependencies [ff655da]
- Updated dependencies [b1bd587]
  - @mohsinonxrm/dataverse-sdk-core@2.0.0-beta.1

## 2.0.0-beta.0

### Major Changes

- 5d6a139: **Breaking.** Metadata updates take the complete definition, and every merge helper reads the latest one (#359).

  - **Full definitions.** A metadata update is a `PUT` that replaces the definition, so a property left out is reset to its default. `updateAttributeDefinition`, `updateGlobalOptionSet`, `updateEntityDefinition`, `updateOneToManyRelationship` and `updateManyToManyRelationship` now take the complete definition with `@odata.type` required: `AttributeMetadataUpdateTypes` (a union discriminated on `@odata.type`, replacing `Partial<AttributeMetadataCreateTypes>`), the new `OptionSetMetadataUpdate` (replacing `Partial<OptionSetMetadata>`), and `EntityMetadataUpdate`, `OneToManyRelationshipMetadataUpdate` and `ManyToManyRelationshipMetadataUpdate`, which are no longer `Partial`. A body of just the changed properties, such as `{ DisplayName }`, no longer compiles. Send a retrieved definition back with its `@odata.type`: `{ ...current, "@odata.type": "Microsoft.Dynamics.CRM.StringAttributeMetadata", MaxLength: 500 }`.
  - **Merge helpers.** New `mergeAndUpdateAttributeDefinition(entity, attribute, changes, options?)`, `mergeAndUpdateRelationship(schemaName, changes, options?)` and `mergeAndUpdateGlobalOptionSet(nameOrMetadataId, changes, options?)` retrieve the current definition, apply `changes` and `PUT` the result. Columns and relationships name their `@odata.type` in `changes`, and the retrieve is cast to it (`…/Microsoft.Dynamics.CRM.StringAttributeMetadata`), so type-specific properties such as `MaxLength` are kept. The global choice helper leaves `Options` out of the `PUT` (options change through `insertOptionValue` and the other option actions). The changes types are `AttributeMetadataChanges`, `RelationshipMetadataChanges`, `OptionSetMetadataChanges` and, for `mergeAndUpdateEntityDefinition`, `EntityMetadataChanges` (it took `EntityMetadataUpdate` before).
  - **`Consistency: Strong`.** Every merge helper, including `mergeAndUpdateEntityDefinition`, reads the current definition with `Consistency: Strong`. Without it, a merge within ~30 seconds of an earlier change could read a cached copy and its `PUT` would undo that change.

- 31b3531: **Breaking.** The create types require what Dataverse needs, and the package exports only metadata types (#385):

  - `EntityMetadataCreate` requires `SchemaName`, `DisplayName`, `DisplayCollectionName`, `OwnershipType`, `IsActivity`, `HasActivities`, `HasNotes` and `Attributes`, which Dataverse rejects a table create without. `Attributes` is a tuple whose first element is the primary name column, the new `PrimaryNameAttributeMetadataCreate` (a text column with `IsPrimaryName: true`); other columns may follow. `EntityMetadataCreate` is now an interface.
  - The column create types (`StringAttributeMetadataCreate`, …) take `IsPrimaryName` only as `false`: a table's primary name column is created with the table, so a table create has exactly one.
  - `AttributeMetadataCreateTypes` no longer includes `LookupAttributeMetadataCreate`, so `createAttributeDefinition()` doesn't accept a lookup: create it with its relationship, as the `Lookup` of `createOneToManyRelationship()`. `LookupAttributeMetadataCreate` is still exported for that.
  - The package exports the metadata types only: the definitions, their create and update payloads, and the parameters and responses of the metadata operations `MetadataClient` calls. The other Web API complex types and enums (about 1,380 of them, such as `WhoAmIResponse` or `AIClassifyResponse`) are no longer exported; import them from `@mohsinonxrm/dataverse-sdk-actions`, `-functions` or `-messages`.
  - `@mohsinonxrm/dataverse-sdk-messages` is no longer a dependency.

- d9eebf3: **2.0.0.** Every package moves to 2.0.0 together. Most of 2.0 fixes code that didn't work against Dataverse in 1.0, and several changes alter existing behaviour. See [docs/migration-2.0.md](https://github.com/mohsinonxrm/dataverse-sdk-typescript/blob/main/docs/migration-2.0.md) for what to change. In short:

  - **Install:** Node 22+. `@azure/msal-browser`, `@azure/msal-node`, and the OpenTelemetry and Azure Monitor packages are now peer dependencies of the auth and telemetry packages (#24, #85, #159).
  - **core:** nothing is logged by default. URLs in logs and telemetry are redacted.
  - **core, retries:** a `Retry-After` beyond `retry.maxRetryAfterMs` (30 s) is returned instead of waited out, and non-idempotent requests aren't replayed after 502/503/504.
  - **core, timeouts:** `timeoutMs` covers the whole request.
  - **core, pipeline:** the default middleware order is ODataHeaders, Retry, Concurrency, Auth, Telemetry, Logging.
  - **core, queries:** query options are encoded with `%20`, and `expand()` calls add up.
  - **core, removed options:** `RetryOptions.delay` and `useExponentialBackoff`, `circuitBreaker`, `bulkhead` and `DataverseError.statusCode` are gone (#285).
  - **errors:** every SDK error extends `DataverseError`. Network failures and aborts are `DataverseNetworkError` and `DataverseAbortError`. A 412 is a `DataverseDuplicateError` only for `0x80040333`.
  - **metadata:** enums are string member names, and creates return the id from `OData-EntityId`.
  - **xrm:** record ids must be GUIDs, and entity sets come from metadata. `execute()` infers its result from the request, and records are `EntityRecord` instead of `any`.
  - **discovery:** `OrganizationDetail` matches the v2.0 response.
  - **actions, functions, messages:**
    - constructors take one object with the parameters by name; a bound operation's record id or entity set comes first, and bulk operations take the entity set first (#96);
    - each binding of an overloaded operation has its own class, and the plain-name classes of bound-only operations are removed (#286);
    - one `EntityReference` for the whole SDK: `createEntityReference` returns the Web API shape and takes an options object (#295);
    - `client.execute()` resolves the operation's value, not the OData envelope: the entity (`null` for a 204), the array, the primitive, or nothing (#300);
    - `toRequestBody()` is removed.

  See each package's CHANGELOG for the full list.

### Minor Changes

- bf38170: Every type the public API uses is now exported, so an app can name it, for example to type a wrapper or a mock (#397):

  - core: `DependencyTelemetry` (what `TelemetryClient.trackDependency` receives, now a named interface), `BuiltInMiddlewareOptions`, and `EqValue` (the values `odata.eq()` / `odata.ne()` take). The per-request retry options are the same `RetryOptions` type as the client's, so there is one `RetryOptions`.
  - batch: `DataverseBatchErrorConstructor`.
  - files: `FileSource` (what `upload()` accepts).
  - generator: `EntityKeyType`, and `RetrieveMetadataChangesResponse` with the metadata detail types it uses.
  - otel, appinsights: their dependency data is core's `DependencyTelemetry`.
  - metadata: `RequiredEntityProperty`.

- a45b788: Typed attribute casts, `LabelLanguages`, a cached entity-set-name lookup, and escaped key values (#65).

  - **Typed casts.** `getAttributeDefinitions()` and `getAttributeDefinition()` take `cast` (for example `"PicklistAttributeMetadata"`, `"LookupAttributeMetadata"`, `"StringAttributeMetadata"`). This reads through the `Microsoft.Dynamics.CRM.<cast>` path segment, so `select` and `expand` can use type-specific properties such as `OptionSet`, `Targets` and `MaxLength`. The result is typed as that metadata type. Both methods now also accept `expand`. New exported types: `AttributeQueryOptions`, `AttributeMetadataCast` and `AttributeMetadataByCast`.
  - **`labelLanguages`.** Every read method accepts `labelLanguages` (one LCID or an array), sent as `LabelLanguages=1033[,…]`. `expand` also accepts an array.
  - **`getEntitySetName(logicalName)`.** Returns the entity set name from metadata, for example `"opportunities"`. The first call loads every table's name in one request and caches it on the `MetadataClient`. A table that isn't in the cache is looked up on its own. `clearEntitySetNameCache()` forgets the cache.
  - **Escaped keys.** Logical names, schema names, option set names and the `GetValid*` parameters are now OData string literals. `'` is doubled, and characters that would end the path are percent-encoded. `getEntityDefinition("x'y")` used to send a malformed URL (400). It now asks for `'x''y'`.

- 757305a: Accurate create and option-value types (#324).

  - **No server-set properties in creates.** `DateTimeAttributeMetadataCreate` no longer requires `MinSupportedValue` and `MaxSupportedValue`, which Dataverse sets, so a date column create type-checks. The create types also leave out the other properties Dataverse sets, or ignores in a create (checked live): `AttributeType`, `AttributeTypeName`, `CanBeSecuredFor*`, `InheritsFrom`, `IsPrimaryId`, `IsRequiredForForm`, `IsValidForForm`, `IsValidForGrid`, `IsValidForRead`, `SourceTypeMask`, a text column's `DatabaseLength` and `IsLocalizable`, a currency column's `CalculationOf` and `IsBaseCurrency`, an option's `MetadataId`, `IsManaged` and `HasChanged`, and on a table `CanTriggerWorkflow`, `IsAIRUpdated`, `IsChildEntity`, `IsEnabledForCharts`, `IsEnabledForTrace`, `IsImportable`, `IsOptimisticConcurrencyEnabled`, `IsStateModelAware` and `LogicalCollectionName`. The polymorphic-lookup parameters leave them out too.
  - **Bind a column to a global choice.** `PicklistAttributeMetadataCreate` and `MultiSelectPicklistAttributeMetadataCreate` take `"GlobalOptionSet@odata.bind": "/GlobalOptionSetDefinitions(<MetadataId>)"` or an `OptionSet` of their own, exactly one; Dataverse rejects a choice column with neither. A column's own `OptionSet` requires `IsGlobal: false`, which Dataverse needs. New exported types: `ChoiceAttributeMetadataCreate`, `LocalOptionSetMetadataCreate`, `OptionMetadataCreate` and `GlobalOptionSetBind`.
  - **Option values on a global choice.** `InsertOptionValueParams`, `UpdateOptionValueParams`, `DeleteOptionValueParams` and `OrderOptionParams` take `OptionSetName` (a global choice) or `EntityLogicalName` and `AttributeLogicalName` (a local choice), exactly one, as a union (`OptionSetTarget`, `LocalOptionSetTarget`, `GlobalOptionSetTarget`). They gain the action's other parameters (`Description`, `Color`, `ExternalValue`, `IsHidden`, `ParentValues`, `SolutionUniqueName`). `UpdateOptionValueParams` requires `MergeLabels`, which Dataverse requires. `InsertStatusValueParams` takes only a table and its `statuscode` column. The `MetadataClient` methods throw `DataverseInvalidRequestError` before sending when both targets, or neither, are given: given both, Dataverse silently changes the global choice.

- 8c50fec: Metadata creates read the new id from `OData-EntityId`, and creates and updates can target a solution (#64).

  - **Ids from the header.** `createEntityDefinition`, `createAttributeDefinition`, `createOneToManyRelationship`, `createManyToManyRelationship` and `createGlobalOptionSet` no longer send `Prefer: return=representation`, which made Dataverse serialize the whole new definition back, or depend on a body. They read the `MetadataId` from the `OData-EntityId` header of the `204 No Content` response, falling back to `MetadataId` in a JSON body. A failed create rejects with the Dataverse error (`DataverseODataError`), and a response with no id at all rejects with `DataverseInvalidRequestError`.
  - **Solutions.** Every create and update takes an optional last argument, `MetadataWriteOptions` (`{ solutionUniqueName }`), sent as the `MSCRM.SolutionUniqueName` header.
  - **`mergeAndUpdateEntityDefinition(logicalName, changes, options?)`.** Metadata updates are `PUT`s that replace the definition, so a partial object resets the properties it leaves out. This new method retrieves the current definition, applies `changes`, and `PUT`s the result. The JSDoc and docs now say this about every `update*` method.

- 38eecbe: Metadata enums are string member names, and the create types model what the Web API needs (#66, #171).

  - **Enums are names (#66).** The Web API reads and writes enum members only by name. Checked live: a create with `"OwnershipType": 1` or `"RequiredLevel": { "Value": 2 }` is rejected (`0x80048d19`), and responses carry `"UserOwned"`. The 61 generated enums (`OwnershipTypes`, `AttributeRequiredLevel`, `StringFormat`, `LogicalOperator`, …) are now string-valued `as const` objects with a matching string-union type. So `OwnershipTypes.UserOwned === "UserOwned"`, either form type-checks, and comparing a retrieved value with a member works. Code that compared with numbers (`entity.OwnershipType === 1`) never matched at runtime, and now fails to compile. Each member's JSDoc keeps its numeric value.
  - **Create types (#171).**
    - New `*AttributeMetadataCreate` types: `StringAttributeMetadataCreate`, `IntegerAttributeMetadataCreate`, `LookupAttributeMetadataCreate`, `PicklistAttributeMetadataCreate`, and the other creatable column types.
    - `AttributeMetadataCreateTypes` is now their union, discriminated on `@odata.type`, so narrowing reaches `MaxLength`, `MinValue` and the other type-specific properties. The abstract `AttributeMetadata` and `EnumAttributeMetadata`, which Dataverse refuses to create, are no longer members.
    - Column, relationship and global choice creates require `@odata.type`, and Dataverse rejects them without it. Table creates accept it optionally.
    - Create types omit server-set properties (`MetadataId`, `ObjectTypeCode`, …).
    - Update types make every property optional and accept a retrieved definition.
    - `Label` and `LocalizedLabel` accept their `@odata.type`, and `LocalizedLabel.Label` and `LanguageCode` are required.
    - `OptionSetType`, `RelationshipType` and `SecurityTypes` are typed with their enums.
  - **Type tests run in CI.** The package's `test` script now also runs `tsd` on `test/types.test-d.ts`.

- 3387804: One `EntityReference` for the whole SDK (#295).

  The actions, functions, messages, entities-runtime and xrm packages each defined their own `EntityReference`, and the actions and messages ones each had their own `unique symbol` brand, so a reference from one package's `createEntityReference` didn't type-check where another package wanted one.

  - **entities-runtime defines it:** `EntityReference`, `createEntityReference`, `getEntitySetNameFromReference`, `EntityReferenceOptions`, `WebApiEntityReference` and `isEntityReference`. It depends only on core, so every package can import it without a cycle.
  - **actions, functions, messages and xrm import and re-export the same ones** (they now depend on entities-runtime), so existing imports keep working and a reference from any package is accepted by every package. The generator no longer writes an `EntityReference.ts` into actions, functions or messages; it writes the entity sets and primary keys `createEntityReference` reads to entities-runtime's `src/generated/entity-tables.ts` (the new `references` target).
  - **Breaking: one signature,** `createEntityReference(logicalName, id, { primaryIdAttribute?, entitySetName?, name? })`. The display name is an option: `createEntityReference("contact", id, "Jane")` becomes `createEntityReference("contact", id, { name: "Jane" })`.
  - **Breaking: always the Web API shape.** entities-runtime's and xrm's references were plain `{ logicalName, id, name?, entitySetName? }` objects. Now every reference is `{ "@odata.type", <primary key> }` with `logicalName`, `id`, `entitySetName` and `name` not enumerable, and `entitySetName` is filled in for the tables in the `$metadata` snapshot, so `formatEntityForWrite()` and `associate()` need no lookup for them.
  - **Breaking: only `createEntityReference` makes one.** A hand-written `{ logicalName, id }` no longer type-checks as a function parameter, an xrm `associate()` reference or an entities-runtime lookup, and `isEntityReference()` (so `formatEntityForWrite()`) also requires `@odata.type`.
  - **metadata:** `src/types` is regenerated from the committed `$metadata` snapshot by `regen`, and CI checks it like the other generated packages. The response types of operations the snapshot doesn't have are removed (`QuerySalesforceUnstructuredDataResponse`, `QueryZendeskUnstructuredArticlesResponse`, the Field Service `msdyn_…Response` types and others), the types the snapshot adds are new, and interface members are in name order.

### Patch Changes

- 6425990: A metadata create no longer waits on cancelling the response body after it has read the new id from `OData-EntityId`. That wait could hang when the response carried a body and the stream had been tee'd, for example by logging.
- 8956dad: `retrieveMetadataChanges()`, `canBeReferenced()`, `canBeReferencing()` and `canManyToMany()` now reach Dataverse (#62, #63).

  - **`retrieveMetadataChanges()` sends a GET.** `RetrieveMetadataChanges` is a Web API function, so the old POST got 404. The query goes as a JSON parameter alias (`GET /RetrieveMetadataChanges(Query=@p1,…)?@p1=<json>`), the version stamp as a string literal, and `DeletedMetadataFilters` as an enum literal (`"Default"`, `"All"`, a comma-separated list of names, or the numeric flag value). Numeric `FilterOperator` and `ConditionOperator` values are sent by name, because Dataverse rejects numbers there.
  - **The eligibility checks send POST.** `CanBeReferenced`, `CanBeReferencing` and `CanManyToMany` are actions, so the old GET with a key predicate got 400. They now send `POST` with `{ "EntityName": "…" }` and still return a `boolean`.
  - **Docs.** The README and `docs/api/metadata-operations.md` show the positional `(query, clientVersionStamp?, deletedMetadataFilters?)` signature, `{ Type, Value }` condition values, and the `boolean` and `string[]` return types.

- d3fb786: `CreateCustomerRelationshipsParams` and `CreatePolymorphicLookupAttributeParams` now match the actions' parameters: `Lookup` is a `ComplexLookupAttributeMetadata` (`Targets`, `Format`, `RequiredLevel`, `@odata.type`, ...), `OneToManyRelationships` are `ComplexOneToManyRelationshipMetadata` (`CascadeConfiguration`, `ReferencedAttribute`, ...), and both accept `SolutionUniqueName`.
- 6bbb784: Declare `engines: { "node": ">=22" }`. Node 18 and Node 20 are end of life (April 2025 and April 2026). CI now tests on Node 22, 24 and 26. Installing on an older Node shows an engine warning, or fails with `engine-strict`.
- ab96b11: Keys and literals are built with core's `odataKey` / `odataLiteral` (#53).

  - **metadata.** The local key escaper is gone. Relationship `MetadataId` keys must be GUIDs, and `DeletedMetadataFilters` must be enum member names or numbers (comma-separated for several); anything else throws `DataverseInvalidRequestError` instead of reaching the URL.
  - **xrm.** Record ids (including related ids and the `assign` owner bind) must be GUIDs, with or without braces, and a malformed one throws `DataverseInvalidRequestError` before a request is sent. `disassociate` with an empty `relatedId` is now rejected instead of removing the whole navigation reference. The `EntityDefinitions` lookup uses `odataKey`.

- Updated dependencies [ca11ddf]
- Updated dependencies [aec5a48]
- Updated dependencies [c262ad7]
- Updated dependencies [f900b0c]
- Updated dependencies [9d1e26d]
- Updated dependencies [78e7716]
- Updated dependencies [a32fd68]
- Updated dependencies [b1f2738]
- Updated dependencies [eb27877]
- Updated dependencies [afb5242]
- Updated dependencies [60ccef3]
- Updated dependencies [7096f24]
- Updated dependencies [08efbd7]
- Updated dependencies [6b0dc00]
- Updated dependencies [4c62fee]
- Updated dependencies [1848068]
- Updated dependencies [c3337f8]
- Updated dependencies [63ee065]
- Updated dependencies [39b3917]
- Updated dependencies [bf38170]
- Updated dependencies [2bb4ed3]
- Updated dependencies [7b1ef12]
- Updated dependencies [c426eac]
- Updated dependencies [0bfa5fe]
- Updated dependencies [02038b3]
- Updated dependencies [7e13e73]
- Updated dependencies [4f96909]
- Updated dependencies [ac42045]
- Updated dependencies [e3dcff1]
- Updated dependencies [254a8ec]
- Updated dependencies [6bbb784]
- Updated dependencies [dd2acd8]
- Updated dependencies [652ad75]
- Updated dependencies [329c0b0]
- Updated dependencies [608d915]
- Updated dependencies [9728b8c]
- Updated dependencies [d9eebf3]
- Updated dependencies [365ceca]
- Updated dependencies [3d4614d]
- Updated dependencies [61bd4aa]
- Updated dependencies [4e804b4]
- Updated dependencies [b040687]
- Updated dependencies [496b4cb]
- Updated dependencies [d3a1a01]
- Updated dependencies [2d4323f]
- Updated dependencies [e237826]
- Updated dependencies [6df2528]
- Updated dependencies [a464f3a]
  - @mohsinonxrm/dataverse-sdk-core@2.0.0-beta.0

## 1.0.0

### Major Changes

- 78fc1e1: Initial v1.0.0 release of Dataverse SDK for TypeScript

### Patch Changes

- Updated dependencies [78fc1e1]
  - @mohsinonxrm/dataverse-sdk-messages@1.0.0
  - @mohsinonxrm/dataverse-sdk-core@1.0.0

## 1.0.0

### Major Changes

- # v1.0.0 - Initial Release 🎉

  The first stable release of the Dataverse SDK for TypeScript! This modern, type-safe SDK provides comprehensive access to Microsoft Dataverse (Power Platform) with two complementary front doors:
  1. **HTTP/OData Fluent API** - Microsoft Graph-inspired request builder pattern
  2. **OrganizationService** - C#-familiar interface for Dataverse developers

  ## 🚀 Key Features

  ### Core Infrastructure
  - **Middleware Pipeline** - Extensible request/response processing with auth, retry, concurrency, and telemetry
  - **Automatic Retries** - Smart retry logic honors `Retry-After` headers (429, 502+)
  - **Adaptive Concurrency** - Respects `x-ms-dop-hint` for optimal throughput
  - **Type-Safe** - Strict TypeScript throughout with 1,356+ generated message types
  - **ESM-Only** - Modern, tree-shakeable ES Modules for optimal bundle sizes

  ### Authentication
  - **MSAL Browser** - SPA/browser authentication with token caching
  - **MSAL Node** - CLI/daemon auth (device code, client credentials)
  - **Azure Identity** - Modern Azure authentication library support

  ### Operations
  - **$batch Operations** - Auto-splitting at 1,000 requests, change sets, error handling
  - **Typed Actions** - 1,356 generated action classes with full type safety
  - **Typed Functions** - 229 generated function classes
  - **Typed Messages** - 1,356 message request/response pairs (direct exports, no namespaces)
  - **Bulk Operations** - CreateMultiple, UpdateMultiple, UpsertMultiple, DeleteMultiple
  - **File Operations** - Chunked upload/download for file and image columns (4MB default chunks)

  ### Metadata
  - **Strict Typing** - Generated from Dataverse v9.2 metadata (Sales + Customer Service)
  - **Read/Create/Update Split** - Separate types prevent invalid writes
  - **Metadata Client** - Type-safe operations for EntityDefinitions, RelationshipDefinitions, etc.
  - **RetrieveMetadataChanges** - Efficient incremental metadata queries

  ### Developer Experience
  - **Two Front Doors** - Choose HTTP fluent API OR OrganizationService patterns
  - **Comprehensive Samples** - Node CLI, daemon, batch ops, file ops, metadata, messages
  - **Fluent Builders** - Chainable OData query building (select, filter, expand, orderby, etc.)
  - **Prefer Headers** - Type-safe helper for returnRepresentation, includeAnnotations, etc.
  - **Paging** - get(), getPage(), iterate(), getAll() with configurable limits

  ### Telemetry & Observability
  - **Application Insights** - Optional adapter package
  - **OpenTelemetry** - Optional adapter package
  - **Custom Telemetry** - Implement TelemetryClient interface
  - **Correlation IDs** - Automatic x-ms-client-request-id propagation

  ## 📦 Packages

  All packages published under `@mohsinonxrm` scope:

  **Foundation:**
  - `dataverse-sdk-core` - Pipeline, middleware, fluent API, request builder
  - `dataverse-sdk-entities-runtime` - Runtime for generated entities

  **Authentication:**
  - `dataverse-sdk-auth-msal-browser` - MSAL browser token provider
  - `dataverse-sdk-auth-msal-node` - MSAL node token provider
  - `dataverse-sdk-auth-azure-identity` - Azure Identity token provider

  **Core Operations:**
  - `dataverse-sdk-batch` - $batch operations with change sets
  - `dataverse-sdk-xrm` - OrganizationService facade
  - `dataverse-sdk-discovery` - Global Discovery Service (Commercial)

  **Typed Operations:**
  - `dataverse-sdk-actions` - 1,356 typed Web API actions
  - `dataverse-sdk-functions` - 229 typed Web API functions
  - `dataverse-sdk-messages` - 1,356 typed messages (direct exports)

  **Advanced:**
  - `dataverse-sdk-metadata` - Metadata operations + strict typing
  - `dataverse-sdk-files` - File/image column operations with chunking

  **Tooling:**
  - `dataverse-sdk-generator` - Early-bound entity generator

  **Telemetry (Optional):**
  - `dataverse-sdk-appinsights` - Application Insights adapter
  - `dataverse-sdk-otel` - OpenTelemetry adapter

  ## 🔄 Breaking Changes from Pre-Release

  ### Direct Exports (No Namespaces)

  **Previous (Pre-Release):**

  ```typescript
  import { XrmSdkMessages, CrmSdkMessages } from "@mohsinonxrm/dataverse-sdk-messages";
  const request = new XrmSdkMessages.WhoAmIRequest();
  ```

  **Now (v1.0):**

  ```typescript
  import { ExecuteWorkflowRequest, MergeRequest } from "@mohsinonxrm/dataverse-sdk-messages";
  const request = new ExecuteWorkflowRequest("workflow-id", "entity-id", {});
  ```

  **Rationale:** Direct named exports enable better tree-shaking, simpler imports, and align with modern ESM practices.

  ### Constructor Signatures

  Auto-generated message/action/function classes use positional constructor parameters rather than options objects. Refer to package READMEs and IntelliSense for specific signatures.

  ## 📚 Documentation
  - **ADRs:** Comprehensive architecture decision records in `docs/adr/`
  - **Mapping Docs:** Web API action/function/message mappings in `docs/mapping/`
  - **Samples:** 7 working samples demonstrating key patterns
  - **Package READMEs:** Installation and usage for each package

  ## ⚡ Quick Start

  ```bash
  # Install core + auth
  pnpm add @mohsinonxrm/dataverse-sdk-core @mohsinonxrm/dataverse-sdk-auth-msal-node

  # For OrganizationService pattern
  pnpm add @mohsinonxrm/dataverse-sdk-xrm @mohsinonxrm/dataverse-sdk-messages

  # For batch operations
  pnpm add @mohsinonxrm/dataverse-sdk-batch

  # For file operations
  pnpm add @mohsinonxrm/dataverse-sdk-files
  ```

  **Fluent API Example:**

  ```typescript
  import { DataverseClient } from "@mohsinonxrm/dataverse-sdk-core";
  import { MsalNodeTokenProvider } from "@mohsinonxrm/dataverse-sdk-auth-msal-node";

  const client = new DataverseClient({
    baseUrl: "https://org.crm.dynamics.com/api/data/v9.2",
    tokenProvider: new MsalNodeTokenProvider(msalConfig),
  });

  const accounts = await client
    .api("/accounts")
    .select(["name", "revenue"])
    .filter("revenue gt 100000")
    .top(10)
    .get();
  ```

  **OrganizationService Example:**

  ```typescript
  import { OrganizationService } from "@mohsinonxrm/dataverse-sdk-xrm";
  import { ExecuteWorkflowRequest } from "@mohsinonxrm/dataverse-sdk-messages";

  const service = new OrganizationService(client);

  const request = new ExecuteWorkflowRequest("workflow-id", "entity-id", {});
  const response = await service.execute(request);
  ```

  ## ⚠️ Known Limitations
  1. **Integration Tests:** Unit tests comprehensive; integration tests require live Dataverse environment (deferred to v1.0.1)
  2. **Actions Package Tests:** 18 test failures due to constructor signature mismatches with auto-generated classes (functionality confirmed working in samples)
  3. **SPA Sample:** Skeleton only (deferred to v1.0.1)

  ## 🔮 Roadmap

  **v1.0.1 - Polish Release** (Planned: +2 weeks)
  - Complete SPA Fluent UI v9 sample
  - Enhanced package READMEs
  - Migration guides
  - Troubleshooting documentation
  - Fix actions package test implementation

  **v1.1 - Fast-Follow** (Planned: +3 months)
  - Duplicate detection package
  - Stream-based file operations
  - Elastic table partial success handling
  - Expanded messages coverage
  - Integration tests against live Dataverse

  **v1.2+ - Enterprise Features** (2027+)
  - Circuit breaker middleware
  - Bulk head isolation
  - Audit operations package
  - Async operation polling
  - FetchXML query builder

  ## 📄 License

  GNU Affero General Public License v3.0 (AGPL-3.0)

  ## 🙏 Acknowledgments

  Built with inspiration from:
  - Microsoft Graph SDK for TypeScript/JavaScript
  - dataverse-gen (comparison analysis in docs/architecture/)
  - Microsoft Dataverse Web API documentation
  - C# SDK patterns and naming conventions

  ***

  **Migration Note:** If upgrading from pre-release versions, review breaking changes section above and update imports to use direct exports instead of namespaces.

### Patch Changes

- Updated dependencies
- Updated dependencies
  - @mohsinonxrm/dataverse-sdk-core@1.0.0
  - @mohsinonxrm/dataverse-sdk-messages@1.0.0
