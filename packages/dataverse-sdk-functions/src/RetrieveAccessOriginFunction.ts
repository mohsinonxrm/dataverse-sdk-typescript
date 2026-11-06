import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { formatParameterAlias } from "./internal/odataLiteral.js";

/**
 * Response from RetrieveAccessOrigin function
 */
export interface RetrieveAccessOriginResponse {
  Response: string;
}

/**
 * Parameters of the RetrieveAccessOrigin function, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface RetrieveAccessOriginFunctionParameters {
  ObjectId: string;
  LogicalName: string;
  PrincipalId: string;
}

/**
 * RetrieveAccessOrigin function
 *
 * Unbound function
 */
export class RetrieveAccessOriginFunction implements Executable<RetrieveAccessOriginResponse> {
  constructor(public readonly parameters: RetrieveAccessOriginFunctionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/RetrieveAccessOrigin`;

    // Build query parameters using parameter aliases
    const params = new URLSearchParams();
    const aliases: string[] = [];
    if (this.parameters.ObjectId !== undefined) {
      aliases.push(`ObjectId=@p1`);
      params.append("@p1", formatParameterAlias(this.parameters.ObjectId, "Edm.Guid"));
    }
    if (this.parameters.LogicalName !== undefined) {
      aliases.push(`LogicalName=@p2`);
      params.append("@p2", formatParameterAlias(this.parameters.LogicalName, "Edm.String"));
    }
    if (this.parameters.PrincipalId !== undefined) {
      aliases.push(`PrincipalId=@p3`);
      params.append("@p3", formatParameterAlias(this.parameters.PrincipalId, "Edm.Guid"));
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

  async parseResponse(response: Response): Promise<RetrieveAccessOriginResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as RetrieveAccessOriginResponse;
    return (await response.json()) as RetrieveAccessOriginResponse;
  }
}
