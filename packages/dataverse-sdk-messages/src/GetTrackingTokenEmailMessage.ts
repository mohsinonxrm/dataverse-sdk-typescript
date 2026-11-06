import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { GetTrackingTokenEmailResponse as GetTrackingTokenEmailResponseData } from "./types/index.js";

/**
 * GetTrackingTokenEmail request message
 *
 * Web API Action: GetTrackingTokenEmail
 */
export class GetTrackingTokenEmailRequest
  extends OrganizationRequest
  implements Executable<GetTrackingTokenEmailResponse>
{
  constructor(public subject?: string) {
    super("GetTrackingTokenEmail");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/GetTrackingTokenEmail`;

    const body: Record<string, unknown> = {
      Subject: this.subject,
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

  async parseResponse(response: Response): Promise<GetTrackingTokenEmailResponse> {
    const data = await response.json();
    return GetTrackingTokenEmailResponse.fromResponse(data);
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
