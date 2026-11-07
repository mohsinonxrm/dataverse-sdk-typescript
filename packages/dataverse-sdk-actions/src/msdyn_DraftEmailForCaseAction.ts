import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_DraftEmailForCase action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_DraftEmailForCaseResponse {
  "@odata.context"?: string;
  Result: string;
}

/**
 * Parameters of the msdyn_DraftEmailForCase action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_DraftEmailForCaseActionParameters {
  context_CaseId?: string;
  senderName: string;
  context_CaseNotes?: string;
  context_CaseTitle?: string;
  recipientName: string;
  additionalInstructions?: string;
}

/**
 * msdyn_DraftEmailForCase action
 *
 * Unbound action
 */
export class msdyn_DraftEmailForCaseAction implements Executable<msdyn_DraftEmailForCaseResponse> {
  constructor(public readonly parameters: msdyn_DraftEmailForCaseActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_DraftEmailForCase`;

    const body = requestBody({
      context_CaseId: this.parameters.context_CaseId,
      senderName: this.parameters.senderName,
      context_CaseNotes: this.parameters.context_CaseNotes,
      context_CaseTitle: this.parameters.context_CaseTitle,
      recipientName: this.parameters.recipientName,
      additionalInstructions: this.parameters.additionalInstructions,
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

  async parseResponse(response: Response): Promise<msdyn_DraftEmailForCaseResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_DraftEmailForCaseResponse;
  }
}
