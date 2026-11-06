import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { formatParameterAlias } from "./internal/odataLiteral.js";

/**
 * Response from GetSearchInformation function
 */
export interface GetSearchInformationResponse {
  CanAllowLeadingWildCardSearch: string;
  CanSupportedByRelevanceSearch: string;
}

/**
 * Parameters of the GetSearchInformation function, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface GetSearchInformationFunctionParameters {
  Fetchxml: string;
}

/**
 * GetSearchInformation function
 *
 * Unbound function
 */
export class GetSearchInformationFunction implements Executable<GetSearchInformationResponse> {
  constructor(public readonly parameters: GetSearchInformationFunctionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/GetSearchInformation`;

    // Build query parameters using parameter aliases
    const params = new URLSearchParams();
    const aliases: string[] = [];
    if (this.parameters.Fetchxml !== undefined) {
      aliases.push(`Fetchxml=@p1`);
      params.append("@p1", formatParameterAlias(this.parameters.Fetchxml, "Edm.String"));
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

  async parseResponse(response: Response): Promise<GetSearchInformationResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as GetSearchInformationResponse;
    return (await response.json()) as GetSearchInformationResponse;
  }
}
