import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_DraftEmailForCaseResponse as msdyn_DraftEmailForCaseResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_DraftEmailForCase message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_DraftEmailForCaseRequestParameters {
  additionalInstructions?: string;
  context_CaseNotes?: string;
  context_CaseTitle?: string;
  context_CaseId?: string;
  recipientName: string;
  senderName: string;
}

/**
 * msdyn_DraftEmailForCase request message
 *
 * Web API Action: msdyn_DraftEmailForCase
 */
export class msdyn_DraftEmailForCaseRequest
  extends OrganizationRequest
  implements Executable<msdyn_DraftEmailForCaseResponse>
{
  declare readonly Parameters: Readonly<msdyn_DraftEmailForCaseRequestParameters>;

  constructor(parameters: msdyn_DraftEmailForCaseRequestParameters) {
    super("msdyn_DraftEmailForCase", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_DraftEmailForCase`;

    const body = requestBody({
      additionalInstructions: this.Parameters.additionalInstructions,
      context_CaseNotes: this.Parameters.context_CaseNotes,
      context_CaseTitle: this.Parameters.context_CaseTitle,
      context_CaseId: this.Parameters.context_CaseId,
      recipientName: this.Parameters.recipientName,
      senderName: this.Parameters.senderName,
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
    if (response.status === 204) return msdyn_DraftEmailForCaseResponse.fromResponse({});
    return msdyn_DraftEmailForCaseResponse.fromResponse(await response.json());
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
