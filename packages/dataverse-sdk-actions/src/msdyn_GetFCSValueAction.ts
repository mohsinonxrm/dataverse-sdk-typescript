import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_GetFCSValue action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_GetFCSValueResponse {
  "@odata.context"?: string;
  Value: boolean;
}

/**
 * Parameters of the msdyn_GetFCSValue action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetFCSValueActionParameters {
  Key: string;
  Namespace: string;
}

/**
 * msdyn_GetFCSValue action
 *
 * Unbound action
 */
export class msdyn_GetFCSValueAction implements Executable<msdyn_GetFCSValueResponse> {
  constructor(public readonly parameters: msdyn_GetFCSValueActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetFCSValue`;

    const body = requestBody({
      Key: this.parameters.Key,
      Namespace: this.parameters.Namespace,
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

  async parseResponse(response: Response): Promise<msdyn_GetFCSValueResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_GetFCSValueResponse;
  }
}
