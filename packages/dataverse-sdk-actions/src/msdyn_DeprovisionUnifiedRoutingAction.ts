import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_DeprovisionUnifiedRouting action
 */
export interface msdyn_DeprovisionUnifiedRoutingResponse {
  msdyn_serviceRequestId: string;
  msdyn_responseCode: string;
  msdyn_errorCode: string;
  msdyn_customMessage: string;
}

/**
 * msdyn_DeprovisionUnifiedRouting action
 *
 * Unbound action
 */
export class msdyn_DeprovisionUnifiedRoutingAction implements Executable<msdyn_DeprovisionUnifiedRoutingResponse> {
  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_DeprovisionUnifiedRouting`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<msdyn_DeprovisionUnifiedRoutingResponse> {
    const data = await response.json();
    return data as msdyn_DeprovisionUnifiedRoutingResponse;
  }
}
