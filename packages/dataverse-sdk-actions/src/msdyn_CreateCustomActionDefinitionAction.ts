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
  correlationId: string;
  workflowId: string;
  customAction: string;
  entityName: string;
  customActionParams: string;
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
      correlationId: this.parameters.correlationId,
      workflowId: this.parameters.workflowId,
      customAction: this.parameters.customAction,
      entityName: this.parameters.entityName,
      customActionParams: this.parameters.customActionParams,
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
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_CreateCustomActionDefinitionResponse;
    return (await response.json()) as msdyn_CreateCustomActionDefinitionResponse;
  }
}
