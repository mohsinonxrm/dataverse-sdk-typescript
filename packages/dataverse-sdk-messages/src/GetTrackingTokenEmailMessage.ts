import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the GetTrackingTokenEmail message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface GetTrackingTokenEmailRequestParameters {
  Subject?: string;
}

/**
 * GetTrackingTokenEmail request message
 *
 * Web API Action: GetTrackingTokenEmail
 */
export class GetTrackingTokenEmailRequest
  extends OrganizationRequest
  implements Executable<GetTrackingTokenEmailResponse>
{
  declare readonly Parameters: Readonly<GetTrackingTokenEmailRequestParameters>;

  constructor(parameters: GetTrackingTokenEmailRequestParameters = {}) {
    super("GetTrackingTokenEmail", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/GetTrackingTokenEmail`;

    const body = requestBody({
      Subject: this.Parameters.Subject,
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

  async parseResponse(response: Response): Promise<GetTrackingTokenEmailResponse> {
    // The body is the complex value, with its @odata.context
    return GetTrackingTokenEmailResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the GetTrackingTokenEmail action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface GetTrackingTokenEmailResult {
  "@odata.context"?: string;
  TrackingToken: string;
}

/**
 * GetTrackingTokenEmail response message
 *
 * `result` is the value the GetTrackingTokenEmail action returns (see {@link GetTrackingTokenEmailResult}).
 */
export class GetTrackingTokenEmailResponse extends OrganizationResponse {
  constructor(public result: GetTrackingTokenEmailResult) {
    super("GetTrackingTokenEmail");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): GetTrackingTokenEmailResponse {
    return new GetTrackingTokenEmailResponse(data as GetTrackingTokenEmailResult);
  }
}
