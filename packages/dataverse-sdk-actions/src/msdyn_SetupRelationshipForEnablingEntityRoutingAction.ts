import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_SetupRelationshipForEnablingEntityRouting action.
 *
 * Nothing: the Web API answers 204 No Content.
 */
export type msdyn_SetupRelationshipForEnablingEntityRoutingResponse = void;

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

  parseResponse(
    _response: Response
  ): Promise<msdyn_SetupRelationshipForEnablingEntityRoutingResponse> {
    // No return value: the Web API answers 204 No Content
    return Promise.resolve();
  }
}
