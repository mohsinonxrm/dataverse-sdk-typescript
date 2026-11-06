import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_DCA_SendOutreachEmail action
 */
export interface msdyn_DCA_SendOutreachEmailResponse {
  ResponseJson: string;
}

/**
 * Parameters of the msdyn_DCA_SendOutreachEmail action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_DCA_SendOutreachEmailActionParameters {
  msdyn_TrackingId?: string;
  msdyn_SalesAgentRun: string;
}

/**
 * msdyn_DCA_SendOutreachEmail action
 *
 * Unbound action
 */
export class msdyn_DCA_SendOutreachEmailAction implements Executable<msdyn_DCA_SendOutreachEmailResponse> {
  constructor(public readonly parameters: msdyn_DCA_SendOutreachEmailActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_DCA_SendOutreachEmail`;

    const body = requestBody({
      msdyn_TrackingId: this.parameters.msdyn_TrackingId,
      msdyn_SalesAgentRun: this.parameters.msdyn_SalesAgentRun,
    });

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<msdyn_DCA_SendOutreachEmailResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_DCA_SendOutreachEmailResponse;
    return (await response.json()) as msdyn_DCA_SendOutreachEmailResponse;
  }
}
