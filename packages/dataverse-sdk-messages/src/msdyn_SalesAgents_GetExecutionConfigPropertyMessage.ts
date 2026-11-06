import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { EntityReference } from "./EntityReference.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";
import type { msdyn_SalesAgents_GetExecutionConfigPropertyResponse as msdyn_SalesAgents_GetExecutionConfigPropertyResponseData } from "./types/index.js";

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
    public msdyn_salesagentprofileid: EntityReference | AnyEntityPayload,
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
        "content-type": "application/json",
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
}

/**
 * msdyn_SalesAgents_GetExecutionConfigProperty response message
 */
export class msdyn_SalesAgents_GetExecutionConfigPropertyResponse extends OrganizationResponse {
  constructor(public result: msdyn_SalesAgents_GetExecutionConfigPropertyResponseData) {
    super("msdyn_SalesAgents_GetExecutionConfigProperty");
  }

  static fromResponse(data: unknown): msdyn_SalesAgents_GetExecutionConfigPropertyResponse {
    return new msdyn_SalesAgents_GetExecutionConfigPropertyResponse(
      responseObject<msdyn_SalesAgents_GetExecutionConfigPropertyResponseData>(data)
    );
  }
}
