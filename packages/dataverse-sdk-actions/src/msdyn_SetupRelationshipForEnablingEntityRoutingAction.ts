import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_SetupRelationshipForEnablingEntityRouting action
 */
export interface msdyn_SetupRelationshipForEnablingEntityRoutingResponse {
  // No content returned
}

/**
 * msdyn_SetupRelationshipForEnablingEntityRouting action
 *
 * Unbound action
 */
export class msdyn_SetupRelationshipForEnablingEntityRoutingAction implements Executable<msdyn_SetupRelationshipForEnablingEntityRoutingResponse> {
  constructor(public readonly entityLogicalName: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SetupRelationshipForEnablingEntityRouting`;

    const body: Record<string, unknown> = {
      EntityLogicalName: this.entityLogicalName,
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
  ): Promise<msdyn_SetupRelationshipForEnablingEntityRoutingResponse> {
    // No return value (204 No Content)
    return {};
  }
}
