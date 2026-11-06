import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_DraftEmailForCase action
 */
export interface msdyn_DraftEmailForCaseResponse {
  Result: string;
}

/**
 * Parameters of the msdyn_DraftEmailForCase action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_DraftEmailForCaseActionParameters {
  additionalInstructions?: string;
  context_CaseNotes?: string;
  context_CaseTitle?: string;
  context_CaseId?: string;
  recipientName: string;
  senderName: string;
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
      additionalInstructions: this.parameters.additionalInstructions,
      context_CaseNotes: this.parameters.context_CaseNotes,
      context_CaseTitle: this.parameters.context_CaseTitle,
      context_CaseId: this.parameters.context_CaseId,
      recipientName: this.parameters.recipientName,
      senderName: this.parameters.senderName,
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
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_DraftEmailForCaseResponse;
    return (await response.json()) as msdyn_DraftEmailForCaseResponse;
  }
}
