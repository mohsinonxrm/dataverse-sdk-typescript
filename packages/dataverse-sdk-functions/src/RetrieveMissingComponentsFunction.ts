import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { formatAliasValue } from "./internal/odataLiteral.js";
import type { MissingComponent } from "./types/index.js";

/**
 * Response from RetrieveMissingComponents function
 */
export interface RetrieveMissingComponentsResponse {
  MissingComponents: MissingComponent[];
}

/**
 * RetrieveMissingComponents function
 *
 * Unbound function
 */
export class RetrieveMissingComponentsFunction implements Executable<RetrieveMissingComponentsResponse> {
  constructor(public readonly customizationFile: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/RetrieveMissingComponents`;

    // Build query parameters using parameter aliases
    const params = new URLSearchParams();
    const aliases: string[] = [];
    if (this.customizationFile !== undefined) {
      aliases.push(`CustomizationFile=@p1`);
      params.append("@p1", formatAliasValue(this.customizationFile));
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

  async parseResponse(response: Response): Promise<RetrieveMissingComponentsResponse> {
    const data = await response.json();
    return data as RetrieveMissingComponentsResponse;
  }
}
