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
    // 204 No Content is an empty result
    if (response.status === 204) return PublishAllXmlAsyncResponse.fromResponse({});
    return PublishAllXmlAsyncResponse.fromResponse(await response.json());
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
