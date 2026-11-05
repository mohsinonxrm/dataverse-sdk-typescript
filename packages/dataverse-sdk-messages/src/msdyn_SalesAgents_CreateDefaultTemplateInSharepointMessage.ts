import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

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
    const data = await response.json();
    return msdyn_SalesAgents_CreateDefaultTemplateInSharepointResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {};
  }
}

/**
 * msdyn_SalesAgents_CreateDefaultTemplateInSharepoint response message
 */
export class msdyn_SalesAgents_CreateDefaultTemplateInSharepointResponse extends OrganizationResponse {
  constructor(public result: msdyn_SalesAgents_CreateDefaultTemplateInSharepointResponse) {
    super("msdyn_SalesAgents_CreateDefaultTemplateInSharepoint");
  }

  static fromResponse(data: unknown): msdyn_SalesAgents_CreateDefaultTemplateInSharepointResponse {
    return new msdyn_SalesAgents_CreateDefaultTemplateInSharepointResponse((data as any).value);
  }
}
