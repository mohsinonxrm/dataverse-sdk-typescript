import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { formatParameterAlias } from "./internal/odataLiteral.js";

/**
 * Response from the Under function.
 *
 * The value, read from the `value` of the response body.
 */
export type UnderResponse = boolean;

/**
 * Parameters of the Under function, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface UnderFunctionParameters {
  PropertyName: string;
  PropertyValue: string;
}

/**
 * Under function
 *
 * Unbound function
 */
export class UnderFunction implements Executable<UnderResponse> {
  constructor(public readonly parameters: UnderFunctionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/Under`;

    // Build query parameters using parameter aliases
    const params = new URLSearchParams();
    const aliases: string[] = [];
    if (this.parameters.PropertyName !== undefined) {
      aliases.push(`PropertyName=@p1`);
      params.append("@p1", formatParameterAlias(this.parameters.PropertyName, "Edm.String"));
    }
    if (this.parameters.PropertyValue !== undefined) {
      aliases.push(`PropertyValue=@p2`);
      params.append("@p2", formatParameterAlias(this.parameters.PropertyValue, "Edm.String"));
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

  async parseResponse(response: Response): Promise<UnderResponse> {
    // A primitive comes wrapped: { "@odata.context": "…", "value": … }
    return ((await response.json()) as { value: UnderResponse }).value;
  }
}
