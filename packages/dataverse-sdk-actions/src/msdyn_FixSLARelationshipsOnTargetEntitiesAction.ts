import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_FixSLARelationshipsOnTargetEntities action.
 *
 * Nothing: the Web API answers 204 No Content.
 */
export type msdyn_FixSLARelationshipsOnTargetEntitiesResponse = void;

/**
 * Parameters of the msdyn_FixSLARelationshipsOnTargetEntities action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_FixSLARelationshipsOnTargetEntitiesActionParameters {
  SLAEnabledEnitiesToProcess: string;
}

/**
 * msdyn_FixSLARelationshipsOnTargetEntities action
 *
 * Unbound action
 */
export class msdyn_FixSLARelationshipsOnTargetEntitiesAction implements Executable<msdyn_FixSLARelationshipsOnTargetEntitiesResponse> {
  constructor(
    public readonly parameters: msdyn_FixSLARelationshipsOnTargetEntitiesActionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_FixSLARelationshipsOnTargetEntities`;

    const body = requestBody({
      SLAEnabledEnitiesToProcess: this.parameters.SLAEnabledEnitiesToProcess,
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

  parseResponse(_response: Response): Promise<msdyn_FixSLARelationshipsOnTargetEntitiesResponse> {
    // No return value: the Web API answers 204 No Content
    return Promise.resolve();
  }
}
