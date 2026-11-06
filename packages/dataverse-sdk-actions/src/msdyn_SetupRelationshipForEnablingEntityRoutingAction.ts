import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_SetupRelationshipForEnablingEntityRouting action
 */
export interface msdyn_SetupRelationshipForEnablingEntityRoutingResponse {
  // No content returned
}

/**
 * Parameters of the msdyn_SetupRelationshipForEnablingEntityRouting action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_SetupRelationshipForEnablingEntityRoutingActionParameters {
  EntityLogicalName: string;
}

/**
 * msdyn_SetupRelationshipForEnablingEntityRouting action
 *
 * Unbound action
 */
export class msdyn_SetupRelationshipForEnablingEntityRoutingAction implements Executable<msdyn_SetupRelationshipForEnablingEntityRoutingResponse> {
  constructor(
    public readonly parameters: msdyn_SetupRelationshipForEnablingEntityRoutingActionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SetupRelationshipForEnablingEntityRouting`;

    const body = requestBody({
      EntityLogicalName: this.parameters.EntityLogicalName,
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
  ): Promise<msdyn_SetupRelationshipForEnablingEntityRoutingResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (
      text ? JSON.parse(text) : {}
    ) as msdyn_SetupRelationshipForEnablingEntityRoutingResponse;
  }
}
