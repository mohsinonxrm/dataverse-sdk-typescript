import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_SalesAgents_CreateDefaultTemplateInSharepointResponse as msdyn_SalesAgents_CreateDefaultTemplateInSharepointResponseData } from "./types/index.js";

/**
 * msdyn_SalesAgents_CreateDefaultTemplateInSharepoint request message
 *
 * Web API Action: msdyn_SalesAgents_CreateDefaultTemplateInSharepoint
 */
export class msdyn_SalesAgents_CreateDefaultTemplateInSharepointRequest
  extends OrganizationRequest
  implements Executable<msdyn_SalesAgents_CreateDefaultTemplateInSharepointResponse>
{
  constructor() {
    super("msdyn_SalesAgents_CreateDefaultTemplateInSharepoint");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SalesAgents_CreateDefaultTemplateInSharepoint`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(
    response: Response
  ): Promise<msdyn_SalesAgents_CreateDefaultTemplateInSharepointResponse> {
    // 204 No Content is an empty result
    if (response.status === 204)
      return msdyn_SalesAgents_CreateDefaultTemplateInSharepointResponse.fromResponse({});
    return msdyn_SalesAgents_CreateDefaultTemplateInSharepointResponse.fromResponse(
      await response.json()
    );
  }
}

/**
 * msdyn_SalesAgents_CreateDefaultTemplateInSharepoint response message
 */
export class msdyn_SalesAgents_CreateDefaultTemplateInSharepointResponse extends OrganizationResponse {
  constructor(public result: msdyn_SalesAgents_CreateDefaultTemplateInSharepointResponseData) {
    super("msdyn_SalesAgents_CreateDefaultTemplateInSharepoint");
  }

  static fromResponse(data: unknown): msdyn_SalesAgents_CreateDefaultTemplateInSharepointResponse {
    return new msdyn_SalesAgents_CreateDefaultTemplateInSharepointResponse(
      responseObject<msdyn_SalesAgents_CreateDefaultTemplateInSharepointResponseData>(data)
    );
  }
}
