import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_GenerateWorkflowJson action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_GenerateWorkflowJsonResponse {
  "@odata.context"?: string;
  conflicts: string;
  msdyn_errormessage: string;
  msdyn_promptstatus: number;
}

/**
 * Parameters of the msdyn_GenerateWorkflowJson action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GenerateWorkflowJsonActionParameters {
  ContextVariables?: string;
  msdyn_ccuserpromptid: string;
  EntityIds?: string;
  Channel: string;
  OperationType: string;
  EntityType: string;
  SelectionMode: number;
}

/**
 * msdyn_GenerateWorkflowJson action
 *
 * Unbound action
 */
export class msdyn_GenerateWorkflowJsonAction implements Executable<msdyn_GenerateWorkflowJsonResponse> {
  constructor(public readonly parameters: msdyn_GenerateWorkflowJsonActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GenerateWorkflowJson`;

    const body = requestBody({
      ContextVariables: this.parameters.ContextVariables,
      msdyn_ccuserpromptid: this.parameters.msdyn_ccuserpromptid,
      EntityIds: this.parameters.EntityIds,
      Channel: this.parameters.Channel,
      OperationType: this.parameters.OperationType,
      EntityType: this.parameters.EntityType,
      SelectionMode: this.parameters.SelectionMode,
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

  async parseResponse(response: Response): Promise<msdyn_GenerateWorkflowJsonResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_GenerateWorkflowJsonResponse;
  }
}
