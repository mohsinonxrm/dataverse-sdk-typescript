import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_CSCaseClosureProcessAgentResponse action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_CSCaseClosureProcessAgentResponseResponse {
  "@odata.context"?: string;
  msdyn_response: string;
}

/**
 * Parameters of the msdyn_CSCaseClosureProcessAgentResponse action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_CSCaseClosureProcessAgentResponseActionParameters {
  msdyn_payload: string;
}

/**
 * msdyn_CSCaseClosureProcessAgentResponse action
 *
 * Unbound action
 */
export class msdyn_CSCaseClosureProcessAgentResponseAction implements Executable<msdyn_CSCaseClosureProcessAgentResponseResponse> {
  constructor(
    public readonly parameters: msdyn_CSCaseClosureProcessAgentResponseActionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CSCaseClosureProcessAgentResponse`;

    const body = requestBody({
      msdyn_payload: this.parameters.msdyn_payload,
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

  async parseResponse(
    response: Response
  ): Promise<msdyn_CSCaseClosureProcessAgentResponseResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_CSCaseClosureProcessAgentResponseResponse;
  }
}
