import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { formatAliasValue } from "./internal/odataLiteral.js";

/**
 * Response from DoesNotContainValues function
 */
export interface DoesNotContainValuesResponse {
  value: boolean;
}

/**
 * DoesNotContainValues function
 *
 * Unbound function
 */
export class DoesNotContainValuesFunction implements Executable<DoesNotContainValuesResponse> {
  constructor(
    public readonly propertyName: string,
    public readonly propertyValues: string[]
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/DoesNotContainValues`;

    // Build query parameters using parameter aliases
    const params = new URLSearchParams();
    const aliases: string[] = [];
    if (this.propertyName !== undefined) {
      aliases.push(`PropertyName=@p1`);
      params.append("@p1", formatAliasValue(this.propertyName));
    }
    if (this.propertyValues !== undefined) {
      aliases.push(`PropertyValues=@p2`);
      params.append("@p2", JSON.stringify(this.propertyValues));
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

  async parseResponse(response: Response): Promise<DoesNotContainValuesResponse> {
    const data = await response.json();
    return data as DoesNotContainValuesResponse;
  }
}
