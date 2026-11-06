import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { formatParameterAlias } from "./internal/odataLiteral.js";

/**
 * Response from GetNextRuns function
 */
export interface GetNextRunsResponse {
  response: string;
}

/**
 * Parameters of the GetNextRuns function, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface GetNextRunsFunctionParameters {
  workflowIds?: string;
  startTime?: string | Date;
  triggerIds?: string;
  runCount?: number;
  connectionReferenceIds?: string;
}

/**
 * GetNextRuns function
 *
 * Bound function
 * Binding parameter: entityset (Collection(mscrm.flowtrigger))
 */
export class GetNextRunsFunction implements Executable<GetNextRunsResponse> {
  constructor(public readonly parameters: GetNextRunsFunctionParameters = {}) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound function (entity collection)
    let url = `${baseUrl}/flowtriggers/Microsoft.Dynamics.CRM.GetNextRuns`;

    // Build query parameters using parameter aliases
    const params = new URLSearchParams();
    const aliases: string[] = [];
    if (this.parameters.workflowIds !== undefined) {
      aliases.push(`workflowIds=@p1`);
      params.append("@p1", formatParameterAlias(this.parameters.workflowIds, "Edm.String"));
    }
    if (this.parameters.startTime !== undefined) {
      aliases.push(`startTime=@p2`);
      params.append("@p2", formatParameterAlias(this.parameters.startTime, "Edm.DateTimeOffset"));
    }
    if (this.parameters.triggerIds !== undefined) {
      aliases.push(`triggerIds=@p3`);
      params.append("@p3", formatParameterAlias(this.parameters.triggerIds, "Edm.String"));
    }
    if (this.parameters.runCount !== undefined) {
      aliases.push(`runCount=@p4`);
      params.append("@p4", formatParameterAlias(this.parameters.runCount, "Edm.Int32"));
    }
    if (this.parameters.connectionReferenceIds !== undefined) {
      aliases.push(`connectionReferenceIds=@p5`);
      params.append(
        "@p5",
        formatParameterAlias(this.parameters.connectionReferenceIds, "Edm.String")
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
    // 204 No Content is an empty result
    if (response.status === 204) return {} as GetNextRunsResponse;
    return (await response.json()) as GetNextRunsResponse;
  }
}
