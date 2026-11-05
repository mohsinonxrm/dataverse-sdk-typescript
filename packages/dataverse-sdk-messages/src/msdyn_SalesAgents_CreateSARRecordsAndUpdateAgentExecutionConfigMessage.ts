import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_SalesAgents_CreateSARRecordsAndUpdateAgentExecutionConfig request message
 *
 * Web API Action: msdyn_SalesAgents_CreateSARRecordsAndUpdateAgentExecutionConfig
 */
export class msdyn_SalesAgents_CreateSARRecordsAndUpdateAgentExecutionConfigRequest
  extends OrganizationRequest
  implements Executable<msdyn_SalesAgents_CreateSARRecordsAndUpdateAgentExecutionConfigResponse>
{
  constructor(
    public msdyn_SalesAgentType: number,
    public msdyn_AgentExecutionConfigToUpdate: string,
    public msdyn_SARRecordsToCreate: string,
    public msdyn_TrackingId: string
  ) {
    super("msdyn_SalesAgents_CreateSARRecordsAndUpdateAgentExecutionConfig");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SalesAgents_CreateSARRecordsAndUpdateAgentExecutionConfig`;

    const body: Record<string, unknown> = {
      msdyn_SalesAgentType: this.msdyn_SalesAgentType,
      msdyn_AgentExecutionConfigToUpdate: this.msdyn_AgentExecutionConfigToUpdate,
      msdyn_SARRecordsToCreate: this.msdyn_SARRecordsToCreate,
      msdyn_TrackingId: this.msdyn_TrackingId,
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
  ): Promise<msdyn_SalesAgents_CreateSARRecordsAndUpdateAgentExecutionConfigResponse> {
    // No return value (204 No Content)
    return new msdyn_SalesAgents_CreateSARRecordsAndUpdateAgentExecutionConfigResponse();
  }

  toRequestBody(): Record<string, unknown> {
    return {
      msdyn_SalesAgentType: this.msdyn_SalesAgentType,
      msdyn_AgentExecutionConfigToUpdate: this.msdyn_AgentExecutionConfigToUpdate,
      msdyn_SARRecordsToCreate: this.msdyn_SARRecordsToCreate,
      msdyn_TrackingId: this.msdyn_TrackingId,
    };
  }
}

/**
 * msdyn_SalesAgents_CreateSARRecordsAndUpdateAgentExecutionConfig response message
 */
export class msdyn_SalesAgents_CreateSARRecordsAndUpdateAgentExecutionConfigResponse extends OrganizationResponse {
  constructor() {
    super("msdyn_SalesAgents_CreateSARRecordsAndUpdateAgentExecutionConfig");
  }

  static fromResponse(
    _data: unknown
  ): msdyn_SalesAgents_CreateSARRecordsAndUpdateAgentExecutionConfigResponse {
    return new msdyn_SalesAgents_CreateSARRecordsAndUpdateAgentExecutionConfigResponse();
  }
}
