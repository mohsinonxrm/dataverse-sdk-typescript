import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

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
    // The body is the complex value, with its @odata.context
    return PowerAutomateProxyResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the PowerAutomateProxy action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface PowerAutomateProxyResult {
  "@odata.context"?: string;
  HttpStatusCode: number;
  ResponseBody: string;
  ResponseHeaders: string;
}

/**
 * PowerAutomateProxy response message
 *
 * `result` is the value the PowerAutomateProxy action returns (see {@link PowerAutomateProxyResult}).
 */
export class PowerAutomateProxyResponse extends OrganizationResponse {
  constructor(public result: PowerAutomateProxyResult) {
    super("PowerAutomateProxy");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): PowerAutomateProxyResponse {
    return new PowerAutomateProxyResponse(data as PowerAutomateProxyResult);
  }
}
