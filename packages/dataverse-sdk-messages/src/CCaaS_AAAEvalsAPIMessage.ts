import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { CCaaS_AAAEvalsAPIResponse as CCaaS_AAAEvalsAPIResponseData } from "./types/index.js";

/**
 * CCaaS_AAAEvalsAPI request message
 *
 * Web API Action: CCaaS_AAAEvalsAPI
 */
export class CCaaS_AAAEvalsAPIRequest
  extends OrganizationRequest
  implements Executable<CCaaS_AAAEvalsAPIResponse>
{
  constructor() {
    super("CCaaS_AAAEvalsAPI");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/CCaaS_AAAEvalsAPI`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<CCaaS_AAAEvalsAPIResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return CCaaS_AAAEvalsAPIResponse.fromResponse({});
    return CCaaS_AAAEvalsAPIResponse.fromResponse(await response.json());
  }
}

/**
 * CCaaS_AAAEvalsAPI response message
 */
export class CCaaS_AAAEvalsAPIResponse extends OrganizationResponse {
  constructor(public result: CCaaS_AAAEvalsAPIResponseData) {
    super("CCaaS_AAAEvalsAPI");
  }

  static fromResponse(data: unknown): CCaaS_AAAEvalsAPIResponse {
    return new CCaaS_AAAEvalsAPIResponse(responseObject<CCaaS_AAAEvalsAPIResponseData>(data));
  }
}
