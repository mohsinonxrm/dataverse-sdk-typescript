import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { formatAliasValue } from "./internal/odataLiteral.js";
import type { EntityReference } from "./types/EntityReference.js";
import { getEntitySetNameFromReference } from "./types/EntityReference.js";

/**
 * Response from IsValidStateTransition function
 */
export interface IsValidStateTransitionResponse {
  IsValid: boolean;
}

/**
 * IsValidStateTransition function
 *
 * Unbound function
 */
export class IsValidStateTransitionFunction implements Executable<IsValidStateTransitionResponse> {
  constructor(
    public readonly entity: EntityReference,
    public readonly newState: string,
    public readonly newStatus: number
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/IsValidStateTransition`;

    // Build query parameters using parameter aliases
    const params = new URLSearchParams();
    const aliases: string[] = [];
    if (this.entity !== undefined) {
      aliases.push(`Entity=@p1`);
      params.append(
        "@p1",
        JSON.stringify({
          "@odata.id": `${getEntitySetNameFromReference(this.entity)}(${this.entity.id})`,
        })
      );
    }
    if (this.newState !== undefined) {
      aliases.push(`NewState=@p2`);
      params.append("@p2", formatAliasValue(this.newState));
    }
    if (this.newStatus !== undefined) {
      aliases.push(`NewStatus=@p3`);
      params.append("@p3", formatAliasValue(this.newStatus));
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

  async parseResponse(response: Response): Promise<IsValidStateTransitionResponse> {
    const data = await response.json();
    return data as IsValidStateTransitionResponse;
  }
}
