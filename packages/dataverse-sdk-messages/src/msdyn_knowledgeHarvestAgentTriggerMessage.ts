import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_knowledgeHarvestAgentTrigger message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_knowledgeHarvestAgentTriggerRequestParameters {
  Payload: string;
}

/**
 * msdyn_knowledgeHarvestAgentTrigger request message
 *
 * Web API Action: msdyn_knowledgeHarvestAgentTrigger
 */
export class msdyn_knowledgeHarvestAgentTriggerRequest
  extends OrganizationRequest
  implements Executable<msdyn_knowledgeHarvestAgentTriggerResponse>
{
  declare readonly Parameters: Readonly<msdyn_knowledgeHarvestAgentTriggerRequestParameters>;

  constructor(parameters: msdyn_knowledgeHarvestAgentTriggerRequestParameters) {
    super("msdyn_knowledgeHarvestAgentTrigger", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_knowledgeHarvestAgentTrigger`;

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

  parseResponse(_response: Response): Promise<msdyn_knowledgeHarvestAgentTriggerResponse> {
    // No return value (204 No Content)
    return Promise.resolve(new msdyn_knowledgeHarvestAgentTriggerResponse());
  }
}

/**
 * msdyn_knowledgeHarvestAgentTrigger response message
 */
export class msdyn_knowledgeHarvestAgentTriggerResponse extends OrganizationResponse {
  constructor() {
    super("msdyn_knowledgeHarvestAgentTrigger");
  }

  static fromResponse(_data?: unknown): msdyn_knowledgeHarvestAgentTriggerResponse {
    return new msdyn_knowledgeHarvestAgentTriggerResponse();
  }
}
