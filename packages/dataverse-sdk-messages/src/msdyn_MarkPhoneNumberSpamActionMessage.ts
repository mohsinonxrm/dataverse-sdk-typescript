import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_MarkPhoneNumberSpamActionResponse as msdyn_MarkPhoneNumberSpamActionResponseData } from "./types/index.js";

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
    // 204 No Content is an empty result
    if (response.status === 204) return msdyn_MarkPhoneNumberSpamActionResponse.fromResponse({});
    return msdyn_MarkPhoneNumberSpamActionResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_MarkPhoneNumberSpamAction response message
 */
export class msdyn_MarkPhoneNumberSpamActionResponse extends OrganizationResponse {
  constructor(public result: msdyn_MarkPhoneNumberSpamActionResponseData) {
    super("msdyn_MarkPhoneNumberSpamAction");
  }

  static fromResponse(data: unknown): msdyn_MarkPhoneNumberSpamActionResponse {
    return new msdyn_MarkPhoneNumberSpamActionResponse(
      responseObject<msdyn_MarkPhoneNumberSpamActionResponseData>(data)
    );
  }
}
