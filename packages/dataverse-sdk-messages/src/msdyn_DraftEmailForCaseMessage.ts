import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_DraftEmailForCaseResponse as msdyn_DraftEmailForCaseResponseData } from "./types/index.js";

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
    public additionalInstructions: string | undefined,
    public context_CaseNotes: string | undefined,
    public context_CaseTitle: string | undefined,
    public context_CaseId: string | undefined,
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
        "content-type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<msdyn_DraftEmailForCaseResponse> {
    const data = await response.json();
    return msdyn_DraftEmailForCaseResponse.fromResponse(data);
  }
}

/**
 * msdyn_DraftEmailForCase response message
 */
export class msdyn_DraftEmailForCaseResponse extends OrganizationResponse {
  constructor(public result: msdyn_DraftEmailForCaseResponseData) {
    super("msdyn_DraftEmailForCase");
  }

  static fromResponse(data: unknown): msdyn_DraftEmailForCaseResponse {
    return new msdyn_DraftEmailForCaseResponse(
      responseObject<msdyn_DraftEmailForCaseResponseData>(data)
    );
  }
}
