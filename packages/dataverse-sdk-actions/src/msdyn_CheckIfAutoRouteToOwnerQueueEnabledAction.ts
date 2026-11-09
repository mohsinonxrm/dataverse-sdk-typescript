import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_CheckIfAutoRouteToOwnerQueueEnabled action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_CheckIfAutoRouteToOwnerQueueEnabledResponse {
  "@odata.context"?: string;
  HelpLink: string;
  Message: string;
  ResultEntities: string;
  ReturnLevel: number;
  ReturnSeverity: number;
  ReturnStatus: number;
}

/**
 * Parameters of the msdyn_CheckIfAutoRouteToOwnerQueueEnabled action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_CheckIfAutoRouteToOwnerQueueEnabledActionParameters {
  SolutionId?: string;
}

/**
 * msdyn_CheckIfAutoRouteToOwnerQueueEnabled action
 *
 * Unbound action
 */
export class msdyn_CheckIfAutoRouteToOwnerQueueEnabledAction implements Executable<msdyn_CheckIfAutoRouteToOwnerQueueEnabledResponse> {
  constructor(
    public readonly parameters: msdyn_CheckIfAutoRouteToOwnerQueueEnabledActionParameters = {}
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CheckIfAutoRouteToOwnerQueueEnabled`;

    const body = requestBody({
      SolutionId: this.parameters.SolutionId,
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

  async parseResponse(
    response: Response
  ): Promise<msdyn_CheckIfAutoRouteToOwnerQueueEnabledResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_CheckIfAutoRouteToOwnerQueueEnabledResponse;
  }
}
