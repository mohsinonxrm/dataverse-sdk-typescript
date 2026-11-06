import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Parameters of the msdyn_SalesAgents_SetExecutionConfigProperty message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_SalesAgents_SetExecutionConfigPropertyRequestParameters {
  msdyn_salesagentprofileid: EntityReference | AnyEntityPayload;
  msdyn_config_key: string;
  msdyn_config_value: string;
}

/**
 * msdyn_SalesAgents_SetExecutionConfigProperty request message
 *
 * Web API Action: msdyn_SalesAgents_SetExecutionConfigProperty
 */
export class msdyn_SalesAgents_SetExecutionConfigPropertyRequest
  extends OrganizationRequest
  implements Executable<msdyn_SalesAgents_SetExecutionConfigPropertyResponse>
{
  declare readonly Parameters: Readonly<msdyn_SalesAgents_SetExecutionConfigPropertyRequestParameters>;

  constructor(parameters: msdyn_SalesAgents_SetExecutionConfigPropertyRequestParameters) {
    super("msdyn_SalesAgents_SetExecutionConfigProperty", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SalesAgents_SetExecutionConfigProperty`;

    const body = requestBody({
      msdyn_salesagentprofileid: this.Parameters.msdyn_salesagentprofileid,
      msdyn_config_key: this.Parameters.msdyn_config_key,
      msdyn_config_value: this.Parameters.msdyn_config_value,
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

  parseResponse(
    _response: Response
  ): Promise<msdyn_SalesAgents_SetExecutionConfigPropertyResponse> {
    // No return value (204 No Content)
    return Promise.resolve(new msdyn_SalesAgents_SetExecutionConfigPropertyResponse());
  }
}

/**
 * msdyn_SalesAgents_SetExecutionConfigProperty response message
 */
export class msdyn_SalesAgents_SetExecutionConfigPropertyResponse extends OrganizationResponse {
  constructor() {
    super("msdyn_SalesAgents_SetExecutionConfigProperty");
  }

  static fromResponse(_data?: unknown): msdyn_SalesAgents_SetExecutionConfigPropertyResponse {
    return new msdyn_SalesAgents_SetExecutionConfigPropertyResponse();
  }
}
