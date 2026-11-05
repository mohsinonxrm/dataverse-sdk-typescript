import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * PublishXml request message
 *
 * Web API Action: PublishXml
 */
export class PublishXmlRequest
  extends OrganizationRequest
  implements Executable<PublishXmlResponse>
{
  constructor(public parameterXml: string) {
    super("PublishXml");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/PublishXml`;

    const body: Record<string, unknown> = {
      ParameterXml: this.parameterXml,
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

  async parseResponse(response: Response): Promise<PublishXmlResponse> {
    // No return value (204 No Content)
    return new PublishXmlResponse();
  }

  toRequestBody(): Record<string, unknown> {
    return {
      ParameterXml: this.parameterXml,
    };
  }
}

/**
 * PublishXml response message
 */
export class PublishXmlResponse extends OrganizationResponse {
  constructor() {
    super("PublishXml");
  }

  static fromResponse(_data: unknown): PublishXmlResponse {
    return new PublishXmlResponse();
  }
}
