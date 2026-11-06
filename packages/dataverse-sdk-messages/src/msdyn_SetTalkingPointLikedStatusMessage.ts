import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_SetTalkingPointLikedStatusResponse as msdyn_SetTalkingPointLikedStatusResponseData } from "./types/index.js";

/**
 * msdyn_SetTalkingPointLikedStatus request message
 *
 * Web API Action: msdyn_SetTalkingPointLikedStatus
 */
export class msdyn_SetTalkingPointLikedStatusRequest
  extends OrganizationRequest
  implements Executable<msdyn_SetTalkingPointLikedStatusResponse>
{
  constructor(
    public messageId: string,
    public inferredMessageId: string,
    public isLiked: boolean
  ) {
    super("msdyn_SetTalkingPointLikedStatus");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SetTalkingPointLikedStatus`;

    const body: Record<string, unknown> = {
      MessageId: this.messageId,
      InferredMessageId: this.inferredMessageId,
      IsLiked: this.isLiked,
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

  async parseResponse(response: Response): Promise<msdyn_SetTalkingPointLikedStatusResponse> {
    const data = await response.json();
    return msdyn_SetTalkingPointLikedStatusResponse.fromResponse(data);
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
