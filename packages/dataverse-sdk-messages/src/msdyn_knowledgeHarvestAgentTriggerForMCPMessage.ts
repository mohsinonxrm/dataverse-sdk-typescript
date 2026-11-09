import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

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
    // The body is the complex value, with its @odata.context
    return msdyn_knowledgeHarvestAgentTriggerForMCPResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_knowledgeHarvestAgentTriggerForMCP action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_knowledgeHarvestAgentTriggerForMCPResult {
  "@odata.context"?: string;
  KnowledgeHarvestJobRecordId: string;
}

/**
 * msdyn_knowledgeHarvestAgentTriggerForMCP response message
 *
 * `result` is the value the msdyn_knowledgeHarvestAgentTriggerForMCP action returns (see {@link msdyn_knowledgeHarvestAgentTriggerForMCPResult}).
 */
export class msdyn_knowledgeHarvestAgentTriggerForMCPResponse extends OrganizationResponse {
  constructor(public result: msdyn_knowledgeHarvestAgentTriggerForMCPResult) {
    super("msdyn_knowledgeHarvestAgentTriggerForMCP");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_knowledgeHarvestAgentTriggerForMCPResponse {
    return new msdyn_knowledgeHarvestAgentTriggerForMCPResponse(
      data as msdyn_knowledgeHarvestAgentTriggerForMCPResult
    );
  }
}
