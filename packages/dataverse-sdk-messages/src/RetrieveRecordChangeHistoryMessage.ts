import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import { formatParameterAlias } from "./internal/odataLiteral.js";
import type { AuditDetailCollection, PagingInfo } from "./types/index.js";

/**
 * Parameters of the RetrieveRecordChangeHistory message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface RetrieveRecordChangeHistoryRequestParameters {
  Target: EntityReference;
  PagingInfo?: PagingInfo;
}

/**
 * RetrieveRecordChangeHistory request message
 *
 * Web API Function: RetrieveRecordChangeHistory
 */
export class RetrieveRecordChangeHistoryRequest
  extends OrganizationRequest
  implements Executable<RetrieveRecordChangeHistoryResponse>
{
  declare readonly Parameters: Readonly<RetrieveRecordChangeHistoryRequestParameters>;

  constructor(parameters: RetrieveRecordChangeHistoryRequestParameters) {
    super("RetrieveRecordChangeHistory", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/RetrieveRecordChangeHistory`;

    // Build query parameters using parameter aliases
    const params = new URLSearchParams();
    const aliases: string[] = [];
    if (this.Parameters.Target !== undefined) {
      aliases.push(`Target=@p1`);
      params.append(
        "@p1",
        formatParameterAlias(this.Parameters.Target, "mscrm.crmbaseentity", "EntityType")
      );
    }
    if (this.Parameters.PagingInfo !== undefined) {
      aliases.push(`PagingInfo=@p2`);
      params.append(
        "@p2",
        formatParameterAlias(this.Parameters.PagingInfo, "mscrm.PagingInfo", "ComplexType")
      );
    }
    if (aliases.length > 0) {
      url += `(${aliases.join(",")})?${params.toString()}`;
    }

    return {
      method: "GET",
      url,
      headers: {
        Accept: "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<RetrieveRecordChangeHistoryResponse> {
    // The body is the complex value, with its @odata.context
    return RetrieveRecordChangeHistoryResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the RetrieveRecordChangeHistory function.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface RetrieveRecordChangeHistoryResult {
  "@odata.context"?: string;
  AuditDetailCollection: AuditDetailCollection;
}

/**
 * RetrieveRecordChangeHistory response message
 *
 * `result` is the value the RetrieveRecordChangeHistory function returns (see {@link RetrieveRecordChangeHistoryResult}).
 */
export class RetrieveRecordChangeHistoryResponse extends OrganizationResponse {
  constructor(public result: RetrieveRecordChangeHistoryResult) {
    super("RetrieveRecordChangeHistory");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): RetrieveRecordChangeHistoryResponse {
    return new RetrieveRecordChangeHistoryResponse(data as RetrieveRecordChangeHistoryResult);
  }
}
