import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the PublishXml message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface PublishXmlRequestParameters {
  ParameterXml: string;
}

/**
 * PublishXml request message
 *
 * Web API Action: PublishXml
 */
export class PublishXmlRequest
  extends OrganizationRequest
  implements Executable<PublishXmlResponse>
{
  declare readonly Parameters: Readonly<PublishXmlRequestParameters>;

  constructor(parameters: PublishXmlRequestParameters) {
    super("PublishXml", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/PublishXml`;

    const body = requestBody({
      ParameterXml: this.Parameters.ParameterXml,
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

  async parseResponse(response: Response): Promise<PublishXmlResponse> {
    // No return value (204 No Content)
    return new PublishXmlResponse();
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
