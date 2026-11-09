import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_DraftOutreachEmail action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_DraftOutreachEmailResponse {
  "@odata.context"?: string;
  ErrorMessage: string;
  IsSuccess: string;
  Result: string;
}

/**
 * Parameters of the msdyn_DraftOutreachEmail action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_DraftOutreachEmailActionParameters {
  LeadId: string;
}

/**
 * msdyn_DraftOutreachEmail action
 *
 * Unbound action
 */
export class msdyn_DraftOutreachEmailAction implements Executable<msdyn_DraftOutreachEmailResponse> {
  constructor(public readonly parameters: msdyn_DraftOutreachEmailActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_DraftOutreachEmail`;

    const body = requestBody({
      LeadId: this.parameters.LeadId,
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

  async parseResponse(response: Response): Promise<msdyn_DraftOutreachEmailResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_DraftOutreachEmailResponse;
  }
}
