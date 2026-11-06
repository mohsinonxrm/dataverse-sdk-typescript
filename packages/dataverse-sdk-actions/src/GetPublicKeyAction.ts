import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from the GetPublicKey action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface GetPublicKeyResponse {
  "@odata.context"?: string;
  groupPublicKey: string;
  groupSecondaryPublicKey: string;
}

/**
 * GetPublicKey action
 *
 * Bound action
 * Binding parameter: entity (mscrm.flowmachinegroup)
 *
 * The first argument is the id of the flowmachinegroup record to call it on.
 */
export class GetPublicKeyAction implements Executable<GetPublicKeyResponse> {
  constructor(public readonly flowmachinegroupId: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/flowmachinegroups(${this.flowmachinegroupId})/Microsoft.Dynamics.CRM.GetPublicKey`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<GetPublicKeyResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as GetPublicKeyResponse;
  }
}
