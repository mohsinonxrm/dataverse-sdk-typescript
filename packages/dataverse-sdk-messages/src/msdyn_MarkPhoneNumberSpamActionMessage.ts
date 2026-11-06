import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_MarkPhoneNumberSpamAction message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_MarkPhoneNumberSpamActionRequestParameters {
  PhoneNumber: string;
  Action: number;
  FlaggedStatus?: number;
  Annotation?: string;
  CurrentActiveConversationId: string;
}

/**
 * msdyn_MarkPhoneNumberSpamAction request message
 *
 * Web API Action: msdyn_MarkPhoneNumberSpamAction
 */
export class msdyn_MarkPhoneNumberSpamActionRequest
  extends OrganizationRequest
  implements Executable<msdyn_MarkPhoneNumberSpamActionResponse>
{
  declare readonly Parameters: Readonly<msdyn_MarkPhoneNumberSpamActionRequestParameters>;

  constructor(parameters: msdyn_MarkPhoneNumberSpamActionRequestParameters) {
    super("msdyn_MarkPhoneNumberSpamAction", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_MarkPhoneNumberSpamAction`;

    const body = requestBody({
      PhoneNumber: this.Parameters.PhoneNumber,
      Action: this.Parameters.Action,
      FlaggedStatus: this.Parameters.FlaggedStatus,
      Annotation: this.Parameters.Annotation,
      CurrentActiveConversationId: this.Parameters.CurrentActiveConversationId,
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

  async parseResponse(response: Response): Promise<msdyn_MarkPhoneNumberSpamActionResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_MarkPhoneNumberSpamActionResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_MarkPhoneNumberSpamAction action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_MarkPhoneNumberSpamActionResult {
  "@odata.context"?: string;
  ActionResult: string;
}

/**
 * msdyn_MarkPhoneNumberSpamAction response message
 *
 * `result` is the value the msdyn_MarkPhoneNumberSpamAction action returns (see {@link msdyn_MarkPhoneNumberSpamActionResult}).
 */
export class msdyn_MarkPhoneNumberSpamActionResponse extends OrganizationResponse {
  constructor(public result: msdyn_MarkPhoneNumberSpamActionResult) {
    super("msdyn_MarkPhoneNumberSpamAction");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_MarkPhoneNumberSpamActionResponse {
    return new msdyn_MarkPhoneNumberSpamActionResponse(
      data as msdyn_MarkPhoneNumberSpamActionResult
    );
  }
}
