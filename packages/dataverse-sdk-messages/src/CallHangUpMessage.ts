import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { CallHangUpResponse as CallHangUpResponseData } from "./types/index.js";

/**
 * Parameters of the CallHangUp message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CallHangUpRequestParameters {
  ApiVersion: string;
  ConversationId: string;
}

/**
 * CallHangUp request message
 *
 * Web API Action: CallHangUp
 */
export class CallHangUpRequest
  extends OrganizationRequest
  implements Executable<CallHangUpResponse>
{
  declare readonly Parameters: Readonly<CallHangUpRequestParameters>;

  constructor(parameters: CallHangUpRequestParameters) {
    super("CallHangUp", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/CallHangUp`;

    const body = requestBody({
      ApiVersion: this.Parameters.ApiVersion,
      ConversationId: this.Parameters.ConversationId,
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

  async parseResponse(response: Response): Promise<CallHangUpResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return CallHangUpResponse.fromResponse({});
    return CallHangUpResponse.fromResponse(await response.json());
  }
}

/**
 * CallHangUp response message
 */
export class CallHangUpResponse extends OrganizationResponse {
  constructor(public result: CallHangUpResponseData) {
    super("CallHangUp");
  }

  static fromResponse(data: unknown): CallHangUpResponse {
    return new CallHangUpResponse(responseObject<CallHangUpResponseData>(data));
  }
}
