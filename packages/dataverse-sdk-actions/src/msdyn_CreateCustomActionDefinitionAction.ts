import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_CreateCustomActionDefinition action
 */
export interface msdyn_CreateCustomActionDefinitionResponse {
  actionDetails: string;
}

/**
 * Parameters of the msdyn_CreateCustomActionDefinition action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_CreateCustomActionDefinitionActionParameters {
  workflowId: string;
  entityName: string;
  customAction: string;
  customActionParams: string;
  correlationId: string;
}

/**
 * msdyn_CreateCustomActionDefinition action
 *
 * Unbound action
 */
export class msdyn_CreateCustomActionDefinitionAction implements Executable<msdyn_CreateCustomActionDefinitionResponse> {
  constructor(public readonly parameters: msdyn_CreateCustomActionDefinitionActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CreateCustomActionDefinition`;

    const body = requestBody({
      workflowId: this.parameters.workflowId,
      entityName: this.parameters.entityName,
      customAction: this.parameters.customAction,
      customActionParams: this.parameters.customActionParams,
      correlationId: this.parameters.correlationId,
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

  async parseResponse(response: Response): Promise<msdyn_CreateCustomActionDefinitionResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as msdyn_CreateCustomActionDefinitionResponse;
  }
}
