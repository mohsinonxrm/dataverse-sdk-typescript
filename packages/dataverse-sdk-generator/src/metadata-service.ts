/**
 * Portions of this file are adapted from dataverse-gen by Scott Durow
 * (https://github.com/scottdurow/dataverse-gen), Copyright (c) 2020 Scott Durow, licensed under
 * the MIT License. See THIRD_PARTY_NOTICES.md in this package for the notice.
 */

import type {
  AttributeSourceType,
  AttributeTypeCode,
  AttributeTypeDisplayName,
  DateTimeBehavior,
  DateTimeFormat,
  IntegerFormat,
  OptionSetType,
  StringFormat,
} from "@mohsinonxrm/dataverse-sdk-metadata";
import type { DataverseGenConfig } from "./types.js";

/** How many times a metadata request is tried before its error is thrown. */
const ATTEMPTS = 5;

/** Delays between tries, in ms (the last one repeats); a Retry-After header takes precedence. */
const BACKOFF_MS = [2_000, 4_000, 8_000, 16_000];

/** Waits `ms`. Replaceable in tests. */
export type MetadataServiceSleep = (ms: number) => Promise<void>;

const defaultSleep: MetadataServiceSleep = (ms) =>
  new Promise((resolve) => setTimeout(resolve, ms));

/**
 * The most tables {@link MetadataService.getMetadataChanges} names in its query; with more it asks
 * for every table's changes, so the GET's URL stays well under the length Dataverse accepts.
 */
const MAX_CHANGE_CONDITIONS = 50;

/**
 * The RetrieveMetadataChanges query (an `EntityQueryExpression`) for the properties the generator
 * reads: of the tables named in `logicalNames`, or of every table when it's `undefined`.
 * `LogicalName`, `MetadataId` and `HasChanged` come back without being asked for.
 */
function metadataQuery(logicalNames: readonly string[] | undefined): unknown {
  return {
    ...(logicalNames && {
      Criteria: {
        Conditions: logicalNames.map((logicalName) => ({
          PropertyName: "LogicalName",
          ConditionOperator: "Equals",
          Value: {
            Value: logicalName,
            Type: "System.String",
          },
        })),
        FilterOperator: logicalNames.length === 1 ? "And" : "Or",
      },
    }),
    Properties: {
      PropertyNames: [
        "Attributes",
        "SchemaName",
        "EntitySetName",
        "Keys",
        "PrimaryIdAttribute",
        "PrimaryNameAttribute",
      ],
    },
    AttributeQuery: {
      Properties: {
        PropertyNames: [
          "SchemaName",
          "LogicalName",
          "OptionSet",
          "RequiredLevel",
          "AttributeType",
          "AttributeTypeName",
          "SourceType",
          "Targets",
          "DisplayName",
          "Description",
          "AttributeOf",
          "DateTimeBehavior",
          "Format",
          "MaxLength",
          "MinValue",
          "MaxValue",
          "Precision",
          "PrecisionSource",
          "MaxSizeInKB",
          "IsPrimaryId",
          "IsPrimaryName",
          "IsValidForRead",
          "IsValidForCreate",
          "IsValidForUpdate",
          "IsValidForAdvancedFind",
        ],
      },
    },
  };
}

/** The numeric values of a choice's options, sorted. */
export function optionValues(
  options: ReadonlyArray<{ Value?: number | null }> | null | undefined
): number[] {
  return (options ?? [])
    .map((o) => o.Value)
    .filter((v): v is number => typeof v === "number")
    .sort((a, b) => a - b);
}

/** Seconds or an HTTP date in a Retry-After header, as ms; undefined when absent or unreadable. */
function retryAfterMs(header: string | null): number | undefined {
  if (!header) return undefined;
  const seconds = Number(header);
  if (Number.isFinite(seconds)) return Math.max(0, seconds * 1000);
  const date = Date.parse(header);
  return Number.isNaN(date) ? undefined : Math.max(0, date - Date.now());
}

/**
 * Service for retrieving metadata from Dataverse
 */
export class MetadataService {
  private baseUrl: string;
  private accessToken?: string;
  /** Waits between retries (tests replace it). */
  sleep: MetadataServiceSleep = defaultSleep;

  constructor(
    private config: DataverseGenConfig,
    accessToken?: string
  ) {
    const url = config.environmentUrl.replace(/\/$/, "");
    const version = config.apiVersion ?? "v9.2";
    this.baseUrl = `${url}/api/data/${version}`;
    this.accessToken = accessToken;
  }

  /**
   * Set the access token for authenticated requests
   */
  setAccessToken(token: string): void {
    this.accessToken = token;
  }

  /**
   * Retrieve the CSDL $metadata document
   */
  async getEdmxMetadata(): Promise<string> {
    const url = `${this.baseUrl}/$metadata`;

    const headers: Record<string, string> = {
      Accept: "application/xml",
    };

    if (this.accessToken) {
      headers.Authorization = `Bearer ${this.accessToken}`;
    }

    // $metadata takes no parameters, so a 400 can't be the caller's mistake: an org whose schema
    // is changing has answered 400 for a few seconds while it rebuilds the document. Retry it,
    // with 429 and 5xx.
    const response = await this.fetchWithRetry(url, { headers }, (status) => status === 400);

    if (!response.ok) {
      throw new Error(
        `Failed to fetch $metadata: ${String(response.status)} ${response.statusText}
${await response.text()}`
      );
    }

    return await response.text();
  }

  /**
   * Retrieve entity metadata via RetrieveMetadataChanges for a single entity
   * Used to enrich CSDL data with detailed attribute information
   * Reference: scottdurow/dataverse-gen MetadataService.ts#L47-L79
   *
   * RetrieveMetadataChanges is a function, so it is called with GET and the query is passed as
   * a parameter alias: `RetrieveMetadataChanges(Query=@q)?@q={...}`.
   */
  async getEntityMetadata(logicalName: string): Promise<RetrieveMetadataChangesResponse> {
    const url = `${this.baseUrl}/RetrieveMetadataChanges(Query=@q)?@q=${encodeURIComponent(JSON.stringify(metadataQuery([logicalName])))}`;

    // A 400 here is a query Dataverse refuses: not retried. 429, 5xx and dropped connections are.
    const response = await this.fetchWithRetry(
      url,
      { method: "GET", headers: this.jsonHeaders() },
      () => false
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Failed to retrieve entity metadata for ${logicalName}: ${String(response.status)} ${response.statusText}\n${errorText}`
      );
    }

    const result = await response.json();
    return result as RetrieveMetadataChangesResponse;
  }

  /**
   * The active main (type 2) and quick create (type 7) forms of a table, with their FormXml
   * (`formLayouts`, #430): the `systemform` records whose `objecttypecode` is the table.
   */
  async getSystemForms(logicalName: string): Promise<SystemFormRecord[]> {
    const filter =
      `objecttypecode eq '${logicalName.replace(/'/g, "''")}'` +
      " and (type eq 2 or type eq 7) and formactivationstate eq 1";
    let url: string | undefined =
      `${this.baseUrl}/systemforms?$select=formid,name,type,formxml` +
      `&$filter=${encodeURIComponent(filter)}&$orderby=name,formid`;

    const headers = this.jsonHeaders();

    const forms: SystemFormRecord[] = [];
    while (url) {
      const response = await this.fetchWithRetry(url, { method: "GET", headers }, () => false);
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `Failed to retrieve the forms of ${logicalName}: ${String(response.status)} ${response.statusText}\n${errorText}`
        );
      }
      const page = (await response.json()) as {
        value?: SystemFormRecord[];
        "@odata.nextLink"?: string;
      };
      forms.push(...(page.value ?? []));
      url = page["@odata.nextLink"];
    }
    return forms;
  }

  /**
   * Incremental generation (#429): what changed in the tables' metadata since `clientVersionStamp`
   * (the `ServerVersionStamp` of an earlier response), with the same properties as
   * {@link getEntityMetadata}. `EntityMetadata` lists the tables that changed or were added, with
   * only the parts that changed; `DeletedMetadata` has the MetadataIds of the tables and columns
   * deleted since then (`DeletedMetadataFilters` `Default` and `Attribute`), across the whole
   * org; the new `ServerVersionStamp` is for the next call.
   *
   * With `logicalNames` (at most {@link MAX_CHANGE_CONDITIONS}), only those tables' changes are
   * asked for; without, or with more, the changes of every table, so the URL stays short.
   *
   * Returns `undefined` when Dataverse no longer has the changes since that stamp (the
   * `ExpiredVersionStamp` error, 0x80044352: older than the org's `ExpireSubscriptionsInDays`, 90
   * days by default, or invalidated by maintenance): read the metadata again in full.
   */
  async getMetadataChanges(
    clientVersionStamp: string,
    logicalNames?: readonly string[]
  ): Promise<RetrieveMetadataChangesResponse | undefined> {
    const tables =
      logicalNames && logicalNames.length > 0 && logicalNames.length <= MAX_CHANGE_CONDITIONS
        ? logicalNames
        : undefined;
    const query = encodeURIComponent(JSON.stringify(metadataQuery(tables)));
    const stamp = encodeURIComponent(`'${clientVersionStamp.replace(/'/g, "''")}'`);
    const filters = encodeURIComponent(
      "Microsoft.Dynamics.CRM.DeletedMetadataFilters'Default,Attribute'"
    );
    const url =
      `${this.baseUrl}/RetrieveMetadataChanges(Query=@q,ClientVersionStamp=@s,DeletedMetadataFilters=@d)` +
      `?@q=${query}&@s=${stamp}&@d=${filters}`;

    const response = await this.fetchWithRetry(
      url,
      { method: "GET", headers: this.jsonHeaders() },
      () => false
    );

    if (!response.ok) {
      const errorText = await response.text();
      if (/0x80044352|ExpiredVersionStamp/i.test(errorText)) return undefined;
      throw new Error(
        `Failed to retrieve metadata changes: ${String(response.status)} ${response.statusText}\n${errorText}`
      );
    }

    return (await response.json()) as RetrieveMetadataChangesResponse;
  }

  /**
   * Incremental generation (#429): the option values of every global choice (picklist option
   * set), by name, sorted. One request for the whole org: `GlobalOptionSetDefinitions` can't be
   * filtered, only read whole or one at a time.
   *
   * RetrieveMetadataChanges lists a table whose column's own options changed, but the docs don't
   * say it lists the tables using a global choice that changed, so the kept tables' global
   * choices are compared with these values.
   */
  async getGlobalOptionSetValues(): Promise<Map<string, number[]>> {
    const url = `${this.baseUrl}/GlobalOptionSetDefinitions/Microsoft.Dynamics.CRM.OptionSetMetadata?$select=Name,Options`;
    const response = await this.fetchWithRetry(
      url,
      { method: "GET", headers: this.jsonHeaders() },
      () => false
    );
    if (!response.ok) {
      throw new Error(
        `Failed to retrieve the global choices: ${String(response.status)} ${response.statusText}\n${await response.text()}`
      );
    }
    const body = (await response.json()) as {
      value?: Array<{ Name?: string; Options?: Array<{ Value?: number | null }> | null }>;
    };
    const values = new Map<string, number[]>();
    for (const optionSet of body.value ?? []) {
      if (!optionSet.Name) continue;
      values.set(optionSet.Name, optionValues(optionSet.Options));
    }
    return values;
  }

  /** The headers of a JSON request, with the access token. */
  private jsonHeaders(): Record<string, string> {
    const headers: Record<string, string> = {
      Accept: "application/json",
      "OData-MaxVersion": "4.0",
      "OData-Version": "4.0",
    };
    if (this.accessToken) {
      headers.Authorization = `Bearer ${this.accessToken}`;
    }
    return headers;
  }

  /**
   * `fetch`, tried up to {@link ATTEMPTS} times: again after a dropped connection, a 429, a 5xx,
   * or a status `retryAlso` accepts, waiting {@link BACKOFF_MS} (or Retry-After) in between.
   * Returns the last response; throws the last network error.
   */
  private async fetchWithRetry(
    url: string,
    init: RequestInit,
    retryAlso: (status: number) => boolean
  ): Promise<Response> {
    for (let attempt = 1; ; attempt++) {
      const delay = BACKOFF_MS[Math.min(attempt - 1, BACKOFF_MS.length - 1)] ?? 0;
      let response: Response;
      try {
        response = await fetch(url, init);
      } catch (error) {
        if (attempt >= ATTEMPTS) throw error;
        await this.sleep(delay);
        continue;
      }
      const retryable =
        response.status === 429 || response.status >= 500 || retryAlso(response.status);
      if (response.ok || !retryable || attempt >= ATTEMPTS) return response;
      await response.body?.cancel().catch(() => undefined);
      await this.sleep(retryAfterMs(response.headers.get("retry-after")) ?? delay);
    }
  }
}

/**
 * Response from RetrieveMetadataChanges API
 */
export interface RetrieveMetadataChangesResponse {
  EntityMetadata?: EntityMetadataDetail[];
  ServerVersionStamp?: string;
  /**
   * With a version stamp and `DeletedMetadataFilters`: the MetadataIds of what was deleted since
   * then, per `DeletedMetadataFilters` member (`Keys`, with the ids of each in `Values`).
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  DeletedMetadata?: any;
}

/** A `systemform` record as {@link MetadataService.getSystemForms} reads it. */
export interface SystemFormRecord {
  /** The form's id. */
  formid?: string;
  /** The form's name. */
  name?: string;
  /** The form type: 2 = main, 7 = quick create (the only ones read). */
  type?: number;
  /** The form's layout. */
  formxml?: string;
}

/**
 * Detailed entity metadata from RetrieveMetadataChanges
 */
export interface EntityMetadataDetail {
  LogicalName?: string;
  SchemaName?: string;
  EntitySetName?: string;
  PrimaryIdAttribute?: string;
  PrimaryNameAttribute?: string;
  Attributes?: AttributeMetadataDetail[];
  Keys?: EntityKeyMetadata[];
  ManyToOneRelationships?: RelationshipMetadata[];
  OneToManyRelationships?: RelationshipMetadata[];
  MetadataId?: string;
}

/** `RequiredLevel.Value` as the Web API sends it (the enum member name). */
export type AttributeRequiredLevel =
  "None" | "SystemRequired" | "ApplicationRequired" | "Recommended";

/**
 * Detailed attribute metadata
 */
export interface AttributeMetadataDetail {
  /** The column's id: incremental generation matches deleted columns by it (#429). */
  MetadataId?: string;
  LogicalName?: string;
  SchemaName?: string;
  AttributeType?: AttributeTypeCode | (string & {});
  AttributeTypeName?: AttributeTypeDisplayName;
  /** See `AttributeSourceType`: 0 = simple, 1 = calculated, 2 = rollup, 3 = formula, 4 = prompt. */
  SourceType?: AttributeSourceType | (number & {});
  /** The Web API sends the AttributeRequiredLevel member name, not a number. */
  RequiredLevel?: {
    Value?: AttributeRequiredLevel;
    CanBeChanged?: boolean;
    ManagedPropertyLogicalName?: string;
  };
  AttributeOf?: string; // For 'virtual' attributes that reference a base attribute
  IsPrimaryId?: boolean;
  IsPrimaryName?: boolean;
  IsValidForRead?: boolean;
  IsValidForCreate?: boolean;
  IsValidForUpdate?: boolean;
  IsValidForAdvancedFind?: boolean;
  DisplayName?: Label;
  Description?: Label;
  // Lookup-specific
  Targets?: string[]; // For polymorphic lookups
  // Option Set-specific
  OptionSet?: OptionSetMetadata;
  // DateTime-specific
  DateTimeBehavior?: DateTimeBehavior;
  /** The column's format: a `DateTimeFormat`, `StringFormat` or `IntegerFormat` member name. */
  Format?: DateTimeFormat | StringFormat | IntegerFormat | (string & {});
  // String-specific
  MaxLength?: number;
  // Number-specific (Integer, BigInt, Decimal, Double, Money)
  MinValue?: number;
  MaxValue?: number;
  // Decimal/Money-specific
  Precision?: number;
  /**
   * Where a currency column's precision comes from (`MoneyAttributeMetadata.PrecisionSource`):
   * 0 = its `Precision`, 1 = the organization's `PricingDecimalPrecision`, 2 = the
   * `CurrencyPrecision` of the record's transaction currency.
   */
  PrecisionSource?: 0 | 1 | 2 | (number & {});
  /** File and image columns: the largest file or image, in KB. */
  MaxSizeInKB?: number;
  // Additional type-specific metadata can be added as needed
}

/**
 * Label with localized text
 */
export interface Label {
  LocalizedLabels?: LocalizedLabel[];
  UserLocalizedLabel?: LocalizedLabel;
}

/**
 * Localized label
 */
export interface LocalizedLabel {
  Label?: string;
  LanguageCode?: number;
}

/**
 * Option set metadata
 */
export interface OptionSetMetadata {
  MetadataId?: string;
  Name?: string;
  DisplayName?: Label;
  Description?: Label;
  OptionSetType?: OptionSetType | (string & {});
  IsGlobal?: boolean;
  IsManaged?: boolean;
  IsCustomOptionSet?: boolean;
  Options?: OptionMetadata[];
}

/**
 * Individual option metadata
 */
export interface OptionMetadata {
  Value?: number;
  /** A status reason option (`StatusOptionMetadata`): the state (`statecode` value) it belongs to. */
  State?: number;
  Label?: Label;
  Color?: string | null;
  IsManaged?: boolean;
  MetadataId?: string | null;
  Description?: Label;
}

/**
 * Entity key (alternate key) metadata
 */
export interface EntityKeyMetadata {
  LogicalName?: string;
  SchemaName?: string;
  DisplayName?: Label;
  KeyAttributes?: string[];
  EntityLogicalName?: string;
  MetadataId?: string;
}

/**
 * Relationship metadata
 */
export interface RelationshipMetadata {
  SchemaName?: string;
  ReferencedEntity?: string;
  ReferencedAttribute?: string;
  ReferencingEntity?: string;
  ReferencingAttribute?: string;
  ReferencedEntityNavigationPropertyName?: string;
  ReferencingEntityNavigationPropertyName?: string;
}
