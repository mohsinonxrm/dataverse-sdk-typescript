import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_knowledgeHarvestAgentTriggerForMCPResponse as msdyn_knowledgeHarvestAgentTriggerForMCPResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_knowledgeHarvestAgentTriggerForMCP message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_knowledgeHarvestAgentTriggerForMCPRequestParameters {
  Payload: string;
}

/**
 * msdyn_knowledgeHarvestAgentTriggerForMCP request message
 *
 * Web API Action: msdyn_knowledgeHarvestAgentTriggerForMCP
 */
export class msdyn_knowledgeHarvestAgentTriggerForMCPRequest
  extends OrganizationRequest
  implements Executable<msdyn_knowledgeHarvestAgentTriggerForMCPResponse>
{
  declare readonly Parameters: Readonly<msdyn_knowledgeHarvestAgentTriggerForMCPRequestParameters>;

  constructor(parameters: msdyn_knowledgeHarvestAgentTriggerForMCPRequestParameters) {
    super("msdyn_knowledgeHarvestAgentTriggerForMCP", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_knowledgeHarvestAgentTriggerForMCP`;

    const body = requestBody({
      Payload: this.Parameters.Payload,
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
  ): Promise<msdyn_knowledgeHarvestAgentTriggerForMCPResponse> {
    // 204 No Content is an empty result
    if (response.status === 204)
      return msdyn_knowledgeHarvestAgentTriggerForMCPResponse.fromResponse({});
    return msdyn_knowledgeHarvestAgentTriggerForMCPResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_knowledgeHarvestAgentTriggerForMCP response message
 */
export class msdyn_knowledgeHarvestAgentTriggerForMCPResponse extends OrganizationResponse {
  constructor(public result: msdyn_knowledgeHarvestAgentTriggerForMCPResponseData) {
    super("msdyn_knowledgeHarvestAgentTriggerForMCP");
  }

  static fromResponse(data: unknown): msdyn_knowledgeHarvestAgentTriggerForMCPResponse {
    return new msdyn_knowledgeHarvestAgentTriggerForMCPResponse(
      responseObject<msdyn_knowledgeHarvestAgentTriggerForMCPResponseData>(data)
    );
  }
}
