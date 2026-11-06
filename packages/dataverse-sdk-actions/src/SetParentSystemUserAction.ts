import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import type { EntityPayload } from "./types/EntityPayload.js";
import type { systemuser } from "./types/index.js";

/**
 * Response from SetParentSystemUser action
 */
export interface SetParentSystemUserResponse {
  // No content returned
}

/**
 * SetParentSystemUser action
 *
 * Bound action
 * Binding parameter: entity (mscrm.systemuser)
 */
export class SetParentSystemUserAction implements Executable<SetParentSystemUserResponse> {
  constructor(
    public readonly systemuserId: string,
    public readonly parent: EntityReference | EntityPayload<systemuser>,
    public readonly keepChildUsers: boolean
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/systemusers(${this.systemuserId})/Microsoft.Dynamics.CRM.SetParentSystemUser`;

    const body: Record<string, unknown> = {
      Parent: this.parent,
      KeepChildUsers: this.keepChildUsers,
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

  async parseResponse(response: Response): Promise<SetParentSystemUserResponse> {
    // No return value (204 No Content)
    return {};
  }
}
