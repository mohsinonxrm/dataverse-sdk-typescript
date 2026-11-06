import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_GetCustomActionParameters action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_GetCustomActionParametersResponse {
  "@odata.context"?: string;
  dynamicSchema: string;
}

/**
 * Parameters of the msdyn_GetCustomActionParameters action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetCustomActionParametersActionParameters {
  workflowId: string;
  correlationId: string;
  customAction: string;
}

/**
 * msdyn_GetCustomActionParameters action
 *
 * Unbound action
 */
export class msdyn_GetCustomActionParametersAction implements Executable<msdyn_GetCustomActionParametersResponse> {
  constructor(public readonly parameters: msdyn_GetCustomActionParametersActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetCustomActionParameters`;

    const body = requestBody({
      workflowId: this.parameters.workflowId,
      correlationId: this.parameters.correlationId,
      customAction: this.parameters.customAction,
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

  async parseResponse(response: Response): Promise<msdyn_GetCustomActionParametersResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_GetCustomActionParametersResponse;
  }
}
