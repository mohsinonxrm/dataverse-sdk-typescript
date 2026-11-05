/**
 * Metadata client for managing Dataverse metadata (entities, attributes, relationships)
 */

import { DataverseInvalidRequestError } from "@mohsinonxrm/dataverse-sdk-core";
import type { DataverseClient, DataverseRequestBuilder } from "@mohsinonxrm/dataverse-sdk-core";
import type {
  BigIntAttributeMetadata,
  BooleanAttributeMetadata,
  DateTimeAttributeMetadata,
  DecimalAttributeMetadata,
  DoubleAttributeMetadata,
  EntityNameAttributeMetadata,
  EnumAttributeMetadata,
  FileAttributeMetadata,
  ImageAttributeMetadata,
  IntegerAttributeMetadata,
  LookupAttributeMetadata,
  ManagedPropertyAttributeMetadata,
  MemoAttributeMetadata,
  MoneyAttributeMetadata,
  MultiSelectPicklistAttributeMetadata,
  PicklistAttributeMetadata,
  StateAttributeMetadata,
  StatusAttributeMetadata,
  StringAttributeMetadata,
  UniqueIdentifierAttributeMetadata,
} from "./types/index.js";
import type {
  EntityMetadata,
  EntityMetadataCreate,
  EntityMetadataUpdate,
  AttributeMetadata,
  AttributeMetadataCreateTypes,
  OneToManyRelationshipMetadata,
  ManyToManyRelationshipMetadata,
  OneToManyRelationshipMetadataCreate,
  OneToManyRelationshipMetadataUpdate,
  ManyToManyRelationshipMetadataCreate,
  ManyToManyRelationshipMetadataUpdate,
  OptionSetMetadata,
  OptionSetMetadataCreate,
  InsertOptionValueParams,
  InsertOptionValueResponse,
  UpdateOptionValueParams,
  DeleteOptionValueParams,
  OrderOptionParams,
  InsertStatusValueParams,
  InsertStatusValueResponse,
  CreateCustomerRelationshipsParams,
  CreateCustomerRelationshipsResponse,
  CreatePolymorphicLookupAttributeParams,
  CreatePolymorphicLookupAttributeResponse,
  CanBeReferencedResponse,
  CanBeReferencingResponse,
  CanManyToManyResponse,
  GetValidReferencingEntitiesResponse,
  GetValidReferencedEntitiesResponse,
  GetValidManyToManyResponse,
  EntityQueryExpression,
  RetrieveMetadataChangesResponse,
  DeletedMetadataFilters,
} from "./types/index.js";

/**
 * Query options for retrieving metadata
 */
export interface MetadataQueryOptions {
  /** `$select`: the properties to return. */
  select?: string[];
  /** `$filter` expression. */
  filter?: string;
  /** `$expand`: one or more navigation properties, with nested options inline, e.g. `"OptionSet($select=Options)"`. */
  expand?: string | string[];
  /**
   * `LabelLanguages`: return labels in these languages (LCIDs, e.g. `1033`) instead of only the
   * caller's language. Applies to every `Label` in the response.
   */
  labelLanguages?: number | number[];
}

/**
 * The attribute types `getAttributeDefinitions` and `getAttributeDefinition` can cast to, and
 * the metadata type each one returns.
 */
export interface AttributeMetadataByCast {
  BigIntAttributeMetadata: BigIntAttributeMetadata;
  BooleanAttributeMetadata: BooleanAttributeMetadata;
  DateTimeAttributeMetadata: DateTimeAttributeMetadata;
  DecimalAttributeMetadata: DecimalAttributeMetadata;
  DoubleAttributeMetadata: DoubleAttributeMetadata;
  EntityNameAttributeMetadata: EntityNameAttributeMetadata;
  EnumAttributeMetadata: EnumAttributeMetadata;
  FileAttributeMetadata: FileAttributeMetadata;
  ImageAttributeMetadata: ImageAttributeMetadata;
  IntegerAttributeMetadata: IntegerAttributeMetadata;
  LookupAttributeMetadata: LookupAttributeMetadata;
  ManagedPropertyAttributeMetadata: ManagedPropertyAttributeMetadata;
  MemoAttributeMetadata: MemoAttributeMetadata;
  MoneyAttributeMetadata: MoneyAttributeMetadata;
  MultiSelectPicklistAttributeMetadata: MultiSelectPicklistAttributeMetadata;
  PicklistAttributeMetadata: PicklistAttributeMetadata;
  StateAttributeMetadata: StateAttributeMetadata;
  StatusAttributeMetadata: StatusAttributeMetadata;
  StringAttributeMetadata: StringAttributeMetadata;
  UniqueIdentifierAttributeMetadata: UniqueIdentifierAttributeMetadata;
}

/** An attribute type to cast to, e.g. `"PicklistAttributeMetadata"`. */
export type AttributeMetadataCast = keyof AttributeMetadataByCast;

/**
 * Query options for attribute definitions.
 */
export interface AttributeQueryOptions extends MetadataQueryOptions {
  /**
   * Read only attributes of this type, through the `Microsoft.Dynamics.CRM.<cast>` path segment.
   * Needed to select or expand type-specific properties such as `OptionSet`, `Targets` or
   * `MaxLength`.
   */
  cast?: AttributeMetadataCast;
}

/**
 * Client for interacting with Dataverse metadata API
 */
export class MetadataClient {
  private readonly client: DataverseClient;
  private entitySetNames: Map<string, string> | undefined;
  private entitySetNamesLoad: Promise<Map<string, string>> | undefined;

  constructor(client: DataverseClient) {
    this.client = client;
  }

  // ==================== Entity Definitions ====================

  /**
   * Retrieve all entity definitions
   * @param options Query options (select, filter, expand)
   * @returns Array of entity metadata
   * @example
   * ```typescript
   * const entities = await metadataClient.getEntityDefinitions({
   *   select: ['LogicalName', 'DisplayName', 'SchemaName'],
   *   filter: "IsCustomEntity eq true"
   * });
   * ```
   */
  async getEntityDefinitions(options?: MetadataQueryOptions): Promise<EntityMetadata[]> {
    const response = await this.query("/EntityDefinitions", options).get<{
      value: EntityMetadata[];
    }>();
    return response.value;
  }

  /**
   * Retrieve a single entity definition by logical name
   * @param logicalName Entity logical name
   * @param options Query options (select, expand)
   * @returns Entity metadata
   * @example
   * ```typescript
   * const accountEntity = await metadataClient.getEntityDefinition('account', {
   *   expand: 'Attributes'
   * });
   * ```
   */
  async getEntityDefinition(
    logicalName: string,
    options?: Omit<MetadataQueryOptions, "filter">
  ): Promise<EntityMetadata> {
    return await this.query(
      `/EntityDefinitions(LogicalName=${key(logicalName)})`,
      options
    ).get<EntityMetadata>();
  }

  /**
   * The entity set name of a table, e.g. `"accounts"` for `"account"`, from metadata.
   *
   * The first call reads `EntityDefinitions?$select=LogicalName,EntitySetName` once and caches
   * the whole map on this `MetadataClient`; a table missing from the cache (created later) is
   * looked up on its own and added. Use {@link clearEntitySetNameCache} after renaming or
   * deleting tables.
   * @param logicalName Entity logical name
   * @returns The entity set name used in Web API URLs
   * @example
   * ```typescript
   * const set = await metadataClient.getEntitySetName("account"); // "accounts"
   * await client.api(`${set}(${id})`).get();
   * ```
   */
  async getEntitySetName(logicalName: string): Promise<string> {
    const name = logicalName.toLowerCase();
    const cached = (await this.loadEntitySetNames()).get(name);
    if (cached) return cached;

    const def = await this.getEntityDefinition(name, { select: ["LogicalName", "EntitySetName"] });
    if (!def.EntitySetName) {
      throw DataverseInvalidRequestError.invalidParameter(
        "logicalName",
        `table '${logicalName}' has no entity set name`
      );
    }
    this.entitySetNames?.set(name, def.EntitySetName);
    return def.EntitySetName;
  }

  /** Forget the entity set names cached by {@link getEntitySetName}. */
  clearEntitySetNameCache(): void {
    this.entitySetNamesLoad = undefined;
    this.entitySetNames = undefined;
  }

  /**
   * Create a new entity definition
   * @param entity Entity metadata to create
   * @returns Metadata ID of created entity (GUID)
   * @example
   * ```typescript
   * const metadataId = await metadataClient.createEntityDefinition({
   *   '@odata.type': 'Microsoft.Dynamics.CRM.EntityMetadata',
   *   SchemaName: 'new_CustomEntity',
   *   DisplayName: {
   *     LocalizedLabels: [{ Label: 'Custom Entity', LanguageCode: 1033 }]
   *   },
   *   DisplayCollectionName: {
   *     LocalizedLabels: [{ Label: 'Custom Entities', LanguageCode: 1033 }]
   *   },
   *   OwnershipType: 1,
   *   HasActivities: true
   * });
   * ```
   */
  async createEntityDefinition(entity: EntityMetadataCreate): Promise<string> {
    const response = await this.client
      .api("/EntityDefinitions")
      .header("Content-Type", "application/json")
      .preferRaw("return=representation")
      .post<EntityMetadata>(entity);

    if (!response.MetadataId) {
      throw new Error("Failed to retrieve entity metadata ID from response");
    }

    return response.MetadataId;
  }

  /**
   * Update an existing entity definition
   * @param logicalName Entity logical name
   * @param entity Entity metadata updates
   */
  async updateEntityDefinition(logicalName: string, entity: EntityMetadataUpdate): Promise<void> {
    await this.client
      .api(`/EntityDefinitions(LogicalName=${key(logicalName)})`)
      .header("Content-Type", "application/json")
      .header("MSCRM.MergeLabels", "true")
      .put<undefined>(entity);
  }

  /**
   * Delete an entity definition
   * @param logicalName Entity logical name
   */
  async deleteEntityDefinition(logicalName: string): Promise<void> {
    await this.client
      .api(`/EntityDefinitions(LogicalName=${key(logicalName)})`)
      .delete<undefined>();
  }

  // ==================== Attribute Definitions ====================

  /**
   * Retrieve the attributes of an entity.
   *
   * With `cast`, only attributes of that type are returned, typed accordingly, and `select` and
   * `expand` can use the type's own properties, e.g. `OptionSet` on a picklist or `Targets` on
   * a lookup. Without the cast, Dataverse rejects those (`0x80060888`).
   * @param entityLogicalName Entity logical name
   * @param options Query options (cast, select, filter, expand, labelLanguages)
   * @returns Array of attribute metadata
   * @example
   * ```typescript
   * // GET EntityDefinitions(LogicalName='account')/Attributes/Microsoft.Dynamics.CRM.PicklistAttributeMetadata
   * //   ?LabelLanguages=1033&$select=LogicalName&$expand=OptionSet($select=Options),GlobalOptionSet($select=Options)
   * const picklists = await metadataClient.getAttributeDefinitions("account", {
   *   cast: "PicklistAttributeMetadata",
   *   select: ["LogicalName"],
   *   expand: ["OptionSet($select=Options)", "GlobalOptionSet($select=Options)"],
   *   labelLanguages: 1033,
   * });
   * picklists[0].OptionSet?.Options; // typed as PicklistAttributeMetadata
   * ```
   */
  async getAttributeDefinitions<C extends AttributeMetadataCast>(
    entityLogicalName: string,
    options: AttributeQueryOptions & { cast: C }
  ): Promise<Array<AttributeMetadataByCast[C]>>;
  async getAttributeDefinitions(
    entityLogicalName: string,
    options?: AttributeQueryOptions
  ): Promise<AttributeMetadata[]>;
  async getAttributeDefinitions(
    entityLogicalName: string,
    options?: AttributeQueryOptions
  ): Promise<AttributeMetadata[]> {
    const path = `/EntityDefinitions(LogicalName=${key(entityLogicalName)})/Attributes${castSegment(options?.cast)}`;
    const response = await this.query(path, options).get<{ value: AttributeMetadata[] }>();
    return response.value;
  }

  /**
   * Retrieve a single attribute definition.
   *
   * With `cast`, the attribute is read as that type, so `select` and `expand` can use the type's
   * own properties. Dataverse answers 404 if the attribute is of another type.
   * @param entityLogicalName Entity logical name
   * @param attributeLogicalName Attribute logical name
   * @param options Query options (cast, select, expand, labelLanguages)
   * @returns Attribute metadata
   * @example
   * ```typescript
   * const industry = await metadataClient.getAttributeDefinition("account", "industrycode", {
   *   cast: "PicklistAttributeMetadata",
   *   expand: "OptionSet",
   * });
   * ```
   */
  async getAttributeDefinition<C extends AttributeMetadataCast>(
    entityLogicalName: string,
    attributeLogicalName: string,
    options: Omit<AttributeQueryOptions, "filter"> & { cast: C }
  ): Promise<AttributeMetadataByCast[C]>;
  async getAttributeDefinition(
    entityLogicalName: string,
    attributeLogicalName: string,
    options?: Omit<AttributeQueryOptions, "filter">
  ): Promise<AttributeMetadata>;
  async getAttributeDefinition(
    entityLogicalName: string,
    attributeLogicalName: string,
    options?: Omit<AttributeQueryOptions, "filter">
  ): Promise<AttributeMetadata> {
    const path = `/EntityDefinitions(LogicalName=${key(entityLogicalName)})/Attributes(LogicalName=${key(attributeLogicalName)})${castSegment(options?.cast)}`;
    return await this.query(path, options).get<AttributeMetadata>();
  }

  /**
   * Create a new attribute definition
   * @param entityLogicalName Entity logical name
   * @param attribute Attribute metadata to create
   * @returns Metadata ID of created attribute (GUID)
   */
  async createAttributeDefinition(
    entityLogicalName: string,
    attribute: AttributeMetadataCreateTypes
  ): Promise<string> {
    const response = await this.client
      .api(`/EntityDefinitions(LogicalName=${key(entityLogicalName)})/Attributes`)
      .header("Content-Type", "application/json")
      .preferRaw("return=representation")
      .post<AttributeMetadata>(attribute);

    if (!response.MetadataId) {
      throw new Error("Failed to retrieve attribute metadata ID from response");
    }

    return response.MetadataId;
  }

  /**
   * Update an existing attribute definition
   * @param entityLogicalName Entity logical name
   * @param attributeLogicalName Attribute logical name
   * @param attribute Attribute metadata updates
   */
  async updateAttributeDefinition(
    entityLogicalName: string,
    attributeLogicalName: string,
    attribute: Partial<AttributeMetadataCreateTypes>
  ): Promise<void> {
    await this.client
      .api(
        `/EntityDefinitions(LogicalName=${key(entityLogicalName)})/Attributes(LogicalName=${key(attributeLogicalName)})`
      )
      .header("Content-Type", "application/json")
      .header("MSCRM.MergeLabels", "true")
      .put<undefined>(attribute);
  }

  /**
   * Delete an attribute definition
   * @param entityLogicalName Entity logical name
   * @param attributeLogicalName Attribute logical name
   */
  async deleteAttributeDefinition(
    entityLogicalName: string,
    attributeLogicalName: string
  ): Promise<void> {
    await this.client
      .api(
        `/EntityDefinitions(LogicalName=${key(entityLogicalName)})/Attributes(LogicalName=${key(attributeLogicalName)})`
      )
      .delete<undefined>();
  }

  // ==================== Relationship Definitions ====================

  /**
   * Create a one-to-many relationship
   * @param relationship Relationship metadata to create
   * @returns Metadata ID of created relationship (GUID)
   */
  async createOneToManyRelationship(
    relationship: OneToManyRelationshipMetadataCreate
  ): Promise<string> {
    const response = await this.client
      .api("/RelationshipDefinitions")
      .header("Content-Type", "application/json")
      .preferRaw("return=representation")
      .post<OneToManyRelationshipMetadata>(relationship);

    if (!response.MetadataId) {
      throw new Error("Failed to retrieve relationship metadata ID from response");
    }

    return response.MetadataId;
  }

  /**
   * Delete a relationship definition
   * @param metadataId Relationship metadata ID (GUID)
   */
  async deleteRelationship(metadataId: string): Promise<void> {
    await this.client.api(`/RelationshipDefinitions(${metadataId})`).delete<undefined>();
  }

  /**
   * Get one-to-many relationships for an entity
   * @param entityLogicalName Entity logical name
   * @param options Query options
   * @returns Array of one-to-many relationships
   */
  async getOneToManyRelationships(
    entityLogicalName: string,
    options?: MetadataQueryOptions
  ): Promise<OneToManyRelationshipMetadata[]> {
    const response = await this.query(
      `/EntityDefinitions(LogicalName=${key(entityLogicalName)})/OneToManyRelationships`,
      options
    ).get<{ value: OneToManyRelationshipMetadata[] }>();
    return response.value;
  }

  /**
   * Get many-to-one relationships for an entity
   * @param entityLogicalName Entity logical name
   * @param options Query options
   * @returns Array of many-to-one relationships
   */
  async getManyToOneRelationships(
    entityLogicalName: string,
    options?: MetadataQueryOptions
  ): Promise<OneToManyRelationshipMetadata[]> {
    const response = await this.query(
      `/EntityDefinitions(LogicalName=${key(entityLogicalName)})/ManyToOneRelationships`,
      options
    ).get<{ value: OneToManyRelationshipMetadata[] }>();
    return response.value;
  }

  /**
   * Get many-to-many relationships for an entity
   * @param entityLogicalName Entity logical name
   * @param options Query options
   * @returns Array of many-to-many relationships
   */
  async getManyToManyRelationships(
    entityLogicalName: string,
    options?: MetadataQueryOptions
  ): Promise<ManyToManyRelationshipMetadata[]> {
    const response = await this.query(
      `/EntityDefinitions(LogicalName=${key(entityLogicalName)})/ManyToManyRelationships`,
      options
    ).get<{ value: ManyToManyRelationshipMetadata[] }>();
    return response.value;
  }

  /**
   * Get a relationship by schema name
   * @param schemaName Relationship schema name
   * @param options Query options
   * @returns Relationship metadata
   */
  async getRelationshipBySchemaName(
    schemaName: string,
    options?: Omit<MetadataQueryOptions, "filter">
  ): Promise<OneToManyRelationshipMetadata | ManyToManyRelationshipMetadata> {
    return await this.query(`/RelationshipDefinitions(SchemaName=${key(schemaName)})`, options).get<
      OneToManyRelationshipMetadata | ManyToManyRelationshipMetadata
    >();
  }

  /**
   * Get a relationship by metadata ID
   * @param metadataId Relationship metadata ID
   * @param options Query options
   * @returns Relationship metadata
   */
  async getRelationshipByMetadataId(
    metadataId: string,
    options?: Omit<MetadataQueryOptions, "filter">
  ): Promise<OneToManyRelationshipMetadata | ManyToManyRelationshipMetadata> {
    return await this.query(`/RelationshipDefinitions(${metadataId})`, options).get<
      OneToManyRelationshipMetadata | ManyToManyRelationshipMetadata
    >();
  }

  /**
   * Create a many-to-many relationship
   * @param relationship Relationship metadata to create
   * @returns Metadata ID of created relationship (GUID)
   * @example
   * ```typescript
   * const metadataId = await metadataClient.createManyToManyRelationship({
   *   '@odata.type': 'Microsoft.Dynamics.CRM.ManyToManyRelationshipMetadata',
   *   SchemaName: 'new_account_contact',
   *   Entity1LogicalName: 'account',
   *   Entity2LogicalName: 'contact',
   *   IntersectEntityName: 'new_account_contact'
   * });
   * ```
   */
  async createManyToManyRelationship(
    relationship: ManyToManyRelationshipMetadataCreate
  ): Promise<string> {
    const response = await this.client
      .api("/RelationshipDefinitions")
      .header("Content-Type", "application/json")
      .preferRaw("return=representation")
      .post<ManyToManyRelationshipMetadata>(relationship);

    if (!response.MetadataId) {
      throw new Error("Failed to retrieve relationship metadata ID from response");
    }

    return response.MetadataId;
  }

  /**
   * Update an existing one-to-many relationship
   * @param schemaName Relationship schema name
   * @param relationship Relationship metadata updates
   */
  async updateOneToManyRelationship(
    schemaName: string,
    relationship: OneToManyRelationshipMetadataUpdate
  ): Promise<void> {
    await this.client
      .api(`/RelationshipDefinitions(SchemaName=${key(schemaName)})`)
      .header("Content-Type", "application/json")
      .header("MSCRM.MergeLabels", "true")
      .put<undefined>(relationship);
  }

  /**
   * Update an existing many-to-many relationship
   * @param schemaName Relationship schema name
   * @param relationship Relationship metadata updates
   */
  async updateManyToManyRelationship(
    schemaName: string,
    relationship: ManyToManyRelationshipMetadataUpdate
  ): Promise<void> {
    await this.client
      .api(`/RelationshipDefinitions(SchemaName=${key(schemaName)})`)
      .header("Content-Type", "application/json")
      .header("MSCRM.MergeLabels", "true")
      .put<undefined>(relationship);
  }

  /**
   * Delete a relationship by schema name
   * @param schemaName Relationship schema name
   */
  async deleteRelationshipBySchemaName(schemaName: string): Promise<void> {
    await this.client
      .api(`/RelationshipDefinitions(SchemaName=${key(schemaName)})`)
      .delete<undefined>();
  }

  // ==================== Global Option Sets ====================

  /**
   * Get all global option sets
   * @param options Query options
   * @returns Array of global option set metadata
   */
  async getGlobalOptionSets(options?: MetadataQueryOptions): Promise<OptionSetMetadata[]> {
    const response = await this.query("/GlobalOptionSetDefinitions", options).get<{
      value: OptionSetMetadata[];
    }>();
    return response.value;
  }

  /**
   * Get a global option set by name or metadata ID
   * @param nameOrMetadataId Option set name or metadata ID
   * @param options Query options
   * @returns Option set metadata
   */
  async getGlobalOptionSet(
    nameOrMetadataId: string,
    options?: Omit<MetadataQueryOptions, "filter">
  ): Promise<OptionSetMetadata> {
    // If it looks like a GUID, use MetadataId, otherwise use Name
    const isGuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(
      nameOrMetadataId
    );
    const path = isGuid
      ? `/GlobalOptionSetDefinitions(${nameOrMetadataId})`
      : `/GlobalOptionSetDefinitions(Name=${key(nameOrMetadataId)})`;

    return await this.query(path, options).get<OptionSetMetadata>();
  }

  /**
   * Create a global option set
   * @param optionSet Option set metadata to create
   * @returns Metadata ID of created option set (GUID)
   * @example
   * ```typescript
   * const metadataId = await metadataClient.createGlobalOptionSet({
   *   '@odata.type': 'Microsoft.Dynamics.CRM.OptionSetMetadata',
   *   Name: 'new_colors',
   *   DisplayName: {
   *     LocalizedLabels: [{ Label: 'Colors', LanguageCode: 1033 }]
   *   },
   *   Options: [
   *     { Value: 1, Label: { LocalizedLabels: [{ Label: 'Red', LanguageCode: 1033 }] } },
   *     { Value: 2, Label: { LocalizedLabels: [{ Label: 'Blue', LanguageCode: 1033 }] } }
   *   ]
   * });
   * ```
   */
  async createGlobalOptionSet(optionSet: OptionSetMetadataCreate): Promise<string> {
    const response = await this.client
      .api("/GlobalOptionSetDefinitions")
      .header("Content-Type", "application/json")
      .preferRaw("return=representation")
      .post<OptionSetMetadata>(optionSet);

    if (!response.MetadataId) {
      throw new Error("Failed to retrieve option set metadata ID from response");
    }

    return response.MetadataId;
  }

  /**
   * Update a global option set
   * @param nameOrMetadataId Option set name or metadata ID
   * @param optionSet Option set metadata updates
   */
  async updateGlobalOptionSet(
    nameOrMetadataId: string,
    optionSet: Partial<OptionSetMetadata>
  ): Promise<void> {
    const isGuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(
      nameOrMetadataId
    );
    const path = isGuid
      ? `/GlobalOptionSetDefinitions(${nameOrMetadataId})`
      : `/GlobalOptionSetDefinitions(Name=${key(nameOrMetadataId)})`;

    await this.client
      .api(path)
      .header("Content-Type", "application/json")
      .header("MSCRM.MergeLabels", "true")
      .put<undefined>(optionSet);
  }

  /**
   * Delete a global option set
   * @param nameOrMetadataId Option set name or metadata ID
   */
  async deleteGlobalOptionSet(nameOrMetadataId: string): Promise<void> {
    const isGuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(
      nameOrMetadataId
    );
    const path = isGuid
      ? `/GlobalOptionSetDefinitions(${nameOrMetadataId})`
      : `/GlobalOptionSetDefinitions(Name=${key(nameOrMetadataId)})`;

    await this.client.api(path).delete<undefined>();
  }

  // ==================== Option Value Operations ====================

  /**
   * Insert an option value into a local or global option set
   * @param params Insert option value parameters
   * @returns New option value
   * @example
   * ```typescript
   * // For local option set
   * const result = await metadataClient.insertOptionValue({
   *   EntityLogicalName: 'account',
   *   AttributeLogicalName: 'new_category',
   *   Label: { LocalizedLabels: [{ Label: 'Enterprise', LanguageCode: 1033 }] },
   *   Value: 100000002
   * });
   *
   * // For global option set
   * const result = await metadataClient.insertOptionValue({
   *   OptionSetName: 'new_colors',
   *   Label: { LocalizedLabels: [{ Label: 'Green', LanguageCode: 1033 }] },
   *   Value: 3
   * });
   * ```
   */
  async insertOptionValue(params: InsertOptionValueParams): Promise<InsertOptionValueResponse> {
    return await this.client.api("/InsertOptionValue").post<InsertOptionValueResponse>(params);
  }

  /**
   * Update an option value in a local or global option set
   * @param params Update option value parameters
   */
  async updateOptionValue(params: UpdateOptionValueParams): Promise<void> {
    await this.client.api("/UpdateOptionValue").post<undefined>(params);
  }

  /**
   * Delete an option value from a local or global option set
   * @param params Delete option value parameters
   */
  async deleteOptionValue(params: DeleteOptionValueParams): Promise<void> {
    await this.client.api("/DeleteOptionValue").post<undefined>(params);
  }

  /**
   * Reorder options in a local or global option set
   * @param params Order option parameters
   */
  async orderOptions(params: OrderOptionParams): Promise<void> {
    await this.client.api("/OrderOption").post<undefined>(params);
  }

  /**
   * Insert a status value (statuscode option)
   * @param params Insert status value parameters
   * @returns New option value
   */
  async insertStatusValue(params: InsertStatusValueParams): Promise<InsertStatusValueResponse> {
    return await this.client.api("/InsertStatusValue").post<InsertStatusValueResponse>(params);
  }

  // ==================== Polymorphic Lookups ====================

  /**
   * Create a customer relationship (polymorphic lookup to account and contact)
   * @param params Customer relationship parameters
   * @returns Attribute ID and relationship IDs
   */
  async createCustomerRelationship(
    params: CreateCustomerRelationshipsParams
  ): Promise<CreateCustomerRelationshipsResponse> {
    return await this.client
      .api("/CreateCustomerRelationships")
      .post<CreateCustomerRelationshipsResponse>(params);
  }

  /**
   * Create a polymorphic lookup attribute
   * @param params Polymorphic lookup parameters
   * @returns Attribute ID and relationship IDs
   * @example
   * ```typescript
   * const result = await metadataClient.createPolymorphicLookup({
   *   Lookup: {
   *     '@odata.type': 'Microsoft.Dynamics.CRM.ComplexLookupAttributeMetadata',
   *     SchemaName: 'new_RegardingObjectId',
   *     DisplayName: { LocalizedLabels: [{ Label: 'Regarding', LanguageCode: 1033 }] },
   *     Targets: ['account', 'contact', 'lead']
   *   },
   *   OneToManyRelationships: [
   *     // one relationship definition per target entity
   *   ]
   * });
   * ```
   */
  async createPolymorphicLookup(
    params: CreatePolymorphicLookupAttributeParams
  ): Promise<CreatePolymorphicLookupAttributeResponse> {
    return await this.client
      .api("/CreatePolymorphicLookupAttribute")
      .post<CreatePolymorphicLookupAttributeResponse>(params);
  }

  // ==================== Relationship Eligibility ====================

  /**
   * Check if an entity can be referenced (primary in 1:N)
   * @param entityName Entity logical name
   * @returns Whether the entity can be referenced
   */
  async canBeReferenced(entityName: string): Promise<boolean> {
    const response = await this.client
      .api(`/CanBeReferenced(EntityName='${entityName}')`)
      .get<CanBeReferencedResponse>();
    return response.CanBeReferenced ?? false;
  }

  /**
   * Check if an entity can be referencing (related in 1:N)
   * @param entityName Entity logical name
   * @returns Whether the entity can be referencing
   */
  async canBeReferencing(entityName: string): Promise<boolean> {
    const response = await this.client
      .api(`/CanBeReferencing(EntityName='${entityName}')`)
      .get<CanBeReferencingResponse>();
    return response.CanBeReferencing ?? false;
  }

  /**
   * Check if an entity can participate in many-to-many
   * @param entityName Entity logical name
   * @returns Whether the entity can participate in N:N
   */
  async canManyToMany(entityName: string): Promise<boolean> {
    const response = await this.client
      .api(`/CanManyToMany(EntityName='${entityName}')`)
      .get<CanManyToManyResponse>();
    return response.CanManyToMany ?? false;
  }

  /**
   * Get entities that can reference the specified entity
   * @param referencedEntityName Referenced entity name
   * @returns Array of entity names that can reference the specified entity
   */
  async getValidReferencingEntities(referencedEntityName: string): Promise<string[]> {
    const response = await this.client
      .api(`/GetValidReferencingEntities(ReferencedEntityName=${key(referencedEntityName)})`)
      .get<GetValidReferencingEntitiesResponse>();
    return response.EntityNames ?? [];
  }

  /**
   * Get entities that the specified entity can reference
   * @param referencingEntityName Referencing entity name
   * @returns Array of entity names that can be referenced
   */
  async getValidReferencedEntities(referencingEntityName: string): Promise<string[]> {
    const response = await this.client
      .api(`/GetValidReferencedEntities(ReferencingEntityName=${key(referencingEntityName)})`)
      .get<GetValidReferencedEntitiesResponse>();
    return response.EntityNames ?? [];
  }

  /**
   * Get all entities that can participate in many-to-many relationships
   * @returns Array of entity names
   */
  async getValidManyToMany(): Promise<string[]> {
    const response = await this.client
      .api("/GetValidManyToMany()")
      .get<GetValidManyToManyResponse>();
    return response.EntityNames ?? [];
  }

  // ==================== Metadata Change Tracking ====================

  /**
   * Retrieve metadata changes since a client version stamp
   * @param query Entity query expression
   * @param clientVersionStamp Client version stamp from previous call
   * @param deletedMetadataFilters Types of deleted metadata to return
   * @returns Metadata changes response with server version stamp
   * @example
   * ```typescript
   * const result = await metadataClient.retrieveMetadataChanges({
   *   Criteria: {
   *     FilterOperator: 'And',
   *     Conditions: [
   *       {
   *         PropertyName: 'LogicalName',
   *         ConditionOperator: 'Equals',
   *         Value: 'account'
   *       }
   *     ]
   *   },
   *   Properties: {
   *     AllProperties: false,
   *     PropertyNames: ['LogicalName', 'DisplayName', 'SchemaName']
   *   }
   * });
   * // Store result.ServerVersionStamp for next call
   * ```
   */
  async retrieveMetadataChanges(
    query: EntityQueryExpression,
    clientVersionStamp?: string,
    deletedMetadataFilters?: DeletedMetadataFilters
  ): Promise<RetrieveMetadataChangesResponse> {
    const params: {
      Query: EntityQueryExpression;
      ClientVersionStamp?: string;
      DeletedMetadataFilters?: DeletedMetadataFilters;
    } = {
      Query: query,
    };

    if (clientVersionStamp) {
      params.ClientVersionStamp = clientVersionStamp;
    }

    if (deletedMetadataFilters) {
      params.DeletedMetadataFilters = deletedMetadataFilters;
    }

    return await this.client
      .api("/RetrieveMetadataChanges")
      .post<RetrieveMetadataChangesResponse>(params);
  }

  // ==================== Internals ====================

  /** A GET builder for `path` with the query options applied. */
  private query(path: string, options: MetadataQueryOptions | undefined): DataverseRequestBuilder {
    const languages = options?.labelLanguages === undefined ? [] : [options.labelLanguages].flat();
    // LabelLanguages is a Dataverse query option, not an OData one; the builder has no setter.
    const url = languages.length > 0 ? `${path}?LabelLanguages=${languages.join(",")}` : path;

    let builder = this.client.api(url);
    if (options?.select?.length) builder = builder.select(...options.select);
    if (options?.filter) builder = builder.filter(options.filter);
    if (options?.expand?.length) builder = builder.expand(...[options.expand].flat());
    return builder;
  }

  /** Load every table's entity set name once; a failed load is not cached. */
  private loadEntitySetNames(): Promise<Map<string, string>> {
    this.entitySetNamesLoad ??= this.query("/EntityDefinitions", {
      select: ["LogicalName", "EntitySetName"],
    })
      .get<{ value: Array<Pick<EntityMetadata, "LogicalName" | "EntitySetName">> }>()
      .then((response) => {
        const names = new Map<string, string>();
        for (const e of response.value) {
          if (e.LogicalName && e.EntitySetName) names.set(e.LogicalName, e.EntitySetName);
        }
        this.entitySetNames = names;
        return names;
      })
      .catch((err: unknown) => {
        this.entitySetNamesLoad = undefined;
        throw err;
      });
    return this.entitySetNamesLoad;
  }
}

/**
 * A string key value as an OData literal for a URL path, e.g. `LogicalName='account'`: embedded
 * `'` doubled, as OData requires, and characters that would end the path (`/ ? # %` …) escaped.
 */
function key(value: string): string {
  return `'${encodeURIComponent(value.replace(/'/g, "''"))}'`;
}

/** The type-cast path segment for an attribute query, or `""`. */
function castSegment(cast: AttributeMetadataCast | undefined): string {
  return cast ? `/Microsoft.Dynamics.CRM.${cast}` : "";
}
