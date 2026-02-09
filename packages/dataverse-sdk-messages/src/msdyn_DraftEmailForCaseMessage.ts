import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_DraftEmailForCase request message
 *
 * Web API Action: msdyn_DraftEmailForCase
 */
export class msdyn_DraftEmailForCaseRequest
  extends OrganizationRequest
  implements Executable<msdyn_DraftEmailForCaseResponse>
{
  constructor(
    public additionalInstructions: string,
    public context_CaseNotes: string,
    public context_CaseTitle: string,
    public context_CaseId: string,
    public recipientName: string,
    public senderName: string
  ) {
    super("msdyn_DraftEmailForCase");
  }

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
        "Content-Type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<msdyn_DraftEmailForCaseResponse> {
    const data = await response.json();
    return msdyn_DraftEmailForCaseResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      additionalInstructions: this.additionalInstructions,
      context_CaseNotes: this.context_CaseNotes,
      context_CaseTitle: this.context_CaseTitle,
      context_CaseId: this.context_CaseId,
      recipientName: this.recipientName,
      senderName: this.senderName,
    };
  }
}

/**
 * msdyn_DraftEmailForCase response message
 */
export class msdyn_DraftEmailForCaseResponse extends OrganizationResponse {
  constructor(public result: msdyn_DraftEmailForCaseResponse) {
    super("msdyn_DraftEmailForCase");
  }

  static fromResponse(data: unknown): msdyn_DraftEmailForCaseResponse {
    return new msdyn_DraftEmailForCaseResponse((data as any).value);
  }
}
