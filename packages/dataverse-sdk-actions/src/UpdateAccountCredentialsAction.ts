import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from UpdateAccountCredentials action
 */
export interface UpdateAccountCredentialsResponse {
  // No content returned
}

/**
 * UpdateAccountCredentials action
 *
 * Bound action
 * Binding parameter: entity (mscrm.flowmachinegroup)
 */
export class UpdateAccountCredentialsAction implements Executable<UpdateAccountCredentialsResponse> {
  constructor(
    public readonly flowmachinegroupId: string,
    public readonly groupCredentials: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/flowmachinegroups(${this.flowmachinegroupId})/Microsoft.Dynamics.CRM.UpdateAccountCredentials`;

    const body: Record<string, unknown> = {
      groupCredentials: this.groupCredentials,
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

  async parseResponse(response: Response): Promise<UpdateAccountCredentialsResponse> {
    // No return value (204 No Content)
    return {};
  }
}
