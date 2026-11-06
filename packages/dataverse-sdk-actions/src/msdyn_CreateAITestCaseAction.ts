import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_CreateAITestCase action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_CreateAITestCaseResponse {
  "@odata.context"?: string;
  response: string;
}

/**
 * Parameters of the msdyn_CreateAITestCase action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_CreateAITestCaseActionParameters {
  request: string;
}

/**
 * msdyn_CreateAITestCase action
 *
 * Unbound action
 */
export class msdyn_CreateAITestCaseAction implements Executable<msdyn_CreateAITestCaseResponse> {
  constructor(public readonly parameters: msdyn_CreateAITestCaseActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CreateAITestCase`;

    const body = requestBody({
      request: this.parameters.request,
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

  async parseResponse(response: Response): Promise<msdyn_CreateAITestCaseResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_CreateAITestCaseResponse;
  }
}
