import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Response from msdyn_EvaluateMasterEntityRoutingConfiguration action
 */
export interface msdyn_EvaluateMasterEntityRoutingConfigurationResponse {
  // No content returned
}

/**
 * msdyn_EvaluateMasterEntityRoutingConfiguration action
 *
 * Unbound action
 */
export class msdyn_EvaluateMasterEntityRoutingConfigurationAction implements Executable<msdyn_EvaluateMasterEntityRoutingConfigurationResponse> {
  constructor(public readonly target: EntityReference | AnyEntityPayload) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_EvaluateMasterEntityRoutingConfiguration`;

    const body: Record<string, unknown> = {
      Target: this.target,
    };

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
  ): Promise<msdyn_EvaluateMasterEntityRoutingConfigurationResponse> {
    // No return value (204 No Content)
    return {};
  }
}
