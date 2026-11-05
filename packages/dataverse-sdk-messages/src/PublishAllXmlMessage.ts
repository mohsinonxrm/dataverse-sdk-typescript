import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * PublishAllXml request message
 *
 * Web API Action: PublishAllXml
 */
export class PublishAllXmlRequest
  extends OrganizationRequest
  implements Executable<PublishAllXmlResponse>
{
  constructor() {
    super("PublishAllXml");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/PublishAllXml`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<PublishAllXmlResponse> {
    // No return value (204 No Content)
    return new PublishAllXmlResponse();
  }

  toRequestBody(): Record<string, unknown> {
    return {};
  }
}

/**
 * PublishAllXml response message
 */
export class PublishAllXmlResponse extends OrganizationResponse {
  constructor() {
    super("PublishAllXml");
  }

  static fromResponse(_data: unknown): PublishAllXmlResponse {
    return new PublishAllXmlResponse();
  }
}
