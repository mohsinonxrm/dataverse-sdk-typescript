import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_SetTalkingPointLikedStatus message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_SetTalkingPointLikedStatusRequestParameters {
  MessageId?: string;
  InferredMessageId?: string;
  IsLiked?: boolean;
}

/**
 * msdyn_SetTalkingPointLikedStatus request message
 *
 * Web API Action: msdyn_SetTalkingPointLikedStatus
 */
export class msdyn_SetTalkingPointLikedStatusRequest
  extends OrganizationRequest
  implements Executable<msdyn_SetTalkingPointLikedStatusResponse>
{
  declare readonly Parameters: Readonly<msdyn_SetTalkingPointLikedStatusRequestParameters>;

  constructor(parameters: msdyn_SetTalkingPointLikedStatusRequestParameters = {}) {
    super("msdyn_SetTalkingPointLikedStatus", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SetTalkingPointLikedStatus`;

    const body = requestBody({
      MessageId: this.Parameters.MessageId,
      InferredMessageId: this.Parameters.InferredMessageId,
      IsLiked: this.Parameters.IsLiked,
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

  async parseResponse(response: Response): Promise<msdyn_SetTalkingPointLikedStatusResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_SetTalkingPointLikedStatusResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_SetTalkingPointLikedStatus action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_SetTalkingPointLikedStatusResult {
  "@odata.context"?: string;
  IsSuccessfull: boolean;
}

/**
 * msdyn_SetTalkingPointLikedStatus response message
 *
 * `result` is the value the msdyn_SetTalkingPointLikedStatus action returns (see {@link msdyn_SetTalkingPointLikedStatusResult}).
 */
export class msdyn_SetTalkingPointLikedStatusResponse extends OrganizationResponse {
  constructor(public result: msdyn_SetTalkingPointLikedStatusResult) {
    super("msdyn_SetTalkingPointLikedStatus");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_SetTalkingPointLikedStatusResponse {
    return new msdyn_SetTalkingPointLikedStatusResponse(
      data as msdyn_SetTalkingPointLikedStatusResult
    );
  }
}
