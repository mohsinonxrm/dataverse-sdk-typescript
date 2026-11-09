import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_GetTalkingPoints action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_GetTalkingPointsResponse {
  "@odata.context"?: string;
  response: string;
}

/**
 * Parameters of the msdyn_GetTalkingPoints action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetTalkingPointsActionParameters {
  entityId: string;
  entityType: string;
}

/**
 * msdyn_GetTalkingPoints action
 *
 * Unbound action
 */
export class msdyn_GetTalkingPointsAction implements Executable<msdyn_GetTalkingPointsResponse> {
  constructor(public readonly parameters: msdyn_GetTalkingPointsActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetTalkingPoints`;

    const body = requestBody({
      entityId: this.parameters.entityId,
      entityType: this.parameters.entityType,
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

  async parseResponse(response: Response): Promise<msdyn_GetTalkingPointsResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_GetTalkingPointsResponse;
  }
}
