import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_GetBoolFCSValue action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_GetBoolFCSValueResponse {
  "@odata.context"?: string;
  msdyn_BoolFCSValue: string;
}

/**
 * Parameters of the msdyn_GetBoolFCSValue action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetBoolFCSValueActionParameters {
  msdyn_BoolFCSNamespace: string;
  msdyn_BoolFCSKey: string;
}

/**
 * msdyn_GetBoolFCSValue action
 *
 * Unbound action
 */
export class msdyn_GetBoolFCSValueAction implements Executable<msdyn_GetBoolFCSValueResponse> {
  constructor(public readonly parameters: msdyn_GetBoolFCSValueActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetBoolFCSValue`;

    const body = requestBody({
      msdyn_BoolFCSNamespace: this.parameters.msdyn_BoolFCSNamespace,
      msdyn_BoolFCSKey: this.parameters.msdyn_BoolFCSKey,
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

  async parseResponse(response: Response): Promise<msdyn_GetBoolFCSValueResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_GetBoolFCSValueResponse;
  }
}
