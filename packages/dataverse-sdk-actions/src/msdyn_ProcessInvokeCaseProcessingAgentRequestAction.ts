import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Response from the msdyn_ProcessInvokeCaseProcessingAgentRequest action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_ProcessInvokeCaseProcessingAgentRequestResponse {
  "@odata.context"?: string;
  IsDisabled: boolean;
  IsError: boolean;
  Message: string;
  ProcessedActions: string;
  ProcessedExtraParams: string;
}

/**
 * Parameters of the msdyn_ProcessInvokeCaseProcessingAgentRequest action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_ProcessInvokeCaseProcessingAgentRequestActionParameters {
  ExtraParams?: string;
  Entity: EntityReference | AnyEntityPayload;
  Actions?: string;
}

/**
 * msdyn_ProcessInvokeCaseProcessingAgentRequest action
 *
 * Unbound action
 */
export class msdyn_ProcessInvokeCaseProcessingAgentRequestAction implements Executable<msdyn_ProcessInvokeCaseProcessingAgentRequestResponse> {
  constructor(
    public readonly parameters: msdyn_ProcessInvokeCaseProcessingAgentRequestActionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_ProcessInvokeCaseProcessingAgentRequest`;

    const body = requestBody({
      ExtraParams: this.parameters.ExtraParams,
      Entity: this.parameters.Entity,
      Actions: this.parameters.Actions,
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
  ): Promise<msdyn_ProcessInvokeCaseProcessingAgentRequestResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_ProcessInvokeCaseProcessingAgentRequestResponse;
  }
}
