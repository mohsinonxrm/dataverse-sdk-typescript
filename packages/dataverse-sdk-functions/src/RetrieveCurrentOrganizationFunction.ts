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
 * RetrieveCurrentOrganization function
 *
 * Unbound function
 */
export class RetrieveCurrentOrganizationFunction implements Executable<RetrieveCurrentOrganizationResponse> {
  constructor(public readonly accessType: EndpointAccessType | keyof typeof EndpointAccessType) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/RetrieveCurrentOrganization`;

    // Build query parameters using parameter aliases
    const params = new URLSearchParams();
    const aliases: string[] = [];
    if (this.accessType !== undefined) {
      aliases.push(`AccessType=@p1`);
      params.append(
        "@p1",
        formatParameterAlias(this.accessType, "mscrm.EndpointAccessType", "EnumerationType")
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
    const data = await response.json();
    return data as RetrieveCurrentOrganizationResponse;
  }
}
