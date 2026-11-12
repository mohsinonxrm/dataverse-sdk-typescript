/**
 * Upsert message (#435). Hand-written: Upsert isn't a Web API action but
 * `PATCH /<entity set>(<key>)` without `If-Match`.
 */
import {
  DataverseInvalidRequestError,
  odataKey,
  type Executable,
  type ODataKey,
  type RequestInformation,
} from "@mohsinonxrm/dataverse-sdk-core";
import {
  createEntityReference,
  type EntityReference,
} from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import { OrganizationRequest, OrganizationResponse } from "../OrganizationRequest.js";
import type { AnyEntityPayload } from "../types/EntityPayload.js";
import { columnsOf, entitySetOf, primaryKeyOf, tableOf } from "./internal.js";

/** Parameters of the Upsert message. */
export interface UpsertRequestParameters {
  /**
   * The record to create or update: `@odata.type` names the table
   * (`"Microsoft.Dynamics.CRM.account"`), and the other properties are its columns and
   * `<lookup>@odata.bind` values, as the Web API takes them (the .NET `Entity`). Without `Key`, its
   * primary key column (`accountid`) is the record's key.
   */
  Target: AnyEntityPayload;
  /**
   * The record's key (the .NET `Entity.Id` or `Entity.KeyAttributes`): a GUID, or an alternate key
   * such as `{ accountnumber: "A-1" }` (values are escaped). Left out, the primary key column of
   * `Target` is the key. Don't repeat alternate key columns in `Target`: Dataverse sets them from
   * the key when it creates the record.
   */
  Key?: ODataKey;
  /**
   * The table's entity set, for a table the SDK's `$metadata` snapshot doesn't know, such as a
   * custom table (`"new_widgets"`). Others are found from `@odata.type`.
   */
  EntitySetName?: string;
  /**
   * The table's primary key column, for a table the snapshot doesn't know whose key isn't
   * `<logical name>id`. It is the column the response is read from.
   */
  PrimaryIdAttribute?: string;
}

/**
 * Upsert request message: creates the record when no record has its key, and updates it otherwise
 * (`PATCH /<entity set>(<key>)` without `If-Match`). The key is a GUID or an alternate key.
 *
 * As the .NET `UpsertResponse` does, the response says whether the record was created
 * (`RecordCreated`) and refers to it (`Target`). The Web API answers an upsert `204 No Content`
 * either way, so the request asks for the record back (`Prefer: return=representation`, with
 * `$select` of its primary key only): Dataverse then answers `201 Created` for a create and
 * `200 OK` for an update. That costs Dataverse one more retrieve; when you don't need to know,
 * `client.api(...).patch(record)` sends the plain upsert.
 *
 * @example
 * ```typescript
 * const { RecordCreated, Target } = await client.execute(
 *   new UpsertRequest({
 *     Target: { "@odata.type": "Microsoft.Dynamics.CRM.account", name: "Contoso" },
 *     Key: { accountnumber: "A-1" },
 *   })
 * );
 * console.log(RecordCreated ? "created" : "updated", Target.id);
 * ```
 */
export class UpsertRequest extends OrganizationRequest implements Executable<UpsertResponse> {
  declare readonly Parameters: Readonly<UpsertRequestParameters>;

  constructor(parameters: UpsertRequestParameters) {
    super("Upsert", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const { Target, Key, EntitySetName, PrimaryIdAttribute } = this.Parameters;
    const table = tableOf(Target, "Target");
    const entitySet = entitySetOf(table, EntitySetName);
    const primaryKey = primaryKeyOf(table, PrimaryIdAttribute);
    let body = columnsOf(Target);
    let key = Key;
    if (key === undefined) {
      const { [primaryKey]: id, ...columns } = body;
      if (typeof id !== "string" || id === "") {
        throw DataverseInvalidRequestError.invalidParameter(
          "Key",
          `pass the record's key, or set its primary key column "${primaryKey}" in Target`
        );
      }
      // The URL holds the id
      body = columns;
      key = id;
    }
    return {
      method: "PATCH",
      url: `${baseUrl}/${entitySet}(${odataKey(key)})?$select=${encodeURIComponent(primaryKey)}`,
      // No If-Match: that is what makes the PATCH an upsert rather than an update
      headers: { "content-type": "application/json", Prefer: "return=representation" },
      body,
    };
  }

  async parseResponse(response: Response): Promise<UpsertResponse> {
    const { Target, EntitySetName, PrimaryIdAttribute } = this.Parameters;
    const table = tableOf(Target, "Target");
    const primaryKey = primaryKeyOf(table, PrimaryIdAttribute);
    const text = response.status === 204 ? "" : await response.text();
    const record = text.trim() === "" ? {} : (JSON.parse(text) as Record<string, unknown>);
    const fromBody = record[primaryKey];
    const id =
      typeof fromBody === "string" ? fromBody : (idFromHeader(response) ?? keyId(this.Parameters));
    const reference = createEntityReference(table, id, {
      ...(EntitySetName ? { entitySetName: EntitySetName } : {}),
      ...(PrimaryIdAttribute ? { primaryIdAttribute: PrimaryIdAttribute } : {}),
    });
    return new UpsertResponse({ RecordCreated: response.status === 201, Target: reference });
  }
}

/** The GUID in the `OData-EntityId` header, which an upsert by alternate key doesn't have. */
function idFromHeader(response: Response): string | undefined {
  const header = response.headers.get("odata-entityid") ?? "";
  return /\(([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})\)\s*$/i.exec(
    header
  )?.[1];
}

/** The GUID the request was sent with, or `""` for an alternate key. */
function keyId({ Key, Target, PrimaryIdAttribute }: UpsertRequestParameters): string {
  const key = Key ?? Target[primaryKeyOf(tableOf(Target, "Target"), PrimaryIdAttribute)];
  return typeof key === "string" ? key.replace(/[{}]/g, "") : "";
}

/** What an upsert did. */
export interface UpsertResult {
  /** `true` when the record was created, `false` when an existing record was updated. */
  RecordCreated: boolean;
  /** The record (its table and id). */
  Target: EntityReference;
}

/**
 * Upsert response message: `RecordCreated` and `Target`, as in .NET (also `result`).
 *
 * `RecordCreated` comes from the status Dataverse answers with (`201 Created` or `200 OK`). A
 * `204 No Content`, which Dataverse sends only when it ignores `Prefer: return=representation`,
 * reads as `false`.
 */
export class UpsertResponse extends OrganizationResponse {
  constructor(public result: UpsertResult) {
    super("Upsert");
  }

  /** Whether the record was created (the .NET `UpsertResponse.RecordCreated`). */
  get RecordCreated(): boolean {
    return this.result.RecordCreated;
  }

  /** The record that was created or updated (the .NET `UpsertResponse.Target`). */
  get Target(): EntityReference {
    return this.result.Target;
  }
}
