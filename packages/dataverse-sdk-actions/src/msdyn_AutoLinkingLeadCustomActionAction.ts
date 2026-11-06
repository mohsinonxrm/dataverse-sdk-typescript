import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_AutoLinkingLeadCustomAction action
 */
export interface msdyn_AutoLinkingLeadCustomActionResponse {
  AutoLinkResponse: string;
  IsSuccess: boolean;
  StatusCode: number;
  ErrorMessage: string;
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
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_AutoLinkingLeadCustomActionResponse;
    return (await response.json()) as msdyn_AutoLinkingLeadCustomActionResponse;
  }
}
