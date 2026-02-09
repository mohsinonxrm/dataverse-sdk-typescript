import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./EntityReference.js";

/**
 * msdyn_SalesAgents_GetExecutionConfigProperty request message
 *
 * Web API Action: msdyn_SalesAgents_GetExecutionConfigProperty
 */
export class msdyn_SalesAgents_GetExecutionConfigPropertyRequest
  extends OrganizationRequest
  implements Executable<msdyn_SalesAgents_GetExecutionConfigPropertyResponse>
{
  constructor(
    public msdyn_salesagentprofileid: EntityReference,
    public msdyn_config_key: string
  ) {
    super("msdyn_SalesAgents_GetExecutionConfigProperty");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SalesAgents_GetExecutionConfigProperty`;

    const body: Record<string, unknown> = {
      msdyn_salesagentprofileid: this.msdyn_salesagentprofileid,
      msdyn_config_key: this.msdyn_config_key,
    };

    return {
      method: "POST",
      url,
      headers: {
        "Content-Type": "application/json",
      },
      body,
    };
  }

  async parseResponse(
    response: Response
  ): Promise<msdyn_SalesAgents_GetExecutionConfigPropertyResponse> {
    const data = await response.json();
    return msdyn_SalesAgents_GetExecutionConfigPropertyResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      msdyn_salesagentprofileid: this.msdyn_salesagentprofileid,
      msdyn_config_key: this.msdyn_config_key,
    };
  }
}

/**
 * msdyn_SalesAgents_GetExecutionConfigProperty response message
 */
export class msdyn_SalesAgents_GetExecutionConfigPropertyResponse extends OrganizationResponse {
  constructor(public result: msdyn_SalesAgents_GetExecutionConfigPropertyResponse) {
    super("msdyn_SalesAgents_GetExecutionConfigProperty");
  }

  static fromResponse(data: unknown): msdyn_SalesAgents_GetExecutionConfigPropertyResponse {
    return new msdyn_SalesAgents_GetExecutionConfigPropertyResponse((data as any).value);
  }
}
