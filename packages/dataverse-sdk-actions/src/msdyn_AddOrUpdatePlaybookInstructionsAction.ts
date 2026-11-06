import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_AddOrUpdatePlaybookInstructions action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_AddOrUpdatePlaybookInstructionsResponse {
  "@odata.context"?: string;
  msdyn_ErrorResult: string;
  msdyn_SuccessResult: boolean;
}

/**
 * Parameters of the msdyn_AddOrUpdatePlaybookInstructions action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_AddOrUpdatePlaybookInstructionsActionParameters {
  msdyn_Instructions: string;
}

/**
 * msdyn_AddOrUpdatePlaybookInstructions action
 *
 * Unbound action
 */
export class msdyn_AddOrUpdatePlaybookInstructionsAction implements Executable<msdyn_AddOrUpdatePlaybookInstructionsResponse> {
  constructor(public readonly parameters: msdyn_AddOrUpdatePlaybookInstructionsActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_AddOrUpdatePlaybookInstructions`;

    const body = requestBody({
      msdyn_Instructions: this.parameters.msdyn_Instructions,
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

  async parseResponse(response: Response): Promise<msdyn_AddOrUpdatePlaybookInstructionsResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_AddOrUpdatePlaybookInstructionsResponse;
  }
}
