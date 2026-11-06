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
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<msdyn_ProvisionUnifiedRoutingResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_ProvisionUnifiedRoutingResponse;
    return (await response.json()) as msdyn_ProvisionUnifiedRoutingResponse;
  }
}
