/**
 * Metadata client for managing Dataverse metadata (entities, attributes, relationships)
 */

import type { DataverseClient } from "@mohsinonxrm/dataverse-sdk-core";
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
  select?: string[];
  filter?: string;
  expand?: string;
}

/**
 * Client for interacting with Dataverse metadata API
 */
export class MetadataClient {
  private readonly client: DataverseClient;

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
    let builder = this.client.api("/EntityDefinitions");

    if (options?.select) {
      builder = builder.select(...options.select);
    }
    if (options?.filter) {
      builder = builder.filter(options.filter);
    }
    if (options?.expand) {
      builder = builder.expand(options.expand);
    }

    const response = await builder.get<{ value: EntityMetadata[] }>();
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
    let builder = this.client.api(`/EntityDefinitions(LogicalName='${logicalName}')`);

    if (options?.select) {
      builder = builder.select(...options.select);
    }
    if (options?.expand) {
      builder = builder.expand(options.expand);
    }

    return await builder.get<EntityMetadata>();
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
      .api(`/EntityDefinitions(LogicalName='${logicalName}')`)
      .header("Content-Type", "application/json")
      .header("MSCRM.MergeLabels", "true")
      .put<undefined>(entity);
  }

  /**
   * Delete an entity definition
   * @param logicalName Entity logical name
   */
  async deleteEntityDefinition(logicalName: string): Promise<void> {
    await this.client.api(`/EntityDefinitions(LogicalName='${logicalName}')`).delete<undefined>();
  }

  // ==================== Attribute Definitions ====================

  /**
   * Retrieve all attributes for an entity
   * @param entityLogicalName Entity logical name
   * @param options Query options (select, filter)
   * @returns Array of attribute metadata
   */
  async getAttributeDefinitions(
    entityLogicalName: string,
    options?: Omit<MetadataQueryOptions, "expand">
  ): Promise<AttributeMetadata[]> {
    let builder = this.client.api(
      `/EntityDefinitions(LogicalName='${entityLogicalName}')/Attributes`
    );

    if (options?.select) {
      builder = builder.select(...options.select);
    }
    if (options?.filter) {
      builder = builder.filter(options.filter);
    }

    const response = await builder.get<{ value: AttributeMetadata[] }>();
    return response.value;
  }

  /**
   * Retrieve a single attribute definition
   * @param entityLogicalName Entity logical name
   * @param attributeLogicalName Attribute logical name
   * @param options Query options (select)
   * @returns Attribute metadata
   */
  async getAttributeDefinition(
    entityLogicalName: string,
    attributeLogicalName: string,
    options?: Omit<MetadataQueryOptions, "filter" | "expand">
  ): Promise<AttributeMetadata> {
    let builder = this.client.api(
      `/EntityDefinitions(LogicalName='${entityLogicalName}')/Attributes(LogicalName='${attributeLogicalName}')`
    );

    if (options?.select) {
      builder = builder.select(...options.select);
    }

    return await builder.get<AttributeMetadata>();
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
      .api(`/EntityDefinitions(LogicalName='${entityLogicalName}')/Attributes`)
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
        `/EntityDefinitions(LogicalName='${entityLogicalName}')/Attributes(LogicalName='${attributeLogicalName}')`
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
        `/EntityDefinitions(LogicalName='${entityLogicalName}')/Attributes(LogicalName='${attributeLogicalName}')`
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
    let builder = this.client.api(
      `/EntityDefinitions(LogicalName='${entityLogicalName}')/OneToManyRelationships`
    );

    if (options?.select) {
      builder = builder.select(...options.select);
    }
    if (options?.filter) {
      builder = builder.filter(options.filter);
    }

    const response = await builder.get<{ value: OneToManyRelationshipMetadata[] }>();
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
    let builder = this.client.api(
      `/EntityDefinitions(LogicalName='${entityLogicalName}')/ManyToOneRelationships`
    );

    if (options?.select) {
      builder = builder.select(...options.select);
    }
    if (options?.filter) {
      builder = builder.filter(options.filter);
    }

    const response = await builder.get<{ value: OneToManyRelationshipMetadata[] }>();
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
    let builder = this.client.api(
      `/EntityDefinitions(LogicalName='${entityLogicalName}')/ManyToManyRelationships`
    );

    if (options?.select) {
      builder = builder.select(...options.select);
    }
    if (options?.filter) {
      builder = builder.filter(options.filter);
    }

    const response = await builder.get<{ value: ManyToManyRelationshipMetadata[] }>();
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
    let builder = this.client.api(`/RelationshipDefinitions(SchemaName='${schemaName}')`);

    if (options?.select) {
      builder = builder.select(...options.select);
    }
    if (options?.expand) {
      builder = builder.expand(options.expand);
    }

    return await builder.get<OneToManyRelationshipMetadata | ManyToManyRelationshipMetadata>();
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
    let builder = this.client.api(`/RelationshipDefinitions(${metadataId})`);

    if (options?.select) {
      builder = builder.select(...options.select);
    }
    if (options?.expand) {
      builder = builder.expand(options.expand);
    }

    return await builder.get<OneToManyRelationshipMetadata | ManyToManyRelationshipMetadata>();
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
      .api(`/RelationshipDefinitions(SchemaName='${schemaName}')`)
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
      .api(`/RelationshipDefinitions(SchemaName='${schemaName}')`)
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
      .api(`/RelationshipDefinitions(SchemaName='${schemaName}')`)
      .delete<undefined>();
  }

  // ==================== Global Option Sets ====================

  /**
   * Get all global option sets
   * @param options Query options
   * @returns Array of global option set metadata
   */
  async getGlobalOptionSets(options?: MetadataQueryOptions): Promise<OptionSetMetadata[]> {
    let builder = this.client.api("/GlobalOptionSetDefinitions");

    if (options?.select) {
      builder = builder.select(...options.select);
    }
    if (options?.filter) {
      builder = builder.filter(options.filter);
    }
    if (options?.expand) {
      builder = builder.expand(options.expand);
    }

    const response = await builder.get<{ value: OptionSetMetadata[] }>();
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
      : `/GlobalOptionSetDefinitions(Name='${nameOrMetadataId}')`;

    let builder = this.client.api(path);

    if (options?.select) {
      builder = builder.select(...options.select);
    }
    if (options?.expand) {
      builder = builder.expand(options.expand);
    }

    return await builder.get<OptionSetMetadata>();
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
      : `/GlobalOptionSetDefinitions(Name='${nameOrMetadataId}')`;

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
      : `/GlobalOptionSetDefinitions(Name='${nameOrMetadataId}')`;

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
   * Check if an entity can be the primary (referenced) table in a 1:N relationship.
   * Sends the `CanBeReferenced` action: `POST /CanBeReferenced` with `{ "EntityName": … }`.
   * @param entityName Entity logical name
   * @returns Whether the entity can be referenced
   */
  async canBeReferenced(entityName: string): Promise<boolean> {
    const response = await this.client
      .api("/CanBeReferenced")
      .post<CanBeReferencedResponse | undefined>({ EntityName: entityName });
    return response?.CanBeReferenced ?? false;
  }

  /**
   * Check if an entity can be the related (referencing) table in a 1:N relationship.
   * Sends the `CanBeReferencing` action: `POST /CanBeReferencing` with `{ "EntityName": … }`.
   * @param entityName Entity logical name
   * @returns Whether the entity can be referencing
   */
  async canBeReferencing(entityName: string): Promise<boolean> {
    const response = await this.client
      .api("/CanBeReferencing")
      .post<CanBeReferencingResponse | undefined>({ EntityName: entityName });
    return response?.CanBeReferencing ?? false;
  }

  /**
   * Check if an entity can take part in a many-to-many relationship.
   * Sends the `CanManyToMany` action: `POST /CanManyToMany` with `{ "EntityName": … }`.
   * @param entityName Entity logical name
   * @returns Whether the entity can participate in N:N
   */
  async canManyToMany(entityName: string): Promise<boolean> {
    const response = await this.client
      .api("/CanManyToMany")
      .post<CanManyToManyResponse | undefined>({ EntityName: entityName });
    return response?.CanManyToMany ?? false;
  }

  /**
   * Get entities that can reference the specified entity
   * @param referencedEntityName Referenced entity name
   * @returns Array of entity names that can reference the specified entity
   */
  async getValidReferencingEntities(referencedEntityName: string): Promise<string[]> {
    const response = await this.client
      .api(`/GetValidReferencingEntities(ReferencedEntityName='${referencedEntityName}')`)
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
      .api(`/GetValidReferencedEntities(ReferencingEntityName='${referencingEntityName}')`)
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
   * Retrieve metadata, or the changes to it since an earlier call.
   *
   * `RetrieveMetadataChanges` is a Web API **function**, so this sends a GET with parameter
   * aliases: `GET /RetrieveMetadataChanges(Query=@p1,ClientVersionStamp=@p2,…)?@p1=<json>`.
   * Keep the returned `ServerVersionStamp` and pass it as `clientVersionStamp` next time to get
   * only what changed since then.
   *
   * Dataverse reads the enum members in the query (`FilterOperator`, `ConditionOperator`) only
   * by name (`"And"`, `"Equals"`), so numeric values are sent as their names. A condition's
   * `Value` is `{ Type, Value }`, e.g. `{ Type: "System.String", Value: "account" }`.
   *
   * @param query Entity query expression
   * @param clientVersionStamp `ServerVersionStamp` from a previous call
   * @param deletedMetadataFilters With a version stamp, which deleted metadata to return: a
   *   member name (`"Default"`, `"Attribute"`, `"Relationship"`, `"Label"`, `"OptionSet"`,
   *   `"All"`), a comma-separated list of names, or the numeric flag value
   * @returns The matching metadata, any deleted metadata, and the new `ServerVersionStamp`
   * @example
   * ```typescript
   * const query = {
   *   Criteria: {
   *     FilterOperator: "And",
   *     Conditions: [
   *       {
   *         PropertyName: "LogicalName",
   *         ConditionOperator: "Equals",
   *         Value: { Type: "System.String", Value: "account" },
   *       },
   *     ],
   *   },
   *   Properties: { AllProperties: false, PropertyNames: ["LogicalName", "SchemaName"] },
   * };
   * const first = await metadataClient.retrieveMetadataChanges(query);
   * // Later: only what changed since the first call
   * const changes = await metadataClient.retrieveMetadataChanges(query, first.ServerVersionStamp);
   * ```
   */
  async retrieveMetadataChanges(
    query: EntityQueryExpression,
    clientVersionStamp?: string,
    deletedMetadataFilters?: DeletedMetadataFilters | string
  ): Promise<RetrieveMetadataChangesResponse> {
    const aliases = ["Query=@p1"];
    const values = [`@p1=${encodeURIComponent(JSON.stringify(query, enumNameReplacer))}`];

    if (clientVersionStamp) {
      aliases.push("ClientVersionStamp=@p2");
      values.push(`@p2=${encodeURIComponent(stringLiteral(clientVersionStamp))}`);
    }

    if (deletedMetadataFilters !== undefined) {
      aliases.push("DeletedMetadataFilters=@p3");
      const literal = `Microsoft.Dynamics.CRM.DeletedMetadataFilters'${String(deletedMetadataFilters)}'`;
      values.push(`@p3=${encodeURIComponent(literal)}`);
    }

    return await this.client
      .api(`/RetrieveMetadataChanges(${aliases.join(",")})?${values.join("&")}`)
      .get<RetrieveMetadataChangesResponse>();
  }
}

/** An OData string literal: wrapped in single quotes, with embedded quotes doubled. */
function stringLiteral(value: string): string {
  return `'${value.replace(/'/g, "''")}'`;
}

const LOGICAL_OPERATORS = ["And", "Or"];
const CONDITION_OPERATORS = ["Equals", "NotEquals", "In", "NotIn", "GreaterThan", "LessThan"];

/**
 * JSON replacer for metadata queries. Dataverse reads an enum member in a JSON parameter only
 * by name ("Cannot read the value '0' as a quoted JSON string value"), so numeric
 * `FilterOperator` and `ConditionOperator` values are written as their member names.
 */
function enumNameReplacer(key: string, value: unknown): unknown {
  if (typeof value !== "number") return value;
  if (key === "FilterOperator") return LOGICAL_OPERATORS[value] ?? value;
  if (key === "ConditionOperator") return CONDITION_OPERATORS[value] ?? value;
  return value;
}
