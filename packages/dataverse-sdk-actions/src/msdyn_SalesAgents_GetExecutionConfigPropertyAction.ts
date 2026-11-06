import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Response from msdyn_SalesAgents_GetExecutionConfigProperty action
 */
export interface msdyn_SalesAgents_GetExecutionConfigPropertyResponse {
  msdyn_config_value: string;
}

/**
 * Parameters of the msdyn_SalesAgents_GetExecutionConfigProperty action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_SalesAgents_GetExecutionConfigPropertyActionParameters {
  msdyn_salesagentprofileid: EntityReference | AnyEntityPayload;
  msdyn_config_key: string;
}

/**
 * msdyn_SalesAgents_GetExecutionConfigProperty action
 *
 * Unbound action
 */
export class msdyn_SalesAgents_GetExecutionConfigPropertyAction implements Executable<msdyn_SalesAgents_GetExecutionConfigPropertyResponse> {
  constructor(
    public readonly parameters: msdyn_SalesAgents_GetExecutionConfigPropertyActionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SalesAgents_GetExecutionConfigProperty`;

    const body = requestBody({
      msdyn_salesagentprofileid: this.parameters.msdyn_salesagentprofileid,
      msdyn_config_key: this.parameters.msdyn_config_key,
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
  ): Promise<msdyn_SalesAgents_GetExecutionConfigPropertyResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_SalesAgents_GetExecutionConfigPropertyResponse;
    return (await response.json()) as msdyn_SalesAgents_GetExecutionConfigPropertyResponse;
  }
}
