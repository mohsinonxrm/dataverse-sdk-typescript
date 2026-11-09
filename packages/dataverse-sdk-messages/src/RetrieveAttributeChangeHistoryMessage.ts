import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import { formatParameterAlias } from "./internal/odataLiteral.js";
import type { AuditDetailCollection, PagingInfo } from "./types/index.js";

/**
 * Parameters of the RetrieveAttributeChangeHistory message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface RetrieveAttributeChangeHistoryRequestParameters {
  Target: EntityReference;
  AttributeLogicalName: string;
  PagingInfo?: PagingInfo;
}

/**
 * RetrieveAttributeChangeHistory request message
 *
 * Web API Function: RetrieveAttributeChangeHistory
 */
export class RetrieveAttributeChangeHistoryRequest
  extends OrganizationRequest
  implements Executable<RetrieveAttributeChangeHistoryResponse>
{
  declare readonly Parameters: Readonly<RetrieveAttributeChangeHistoryRequestParameters>;

  constructor(parameters: RetrieveAttributeChangeHistoryRequestParameters) {
    super("RetrieveAttributeChangeHistory", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/RetrieveAttributeChangeHistory`;

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
    if (this.Parameters.AttributeLogicalName !== undefined) {
      aliases.push(`AttributeLogicalName=@p2`);
      params.append(
        "@p2",
        formatParameterAlias(this.Parameters.AttributeLogicalName, "Edm.String")
      );
    }
    if (this.Parameters.PagingInfo !== undefined) {
      aliases.push(`PagingInfo=@p3`);
      params.append(
        "@p3",
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

  async parseResponse(response: Response): Promise<RetrieveAttributeChangeHistoryResponse> {
    // The body is the complex value, with its @odata.context
    return RetrieveAttributeChangeHistoryResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the RetrieveAttributeChangeHistory function.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface RetrieveAttributeChangeHistoryResult {
  "@odata.context"?: string;
  AuditDetailCollection: AuditDetailCollection;
}

/**
 * RetrieveAttributeChangeHistory response message
 *
 * `result` is the value the RetrieveAttributeChangeHistory function returns (see {@link RetrieveAttributeChangeHistoryResult}).
 */
export class RetrieveAttributeChangeHistoryResponse extends OrganizationResponse {
  constructor(public result: RetrieveAttributeChangeHistoryResult) {
    super("RetrieveAttributeChangeHistory");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): RetrieveAttributeChangeHistoryResponse {
    return new RetrieveAttributeChangeHistoryResponse(data as RetrieveAttributeChangeHistoryResult);
  }
}
