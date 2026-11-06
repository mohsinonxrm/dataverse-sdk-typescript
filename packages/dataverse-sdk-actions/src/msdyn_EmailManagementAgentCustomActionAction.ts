import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_EmailManagementAgentCustomAction action
 */
export interface msdyn_EmailManagementAgentCustomActionResponse {
  status: string;
}

/**
 * Parameters of the msdyn_EmailManagementAgentCustomAction action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_EmailManagementAgentCustomActionActionParameters {
  additionalParams?: string;
  emailId: string;
}

/**
 * msdyn_EmailManagementAgentCustomAction action
 *
 * Unbound action
 */
export class msdyn_EmailManagementAgentCustomActionAction implements Executable<msdyn_EmailManagementAgentCustomActionResponse> {
  constructor(public readonly parameters: msdyn_EmailManagementAgentCustomActionActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_EmailManagementAgentCustomAction`;

    const body = requestBody({
      additionalParams: this.parameters.additionalParams,
      emailId: this.parameters.emailId,
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

  async parseResponse(response: Response): Promise<msdyn_EmailManagementAgentCustomActionResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_EmailManagementAgentCustomActionResponse;
    return (await response.json()) as msdyn_EmailManagementAgentCustomActionResponse;
  }
}
