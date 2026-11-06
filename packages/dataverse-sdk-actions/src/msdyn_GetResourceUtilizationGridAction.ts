import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_GetResourceUtilizationGrid action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_GetResourceUtilizationGridResponse {
  "@odata.context"?: string;
  ChartItems: string;
}

/**
 * Parameters of the msdyn_GetResourceUtilizationGrid action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetResourceUtilizationGridActionParameters {
  TargetUtils: string;
  ResourceIds: string;
  Start: string;
  End: string;
  Timescale: number;
}

/**
 * msdyn_GetResourceUtilizationGrid action
 *
 * Unbound action
 */
export class msdyn_GetResourceUtilizationGridAction implements Executable<msdyn_GetResourceUtilizationGridResponse> {
  constructor(public readonly parameters: msdyn_GetResourceUtilizationGridActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetResourceUtilizationGrid`;

    const body = requestBody({
      TargetUtils: this.parameters.TargetUtils,
      ResourceIds: this.parameters.ResourceIds,
      Start: this.parameters.Start,
      End: this.parameters.End,
      Timescale: this.parameters.Timescale,
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

  async parseResponse(response: Response): Promise<msdyn_GetResourceUtilizationGridResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_GetResourceUtilizationGridResponse;
  }
}
