import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Response from msdyn_SalesAgents_SetExecutionConfigProperty action
 */
export interface msdyn_SalesAgents_SetExecutionConfigPropertyResponse {
  // No content returned
}

/**
 * Parameters of the msdyn_SalesAgents_SetExecutionConfigProperty action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_SalesAgents_SetExecutionConfigPropertyActionParameters {
  msdyn_salesagentprofileid: EntityReference | AnyEntityPayload;
  msdyn_config_key: string;
  msdyn_config_value: string;
}

/**
 * msdyn_SalesAgents_SetExecutionConfigProperty action
 *
 * Unbound action
 */
export class msdyn_SalesAgents_SetExecutionConfigPropertyAction implements Executable<msdyn_SalesAgents_SetExecutionConfigPropertyResponse> {
  constructor(
    public readonly parameters: msdyn_SalesAgents_SetExecutionConfigPropertyActionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SalesAgents_SetExecutionConfigProperty`;

    const body = requestBody({
      msdyn_salesagentprofileid: this.parameters.msdyn_salesagentprofileid,
      msdyn_config_key: this.parameters.msdyn_config_key,
      msdyn_config_value: this.parameters.msdyn_config_value,
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
  ): Promise<msdyn_SalesAgents_SetExecutionConfigPropertyResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_SalesAgents_SetExecutionConfigPropertyResponse;
    return (await response.json()) as msdyn_SalesAgents_SetExecutionConfigPropertyResponse;
  }
}
