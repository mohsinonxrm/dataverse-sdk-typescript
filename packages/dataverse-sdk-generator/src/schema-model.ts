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
  PropertyType,
  TypeScriptType,
  ParameterType,
} from "./types.js";
import type { MetadataService } from "./metadata-service.js";

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
   * Names of every entity type in $metadata, before filtering. Generated code types references
   * to entities that were not generated (and abstract ones such as `crmbaseentity`) as `IEntity`.
   */
  AllEntityTypeNames = new Set<string>();

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

    if (functions && functions.length > 0) {
      this.Functions = this.Functions.filter((f) => functions.includes(f.Name));
    }
  }

  /**
   * Enrich entity metadata with detailed attribute information from RetrieveMetadataChanges
   * Reference: scottdurow/dataverse-gen SchemaModel.ts#L138-L213
   */
  private async enrichWithDetailedMetadata(): Promise<void> {
    if (this.EntityTypes.length === 0) return;

    for (const entityType of this.EntityTypes) {
      const response = await this.metadataService.getEntityMetadata(entityType.LogicalName);

      if (!response.EntityMetadata || response.EntityMetadata.length === 0) {
        throw new Error(
          `${entityType.LogicalName} is not a Dataverse entity, remove it from the .dataverse-gen.json`
        );
      }

      const entityMetadata = response.EntityMetadata[0];

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
        existingProp.IsRequired = attribute.RequiredLevel?.Value === 2; // ApplicationRequired
        existingProp.AttributeOf = attribute.AttributeOf;
        existingProp.SourceType = attribute.SourceType ?? 0;
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
      }

      // Apply polymorphic lookup consolidation
      this.consolidatePolymorphicLookups(entityType, entityMetadata);
      this.ensureUniqueMemberNames(entityType);
    }
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

    for (const action of this.Actions) {
      for (const param of action.Parameters) {
        param.TypeScriptType = this.getTypeScriptType(param.Type);
      }
      if (action.ReturnType) {
        // Already resolved
      }
    }

    for (const func of this.Functions) {
      for (const param of func.Parameters) {
        param.TypeScriptType = this.getTypeScriptType(param.Type);
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

    const entityTypes = Array.isArray(schema.EntityType) ? schema.EntityType : [schema.EntityType];

    for (const entityType of entityTypes) {
      const name = this.getAttribute(entityType, "Name");
      this.AllEntityTypeNames.add(name);
      if (this.getAttribute(entityType, "Abstract") !== "true" && this.hasEntitySet(name)) {
        this.tableEntityTypeNames.add(name);
      }
      const key = entityType.Key?.PropertyRef;
      const keyName = key ? this.getAttribute(key, "Name") : `${name.toLowerCase()}id`;

      const properties = this.readProperties(entityType.Property);
      const navProps = this.readNavigationProperties(entityType.NavigationProperty);

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
      const properties = this.readProperties(complexType.Property);
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

      const returnType = func.ReturnType
        ? this.getTypeScriptType(this.getAttribute(func.ReturnType, "Type"))
        : undefined;

      this.Functions.push({
        Name: name,
        IsBound: isBound,
        BindingType: bindingType,
        ...this.bindingInfo(bindingType),
        Parameters: isBound ? parameters.slice(1) : parameters,
        ReturnType: returnType,
        IsComposable: isComposable,
      });
    }
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private readNavigationProperties(navNode: any): any[] {
    if (!navNode) return [];

    const navProps = Array.isArray(navNode) ? navNode : [navNode];

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return navProps.map((n: any) => ({
      Name: this.getAttribute(n, "Name"),
      TargetType: this.extractEntityName(this.getAttribute(n, "Type")),
      IsCollection: this.getAttribute(n, "Type").startsWith("Collection("),
      RelationshipName: this.getAttribute(n, "Partner") || "",
    }));
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
      DateTimeOffset: "Date",
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

/**
 * Turn an option label into an enum member name: letters and digits only, words joined in
 * PascalCase ("Financial Services" -> "FinancialServices"), prefixed with `_` when it would start
 * with a digit. Labels without letters or digits fall back to `Value<n>`.
 */
export function toEnumMemberName(label: string, value: number): string {
  const words = label.split(/[^\p{L}\p{Nd}_]+/u).filter((w) => w.length > 0);
  if (words.length === 0) return `Value${String(value).replace("-", "Minus")}`;
  const name = words.map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join("");
  return /^\p{Nd}/u.test(name) ? `_${name}` : name;
}
