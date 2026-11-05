import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { formatAliasValue } from "./internal/odataLiteral.js";

/**
 * Response from EqualUserId function
 */
export interface EqualUserIdResponse {
  value: boolean;
}

/**
 * EqualUserId function
 *
 * Unbound function
 */
export class EqualUserIdFunction implements Executable<EqualUserIdResponse> {
  constructor(public readonly propertyName: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/EqualUserId`;

    // Build query parameters using parameter aliases
    const params = new URLSearchParams();
    const aliases: string[] = [];
    if (this.propertyName !== undefined) {
      aliases.push(`PropertyName=@p1`);
      params.append("@p1", formatAliasValue(this.propertyName));
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

  async parseResponse(response: Response): Promise<EqualUserIdResponse> {
    const data = await response.json();
    return data as EqualUserIdResponse;
  }
}
