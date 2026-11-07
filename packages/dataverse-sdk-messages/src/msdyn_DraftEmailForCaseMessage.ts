import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_DraftEmailForCase message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_DraftEmailForCaseRequestParameters {
  context_CaseId?: string;
  senderName: string;
  context_CaseNotes?: string;
  context_CaseTitle?: string;
  recipientName: string;
  additionalInstructions?: string;
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
      context_CaseId: this.Parameters.context_CaseId,
      senderName: this.Parameters.senderName,
      context_CaseNotes: this.Parameters.context_CaseNotes,
      context_CaseTitle: this.Parameters.context_CaseTitle,
      recipientName: this.Parameters.recipientName,
      additionalInstructions: this.Parameters.additionalInstructions,
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
    return msdyn_DraftEmailForCaseResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_DraftEmailForCase action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_DraftEmailForCaseResult {
  "@odata.context"?: string;
  Result: string;
}

/**
 * msdyn_DraftEmailForCase response message
 *
 * `result` is the value the msdyn_DraftEmailForCase action returns (see {@link msdyn_DraftEmailForCaseResult}).
 */
export class msdyn_DraftEmailForCaseResponse extends OrganizationResponse {
  constructor(public result: msdyn_DraftEmailForCaseResult) {
    super("msdyn_DraftEmailForCase");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_DraftEmailForCaseResponse {
    return new msdyn_DraftEmailForCaseResponse(data as msdyn_DraftEmailForCaseResult);
  }
}
