import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_CreateCopilotRecordUpdateEvent action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_CreateCopilotRecordUpdateEventResponse {
  "@odata.context"?: string;
  CopilotEventRecordGuid: string;
  RecordCreatedSuccessfully: boolean;
}

/**
 * Parameters of the msdyn_CreateCopilotRecordUpdateEvent action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_CreateCopilotRecordUpdateEventActionParameters {
  InteractionForId: string;
  InteractionContext: string;
  InteractionForLogicalName: string;
}

/**
 * msdyn_CreateCopilotRecordUpdateEvent action
 *
 * Unbound action
 */
export class msdyn_CreateCopilotRecordUpdateEventAction implements Executable<msdyn_CreateCopilotRecordUpdateEventResponse> {
  constructor(public readonly parameters: msdyn_CreateCopilotRecordUpdateEventActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CreateCopilotRecordUpdateEvent`;

    const body = requestBody({
      InteractionForId: this.parameters.InteractionForId,
      InteractionContext: this.parameters.InteractionContext,
      InteractionForLogicalName: this.parameters.InteractionForLogicalName,
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

  async parseResponse(response: Response): Promise<msdyn_CreateCopilotRecordUpdateEventResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_CreateCopilotRecordUpdateEventResponse;
  }
}
