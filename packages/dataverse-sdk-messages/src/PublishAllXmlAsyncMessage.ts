import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

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
        "Content-Type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<PublishAllXmlAsyncResponse> {
    const data = await response.json();
    return PublishAllXmlAsyncResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {};
  }
}

/**
 * PublishAllXmlAsync response message
 */
export class PublishAllXmlAsyncResponse extends OrganizationResponse {
  constructor(public result: PublishAllXmlAsyncResponse) {
    super("PublishAllXmlAsync");
  }

  static fromResponse(data: unknown): PublishAllXmlAsyncResponse {
    return new PublishAllXmlAsyncResponse((data as any).value);
  }
}
