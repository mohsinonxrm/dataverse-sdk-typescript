import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";

/**
 * Response from ReassignObjectsSystemUser action
 */
export interface ReassignObjectsSystemUserResponse {
  // No content returned
}

/**
 * ReassignObjectsSystemUser action
 *
 * Bound action
 * Binding parameter: entity (mscrm.systemuser)
 */
export class ReassignObjectsSystemUserAction implements Executable<ReassignObjectsSystemUserResponse> {
  constructor(
    public readonly systemuserId: string,
    public readonly reassignPrincipal: EntityReference,
    public readonly objectType: number
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/systemusers(${this.systemuserId})/Microsoft.Dynamics.CRM.ReassignObjectsSystemUser`;

    const body: Record<string, unknown> = {
      ReassignPrincipal: this.reassignPrincipal,
      objectType: this.objectType,
    };

    return {
      method: "POST",
      url,
      headers: {
        "Content-Type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<ReassignObjectsSystemUserResponse> {
    // No return value (204 No Content)
    return {};
  }
}
