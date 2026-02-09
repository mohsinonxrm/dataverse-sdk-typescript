import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from RotateGroupKey action
 */
export interface RotateGroupKeyResponse {
  // No content returned
}

/**
 * RotateGroupKey action
 *
 * Bound action
 * Binding parameter: entity (mscrm.flowmachinegroup)
 */
export class RotateGroupKeyAction implements Executable<RotateGroupKeyResponse> {
  constructor(public readonly flowmachinegroupId: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/flowmachinegroups(${this.flowmachinegroupId})/Microsoft.Dynamics.CRM.RotateGroupKey`;

    return {
      method: "POST",
      url,
      headers: {
        "Content-Type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<RotateGroupKeyResponse> {
    // No return value (204 No Content)
    return {};
  }
}
