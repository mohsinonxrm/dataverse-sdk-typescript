/**
 * Portions of this file are adapted from dataverse-gen by Scott Durow
 * (https://github.com/scottdurow/dataverse-gen), Copyright (c) 2020 Scott Durow, licensed under
 * the MIT License. See THIRD_PARTY_NOTICES.md in this package for the notice.
 */

import * as xmljs from "xml-js";
import type {
  DataverseGenConfig,
  EntityType,
  EnumType,
  ActionType,
  FunctionType,
  ComplexType,
  NavigationPropertyType,
  PropertyType,
  TypeScriptType,
  ParameterType,
} from "./types.js";
import type {
  AttributeMetadataDetail,
  EntityMetadataDetail,
  MetadataService,
  RetrieveMetadataChangesResponse,
} from "./metadata-service.js";
import {
  deletedIds,
  GENERATOR_VERSION,
  metadataSource,
  readStamp,
  withoutNulls,
} from "./incremental.js";

/**
 * Schema model that parses CSDL $metadata and builds type definitions
 */
export class SchemaModel {
  EntityTypes: EntityType[] = [];
  EnumTypes: EnumType[] = [];
  Actions: ActionType[] = [];
  Functions: FunctionType[] = [];
  ComplexTypes: ComplexType[] = [];

  /**
   * Messages about the configuration, such as a listed function that is not generated. The CLI
   * prints them after generating.
   */
  Warnings: string[] = [];

  /**
   * Names of the Web API's query functions (`LastXDays`, `Between`, `EqualUserId`, …). `$metadata`
   * declares them as functions, but Dataverse runs them only inside `$filter`, so they are not
   * generated: use `queryFunctions` from `@mohsinonxrm/dataverse-sdk-functions` instead.
   */
  QueryFunctionNames = new Set<string>();

  /**
   * Names of every entity type in $metadata, before filtering. Generated code types references
   * to entities that were not generated (and abstract ones such as `crmbaseentity`) as `IEntity`.
   */
  AllEntityTypeNames = new Set<string>();

  /**
   * After {@link generate}: each generated table's metadata from RetrieveMetadataChanges, by
   * logical name. Incremental generation keeps it in the stamp file (#429).
   */
  TableMetadata = new Map<string, EntityMetadataDetail>();

  /**
   * After {@link generate}: the `ServerVersionStamp` the metadata in {@link TableMetadata} is
   * current as of, for the next incremental run's `ClientVersionStamp` (#429). `undefined` when
   * Dataverse returned none.
   */
  MetadataVersionStamp: string | undefined;

  /**
   * After {@link generate}: the tables whose metadata was read from Dataverse in this run. With
   * `output.incremental`, the tables that changed since the last run (or every table, when there
   * is nothing to reuse); otherwise every table.
   */
  FetchedTables: string[] = [];

  /**
   * After {@link generate} in all-tables mode: the entity types RetrieveMetadataChanges has no
   * table for, which weren't generated.
   */
  SkippedTables: string[] = [];

  /** Entity types that are tables: not abstract, and with an entity set. */
  private tableEntityTypeNames = new Set<string>();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private metadata: any;

  constructor(
    private metadataService: MetadataService,
    private config: DataverseGenConfig
  ) {}

  /**
   * Load and parse EDMX metadata
   */
  async loadEdmxMetadata(): Promise<void> {
    const metadataXml = await this.metadataService.getEdmxMetadata();
    const metadataJson = xmljs.xml2json(metadataXml, {
      compact: true,
      spaces: 0,
    });
    this.metadata = JSON.parse(metadataJson);

    this.readEnums();
    this.readEntityTypes();
    this.readComplexTypes();
    this.readActions();
    this.readFunctions();
  }

  /**
   * Generate complete model with filtering and enrichment
   */
  async generate(): Promise<void> {
    await this.loadEdmxMetadata();
    this.filter();
    await this.enrichWithDetailedMetadata();
    this.resolveTypes();
  }

  /**
   * Apply configuration filtering
   */
  private filter(): void {
    const { entities, actions, functions } = this.config;

    if (entities && entities.length > 0) {
      this.EntityTypes = this.EntityTypes.filter((e) => entities.includes(e.LogicalName));
    } else {
      // "All entities" means all tables: abstract types (crmbaseentity, principal) and types
      // without an entity set have no RetrieveMetadataChanges entry and nothing to query.
      this.EntityTypes = this.EntityTypes.filter((e) => this.tableEntityTypeNames.has(e.Name));
    }

    if (actions && actions.length > 0) {
      this.Actions = this.Actions.filter((a) => actions.includes(a.Name));
    }

    // Query functions can't be called on their own (GET /LastXDays(...) is a 404), so they are
    // never generated, even when listed.
    this.Functions = this.Functions.filter((f) => !this.QueryFunctionNames.has(f.Name));
    if (functions && functions.length > 0) {
      const skipped = functions.filter((name) => this.QueryFunctionNames.has(name));
      if (skipped.length > 0) {
        this.Warnings.push(
          `Not generated: ${skipped.join(", ")}. Query functions run only inside $filter; ` +
            `use queryFunctions from @mohsinonxrm/dataverse-sdk-functions instead.`
        );
      }
      this.Functions = this.Functions.filter((f) => functions.includes(f.Name));
    }
  }

  /**
   * Enrich entity metadata with detailed attribute information from RetrieveMetadataChanges
   * Reference: scottdurow/dataverse-gen SchemaModel.ts#L138-L213
   */
  private async enrichWithDetailedMetadata(): Promise<void> {
    this.TableMetadata.clear();
    this.SkippedTables = [];
    this.FetchedTables = [];
    this.MetadataVersionStamp = undefined;
    if (this.EntityTypes.length === 0) return;

    const allTables = !this.config.entities || this.config.entities.length === 0;
    const kept = await this.keptMetadata(allTables);
    // The version stamp of a run that read everything is that of its first request: a change
    // made while the run reads the other tables is newer, so the next run asks about it again.
    let stampTaken = kept !== undefined;
    const skipped: string[] = [];
    for (const entityType of [...this.EntityTypes]) {
      let detail: EntityMetadataDetail | undefined;
      if (kept?.tables.has(entityType.LogicalName)) {
        detail = kept.tables.get(entityType.LogicalName);
      } else if (!kept?.skipped.has(entityType.LogicalName)) {
        const response = await this.metadataService.getEntityMetadata(entityType.LogicalName);
        this.FetchedTables.push(entityType.LogicalName);
        if (!stampTaken) {
          this.MetadataVersionStamp = response.ServerVersionStamp;
          stampTaken = true;
        }
        const first = response.EntityMetadata?.[0];
        detail = first ? withoutNulls(first) : undefined;
      }

      if (!detail) {
        if (allTables) {
          // All-tables mode (#360): an entity type RetrieveMetadataChanges doesn't know isn't
          // generated (references to it are typed IEntity), instead of failing the whole run.
          skipped.push(entityType.LogicalName);
          this.EntityTypes = this.EntityTypes.filter((e) => e !== entityType);
          continue;
        }
        throw new Error(
          `${entityType.LogicalName} is not a Dataverse entity, remove it from the .dataverse-gen.json`
        );
      }
      this.TableMetadata.set(entityType.LogicalName, detail);

      const entityMetadata = canonicalOrder(detail);

      // Set metadata properties not available in EDMX
      entityType.SchemaName = entityMetadata.SchemaName ?? entityType.LogicalName;
      entityType.EntitySetName = entityMetadata.EntitySetName ?? entityType.LogicalName + "s";
      if (entityMetadata.PrimaryNameAttribute) {
        entityType.PrimaryNameAttribute = entityMetadata.PrimaryNameAttribute;
      }

      // Convert Keys metadata to EntityKeyType
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      entityType.Keys = (entityMetadata.Keys ?? []).map((key: any) => ({
        LogicalName: key.LogicalName,
        SchemaName: key.SchemaName,
        DisplayName: this.extractLabel(key.DisplayName),
        KeyAttributes: key.KeyAttributes,
        EntityLogicalName: key.EntityLogicalName,
        MetadataId: key.MetadataId,
      }));

      // Re-process properties with detailed metadata
      if (!entityMetadata.Attributes) continue;

      for (const attribute of entityMetadata.Attributes) {
        const logicalName = attribute.LogicalName ?? "";

        // Find corresponding property in entity type
        const existingProp = entityType.Properties.find((p) => p.Name === logicalName);

        if (!existingProp) continue;

        // Enrich with metadata
        existingProp.SchemaName = attribute.SchemaName ?? logicalName;
        existingProp.AttributeType = attribute.AttributeType;
        // RequiredLevel.Value is the member name ("ApplicationRequired"), not a number (#325).
        const requiredLevel = attribute.RequiredLevel?.Value;
        existingProp.IsRequired = requiredLevel === "ApplicationRequired";
        existingProp.RequiredLevel =
          requiredLevel && requiredLevel !== "None" ? requiredLevel : undefined;
        existingProp.AttributeOf = attribute.AttributeOf;
        existingProp.SourceType = attribute.SourceType ?? 0;
        existingProp.IsValidForCreate = attribute.IsValidForCreate;
        existingProp.IsValidForUpdate = attribute.IsValidForUpdate;
        existingProp.DisplayName = this.extractLabel(attribute.DisplayName);
        existingProp.Description = this.extractLabel(attribute.Description);

        // Handle option sets (local enums)
        if (attribute.OptionSet?.IsGlobal === false) {
          const enumType = this.addOptionSetEnum(attribute.OptionSet, entityType.SchemaName);
          if (enumType) {
            existingProp.IsEnum = true;
            existingProp.EnumName = enumType.Name;
          }
        } else if (attribute.OptionSet?.IsGlobal === true) {
          // Global option set - should already exist in EnumTypes
          existingProp.IsEnum = true;
          existingProp.EnumName = attribute.OptionSet.Name;
          // A column's choice is a number, so a $metadata enum used as its option set keeps its
          // numbers rather than its member names (#479)
          const global = this.EnumTypes.find((e) => e.Name === attribute.OptionSet?.Name);
          if (global?.IsCsdlEnum === true) global.IsCsdlEnum = false;
        }

        // Handle date/time format
        if (attribute.AttributeType === "DateTime") {
          existingProp.Format = attribute.DateTimeBehavior?.Value ?? attribute.Format ?? "";
        }

        // Handle lookup targets (polymorphic lookups)
        if (attribute.Targets?.length && attribute.Targets.length > 0) {
          existingProp.Targets = attribute.Targets;
        }

        // Mark as multi-select if applicable
        if (attribute.AttributeTypeName?.Value === "MultiSelectPicklistType") {
          existingProp.IsMultiSelect = true;
        }

        // Constraints for validation (#347)
        if (typeof attribute.MaxLength === "number") existingProp.MaxLength = attribute.MaxLength;
        if (typeof attribute.MinValue === "number") existingProp.MinValue = attribute.MinValue;
        if (typeof attribute.MaxValue === "number") existingProp.MaxValue = attribute.MaxValue;
        const options = attribute.OptionSet?.Options;
        if (Array.isArray(options)) {
          existingProp.OptionValues = options
            .map((o) => o.Value)
            .filter((v): v is number => typeof v === "number")
            .sort((a, b) => a - b);
        }
      }

      // Apply polymorphic lookup consolidation
      this.consolidatePolymorphicLookups(entityType, entityMetadata);
      this.markLookupNavigationProperties(entityType, entityMetadata.Attributes);
      this.ensureUniqueMemberNames(entityType);
    }

    this.SkippedTables = skipped;
    if (skipped.length > 0) {
      this.Warnings.push(
        `Not generated: ${skipped.join(", ")}. RetrieveMetadataChanges returns no table ` +
          `metadata for ${skipped.length === 1 ? "it" : "them"}.`
      );
    }
  }

  /**
   * Incremental generation (#429): the tables' metadata the previous run kept in the stamp file
   * that is still current, after asking Dataverse what changed since that run's version stamp. A
   * table that changed or was added, or whose table or column was deleted, isn't in it, so it's
   * read again; a deleted table isn't in `$metadata` either, so it isn't generated.
   *
   * `undefined` (read every table) when there is nothing to reuse: not incremental, no stamp, a
   * stamp of another generator version or org, or a version stamp Dataverse no longer has
   * (`ExpiredVersionStamp`). When asking for the changes fails otherwise, a warning says so.
   */
  private async keptMetadata(
    allTables: boolean
  ): Promise<{ tables: Map<string, EntityMetadataDetail>; skipped: Set<string> } | undefined> {
    if (this.config.output?.incremental !== true) return undefined;
    const stamp = await readStamp(this.config.output.outputRoot ?? "./generated");
    const previous = stamp?.metadata;
    if (
      !stamp ||
      !previous ||
      stamp.generator !== GENERATOR_VERSION ||
      previous.source !== metadataSource(this.config) ||
      typeof previous.versionStamp !== "string"
    ) {
      return undefined;
    }

    const wanted = new Set(this.EntityTypes.map((e) => e.LogicalName));
    const tables = new Map<string, EntityMetadataDetail>();
    for (const [name, table] of Object.entries(stamp.tables)) {
      if (wanted.has(name) && table.metadata) tables.set(name, table.metadata);
    }
    // Entity types a previous all-tables run found no table for (and so didn't generate)
    const skipped = new Set(
      allTables && Array.isArray(previous.skipped)
        ? previous.skipped.filter((name) => wanted.has(name))
        : []
    );
    if (tables.size === 0 && skipped.size === 0) return undefined;

    let changes: RetrieveMetadataChangesResponse | undefined;
    try {
      changes = await this.metadataService.getMetadataChanges(previous.versionStamp, [
        ...tables.keys(),
        ...skipped,
      ]);
    } catch (error: unknown) {
      this.Warnings.push(
        `Incremental: couldn't ask Dataverse what changed since the last run, so every table's ` +
          `metadata was read again: ${error instanceof Error ? error.message : String(error)}`
      );
      return undefined;
    }
    // Expired version stamp, or (unexpected) no new one: read everything again
    if (!changes?.ServerVersionStamp) return undefined;
    this.MetadataVersionStamp = changes.ServerVersionStamp;

    for (const entity of changes.EntityMetadata ?? []) {
      if (entity.LogicalName) {
        tables.delete(entity.LogicalName);
        skipped.delete(entity.LogicalName);
      }
    }
    const deleted = deletedIds(changes.DeletedMetadata);
    if (deleted.size > 0) {
      const isDeleted = (id: string | undefined) => id !== undefined && deleted.has(id.toLowerCase());
      for (const [name, detail] of tables) {
        if (isDeleted(detail.MetadataId) || detail.Attributes?.some((a) => isDeleted(a.MetadataId))) {
          tables.delete(name);
        }
      }
    }
    return { tables, skipped };
  }

  /**
   * Add option set enum to the model
   * Reference: scottdurow/dataverse-gen SchemaModel.ts#L194-L213
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private addOptionSetEnum(optionSet: any, entitySchemaName: string): EnumType | undefined {
    if (!optionSet?.Options) return undefined;

    const enumName = optionSet.Name ?? `${entitySchemaName}_OptionSet`;

    // Check if already exists
    const existing = this.EnumTypes.find((e) => e.Name === enumName);
    if (existing) return existing;

    const members = Array.isArray(optionSet.Options) ? optionSet.Options : [optionSet.Options];

    interface Option {
      Value?: number | null;
      Label?: unknown;
    }
    const options = (members as Option[])
      .filter((m): m is Option & { Value: number } => typeof m.Value === "number")
      .sort((a, b) => a.Value - b.Value);

    const used = new Set<string>();
    const enumType: EnumType = {
      Name: enumName,
      IsGlobal: false,
      Members: options.map((m) => {
        let name = toEnumMemberName(this.extractLabel(m.Label), m.Value);
        // Two options can share a label; the value keeps the second one distinct.
        if (used.has(name)) name = `${name}_${String(m.Value).replace("-", "Minus")}`;
        used.add(name);
        return { Name: name, Value: m.Value };
      }),
    };

    this.EnumTypes.push(enumType);
    return enumType;
  }

  /**
   * Make every generated member name of an entity unique. Two navigation properties with one name would be declared twice in the
   * interface and the metadata object, which strict `tsc` rejects (#244). The later one is renamed to
   * `<name>_<relationship>`, or `<name>_<n>` if that is taken too.
   */
  private ensureUniqueMemberNames(entityType: EntityType): void {
    const taken = new Set<string>();
    for (const nav of entityType.NavigationProperties) {
      if (taken.has(nav.Name)) {
        const base = nav.Name;
        const suffix = nav.RelationshipName || nav.TargetType;
        let candidate = suffix ? `${base}_${suffix}` : base;
        for (let n = 2; taken.has(candidate) || candidate === base; n++)
          candidate = `${base}_${String(n)}`;
        nav.Name = candidate;
      }
      taken.add(nav.Name);
    }
  }

  /**
   * Consolidate polymorphic lookups by merging navigation properties
   * Reference: scottdurow/dataverse-gen SchemaModel.ts#L237-L261
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private consolidatePolymorphicLookups(entityType: EntityType, entityMetadata: any): void {
    if (!entityMetadata.Attributes) return;

    for (const attribute of entityMetadata.Attributes) {
      if (!attribute.Targets || attribute.Targets.length === 0) continue;

      const logicalName = String(attribute.LogicalName ?? "");

      // A lookup that already has a navigation property of its own name (`createdby`) has nothing
      // to merge: the `createdby_<table>` properties beside it are the other side of other
      // tables' relationships (collections), not one property per target (#244).
      if (entityType.NavigationProperties.some((nav) => nav.Name === logicalName)) continue;

      // Find the single-valued navigation properties that start with this lookup's logical name
      const relatedNav = entityType.NavigationProperties.filter(
        (nav) => !nav.IsCollection && nav.Name.startsWith(`${logicalName}_`)
      );

      if (relatedNav.length === 0) continue;

      // Create consolidated navigation property
      const firstNav = relatedNav[0];
      const consolidatedNav = {
        ...firstNav,
        Name: this.getNavigationName(logicalName),
        FullName: logicalName,
        Type: attribute.Targets.join(","),
        Targets: attribute.Targets,
        IsPolymorphic: true,
      };

      // Remove all but keep the consolidated one
      entityType.NavigationProperties = entityType.NavigationProperties.filter(
        (nav) => !relatedNav.includes(nav)
      );

      entityType.NavigationProperties.push(consolidatedNav);
    }
  }

  /**
   * Find the navigation property each lookup column is written through, and record the lookup on
   * it with whether a create or an update can set it (#347). A lookup's CSDL property
   * (`_primarycontactid_value`) is read-only; a write binds the navigation property instead.
   *
   * The navigation property is the one named after the lookup (`primarycontactid`, or a
   * consolidated polymorphic lookup such as `customerid`), else the one single-valued navigation
   * property the CSDL constrains with `_<lookup>_value`: a custom lookup's navigation property is
   * named after its schema name (`contoso_ParentAccountId`). A polymorphic lookup that wasn't
   * consolidated has one per target and gets none.
   */
  private markLookupNavigationProperties(
    entityType: EntityType,
    attributes: AttributeMetadataDetail[]
  ): void {
    for (const attribute of attributes) {
      if (!attribute.LogicalName || !attribute.Targets?.length) continue;
      const logicalName = attribute.LogicalName;
      const singleValued = entityType.NavigationProperties.filter((nav) => !nav.IsCollection);
      let nav = singleValued.find(
        (n) => n.Name === logicalName || (n.IsPolymorphic === true && n.FullName === logicalName)
      );
      if (!nav) {
        const constrained = singleValued.filter(
          (n) => n.ReferentialProperty === `_${logicalName}_value`
        );
        if (constrained.length === 1) nav = constrained[0];
      }
      if (!nav || nav.LookupAttribute !== undefined) continue;
      nav.LookupAttribute = logicalName;
      nav.LookupTargets = attribute.Targets;
      nav.IsValidForCreate = attribute.IsValidForCreate;
      nav.IsValidForUpdate = attribute.IsValidForUpdate;
      const requiredLevel = attribute.RequiredLevel?.Value;
      if (requiredLevel && requiredLevel !== "None") nav.RequiredLevel = requiredLevel;
    }
  }

  /**
   * Extract localized label text
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private extractLabel(label: any): string {
    if (!label) return "";
    if (typeof label === "string") return label;
    if (label.UserLocalizedLabel?.Label) {
      return label.UserLocalizedLabel.Label;
    }
    if (label.LocalizedLabels?.length && label.LocalizedLabels.length > 0) {
      return label.LocalizedLabels[0].Label ?? "";
    }
    return "";
  }

  /**
   * Convert navigation property name to code-safe identifier
   * Reference: scottdurow/dataverse-gen SchemaModel.ts#L944-L948
   */
  private getNavigationName(name: string): string {
    // Handle reserved keywords and special characters
    const reservedKeywords = [
      "break",
      "case",
      "catch",
      "class",
      "const",
      "continue",
      "debugger",
      "default",
      "delete",
      "do",
      "else",
      "enum",
      "export",
      "extends",
      "false",
      "finally",
      "for",
      "function",
      "if",
      "import",
      "in",
      "instanceof",
      "new",
      "null",
      "return",
      "super",
      "switch",
      "this",
      "throw",
      "true",
      "try",
      "typeof",
      "var",
      "void",
      "while",
      "with",
    ];

    let safeName = name.replace(/[^a-zA-Z0-9_]/g, "_");

    if (reservedKeywords.includes(safeName.toLowerCase())) {
      safeName = `_${safeName}`;
    }

    // Ensure it doesn't start with a number
    if (/^[0-9]/.test(safeName)) {
      safeName = `_${safeName}`;
    }

    return safeName;
  }

  /**
   * Resolve TypeScript types for all properties
   */
  private resolveTypes(): void {
    for (const entity of this.EntityTypes) {
      for (const prop of entity.Properties) {
        const enumType = prop.EnumName
          ? this.EnumTypes.find((e) => e.Name === prop.EnumName)
          : undefined;
        // Multi-select values are sent and returned as a comma-separated string ("1,2"),
        // so only single-choice option sets get the enum type.
        prop.TypeScriptType =
          enumType && !prop.IsMultiSelect
            ? { name: enumType.Name, reference: enumType.Name, isArray: false }
            : this.getTypeScriptType(prop.Type);
      }
    }

    for (const complexType of this.ComplexTypes) {
      for (const prop of complexType.Properties) {
        prop.TypeScriptType = this.getTypeScriptType(prop.Type);
      }
    }

    // A parameter takes a date-time as an ISO string or a Date (#361); values read back are strings.
    for (const op of [...this.Actions, ...this.Functions]) {
      for (const param of op.Parameters) {
        const type = this.getTypeScriptType(param.Type);
        param.TypeScriptType = isDateTimeOffset(param.Type)
          ? { ...type, name: "string | Date" }
          : type;
      }
    }
  }

  /**
   * Read enum types from CSDL
   */
  private readEnums(): void {
    const schema = this.getSchema();
    if (!schema?.EnumType) return;

    const enumTypes = Array.isArray(schema.EnumType) ? schema.EnumType : [schema.EnumType];

    for (const enumType of enumTypes) {
      const members = Array.isArray(enumType.Member)
        ? enumType.Member
        : enumType.Member
          ? [enumType.Member]
          : [];

      this.EnumTypes.push({
        Name: this.getAttribute(enumType, "Name"),
        IsGlobal: true,
        IsFlags: this.getAttribute(enumType, "IsFlags") === "true",
        IsCsdlEnum: true,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        Members: members.map((m: any) => ({
          Name: this.getAttribute(m, "Name"),
          Value: parseInt(this.getAttribute(m, "Value"), 10),
        })),
      });
    }
  }

  /**
   * Read entity types from CSDL
   */
  private readEntityTypes(): void {
    const schema = this.getSchema();
    if (!schema?.EntityType) return;

    const entityTypes: CsdlEntityTypeNode[] = Array.isArray(schema.EntityType)
      ? schema.EntityType
      : [schema.EntityType];
    const byName = new Map<string, CsdlEntityTypeNode>();
    for (const entityType of entityTypes) {
      byName.set(this.getAttribute(entityType, "Name"), entityType);
    }

    for (const entityType of entityTypes) {
      const name = this.getAttribute(entityType, "Name");
      this.AllEntityTypeNames.add(name);
      // The type and its base types, up to (not including) crmbaseentity: a derived type, such as
      // an activity (BaseType="mscrm.activitypointer"), leaves out the columns it inherits (#360).
      const chain = this.baseTypeChain(entityType, byName);
      // A table derives from crmbaseentity. EntityMetadata (EntityDefinitions) and the other
      // metadata types derive from crmmodelbaseentity and have no RetrieveMetadataChanges entry.
      if (
        this.getAttribute(entityType, "Abstract") !== "true" &&
        this.hasEntitySet(name) &&
        chain.derivesFromCrmBaseEntity
      ) {
        this.tableEntityTypeNames.add(name);
      }
      const key = chain.types.find((t) => t.Key?.PropertyRef)?.Key?.PropertyRef;
      const keyName = key ? this.getAttribute(key, "Name") : `${name.toLowerCase()}id`;

      // Own properties first, then the inherited ones a derived type doesn't redeclare. Then by
      // name: the org's $metadata doesn't list a table's columns in a fixed order from one request
      // to the next, and the model (its incremental-generation hash, the generated code) must not
      // depend on it (#347; seen live).
      const properties = uniqueBy(
        chain.types.flatMap((t) => this.readProperties(t.Property)),
        (p) => p.Name
      ).sort(compareByName);
      const navProps = uniqueBy(
        chain.types.flatMap((t) => this.readNavigationProperties(t.NavigationProperty)),
        (n) => n.Name
      ).sort(compareByName);

      this.EntityTypes.push({
        Name: name,
        TypeName: `Microsoft.Dynamics.CRM.${name.toLowerCase()}`,
        LogicalName: name.toLowerCase(),
        EntitySetName: this.findEntitySetName(name),
        KeyName: keyName,
        Properties: properties,
        NavigationProperties: navProps,
        IsCustomEntity: name.startsWith("new_") || name.includes("_"),
      });
    }
  }

  /**
   * An entity type and its base types, nearest first, stopping before `crmbaseentity` (which has
   * no properties) and at a type without a base type. `derivesFromCrmBaseEntity` says whether the
   * chain reached `crmbaseentity`, that is, whether the type is a Dataverse table.
   */
  private baseTypeChain(
    entityType: CsdlEntityTypeNode,
    byName: Map<string, CsdlEntityTypeNode>
  ): { types: CsdlEntityTypeNode[]; derivesFromCrmBaseEntity: boolean } {
    const types: CsdlEntityTypeNode[] = [];
    const seen = new Set<string>();
    let current: CsdlEntityTypeNode | undefined = entityType;
    while (current) {
      const name = this.getAttribute(current, "Name");
      if (name === CRM_BASE_ENTITY) return { types, derivesFromCrmBaseEntity: true };
      if (seen.has(name)) break;
      seen.add(name);
      types.push(current);
      const baseType = this.getAttribute(current, "BaseType");
      if (!baseType) break;
      const baseName = this.extractEntityName(baseType);
      if (baseName === CRM_BASE_ENTITY) return { types, derivesFromCrmBaseEntity: true };
      current = byName.get(baseName);
    }
    return { types, derivesFromCrmBaseEntity: false };
  }

  /**
   * Read complex types from CSDL
   */
  private readComplexTypes(): void {
    const schema = this.getSchema();
    if (!schema?.ComplexType) return;

    const complexTypes = Array.isArray(schema.ComplexType)
      ? schema.ComplexType
      : [schema.ComplexType];

    for (const complexType of complexTypes) {
      const name = this.getAttribute(complexType, "Name");
      // A complex type can have navigation properties too: PrincipalAccess.Principal is the user
      // or team to grant access to (#231 for the in-repo generator, #361 here).
      const navigation = this.readProperties(complexType.NavigationProperty).map((p) => ({
        ...p,
        IsNavigation: true,
      }));
      // By name, for the same reason as a table's columns (readEntityTypes)
      const properties = [...this.readProperties(complexType.Property), ...navigation].sort(
        compareByName
      );
      const baseType = this.getAttribute(complexType, "BaseType");

      this.ComplexTypes.push({
        Name: name,
        BaseType: baseType ? this.extractEntityName(baseType) : undefined,
        Properties: properties,
      });
    }
  }

  /**
   * Read actions from CSDL
   */
  private readActions(): void {
    const schema = this.getSchema();
    if (!schema?.Action) return;

    const actions = Array.isArray(schema.Action) ? schema.Action : [schema.Action];

    for (const action of actions) {
      const name = this.getAttribute(action, "Name");
      const isBound = this.getAttribute(action, "IsBound") === "true";

      const parameters = this.readParameters(action.Parameter);
      const bindingType = isBound && parameters.length > 0 ? parameters[0].Type : undefined;

      const returnType = action.ReturnType
        ? this.getTypeScriptType(this.getAttribute(action.ReturnType, "Type"))
        : undefined;

      this.Actions.push({
        Name: name,
        IsBound: isBound,
        BindingType: bindingType,
        ...this.bindingInfo(bindingType),
        Parameters: isBound ? parameters.slice(1) : parameters,
        ReturnType: returnType,
        ReturnTypeNullable: action.ReturnType
          ? this.getAttribute(action.ReturnType, "Nullable") !== "false"
          : undefined,
      });
    }
  }

  /**
   * Read functions from CSDL
   */
  private readFunctions(): void {
    const schema = this.getSchema();
    if (!schema?.Function) return;

    const functions = Array.isArray(schema.Function) ? schema.Function : [schema.Function];

    for (const func of functions) {
      const name = this.getAttribute(func, "Name");
      const isBound = this.getAttribute(func, "IsBound") === "true";
      const isComposable = this.getAttribute(func, "IsComposable") === "true";

      const parameters = this.readParameters(func.Parameter);
      const bindingType = isBound && parameters.length > 0 ? parameters[0].Type : undefined;

      const rawReturnType = func.ReturnType ? this.getAttribute(func.ReturnType, "Type") : "";
      const returnType = rawReturnType ? this.getTypeScriptType(rawReturnType) : undefined;

      if (this.isQueryFunction(name, isBound, parameters, rawReturnType)) {
        this.QueryFunctionNames.add(name);
      }

      this.Functions.push({
        Name: name,
        IsBound: isBound,
        BindingType: bindingType,
        ...this.bindingInfo(bindingType),
        Parameters: isBound ? parameters.slice(1) : parameters,
        ReturnType: returnType,
        ReturnTypeNullable: func.ReturnType
          ? this.getAttribute(func.ReturnType, "Nullable") !== "false"
          : undefined,
        IsComposable: isComposable,
      });
    }
  }

  /**
   * A Web API query function, such as `LastXDays(PropertyName=...,PropertyValue=...)`: unbound,
   * returns `Edm.Boolean`, and takes the column to test as its first parameter, `PropertyName`.
   * Custom APIs always have a publisher prefix (`contoso_`), and no query function has an
   * underscore, so a custom function of the same shape is still generated.
   */
  private isQueryFunction(
    name: string,
    isBound: boolean,
    parameters: ParameterType[],
    returnType: string
  ): boolean {
    const first = parameters.at(0);
    return (
      !isBound &&
      !name.includes("_") &&
      returnType === "Edm.Boolean" &&
      first?.Name === "PropertyName" &&
      first.Type === "Edm.String"
    );
  }

  /**
   * What a bound operation is bound to: one record of an entity type, or its collection.
   */
  private bindingInfo(bindingType: string | undefined): {
    BindingEntity?: string;
    IsCollectionBound?: boolean;
    BindingEntitySetName?: string;
  } {
    if (!bindingType) return {};
    const entity = this.extractEntityName(bindingType);
    return {
      BindingEntity: entity,
      IsCollectionBound: bindingType.startsWith("Collection("),
      BindingEntitySetName: this.hasEntitySet(entity) ? this.findEntitySetName(entity) : undefined,
    };
  }

  /**
   * Read properties from entity/complex type
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private readProperties(propertyNode: any): PropertyType[] {
    if (!propertyNode) return [];

    const properties = Array.isArray(propertyNode) ? propertyNode : [propertyNode];

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return properties.map((p: any) => ({
      Name: this.getAttribute(p, "Name"),
      LogicalName: this.getAttribute(p, "Name").toLowerCase(),
      Type: this.getAttribute(p, "Type"),
      TypeScriptType: { name: "any" }, // Resolved later
      Nullable: this.getAttribute(p, "Nullable") !== "false",
      IsReadOnly: false, // Enriched later
      IsPrimaryKey: false, // Enriched later
    }));
  }

  /**
   * Read navigation properties
   */
  private readNavigationProperties(navNode: unknown): NavigationPropertyType[] {
    if (!navNode) return [];

    const navProps: unknown[] = Array.isArray(navNode) ? navNode : [navNode];

    return navProps.map((n) => {
      const constraint = (n as { ReferentialConstraint?: unknown }).ReferentialConstraint;
      const first: unknown = Array.isArray(constraint) ? constraint[0] : constraint;
      const referentialProperty = this.getAttribute(first, "Property");
      return {
        Name: this.getAttribute(n, "Name"),
        TargetType: this.extractEntityName(this.getAttribute(n, "Type")),
        IsCollection: this.getAttribute(n, "Type").startsWith("Collection("),
        RelationshipName: this.getAttribute(n, "Partner") || "",
        ...(referentialProperty ? { ReferentialProperty: referentialProperty } : {}),
      };
    });
  }

  /**
   * Read parameters from action/function
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private readParameters(paramNode: any): ParameterType[] {
    if (!paramNode) return [];

    const params = Array.isArray(paramNode) ? paramNode : [paramNode];

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return params.map((p: any) => ({
      Name: this.getAttribute(p, "Name"),
      Type: this.getAttribute(p, "Type"),
      TypeScriptType: { name: "any" }, // Resolved later
      Nullable: this.getAttribute(p, "Nullable") !== "false",
    }));
  }

  /**
   * Get TypeScript type from Edm type
   */
  private getTypeScriptType(edmType: string): TypeScriptType {
    // Remove Collection() wrapper
    const isArray = edmType.startsWith("Collection(");
    let baseType = edmType;

    if (isArray) {
      baseType = edmType.substring(11, edmType.length - 1);
    }

    // Map Edm types to TypeScript
    if (baseType.startsWith("Edm.")) {
      const edmSimple = baseType.substring(4);
      const tsType = this.mapEdmToTypeScript(edmSimple);
      return { name: tsType, isArray };
    }

    // Entity, complex or enum type of the Dataverse schema ("mscrm.account" or
    // "Microsoft.Dynamics.CRM.account"). The generator resolves the name to an import, because
    // only it knows which types are generated.
    const referenced = this.extractEntityName(baseType);
    if (referenced !== baseType) {
      return { name: referenced, reference: referenced, isArray };
    }

    return { name: "unknown", isArray };
  }

  /**
   * Map Edm type to TypeScript type
   */
  private mapEdmToTypeScript(edmType: string): string {
    const mapping: Record<string, string> = {
      String: "string",
      Byte: "number",
      SByte: "number",
      Int16: "number",
      Int32: "number",
      Int64: "number",
      Single: "number",
      Double: "number",
      Decimal: "number",
      Boolean: "boolean",
      // The Web API returns date-times as ISO 8601 strings; nothing turns them into Dates (#361).
      DateTimeOffset: "string",
      Date: "string",
      TimeOfDay: "string",
      Duration: "string",
      Guid: "string",
      Binary: "string",
    };

    return mapping[edmType] ?? "unknown";
  }

  /**
   * Whether the entity container has an entity set for this entity type
   */
  private hasEntitySet(entityTypeName: string): boolean {
    const container = this.getEntityContainer();
    if (!container?.EntitySet) return false;
    const entitySets = Array.isArray(container.EntitySet)
      ? container.EntitySet
      : [container.EntitySet];
    return entitySets.some((entitySet: unknown) =>
      this.getAttribute(entitySet, "EntityType").endsWith(`.${entityTypeName}`)
    );
  }

  /**
   * Find entity set name for an entity type
   */
  private findEntitySetName(entityTypeName: string): string {
    const container = this.getEntityContainer();
    if (!container?.EntitySet) return `${entityTypeName.toLowerCase()}s`;

    const entitySets = Array.isArray(container.EntitySet)
      ? container.EntitySet
      : [container.EntitySet];

    for (const entitySet of entitySets) {
      const entityType = this.getAttribute(entitySet, "EntityType");
      if (entityType.endsWith(`.${entityTypeName}`)) {
        return this.getAttribute(entitySet, "Name");
      }
    }

    return `${entityTypeName.toLowerCase()}s`;
  }

  /**
   * Get main schema element
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private getSchema(): any {
    const edmx = this.metadata["edmx:Edmx"];
    if (!edmx) return null;

    const dataServices = edmx["edmx:DataServices"];
    if (!dataServices) return null;

    return dataServices.Schema;
  }

  /**
   * Get entity container
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private getEntityContainer(): any {
    const schema = this.getSchema();
    return schema?.EntityContainer;
  }

  /**
   * Get attribute value from node
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private getAttribute(node: any, attrName: string): string {
    return node?._attributes?.[attrName] ?? "";
  }

  /**
   * Extract entity name from type string
   */
  private extractEntityName(typeString: string): string {
    // $metadata declares the schema as Namespace="Microsoft.Dynamics.CRM" Alias="mscrm" and
    // refers to its own types through the alias ("mscrm.contact").
    const match = /(?:Microsoft\.Dynamics\.CRM|mscrm)\.(\w+)/.exec(typeString);
    return match ? match[1] : typeString;
  }

  /**
   * Get structural property type for action/function parameters
   * Reference: scottdurow/dataverse-gen SchemaModel.ts#L348-L366
   */
  getStructuralType(type: string): string {
    if (!type) return "PrimitiveType";

    // Collection type
    if (type.startsWith("Collection(")) {
      return "Collection";
    }

    // Check if it's an entity type (generated or not, abstract ones included)
    const entityName = this.extractEntityName(type);
    if (
      this.AllEntityTypeNames.has(entityName) ||
      this.EntityTypes.some((e) => e.Name === entityName || e.LogicalName === entityName)
    ) {
      return "EntityType";
    }

    // Check if it's an enum type
    if (this.EnumTypes.some((e) => e.Name === entityName)) {
      return "EnumerationType";
    }

    // Check if it's a complex type
    if (this.ComplexTypes.some((c) => c.Name === entityName)) {
      return "ComplexType";
    }

    // Default to primitive
    return "PrimitiveType";
  }
}

/** `Edm.DateTimeOffset` or a collection of it. */
function isDateTimeOffset(edmType: string): boolean {
  return edmType === "Edm.DateTimeOffset" || edmType === "Collection(Edm.DateTimeOffset)";
}

/** An `EntityType` element of the CSDL, as xml-js reads it. */
interface CsdlEntityTypeNode {
  _attributes?: Record<string, string>;
  Key?: { PropertyRef?: unknown };
  Property?: unknown;
  NavigationProperty?: unknown;
}

/** The abstract base type of every Dataverse table. */
const CRM_BASE_ENTITY = "crmbaseentity";

/** The items with a distinct key, the first of each kept, in order. */
function uniqueBy<T>(items: T[], key: (item: T) => string): T[] {
  const seen = new Set<string>();
  return items.filter((item) => {
    const k = key(item);
    if (seen.has(k)) return false;
    seen.add(k);
    return true;
  });
}

/**
 * Turn an option label into an enum member name: letters and digits only, words joined in
 * PascalCase ("Financial Services" -> "FinancialServices"), prefixed with `_` when it would start
 * with a digit. Labels without letters or digits fall back to `Value<n>`.
 */
/** Order-insensitive comparison of two logical names (plain code-unit order, no locale). */
/** Plain code-unit order of two `Name`s (no locale), for a fixed property order. */
function compareByName(a: { Name: string }, b: { Name: string }): number {
  return a.Name < b.Name ? -1 : a.Name > b.Name ? 1 : 0;
}

function byLogicalName(a: { LogicalName?: string }, b: { LogicalName?: string }): number {
  const x = a.LogicalName ?? "";
  const y = b.LogicalName ?? "";
  return x < y ? -1 : x > y ? 1 : 0;
}

/**
 * A table's metadata with the lists Dataverse may return in any order sorted: attributes and keys
 * by logical name, and each lookup's targets. The model, the generated code and incremental
 * generation's hashes then don't change when the server orders its response differently. The
 * order of a key's attributes is kept: it is part of the key.
 */
function canonicalOrder(entity: EntityMetadataDetail): EntityMetadataDetail {
  return {
    ...entity,
    ...(entity.Attributes && {
      Attributes: [...entity.Attributes]
        .map((attribute) =>
          attribute.Targets ? { ...attribute, Targets: [...attribute.Targets].sort() } : attribute
        )
        .sort(byLogicalName),
    }),
    ...(entity.Keys && { Keys: [...entity.Keys].sort(byLogicalName) }),
  };
}

export function toEnumMemberName(label: string, value: number): string {
  const words = label.split(/[^\p{L}\p{Nd}_]+/u).filter((w) => w.length > 0);
  if (words.length === 0) return `Value${String(value).replace("-", "Minus")}`;
  const name = words.map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join("");
  return /^\p{Nd}/u.test(name) ? `_${name}` : name;
}
