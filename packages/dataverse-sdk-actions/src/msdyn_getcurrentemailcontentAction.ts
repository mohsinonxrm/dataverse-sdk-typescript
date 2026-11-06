import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_getcurrentemailcontent action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_getcurrentemailcontentResponse {
  "@odata.context"?: string;
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
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_getcurrentemailcontentResponse;
  }
}
