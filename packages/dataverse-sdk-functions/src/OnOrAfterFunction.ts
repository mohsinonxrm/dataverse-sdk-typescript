import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { formatAliasValue } from "./internal/odataLiteral.js";

/**
 * Response from OnOrAfter function
 */
export interface OnOrAfterResponse {
  value: boolean;
}

/**
 * OnOrAfter function
 *
 * Unbound function
 */
export class OnOrAfterFunction implements Executable<OnOrAfterResponse> {
  constructor(
    public readonly propertyName: string,
    public readonly propertyValue: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/OnOrAfter`;

    // Build query parameters using parameter aliases
    const params = new URLSearchParams();
    const aliases: string[] = [];
    if (this.propertyName !== undefined) {
      aliases.push(`PropertyName=@p1`);
      params.append("@p1", formatAliasValue(this.propertyName));
    }
    if (this.propertyValue !== undefined) {
      aliases.push(`PropertyValue=@p2`);
      params.append("@p2", formatAliasValue(this.propertyValue));
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

  async parseResponse(response: Response): Promise<OnOrAfterResponse> {
    const data = await response.json();
    return data as OnOrAfterResponse;
  }
}
