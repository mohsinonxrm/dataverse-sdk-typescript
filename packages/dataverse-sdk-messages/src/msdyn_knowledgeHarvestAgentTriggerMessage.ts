import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_knowledgeHarvestAgentTrigger request message
 *
 * Web API Action: msdyn_knowledgeHarvestAgentTrigger
 */
export class msdyn_knowledgeHarvestAgentTriggerRequest
  extends OrganizationRequest
  implements Executable<msdyn_knowledgeHarvestAgentTriggerResponse>
{
  constructor(public payload: string) {
    super("msdyn_knowledgeHarvestAgentTrigger");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_knowledgeHarvestAgentTrigger`;

    const body: Record<string, unknown> = {
      Payload: this.payload,
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

  async parseResponse(response: Response): Promise<msdyn_knowledgeHarvestAgentTriggerResponse> {
    // No return value (204 No Content)
    return new msdyn_knowledgeHarvestAgentTriggerResponse();
  }

  toRequestBody(): Record<string, unknown> {
    return {
      Payload: this.payload,
    };
  }
}

/**
 * msdyn_knowledgeHarvestAgentTrigger response message
 */
export class msdyn_knowledgeHarvestAgentTriggerResponse extends OrganizationResponse {
  constructor() {
    super("msdyn_knowledgeHarvestAgentTrigger");
  }

  static fromResponse(_data: unknown): msdyn_knowledgeHarvestAgentTriggerResponse {
    return new msdyn_knowledgeHarvestAgentTriggerResponse();
  }
}
