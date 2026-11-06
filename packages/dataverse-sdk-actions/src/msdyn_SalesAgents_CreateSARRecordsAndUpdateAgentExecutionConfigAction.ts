import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_SalesAgents_CreateSARRecordsAndUpdateAgentExecutionConfig action
 */
export interface msdyn_SalesAgents_CreateSARRecordsAndUpdateAgentExecutionConfigResponse {
  // No content returned
}

/**
 * Parameters of the msdyn_SalesAgents_CreateSARRecordsAndUpdateAgentExecutionConfig action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_SalesAgents_CreateSARRecordsAndUpdateAgentExecutionConfigActionParameters {
  msdyn_SalesAgentType: number;
  msdyn_AgentExecutionConfigToUpdate: string;
  msdyn_SARRecordsToCreate: string;
  msdyn_TrackingId?: string;
}

/**
 * msdyn_SalesAgents_CreateSARRecordsAndUpdateAgentExecutionConfig action
 *
 * Unbound action
 */
export class msdyn_SalesAgents_CreateSARRecordsAndUpdateAgentExecutionConfigAction implements Executable<msdyn_SalesAgents_CreateSARRecordsAndUpdateAgentExecutionConfigResponse> {
  constructor(
    public readonly parameters: msdyn_SalesAgents_CreateSARRecordsAndUpdateAgentExecutionConfigActionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SalesAgents_CreateSARRecordsAndUpdateAgentExecutionConfig`;

    const body = requestBody({
      msdyn_SalesAgentType: this.parameters.msdyn_SalesAgentType,
      msdyn_AgentExecutionConfigToUpdate: this.parameters.msdyn_AgentExecutionConfigToUpdate,
      msdyn_SARRecordsToCreate: this.parameters.msdyn_SARRecordsToCreate,
      msdyn_TrackingId: this.parameters.msdyn_TrackingId,
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
  ): Promise<msdyn_SalesAgents_CreateSARRecordsAndUpdateAgentExecutionConfigResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (
      text ? JSON.parse(text) : {}
    ) as msdyn_SalesAgents_CreateSARRecordsAndUpdateAgentExecutionConfigResponse;
  }
}
