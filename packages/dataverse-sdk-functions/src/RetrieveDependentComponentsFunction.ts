import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { formatParameterAlias } from "./internal/odataLiteral.js";
import type { dependency } from "./types/index.js";

/**
 * Response from RetrieveDependentComponents function
 */
export interface RetrieveDependentComponentsResponse {
  value: dependency[];
}

/**
 * RetrieveDependentComponents function
 *
 * Unbound function
 */
export class RetrieveDependentComponentsFunction implements Executable<RetrieveDependentComponentsResponse> {
  constructor(
    public readonly objectId: string,
    public readonly componentType: number
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/RetrieveDependentComponents`;

    // Build query parameters using parameter aliases
    const params = new URLSearchParams();
    const aliases: string[] = [];
    if (this.objectId !== undefined) {
      aliases.push(`ObjectId=@p1`);
      params.append("@p1", formatParameterAlias(this.objectId, "Edm.Guid"));
    }
    if (this.componentType !== undefined) {
      aliases.push(`ComponentType=@p2`);
      params.append("@p2", formatParameterAlias(this.componentType, "Edm.Int32"));
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

  async parseResponse(response: Response): Promise<RetrieveDependentComponentsResponse> {
    const data = await response.json();
    return data as RetrieveDependentComponentsResponse;
  }
}
