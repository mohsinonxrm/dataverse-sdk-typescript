import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_JsonGetBoolean action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_JsonGetBooleanResponse {
  "@odata.context"?: string;
  Value: boolean;
}

/**
 * Parameters of the msdyn_JsonGetBoolean action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_JsonGetBooleanActionParameters {
  Json?: string;
  PropertyPath: string;
  DefaultReturnValue?: boolean;
}

/**
 * msdyn_JsonGetBoolean action
 *
 * Unbound action
 */
export class msdyn_JsonGetBooleanAction implements Executable<msdyn_JsonGetBooleanResponse> {
  constructor(public readonly parameters: msdyn_JsonGetBooleanActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_JsonGetBoolean`;

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

  async parseResponse(response: Response): Promise<msdyn_JsonGetBooleanResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_JsonGetBooleanResponse;
  }
}
