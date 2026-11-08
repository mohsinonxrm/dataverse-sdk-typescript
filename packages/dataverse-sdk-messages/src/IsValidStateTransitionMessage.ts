import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import { formatParameterAlias } from "./internal/odataLiteral.js";

/**
 * Parameters of the IsValidStateTransition message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface IsValidStateTransitionRequestParameters {
  Entity: EntityReference;
  NewState: string;
  NewStatus: number;
}

/**
 * IsValidStateTransition request message
 *
 * Web API Function: IsValidStateTransition
 */
export class IsValidStateTransitionRequest
  extends OrganizationRequest
  implements Executable<IsValidStateTransitionResponse>
{
  declare readonly Parameters: Readonly<IsValidStateTransitionRequestParameters>;

  constructor(parameters: IsValidStateTransitionRequestParameters) {
    super("IsValidStateTransition", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/IsValidStateTransition`;

    // Build query parameters using parameter aliases
    const params = new URLSearchParams();
    const aliases: string[] = [];
    if (this.Parameters.Entity !== undefined) {
      aliases.push(`Entity=@p1`);
      params.append(
        "@p1",
        formatParameterAlias(this.Parameters.Entity, "mscrm.crmbaseentity", "EntityType")
      );
    }
    if (this.Parameters.NewState !== undefined) {
      aliases.push(`NewState=@p2`);
      params.append("@p2", formatParameterAlias(this.Parameters.NewState, "Edm.String"));
    }
    if (this.Parameters.NewStatus !== undefined) {
      aliases.push(`NewStatus=@p3`);
      params.append("@p3", formatParameterAlias(this.Parameters.NewStatus, "Edm.Int32"));
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
    return IsValidStateTransitionResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the IsValidStateTransition function.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface IsValidStateTransitionResult {
  "@odata.context"?: string;
  IsValid: boolean;
}

/**
 * IsValidStateTransition response message
 *
 * `result` is the value the IsValidStateTransition function returns (see {@link IsValidStateTransitionResult}).
 */
export class IsValidStateTransitionResponse extends OrganizationResponse {
  constructor(public result: IsValidStateTransitionResult) {
    super("IsValidStateTransition");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): IsValidStateTransitionResponse {
    return new IsValidStateTransitionResponse(data as IsValidStateTransitionResult);
  }
}
