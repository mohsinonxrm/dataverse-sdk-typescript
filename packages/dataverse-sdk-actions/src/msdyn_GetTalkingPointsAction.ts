import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_GetTalkingPoints action
 */
export interface msdyn_GetTalkingPointsResponse {
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
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as msdyn_GetTalkingPointsResponse;
  }
}
