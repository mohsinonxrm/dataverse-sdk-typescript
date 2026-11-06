import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_URFirstPartyIntegrationApi action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_URFirstPartyIntegrationApiResponse {
  "@odata.context"?: string;
  Result: string;
}

/**
 * Parameters of the msdyn_URFirstPartyIntegrationApi action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_URFirstPartyIntegrationApiActionParameters {
  MethodName: string;
  InputParameter?: string;
}

/**
 * msdyn_URFirstPartyIntegrationApi action
 *
 * Unbound action
 */
export class msdyn_URFirstPartyIntegrationApiAction implements Executable<msdyn_URFirstPartyIntegrationApiResponse> {
  constructor(public readonly parameters: msdyn_URFirstPartyIntegrationApiActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_URFirstPartyIntegrationApi`;

    const body = requestBody({
      MethodName: this.parameters.MethodName,
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

  async parseResponse(response: Response): Promise<msdyn_URFirstPartyIntegrationApiResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_URFirstPartyIntegrationApiResponse;
  }
}
