import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { formatParameterAlias } from "./internal/odataLiteral.js";

/**
 * Response from IsComponentCustomizable function
 */
export interface IsComponentCustomizableResponse {
  IsComponentCustomizable: boolean;
}

/**
 * Parameters of the IsComponentCustomizable function, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface IsComponentCustomizableFunctionParameters {
  ComponentId: string;
  ComponentType: number;
}

/**
 * IsComponentCustomizable function
 *
 * Unbound function
 */
export class IsComponentCustomizableFunction implements Executable<IsComponentCustomizableResponse> {
  constructor(public readonly parameters: IsComponentCustomizableFunctionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/IsComponentCustomizable`;

    // Build query parameters using parameter aliases
    const params = new URLSearchParams();
    const aliases: string[] = [];
    if (this.parameters.ComponentId !== undefined) {
      aliases.push(`ComponentId=@p1`);
      params.append("@p1", formatParameterAlias(this.parameters.ComponentId, "Edm.Guid"));
    }
    if (this.parameters.ComponentType !== undefined) {
      aliases.push(`ComponentType=@p2`);
      params.append("@p2", formatParameterAlias(this.parameters.ComponentType, "Edm.Int32"));
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

  async parseResponse(response: Response): Promise<IsComponentCustomizableResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as IsComponentCustomizableResponse;
  }
}
