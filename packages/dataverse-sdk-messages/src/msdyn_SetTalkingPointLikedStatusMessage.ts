import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

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
        "Content-Type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<msdyn_SetTalkingPointLikedStatusResponse> {
    const data = await response.json();
    return msdyn_SetTalkingPointLikedStatusResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      MessageId: this.messageId,
      InferredMessageId: this.inferredMessageId,
      IsLiked: this.isLiked,
    };
  }
}

/**
 * msdyn_SetTalkingPointLikedStatus response message
 */
export class msdyn_SetTalkingPointLikedStatusResponse extends OrganizationResponse {
  constructor(public result: msdyn_SetTalkingPointLikedStatusResponse) {
    super("msdyn_SetTalkingPointLikedStatus");
  }

  static fromResponse(data: unknown): msdyn_SetTalkingPointLikedStatusResponse {
    return new msdyn_SetTalkingPointLikedStatusResponse((data as any).value);
  }
}
