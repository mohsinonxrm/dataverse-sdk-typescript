import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { formatParameterAlias } from "./internal/odataLiteral.js";

/**
 * Response from FormatAddress function
 */
export interface FormatAddressResponse {
  Address: string;
}

/**
 * FormatAddress function
 *
 * Unbound function
 */
export class FormatAddressFunction implements Executable<FormatAddressResponse> {
  constructor(
    public readonly line1: string,
    public readonly city: string,
    public readonly stateOrProvince: string,
    public readonly postalCode: string,
    public readonly country: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/FormatAddress`;

    // Build query parameters using parameter aliases
    const params = new URLSearchParams();
    const aliases: string[] = [];
    if (this.line1 !== undefined) {
      aliases.push(`Line1=@p1`);
      params.append("@p1", formatParameterAlias(this.line1, "Edm.String"));
    }
    if (this.city !== undefined) {
      aliases.push(`City=@p2`);
      params.append("@p2", formatParameterAlias(this.city, "Edm.String"));
    }
    if (this.stateOrProvince !== undefined) {
      aliases.push(`StateOrProvince=@p3`);
      params.append("@p3", formatParameterAlias(this.stateOrProvince, "Edm.String"));
    }
    if (this.postalCode !== undefined) {
      aliases.push(`PostalCode=@p4`);
      params.append("@p4", formatParameterAlias(this.postalCode, "Edm.String"));
    }
    if (this.country !== undefined) {
      aliases.push(`Country=@p5`);
      params.append("@p5", formatParameterAlias(this.country, "Edm.String"));
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
    const data = await response.json();
    return data as FormatAddressResponse;
  }
}
