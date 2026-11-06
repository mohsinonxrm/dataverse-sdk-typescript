import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Response from msdyn_SalesAgents_SetExecutionConfigProperty action
 */
export interface msdyn_SalesAgents_SetExecutionConfigPropertyResponse {
  // No content returned
}

/**
 * msdyn_SalesAgents_SetExecutionConfigProperty action
 *
 * Unbound action
 */
export class msdyn_SalesAgents_SetExecutionConfigPropertyAction implements Executable<msdyn_SalesAgents_SetExecutionConfigPropertyResponse> {
  constructor(
    public readonly msdyn_salesagentprofileid: EntityReference | AnyEntityPayload,
    public readonly msdyn_config_key: string,
    public readonly msdyn_config_value: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SalesAgents_SetExecutionConfigProperty`;

    const body: Record<string, unknown> = {
      msdyn_salesagentprofileid: this.msdyn_salesagentprofileid,
      msdyn_config_key: this.msdyn_config_key,
      msdyn_config_value: this.msdyn_config_value,
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
  ): Promise<msdyn_SalesAgents_SetExecutionConfigPropertyResponse> {
    // No return value (204 No Content)
    return {};
  }
}
