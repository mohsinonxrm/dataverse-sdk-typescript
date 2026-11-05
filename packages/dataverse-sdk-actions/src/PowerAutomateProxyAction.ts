import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from PowerAutomateProxy action
 */
export interface PowerAutomateProxyResponse {
  HttpStatusCode: number;
  ResponseHeaders: string;
  ResponseBody: string;
}

/**
 * PowerAutomateProxy action
 *
 * Unbound action
 */
export class PowerAutomateProxyAction implements Executable<PowerAutomateProxyResponse> {
  constructor(
    public readonly httpMethod: string,
    public readonly relativeUrl: string,
    public readonly requestHeaders: string,
    public readonly requestBody: string
  ) {}

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
        "content-type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<PowerAutomateProxyResponse> {
    const data = await response.json();
    return data as PowerAutomateProxyResponse;
  }
}
