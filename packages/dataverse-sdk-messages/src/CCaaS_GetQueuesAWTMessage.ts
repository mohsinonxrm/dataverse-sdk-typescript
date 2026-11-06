import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { CCaaS_GetQueuesAWTResponse as CCaaS_GetQueuesAWTResponseData } from "./types/index.js";

/**
 * Parameters of the CCaaS_GetQueuesAWT message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CCaaS_GetQueuesAWTRequestParameters {
  ApiVersion: string;
  QueueIds: string[];
}

/**
 * CCaaS_GetQueuesAWT request message
 *
 * Web API Action: CCaaS_GetQueuesAWT
 */
export class CCaaS_GetQueuesAWTRequest
  extends OrganizationRequest
  implements Executable<CCaaS_GetQueuesAWTResponse>
{
  declare readonly Parameters: Readonly<CCaaS_GetQueuesAWTRequestParameters>;

  constructor(parameters: CCaaS_GetQueuesAWTRequestParameters) {
    super("CCaaS_GetQueuesAWT", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/CCaaS_GetQueuesAWT`;

    const body = requestBody({
      ApiVersion: this.Parameters.ApiVersion,
      QueueIds: this.Parameters.QueueIds,
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

  async parseResponse(response: Response): Promise<CCaaS_GetQueuesAWTResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return CCaaS_GetQueuesAWTResponse.fromResponse({});
    return CCaaS_GetQueuesAWTResponse.fromResponse(await response.json());
  }
}

/**
 * CCaaS_GetQueuesAWT response message
 */
export class CCaaS_GetQueuesAWTResponse extends OrganizationResponse {
  constructor(public result: CCaaS_GetQueuesAWTResponseData) {
    super("CCaaS_GetQueuesAWT");
  }

  static fromResponse(data: unknown): CCaaS_GetQueuesAWTResponse {
    return new CCaaS_GetQueuesAWTResponse(responseObject<CCaaS_GetQueuesAWTResponseData>(data));
  }
}
