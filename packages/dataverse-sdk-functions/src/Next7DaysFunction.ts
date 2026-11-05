import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { formatAliasValue } from "./internal/odataLiteral.js";

/**
 * Response from Next7Days function
 */
export interface Next7DaysResponse {
  value: boolean;
}

/**
 * Next7Days function
 *
 * Unbound function
 */
export class Next7DaysFunction implements Executable<Next7DaysResponse> {
  constructor(public readonly propertyName: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/Next7Days`;

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

  async parseResponse(response: Response): Promise<Next7DaysResponse> {
    const data = await response.json();
    return data as Next7DaysResponse;
  }
}
