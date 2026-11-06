import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_LeadSqaResultUserAction action
 */
export interface msdyn_LeadSqaResultUserActionResponse {
  Message: string;
  Outcome: string;
  Retryable: boolean;
  Success: boolean;
}

/**
 * Parameters of the msdyn_LeadSqaResultUserAction action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_LeadSqaResultUserActionActionParameters {
  Action: string;
  ActionId: string;
  IsCallFromNba?: boolean;
  LeadId: string;
}

/**
 * msdyn_LeadSqaResultUserAction action
 *
 * Unbound action
 */
export class msdyn_LeadSqaResultUserActionAction implements Executable<msdyn_LeadSqaResultUserActionResponse> {
  constructor(public readonly parameters: msdyn_LeadSqaResultUserActionActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_LeadSqaResultUserAction`;

    const body = requestBody({
      Action: this.parameters.Action,
      ActionId: this.parameters.ActionId,
      IsCallFromNba: this.parameters.IsCallFromNba,
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

  async parseResponse(response: Response): Promise<msdyn_LeadSqaResultUserActionResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_LeadSqaResultUserActionResponse;
    return (await response.json()) as msdyn_LeadSqaResultUserActionResponse;
  }
}
