import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import { getEntitySetNameFromReference } from "./types/EntityReference.js";

/**
 * Response from RetrieveRequiredComponents function
 */
export interface RetrieveRequiredComponentsResponse {
  value: EntityReference[];
}

/**
 * RetrieveRequiredComponents function
 *
 * Unbound function
 */
export class RetrieveRequiredComponentsFunction implements Executable<RetrieveRequiredComponentsResponse> {
  constructor(
    public readonly objectId: string,
    public readonly componentType: number
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/RetrieveRequiredComponents`;

    // Build query parameters using parameter aliases
    const params = new URLSearchParams();
    const aliases: string[] = [];
    if (this.objectId !== undefined) {
      aliases.push(`ObjectId=@p1`);
      params.append(
        "@p1",
        typeof this.objectId === "string" ? `'${this.objectId}'` : String(this.objectId)
      );
    }
    if (this.componentType !== undefined) {
      aliases.push(`ComponentType=@p2`);
      params.append(
        "@p2",
        typeof this.componentType === "string"
          ? `'${this.componentType}'`
          : String(this.componentType)
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

  async parseResponse(response: Response): Promise<RetrieveRequiredComponentsResponse> {
    const data = await response.json();
    return data as RetrieveRequiredComponentsResponse;
  }
}
