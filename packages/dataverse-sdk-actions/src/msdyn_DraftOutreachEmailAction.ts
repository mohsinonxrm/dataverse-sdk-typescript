import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_DraftOutreachEmail action
 */
export interface msdyn_DraftOutreachEmailResponse {
  IsSuccess: string;
  Result: string;
  ErrorMessage: string;
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
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_DraftOutreachEmailResponse;
    return (await response.json()) as msdyn_DraftOutreachEmailResponse;
  }
}
