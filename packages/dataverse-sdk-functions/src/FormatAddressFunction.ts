import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { formatParameterAlias } from "./internal/odataLiteral.js";

/**
 * Response from the FormatAddress function.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface FormatAddressResponse {
  "@odata.context"?: string;
  Address: string;
}

/**
 * Parameters of the FormatAddress function, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface FormatAddressFunctionParameters {
  Line1: string;
  City: string;
  StateOrProvince: string;
  PostalCode: string;
  Country: string;
}

/**
 * FormatAddress function
 *
 * Unbound function
 */
export class FormatAddressFunction implements Executable<FormatAddressResponse> {
  constructor(public readonly parameters: FormatAddressFunctionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/FormatAddress`;

    // Build query parameters using parameter aliases
    const params = new URLSearchParams();
    const aliases: string[] = [];
    if (this.parameters.Line1 !== undefined) {
      aliases.push(`Line1=@p1`);
      params.append("@p1", formatParameterAlias(this.parameters.Line1, "Edm.String"));
    }
    if (this.parameters.City !== undefined) {
      aliases.push(`City=@p2`);
      params.append("@p2", formatParameterAlias(this.parameters.City, "Edm.String"));
    }
    if (this.parameters.StateOrProvince !== undefined) {
      aliases.push(`StateOrProvince=@p3`);
      params.append("@p3", formatParameterAlias(this.parameters.StateOrProvince, "Edm.String"));
    }
    if (this.parameters.PostalCode !== undefined) {
      aliases.push(`PostalCode=@p4`);
      params.append("@p4", formatParameterAlias(this.parameters.PostalCode, "Edm.String"));
    }
    if (this.parameters.Country !== undefined) {
      aliases.push(`Country=@p5`);
      params.append("@p5", formatParameterAlias(this.parameters.Country, "Edm.String"));
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

  async parseResponse(response: Response): Promise<FormatAddressResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as FormatAddressResponse;
  }
}
