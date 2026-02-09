import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_ProvisionUnifiedRouting action
 */
export interface msdyn_ProvisionUnifiedRoutingResponse {
  msdyn_responseCode: string;
  msdyn_customMessage: string;
  msdyn_serviceRequestId: string;
  msdyn_errorCode: string;
}

/**
 * msdyn_ProvisionUnifiedRouting action
 *
 * Unbound action
 */
export class msdyn_ProvisionUnifiedRoutingAction implements Executable<msdyn_ProvisionUnifiedRoutingResponse> {
  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_ProvisionUnifiedRouting`;

    return {
      method: "POST",
      url,
      headers: {
        "Content-Type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<msdyn_ProvisionUnifiedRoutingResponse> {
    const data = await response.json();
    return data as msdyn_ProvisionUnifiedRoutingResponse;
  }
}
