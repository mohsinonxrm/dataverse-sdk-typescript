import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from the msdyn_DeprovisionUnifiedRouting action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_DeprovisionUnifiedRoutingResponse {
  "@odata.context"?: string;
  msdyn_customMessage: string;
  msdyn_errorCode: string;
  msdyn_responseCode: string;
  msdyn_serviceRequestId: string;
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
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_DeprovisionUnifiedRoutingResponse;
  }
}
