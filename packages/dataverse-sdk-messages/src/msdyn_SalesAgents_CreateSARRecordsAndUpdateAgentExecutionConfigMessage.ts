import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_SalesAgents_CreateSARRecordsAndUpdateAgentExecutionConfig message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_SalesAgents_CreateSARRecordsAndUpdateAgentExecutionConfigRequestParameters {
  msdyn_TrackingId?: string;
  msdyn_SalesAgentType: number;
  msdyn_AgentExecutionConfigToUpdate: string;
  msdyn_SARRecordsToCreate: string;
}

/**
 * msdyn_SalesAgents_CreateSARRecordsAndUpdateAgentExecutionConfig request message
 *
 * Web API Action: msdyn_SalesAgents_CreateSARRecordsAndUpdateAgentExecutionConfig
 */
export class msdyn_SalesAgents_CreateSARRecordsAndUpdateAgentExecutionConfigRequest
  extends OrganizationRequest
  implements Executable<msdyn_SalesAgents_CreateSARRecordsAndUpdateAgentExecutionConfigResponse>
{
  declare readonly Parameters: Readonly<msdyn_SalesAgents_CreateSARRecordsAndUpdateAgentExecutionConfigRequestParameters>;

  constructor(
    parameters: msdyn_SalesAgents_CreateSARRecordsAndUpdateAgentExecutionConfigRequestParameters
  ) {
    super("msdyn_SalesAgents_CreateSARRecordsAndUpdateAgentExecutionConfig", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SalesAgents_CreateSARRecordsAndUpdateAgentExecutionConfig`;

    const body = requestBody({
      msdyn_TrackingId: this.Parameters.msdyn_TrackingId,
      msdyn_SalesAgentType: this.Parameters.msdyn_SalesAgentType,
      msdyn_AgentExecutionConfigToUpdate: this.Parameters.msdyn_AgentExecutionConfigToUpdate,
      msdyn_SARRecordsToCreate: this.Parameters.msdyn_SARRecordsToCreate,
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
    // No return value (204 No Content)
    return new msdyn_SalesAgents_CreateSARRecordsAndUpdateAgentExecutionConfigResponse();
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
