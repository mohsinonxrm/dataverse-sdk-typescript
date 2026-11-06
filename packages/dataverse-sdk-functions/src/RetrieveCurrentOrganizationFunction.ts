import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { formatParameterAlias } from "./internal/odataLiteral.js";
import type { EndpointAccessType, OrganizationDetail } from "./types/index.js";

/**
 * Response from RetrieveCurrentOrganization function
 */
export interface RetrieveCurrentOrganizationResponse {
  Detail: OrganizationDetail;
}

/**
 * Parameters of the RetrieveCurrentOrganization function, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface RetrieveCurrentOrganizationFunctionParameters {
  AccessType: EndpointAccessType | keyof typeof EndpointAccessType;
}

/**
 * RetrieveCurrentOrganization function
 *
 * Unbound function
 */
export class RetrieveCurrentOrganizationFunction implements Executable<RetrieveCurrentOrganizationResponse> {
  constructor(public readonly parameters: RetrieveCurrentOrganizationFunctionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/RetrieveCurrentOrganization`;

    // Build query parameters using parameter aliases
    const params = new URLSearchParams();
    const aliases: string[] = [];
    if (this.parameters.AccessType !== undefined) {
      aliases.push(`AccessType=@p1`);
      params.append(
        "@p1",
        formatParameterAlias(
          this.parameters.AccessType,
          "mscrm.EndpointAccessType",
          "EnumerationType"
        )
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

  async parseResponse(response: Response): Promise<RetrieveCurrentOrganizationResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as RetrieveCurrentOrganizationResponse;
    return (await response.json()) as RetrieveCurrentOrganizationResponse;
  }
}
