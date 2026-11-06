import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { formatParameterAlias } from "./internal/odataLiteral.js";
import type { EntityReference } from "./types/EntityReference.js";

/**
 * Response from IsValidStateTransition function
 */
export interface IsValidStateTransitionResponse {
  IsValid: boolean;
}

/**
 * Parameters of the IsValidStateTransition function, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface IsValidStateTransitionFunctionParameters {
  Entity: EntityReference;
  NewState: string;
  NewStatus: number;
}

/**
 * IsValidStateTransition function
 *
 * Unbound function
 */
export class IsValidStateTransitionFunction implements Executable<IsValidStateTransitionResponse> {
  constructor(public readonly parameters: IsValidStateTransitionFunctionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/IsValidStateTransition`;

    // Build query parameters using parameter aliases
    const params = new URLSearchParams();
    const aliases: string[] = [];
    if (this.parameters.Entity !== undefined) {
      aliases.push(`Entity=@p1`);
      params.append(
        "@p1",
        formatParameterAlias(this.parameters.Entity, "mscrm.crmbaseentity", "EntityType")
      );
    }
    if (this.parameters.NewState !== undefined) {
      aliases.push(`NewState=@p2`);
      params.append("@p2", formatParameterAlias(this.parameters.NewState, "Edm.String"));
    }
    if (this.parameters.NewStatus !== undefined) {
      aliases.push(`NewStatus=@p3`);
      params.append("@p3", formatParameterAlias(this.parameters.NewStatus, "Edm.Int32"));
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
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as IsValidStateTransitionResponse;
  }
}
