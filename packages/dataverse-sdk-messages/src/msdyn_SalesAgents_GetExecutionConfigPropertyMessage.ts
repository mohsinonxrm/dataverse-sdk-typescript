import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Parameters of the msdyn_SalesAgents_GetExecutionConfigProperty message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_SalesAgents_GetExecutionConfigPropertyRequestParameters {
  msdyn_salesagentprofileid: EntityReference | AnyEntityPayload;
  msdyn_config_key: string;
}

/**
 * msdyn_SalesAgents_GetExecutionConfigProperty request message
 *
 * Web API Action: msdyn_SalesAgents_GetExecutionConfigProperty
 */
export class msdyn_SalesAgents_GetExecutionConfigPropertyRequest
  extends OrganizationRequest
  implements Executable<msdyn_SalesAgents_GetExecutionConfigPropertyResponse>
{
  declare readonly Parameters: Readonly<msdyn_SalesAgents_GetExecutionConfigPropertyRequestParameters>;

  constructor(parameters: msdyn_SalesAgents_GetExecutionConfigPropertyRequestParameters) {
    super("msdyn_SalesAgents_GetExecutionConfigProperty", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SalesAgents_GetExecutionConfigProperty`;

    const body = requestBody({
      msdyn_salesagentprofileid: this.Parameters.msdyn_salesagentprofileid,
      msdyn_config_key: this.Parameters.msdyn_config_key,
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
  ): Promise<msdyn_SalesAgents_GetExecutionConfigPropertyResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_SalesAgents_GetExecutionConfigPropertyResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_SalesAgents_GetExecutionConfigProperty action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_SalesAgents_GetExecutionConfigPropertyResult {
  "@odata.context"?: string;
  msdyn_config_value: string;
}

/**
 * msdyn_SalesAgents_GetExecutionConfigProperty response message
 *
 * `result` is the value the msdyn_SalesAgents_GetExecutionConfigProperty action returns (see {@link msdyn_SalesAgents_GetExecutionConfigPropertyResult}).
 */
export class msdyn_SalesAgents_GetExecutionConfigPropertyResponse extends OrganizationResponse {
  constructor(public result: msdyn_SalesAgents_GetExecutionConfigPropertyResult) {
    super("msdyn_SalesAgents_GetExecutionConfigProperty");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_SalesAgents_GetExecutionConfigPropertyResponse {
    return new msdyn_SalesAgents_GetExecutionConfigPropertyResponse(
      data as msdyn_SalesAgents_GetExecutionConfigPropertyResult
    );
  }
}
