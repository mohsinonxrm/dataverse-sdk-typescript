import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { formatParameterAlias } from "./internal/odataLiteral.js";

/**
 * Parameters of the FormatAddress message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface FormatAddressRequestParameters {
  Line1: string;
  City: string;
  StateOrProvince: string;
  PostalCode: string;
  Country: string;
}

/**
 * FormatAddress request message
 *
 * Web API Function: FormatAddress
 */
export class FormatAddressRequest
  extends OrganizationRequest
  implements Executable<FormatAddressResponse>
{
  declare readonly Parameters: Readonly<FormatAddressRequestParameters>;

  constructor(parameters: FormatAddressRequestParameters) {
    super("FormatAddress", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/FormatAddress`;

    // Build query parameters using parameter aliases
    const params = new URLSearchParams();
    const aliases: string[] = [];
    if (this.Parameters.Line1 !== undefined) {
      aliases.push(`Line1=@p1`);
      params.append("@p1", formatParameterAlias(this.Parameters.Line1, "Edm.String"));
    }
    if (this.Parameters.City !== undefined) {
      aliases.push(`City=@p2`);
      params.append("@p2", formatParameterAlias(this.Parameters.City, "Edm.String"));
    }
    if (this.Parameters.StateOrProvince !== undefined) {
      aliases.push(`StateOrProvince=@p3`);
      params.append("@p3", formatParameterAlias(this.Parameters.StateOrProvince, "Edm.String"));
    }
    if (this.Parameters.PostalCode !== undefined) {
      aliases.push(`PostalCode=@p4`);
      params.append("@p4", formatParameterAlias(this.Parameters.PostalCode, "Edm.String"));
    }
    if (this.Parameters.Country !== undefined) {
      aliases.push(`Country=@p5`);
      params.append("@p5", formatParameterAlias(this.Parameters.Country, "Edm.String"));
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
    return FormatAddressResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the FormatAddress function.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface FormatAddressResult {
  "@odata.context"?: string;
  Address: string;
}

/**
 * FormatAddress response message
 *
 * `result` is the value the FormatAddress function returns (see {@link FormatAddressResult}).
 */
export class FormatAddressResponse extends OrganizationResponse {
  constructor(public result: FormatAddressResult) {
    super("FormatAddress");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): FormatAddressResponse {
    return new FormatAddressResponse(data as FormatAddressResult);
  }
}
