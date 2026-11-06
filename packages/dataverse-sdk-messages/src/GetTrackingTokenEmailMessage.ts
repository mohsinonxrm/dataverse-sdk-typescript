import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { GetTrackingTokenEmailResponse as GetTrackingTokenEmailResponseData } from "./types/index.js";

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
    // 204 No Content is an empty result
    if (response.status === 204) return GetTrackingTokenEmailResponse.fromResponse({});
    return GetTrackingTokenEmailResponse.fromResponse(await response.json());
  }
}

/**
 * GetTrackingTokenEmail response message
 */
export class GetTrackingTokenEmailResponse extends OrganizationResponse {
  constructor(public result: GetTrackingTokenEmailResponseData) {
    super("GetTrackingTokenEmail");
  }

  static fromResponse(data: unknown): GetTrackingTokenEmailResponse {
    return new GetTrackingTokenEmailResponse(
      responseObject<GetTrackingTokenEmailResponseData>(data)
    );
  }
}
