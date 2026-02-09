import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";

/**
 * Response from msdyn_SalesAgents_GetExecutionConfigProperty action
 */
export interface msdyn_SalesAgents_GetExecutionConfigPropertyResponse {
  msdyn_config_value: string;
}

/**
 * msdyn_SalesAgents_GetExecutionConfigProperty action
 *
 * Unbound action
 */
export class msdyn_SalesAgents_GetExecutionConfigPropertyAction implements Executable<msdyn_SalesAgents_GetExecutionConfigPropertyResponse> {
  constructor(
    public readonly msdyn_salesagentprofileid: EntityReference,
    public readonly msdyn_config_key: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SalesAgents_GetExecutionConfigProperty`;

    const body: Record<string, unknown> = {
      msdyn_salesagentprofileid: this.msdyn_salesagentprofileid,
      msdyn_config_key: this.msdyn_config_key,
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
  ): Promise<msdyn_SalesAgents_GetExecutionConfigPropertyResponse> {
    const data = await response.json();
    return data as msdyn_SalesAgents_GetExecutionConfigPropertyResponse;
  }
}
