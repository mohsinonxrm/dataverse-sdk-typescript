/**
 * Retrieve message (#344). Hand-written: Retrieve isn't a Web API action but
 * `GET /<entity set>(<id>)`.
 */
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import { OrganizationRequest, OrganizationResponse } from "../OrganizationRequest.js";
import { recordPath } from "./internal.js";

/** Parameters of the Retrieve message. */
export interface RetrieveRequestParameters {
  /** The record, made with `createEntityReference`. */
  Target: EntityReference;
  /**
   * The columns to read (`$select`), by logical name: the .NET `ColumnSet`. Left out (or empty),
   * every column is read, as `new ColumnSet(true)`.
   */
  ColumnSet?: readonly string[];
}

/**
 * Retrieve request message: reads one record (`GET /<entity set>(<id>)?$select=…`).
 *
 * @example
 * ```typescript
 * const response = await client.execute(
 *   new RetrieveRequest({ Target: createEntityReference("account", id), ColumnSet: ["name"] })
 * );
 * console.log(response.Entity.name);
 * ```
 */
export class RetrieveRequest extends OrganizationRequest implements Executable<RetrieveResponse> {
  declare readonly Parameters: Readonly<RetrieveRequestParameters>;

  constructor(parameters: RetrieveRequestParameters) {
    super("Retrieve", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const { Target, ColumnSet } = this.Parameters;
    const select =
      ColumnSet && ColumnSet.length > 0
        ? `?$select=${ColumnSet.map((column) => encodeURIComponent(column)).join(",")}`
        : "";
    return {
      method: "GET",
      url: `${baseUrl}/${recordPath(Target)}${select}`,
      headers: { Accept: "application/json" },
    };
  }

  async parseResponse(response: Response): Promise<RetrieveResponse> {
    return new RetrieveResponse((await response.json()) as RetrieveResult);
  }
}

/**
 * A record as the Web API returns it: its columns and annotations by name, with its version in
 * `@odata.etag`.
 */
export interface RetrieveResult {
  "@odata.context"?: string;
  /** The record's version: pass it as `ETag` to update or delete only this version. */
  "@odata.etag"?: string;
  [column: string]: unknown;
}

/** Retrieve response message: `result` (also `Entity`, as in .NET) is the record. */
export class RetrieveResponse extends OrganizationResponse {
  constructor(public result: RetrieveResult) {
    super("Retrieve");
  }

  /** The record (the .NET `RetrieveResponse.Entity`). */
  get Entity(): RetrieveResult {
    return this.result;
  }
}
