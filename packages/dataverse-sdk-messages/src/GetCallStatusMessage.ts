import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { GetCallStatusResponse as GetCallStatusResponseData } from "./types/index.js";

/**
 * Parameters of the GetCallStatus message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface GetCallStatusRequestParameters {
  ConversationId: string;
  ApiVersion: string;
}

/**
 * GetCallStatus request message
 *
 * Web API Action: GetCallStatus
 */
export class GetCallStatusRequest
  extends OrganizationRequest
  implements Executable<GetCallStatusResponse>
{
  declare readonly Parameters: Readonly<GetCallStatusRequestParameters>;

  constructor(parameters: GetCallStatusRequestParameters) {
    super("GetCallStatus", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/GetCallStatus`;

    const body = requestBody({
      ConversationId: this.Parameters.ConversationId,
      ApiVersion: this.Parameters.ApiVersion,
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

  async parseResponse(response: Response): Promise<GetCallStatusResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return GetCallStatusResponse.fromResponse({});
    return GetCallStatusResponse.fromResponse(await response.json());
  }
}

/**
 * GetCallStatus response message
 */
export class GetCallStatusResponse extends OrganizationResponse {
  constructor(public result: GetCallStatusResponseData) {
    super("GetCallStatus");
  }

  static fromResponse(data: unknown): GetCallStatusResponse {
    return new GetCallStatusResponse(responseObject<GetCallStatusResponseData>(data));
  }
}
