import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./EntityReference.js";

/**
 * msdyn_SalesAgents_SetExecutionConfigProperty request message
 *
 * Web API Action: msdyn_SalesAgents_SetExecutionConfigProperty
 */
export class msdyn_SalesAgents_SetExecutionConfigPropertyRequest
  extends OrganizationRequest
  implements Executable<msdyn_SalesAgents_SetExecutionConfigPropertyResponse>
{
  constructor(
    public msdyn_salesagentprofileid: EntityReference,
    public msdyn_config_key: string,
    public msdyn_config_value: string
  ) {
    super("msdyn_SalesAgents_SetExecutionConfigProperty");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SalesAgents_SetExecutionConfigProperty`;

    const body: Record<string, unknown> = {
      msdyn_salesagentprofileid: this.msdyn_salesagentprofileid,
      msdyn_config_key: this.msdyn_config_key,
      msdyn_config_value: this.msdyn_config_value,
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
  ): Promise<msdyn_SalesAgents_SetExecutionConfigPropertyResponse> {
    // No return value (204 No Content)
    return new msdyn_SalesAgents_SetExecutionConfigPropertyResponse();
  }

  toRequestBody(): Record<string, unknown> {
    return {
      msdyn_salesagentprofileid: this.msdyn_salesagentprofileid,
      msdyn_config_key: this.msdyn_config_key,
      msdyn_config_value: this.msdyn_config_value,
    };
  }
}

/**
 * msdyn_SalesAgents_SetExecutionConfigProperty response message
 */
export class msdyn_SalesAgents_SetExecutionConfigPropertyResponse extends OrganizationResponse {
  constructor() {
    super("msdyn_SalesAgents_SetExecutionConfigProperty");
  }

  static fromResponse(_data: unknown): msdyn_SalesAgents_SetExecutionConfigPropertyResponse {
    return new msdyn_SalesAgents_SetExecutionConfigPropertyResponse();
  }
}
