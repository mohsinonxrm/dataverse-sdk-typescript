import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { formatParameterAlias } from "./internal/odataLiteral.js";

/**
 * Response from the InFiscalPeriod function.
 *
 * The value, read from the `value` of the response body.
 */
export type InFiscalPeriodResponse = boolean;

/**
 * Parameters of the InFiscalPeriod function, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface InFiscalPeriodFunctionParameters {
  PropertyName: string;
  PropertyValue: number;
}

/**
 * InFiscalPeriod function
 *
 * Unbound function
 */
export class InFiscalPeriodFunction implements Executable<InFiscalPeriodResponse> {
  constructor(public readonly parameters: InFiscalPeriodFunctionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/InFiscalPeriod`;

    // Build query parameters using parameter aliases
    const params = new URLSearchParams();
    const aliases: string[] = [];
    if (this.parameters.PropertyName !== undefined) {
      aliases.push(`PropertyName=@p1`);
      params.append("@p1", formatParameterAlias(this.parameters.PropertyName, "Edm.String"));
    }
    if (this.parameters.PropertyValue !== undefined) {
      aliases.push(`PropertyValue=@p2`);
      params.append("@p2", formatParameterAlias(this.parameters.PropertyValue, "Edm.Int64"));
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

  async parseResponse(response: Response): Promise<InFiscalPeriodResponse> {
    // A primitive comes wrapped: { "@odata.context": "…", "value": … }
    return ((await response.json()) as { value: InFiscalPeriodResponse }).value;
  }
}
