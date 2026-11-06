import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Response from the msdyn_SalesAgents_GetExecutionConfigProperty action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_SalesAgents_GetExecutionConfigPropertyResponse {
  "@odata.context"?: string;
  msdyn_config_value: string;
}

/**
 * Parameters of the msdyn_SalesAgents_GetExecutionConfigProperty action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_SalesAgents_GetExecutionConfigPropertyActionParameters {
  msdyn_salesagentprofileid: EntityReference | AnyEntityPayload;
  msdyn_config_key: string;
}

/**
 * msdyn_SalesAgents_GetExecutionConfigProperty action
 *
 * Unbound action
 */
export class msdyn_SalesAgents_GetExecutionConfigPropertyAction implements Executable<msdyn_SalesAgents_GetExecutionConfigPropertyResponse> {
  constructor(
    public readonly parameters: msdyn_SalesAgents_GetExecutionConfigPropertyActionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SalesAgents_GetExecutionConfigProperty`;

    const body = requestBody({
      msdyn_salesagentprofileid: this.parameters.msdyn_salesagentprofileid,
      msdyn_config_key: this.parameters.msdyn_config_key,
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
    return (await response.json()) as msdyn_SalesAgents_GetExecutionConfigPropertyResponse;
  }
}
