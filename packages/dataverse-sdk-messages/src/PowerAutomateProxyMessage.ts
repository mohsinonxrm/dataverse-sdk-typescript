import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * PowerAutomateProxy request message
 *
 * Web API Action: PowerAutomateProxy
 */
export class PowerAutomateProxyRequest
  extends OrganizationRequest
  implements Executable<PowerAutomateProxyResponse>
{
  constructor(
    public httpMethod: string,
    public relativeUrl: string,
    public requestHeaders: string,
    public requestBody: string
  ) {
    super("PowerAutomateProxy");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/PowerAutomateProxy`;

    const body: Record<string, unknown> = {
      HttpMethod: this.httpMethod,
      RelativeUrl: this.relativeUrl,
      RequestHeaders: this.requestHeaders,
      RequestBody: this.requestBody,
    };

    return {
      method: "POST",
      url,
      headers: {
        "Content-Type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<PowerAutomateProxyResponse> {
    const data = await response.json();
    return PowerAutomateProxyResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      HttpMethod: this.httpMethod,
      RelativeUrl: this.relativeUrl,
      RequestHeaders: this.requestHeaders,
      RequestBody: this.requestBody,
    };
  }
}

/**
 * PowerAutomateProxy response message
 */
export class PowerAutomateProxyResponse extends OrganizationResponse {
  constructor(public result: PowerAutomateProxyResponse) {
    super("PowerAutomateProxy");
  }

  static fromResponse(data: unknown): PowerAutomateProxyResponse {
    return new PowerAutomateProxyResponse((data as any).value);
  }
}
