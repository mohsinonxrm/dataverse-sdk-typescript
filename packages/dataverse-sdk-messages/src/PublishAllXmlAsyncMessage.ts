import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { PublishAllXmlAsyncResponse as PublishAllXmlAsyncResponseData } from "./types/index.js";

/**
 * PublishAllXmlAsync request message
 *
 * Web API Action: PublishAllXmlAsync
 */
export class PublishAllXmlAsyncRequest
  extends OrganizationRequest
  implements Executable<PublishAllXmlAsyncResponse>
{
  constructor() {
    super("PublishAllXmlAsync");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/PublishAllXmlAsync`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<PublishAllXmlAsyncResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return PublishAllXmlAsyncResponse.fromResponse(text ? JSON.parse(text) : {});
  }
}

/**
 * PublishAllXmlAsync response message
 */
export class PublishAllXmlAsyncResponse extends OrganizationResponse {
  constructor(public result: PublishAllXmlAsyncResponseData) {
    super("PublishAllXmlAsync");
  }

  static fromResponse(data: unknown): PublishAllXmlAsyncResponse {
    return new PublishAllXmlAsyncResponse(responseObject<PublishAllXmlAsyncResponseData>(data));
  }
}
