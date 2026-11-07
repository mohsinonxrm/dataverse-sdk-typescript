import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_ConvertSequenceJsonToCJOJson action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_ConvertSequenceJsonToCJOJsonResponse {
  "@odata.context"?: string;
  Result: boolean;
}

/**
 * Parameters of the msdyn_ConvertSequenceJsonToCJOJson action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_ConvertSequenceJsonToCJOJsonActionParameters {
  SequenceId: string;
}

/**
 * msdyn_ConvertSequenceJsonToCJOJson action
 *
 * Unbound action
 */
export class msdyn_ConvertSequenceJsonToCJOJsonAction implements Executable<msdyn_ConvertSequenceJsonToCJOJsonResponse> {
  constructor(public readonly parameters: msdyn_ConvertSequenceJsonToCJOJsonActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_ConvertSequenceJsonToCJOJson`;

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

  async parseResponse(response: Response): Promise<msdyn_ConvertSequenceJsonToCJOJsonResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_ConvertSequenceJsonToCJOJsonResponse;
  }
}
