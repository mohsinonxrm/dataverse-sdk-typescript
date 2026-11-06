import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_FpsAction action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_FpsActionResponse {
  "@odata.context"?: string;
  OutputParameter: string;
}

/**
 * Parameters of the msdyn_FpsAction action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_FpsActionActionParameters {
  Type: number;
  InputParameter?: string;
}

/**
 * msdyn_FpsAction action
 *
 * Unbound action
 */
export class msdyn_FpsActionAction implements Executable<msdyn_FpsActionResponse> {
  constructor(public readonly parameters: msdyn_FpsActionActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_FpsAction`;

    const body = requestBody({
      Type: this.parameters.Type,
      InputParameter: this.parameters.InputParameter,
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

  async parseResponse(response: Response): Promise<msdyn_FpsActionResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_FpsActionResponse;
  }
}
