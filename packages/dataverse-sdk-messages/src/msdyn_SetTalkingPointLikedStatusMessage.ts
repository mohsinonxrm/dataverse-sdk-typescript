import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_SetTalkingPointLikedStatusResponse as msdyn_SetTalkingPointLikedStatusResponseData } from "./types/index.js";

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
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return msdyn_SetTalkingPointLikedStatusResponse.fromResponse(text ? JSON.parse(text) : {});
  }
}

/**
 * msdyn_SetTalkingPointLikedStatus response message
 */
export class msdyn_SetTalkingPointLikedStatusResponse extends OrganizationResponse {
  constructor(public result: msdyn_SetTalkingPointLikedStatusResponseData) {
    super("msdyn_SetTalkingPointLikedStatus");
  }

  static fromResponse(data: unknown): msdyn_SetTalkingPointLikedStatusResponse {
    return new msdyn_SetTalkingPointLikedStatusResponse(
      responseObject<msdyn_SetTalkingPointLikedStatusResponseData>(data)
    );
  }
}
