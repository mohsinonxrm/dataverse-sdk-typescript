import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_FixSLARelationshipsOnTargetEntities action
 */
export interface msdyn_FixSLARelationshipsOnTargetEntitiesResponse {
  // No content returned
}

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

  async parseResponse(
    response: Response
  ): Promise<msdyn_FixSLARelationshipsOnTargetEntitiesResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as msdyn_FixSLARelationshipsOnTargetEntitiesResponse;
  }
}
