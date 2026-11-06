import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { formatParameterAlias } from "./internal/odataLiteral.js";

/**
 * Response from RemoveActiveCustomizations function
 */
export interface RemoveActiveCustomizationsResponse {
  Result: boolean;
}

/**
 * Parameters of the RemoveActiveCustomizations function, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface RemoveActiveCustomizationsFunctionParameters {
  SolutionComponentName: string;
  ComponentId: string;
}

/**
 * RemoveActiveCustomizations function
 *
 * Unbound function
 */
export class RemoveActiveCustomizationsFunction implements Executable<RemoveActiveCustomizationsResponse> {
  constructor(public readonly parameters: RemoveActiveCustomizationsFunctionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/RemoveActiveCustomizations`;

    // Build query parameters using parameter aliases
    const params = new URLSearchParams();
    const aliases: string[] = [];
    if (this.parameters.SolutionComponentName !== undefined) {
      aliases.push(`SolutionComponentName=@p1`);
      params.append(
        "@p1",
        formatParameterAlias(this.parameters.SolutionComponentName, "Edm.String")
      );
    }
    if (this.parameters.ComponentId !== undefined) {
      aliases.push(`ComponentId=@p2`);
      params.append("@p2", formatParameterAlias(this.parameters.ComponentId, "Edm.Guid"));
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

  async parseResponse(response: Response): Promise<RemoveActiveCustomizationsResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as RemoveActiveCustomizationsResponse;
    return (await response.json()) as RemoveActiveCustomizationsResponse;
  }
}
