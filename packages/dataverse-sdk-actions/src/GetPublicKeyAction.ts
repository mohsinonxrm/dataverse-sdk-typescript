import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from GetPublicKey action
 */
export interface GetPublicKeyResponse {
  groupPublicKey: string;
  groupSecondaryPublicKey: string;
}

/**
 * GetPublicKey action
 *
 * Bound action
 * Binding parameter: entity (mscrm.flowmachinegroup)
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
    const data = await response.json();
    return data as GetPublicKeyResponse;
  }
}
