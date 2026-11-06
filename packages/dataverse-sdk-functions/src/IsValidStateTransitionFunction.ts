import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { formatParameterAlias } from "./internal/odataLiteral.js";
import type { EntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";

/**
 * Response from the IsValidStateTransition function.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface IsValidStateTransitionResponse {
  "@odata.context"?: string;
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
    // The body is the complex value, with its @odata.context
    return (await response.json()) as IsValidStateTransitionResponse;
  }
}
