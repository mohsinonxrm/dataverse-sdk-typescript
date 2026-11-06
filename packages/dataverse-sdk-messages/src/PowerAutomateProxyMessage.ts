import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { PowerAutomateProxyResponse as PowerAutomateProxyResponseData } from "./types/index.js";

/**
 * Parameters of the PowerAutomateProxy message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface PowerAutomateProxyRequestParameters {
  HttpMethod: string;
  RelativeUrl: string;
  RequestHeaders?: string;
  RequestBody?: string;
}

/**
 * PowerAutomateProxy request message
 *
 * Web API Action: PowerAutomateProxy
 */
export class PowerAutomateProxyRequest
  extends OrganizationRequest
  implements Executable<PowerAutomateProxyResponse>
{
  declare readonly Parameters: Readonly<PowerAutomateProxyRequestParameters>;

  constructor(parameters: PowerAutomateProxyRequestParameters) {
    super("PowerAutomateProxy", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/PowerAutomateProxy`;

    const body = requestBody({
      HttpMethod: this.Parameters.HttpMethod,
      RelativeUrl: this.Parameters.RelativeUrl,
      RequestHeaders: this.Parameters.RequestHeaders,
      RequestBody: this.Parameters.RequestBody,
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

  async parseResponse(response: Response): Promise<PowerAutomateProxyResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return PowerAutomateProxyResponse.fromResponse({});
    return PowerAutomateProxyResponse.fromResponse(await response.json());
  }
}

/**
 * PowerAutomateProxy response message
 */
export class PowerAutomateProxyResponse extends OrganizationResponse {
  constructor(public result: PowerAutomateProxyResponseData) {
    super("PowerAutomateProxy");
  }

  static fromResponse(data: unknown): PowerAutomateProxyResponse {
    return new PowerAutomateProxyResponse(responseObject<PowerAutomateProxyResponseData>(data));
  }
}
