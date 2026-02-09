import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * GetTrackingTokenEmail request message
 *
 * Web API Action: GetTrackingTokenEmail
 */
export class GetTrackingTokenEmailRequest
  extends OrganizationRequest
  implements Executable<GetTrackingTokenEmailResponse>
{
  constructor(public subject: string) {
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
        "Content-Type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<GetTrackingTokenEmailResponse> {
    const data = await response.json();
    return GetTrackingTokenEmailResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      Subject: this.subject,
    };
  }
}

/**
 * GetTrackingTokenEmail response message
 */
export class GetTrackingTokenEmailResponse extends OrganizationResponse {
  constructor(public result: GetTrackingTokenEmailResponse) {
    super("GetTrackingTokenEmail");
  }

  static fromResponse(data: unknown): GetTrackingTokenEmailResponse {
    return new GetTrackingTokenEmailResponse((data as any).value);
  }
}
