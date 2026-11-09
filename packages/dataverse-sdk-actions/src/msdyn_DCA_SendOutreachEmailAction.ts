import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_DCA_SendOutreachEmail action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_DCA_SendOutreachEmailResponse {
  "@odata.context"?: string;
  ResponseJson: string;
}

/**
 * Parameters of the msdyn_DCA_SendOutreachEmail action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_DCA_SendOutreachEmailActionParameters {
  msdyn_SalesAgentRun: string;
  msdyn_TrackingId?: string;
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
      msdyn_SalesAgentRun: this.parameters.msdyn_SalesAgentRun,
      msdyn_TrackingId: this.parameters.msdyn_TrackingId,
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
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_DCA_SendOutreachEmailResponse;
  }
}
