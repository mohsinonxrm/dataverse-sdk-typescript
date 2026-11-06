import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_AutoLinkingLeadCustomAction action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_AutoLinkingLeadCustomActionResponse {
  "@odata.context"?: string;
  AutoLinkResponse: string;
  ErrorMessage: string;
  IsSuccess: boolean;
  StatusCode: number;
}

/**
 * Parameters of the msdyn_AutoLinkingLeadCustomAction action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_AutoLinkingLeadCustomActionActionParameters {
  AutoLinkRequest?: string;
}

/**
 * msdyn_AutoLinkingLeadCustomAction action
 *
 * Unbound action
 */
export class msdyn_AutoLinkingLeadCustomActionAction implements Executable<msdyn_AutoLinkingLeadCustomActionResponse> {
  constructor(public readonly parameters: msdyn_AutoLinkingLeadCustomActionActionParameters = {}) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_AutoLinkingLeadCustomAction`;

    const body = requestBody({
      AutoLinkRequest: this.parameters.AutoLinkRequest,
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

  async parseResponse(response: Response): Promise<msdyn_AutoLinkingLeadCustomActionResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_AutoLinkingLeadCustomActionResponse;
  }
}
