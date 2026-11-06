import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { formatParameterAlias } from "./internal/odataLiteral.js";

/**
 * Response from the In function.
 *
 * The value, read from the `value` of the response body.
 */
export type InResponse = boolean;

/**
 * Parameters of the In function, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface InFunctionParameters {
  PropertyName: string;
  PropertyValues: string[];
}

/**
 * In function
 *
 * Unbound function
 */
export class InFunction implements Executable<InResponse> {
  constructor(public readonly parameters: InFunctionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/In`;

    // Build query parameters using parameter aliases
    const params = new URLSearchParams();
    const aliases: string[] = [];
    if (this.parameters.PropertyName !== undefined) {
      aliases.push(`PropertyName=@p1`);
      params.append("@p1", formatParameterAlias(this.parameters.PropertyName, "Edm.String"));
    }
    if (this.parameters.PropertyValues !== undefined) {
      aliases.push(`PropertyValues=@p2`);
      params.append("@p2", JSON.stringify(this.parameters.PropertyValues));
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

  async parseResponse(response: Response): Promise<InResponse> {
    // A primitive comes wrapped: { "@odata.context": "…", "value": … }
    return ((await response.json()) as { value: InResponse }).value;
  }
}
