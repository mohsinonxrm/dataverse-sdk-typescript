import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_DraftEmailForCase action
 */
export interface msdyn_DraftEmailForCaseResponse {
  Result: string;
}

/**
 * msdyn_DraftEmailForCase action
 *
 * Unbound action
 */
export class msdyn_DraftEmailForCaseAction implements Executable<msdyn_DraftEmailForCaseResponse> {
  constructor(
    public readonly additionalInstructions: string,
    public readonly context_CaseNotes: string,
    public readonly context_CaseTitle: string,
    public readonly context_CaseId: string,
    public readonly recipientName: string,
    public readonly senderName: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_DraftEmailForCase`;

    const body: Record<string, unknown> = {
      additionalInstructions: this.additionalInstructions,
      context_CaseNotes: this.context_CaseNotes,
      context_CaseTitle: this.context_CaseTitle,
      context_CaseId: this.context_CaseId,
      recipientName: this.recipientName,
      senderName: this.senderName,
    };

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
    const data = await response.json();
    return data as msdyn_DraftEmailForCaseResponse;
  }
}
