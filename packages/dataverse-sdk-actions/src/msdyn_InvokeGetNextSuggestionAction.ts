import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Response from the msdyn_InvokeGetNextSuggestion action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_InvokeGetNextSuggestionResponse {
  "@odata.context"?: string;
  Result: string;
}

/**
 * Parameters of the msdyn_InvokeGetNextSuggestion action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_InvokeGetNextSuggestionActionParameters {
  SourceContextEntity?: EntityReference | AnyEntityPayload;
  AdditionalInformation?: string;
  RunId?: string;
  AutomationLevel?: string;
  CustomAgentResponse?: string;
  Entity?: EntityReference | AnyEntityPayload;
}

/**
 * msdyn_InvokeGetNextSuggestion action
 *
 * Unbound action
 */
export class msdyn_InvokeGetNextSuggestionAction implements Executable<msdyn_InvokeGetNextSuggestionResponse> {
  constructor(public readonly parameters: msdyn_InvokeGetNextSuggestionActionParameters = {}) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_InvokeGetNextSuggestion`;

    const body = requestBody({
      SourceContextEntity: this.parameters.SourceContextEntity,
      AdditionalInformation: this.parameters.AdditionalInformation,
      RunId: this.parameters.RunId,
      AutomationLevel: this.parameters.AutomationLevel,
      CustomAgentResponse: this.parameters.CustomAgentResponse,
      Entity: this.parameters.Entity,
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

  async parseResponse(response: Response): Promise<msdyn_InvokeGetNextSuggestionResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_InvokeGetNextSuggestionResponse;
  }
}
