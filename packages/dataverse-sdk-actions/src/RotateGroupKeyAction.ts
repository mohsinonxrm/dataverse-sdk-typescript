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
 *
 * The first argument is the id of the flowmachinegroup record to call it on.
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
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<RotateGroupKeyResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as RotateGroupKeyResponse;
    return (await response.json()) as RotateGroupKeyResponse;
  }
}
