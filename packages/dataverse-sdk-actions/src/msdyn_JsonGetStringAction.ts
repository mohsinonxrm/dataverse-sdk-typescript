import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_JsonGetString action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_JsonGetStringResponse {
  "@odata.context"?: string;
  Value: string;
}

/**
 * Parameters of the msdyn_JsonGetString action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_JsonGetStringActionParameters {
  Json?: string;
  PropertyPath: string;
  DefaultReturnValue?: string;
}

/**
 * msdyn_JsonGetString action
 *
 * Unbound action
 */
export class msdyn_JsonGetStringAction implements Executable<msdyn_JsonGetStringResponse> {
  constructor(public readonly parameters: msdyn_JsonGetStringActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_JsonGetString`;

    const body = requestBody({
      Json: this.parameters.Json,
      PropertyPath: this.parameters.PropertyPath,
      DefaultReturnValue: this.parameters.DefaultReturnValue,
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

  async parseResponse(response: Response): Promise<msdyn_JsonGetStringResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_JsonGetStringResponse;
  }
}
