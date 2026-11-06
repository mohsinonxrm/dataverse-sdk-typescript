import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { formatParameterAlias } from "./internal/odataLiteral.js";
import type { EntityReference } from "./types/EntityReference.js";
import { getEntitySetNameFromReference } from "./types/EntityReference.js";

/**
 * Response from RetrieveAppComponents function
 */
export interface RetrieveAppComponentsResponse {
  value: EntityReference[];
}

/**
 * RetrieveAppComponents function
 *
 * Unbound function
 */
export class RetrieveAppComponentsFunction implements Executable<RetrieveAppComponentsResponse> {
  constructor(public readonly appModuleId: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/RetrieveAppComponents`;

    // Build query parameters using parameter aliases
    const params = new URLSearchParams();
    const aliases: string[] = [];
    if (this.appModuleId !== undefined) {
      aliases.push(`AppModuleId=@p1`);
      params.append("@p1", formatParameterAlias(this.appModuleId, "Edm.Guid"));
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

  async parseResponse(response: Response): Promise<RetrieveAppComponentsResponse> {
    const data = await response.json();
    return data as RetrieveAppComponentsResponse;
  }
}
