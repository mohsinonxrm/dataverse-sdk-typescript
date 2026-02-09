import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_FixSLARelationshipsOnTargetEntities action
 */
export interface msdyn_FixSLARelationshipsOnTargetEntitiesResponse {
  // No content returned
}

/**
 * msdyn_FixSLARelationshipsOnTargetEntities action
 *
 * Unbound action
 */
export class msdyn_FixSLARelationshipsOnTargetEntitiesAction implements Executable<msdyn_FixSLARelationshipsOnTargetEntitiesResponse> {
  constructor(public readonly sLAEnabledEnitiesToProcess: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_FixSLARelationshipsOnTargetEntities`;

    const body: Record<string, unknown> = {
      SLAEnabledEnitiesToProcess: this.sLAEnabledEnitiesToProcess,
    };

    return {
      method: "POST",
      url,
      headers: {
        "Content-Type": "application/json",
      },
      body,
    };
  }

  async parseResponse(
    response: Response
  ): Promise<msdyn_FixSLARelationshipsOnTargetEntitiesResponse> {
    // No return value (204 No Content)
    return {};
  }
}
