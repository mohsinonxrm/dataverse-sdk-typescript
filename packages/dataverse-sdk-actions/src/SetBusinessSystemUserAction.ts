import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import type { businessunit } from "./types/index.js";

/**
 * Response from SetBusinessSystemUser action
 */
export interface SetBusinessSystemUserResponse {
  // No content returned
}

/**
 * SetBusinessSystemUser action
 *
 * Bound action
 * Binding parameter: entity (mscrm.systemuser)
 */
export class SetBusinessSystemUserAction implements Executable<SetBusinessSystemUserResponse> {
  constructor(
    public readonly systemuserId: string,
    public readonly businessUnit: businessunit,
    public readonly reassignPrincipal: EntityReference,
    public readonly doNotMoveAllRecords: boolean
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/systemusers(${this.systemuserId})/Microsoft.Dynamics.CRM.SetBusinessSystemUser`;

    const body: Record<string, unknown> = {
      BusinessUnit: this.businessUnit,
      ReassignPrincipal: this.reassignPrincipal,
      DoNotMoveAllRecords: this.doNotMoveAllRecords,
    };

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<SetBusinessSystemUserResponse> {
    // No return value (204 No Content)
    return {};
  }
}
