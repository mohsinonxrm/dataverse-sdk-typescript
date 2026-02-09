import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

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
      params.append("@p1", typeof this.line1 === "string" ? `'${this.line1}'` : String(this.line1));
    }
    if (this.city !== undefined) {
      aliases.push(`City=@p2`);
      params.append("@p2", typeof this.city === "string" ? `'${this.city}'` : String(this.city));
    }
    if (this.stateOrProvince !== undefined) {
      aliases.push(`StateOrProvince=@p3`);
      params.append(
        "@p3",
        typeof this.stateOrProvince === "string"
          ? `'${this.stateOrProvince}'`
          : String(this.stateOrProvince)
      );
    }
    if (this.postalCode !== undefined) {
      aliases.push(`PostalCode=@p4`);
      params.append(
        "@p4",
        typeof this.postalCode === "string" ? `'${this.postalCode}'` : String(this.postalCode)
      );
    }
    if (this.country !== undefined) {
      aliases.push(`Country=@p5`);
      params.append(
        "@p5",
        typeof this.country === "string" ? `'${this.country}'` : String(this.country)
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

  async parseResponse(response: Response): Promise<FormatAddressResponse> {
    const data = await response.json();
    return data as FormatAddressResponse;
  }
}
