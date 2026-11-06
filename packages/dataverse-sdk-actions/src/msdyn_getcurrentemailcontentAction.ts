import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_getcurrentemailcontent action
 */
export interface msdyn_getcurrentemailcontentResponse {
  currentEmailContent: string;
}

/**
 * Parameters of the msdyn_getcurrentemailcontent action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_getcurrentemailcontentActionParameters {
  emailId: string;
}

/**
 * msdyn_getcurrentemailcontent action
 *
 * Unbound action
 */
export class msdyn_getcurrentemailcontentAction implements Executable<msdyn_getcurrentemailcontentResponse> {
  constructor(public readonly parameters: msdyn_getcurrentemailcontentActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_getcurrentemailcontent`;

    const body = requestBody({
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

  async parseResponse(response: Response): Promise<msdyn_getcurrentemailcontentResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_getcurrentemailcontentResponse;
    return (await response.json()) as msdyn_getcurrentemailcontentResponse;
  }
}
