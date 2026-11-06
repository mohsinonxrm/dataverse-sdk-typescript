import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_ConvertCJOJsonToSequenceJson action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_ConvertCJOJsonToSequenceJsonResponse {
  "@odata.context"?: string;
  Result: boolean;
}

/**
 * Parameters of the msdyn_ConvertCJOJsonToSequenceJson action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_ConvertCJOJsonToSequenceJsonActionParameters {
  SequenceId: string;
}

/**
 * msdyn_ConvertCJOJsonToSequenceJson action
 *
 * Unbound action
 */
export class msdyn_ConvertCJOJsonToSequenceJsonAction implements Executable<msdyn_ConvertCJOJsonToSequenceJsonResponse> {
  constructor(public readonly parameters: msdyn_ConvertCJOJsonToSequenceJsonActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_ConvertCJOJsonToSequenceJson`;

    const body = requestBody({
      SequenceId: this.parameters.SequenceId,
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

  async parseResponse(response: Response): Promise<msdyn_ConvertCJOJsonToSequenceJsonResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_ConvertCJOJsonToSequenceJsonResponse;
  }
}
