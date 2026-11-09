import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { formatParameterAlias } from "./internal/odataLiteral.js";

/**
 * Parameters of the GetNextRuns message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface GetNextRunsRequestParameters {
  workflowIds?: string;
  startTime?: string | Date;
  triggerIds?: string;
  runCount?: number;
  connectionReferenceIds?: string;
}

/**
 * GetNextRuns request message
 *
 * Web API Function: GetNextRuns
 */
export class GetNextRunsRequest
  extends OrganizationRequest
  implements Executable<GetNextRunsResponse>
{
  declare readonly Parameters: Readonly<GetNextRunsRequestParameters>;

  constructor(parameters: GetNextRunsRequestParameters = {}) {
    super("GetNextRuns", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound function (entity collection)
    let url = `${baseUrl}/flowtriggers/Microsoft.Dynamics.CRM.GetNextRuns`;

    // Build query parameters using parameter aliases
    const params = new URLSearchParams();
    const aliases: string[] = [];
    if (this.Parameters.workflowIds !== undefined) {
      aliases.push(`workflowIds=@p1`);
      params.append("@p1", formatParameterAlias(this.Parameters.workflowIds, "Edm.String"));
    }
    if (this.Parameters.startTime !== undefined) {
      aliases.push(`startTime=@p2`);
      params.append("@p2", formatParameterAlias(this.Parameters.startTime, "Edm.DateTimeOffset"));
    }
    if (this.Parameters.triggerIds !== undefined) {
      aliases.push(`triggerIds=@p3`);
      params.append("@p3", formatParameterAlias(this.Parameters.triggerIds, "Edm.String"));
    }
    if (this.Parameters.runCount !== undefined) {
      aliases.push(`runCount=@p4`);
      params.append("@p4", formatParameterAlias(this.Parameters.runCount, "Edm.Int32"));
    }
    if (this.Parameters.connectionReferenceIds !== undefined) {
      aliases.push(`connectionReferenceIds=@p5`);
      params.append(
        "@p5",
        formatParameterAlias(this.Parameters.connectionReferenceIds, "Edm.String")
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

  async parseResponse(response: Response): Promise<GetNextRunsResponse> {
    // The body is the complex value, with its @odata.context
    return GetNextRunsResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the GetNextRuns function.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface GetNextRunsResult {
  "@odata.context"?: string;
  response: string;
}

/**
 * GetNextRuns response message
 *
 * `result` is the value the GetNextRuns function returns (see {@link GetNextRunsResult}).
 */
export class GetNextRunsResponse extends OrganizationResponse {
  constructor(public result: GetNextRunsResult) {
    super("GetNextRuns");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): GetNextRunsResponse {
    return new GetNextRunsResponse(data as GetNextRunsResult);
  }
}
