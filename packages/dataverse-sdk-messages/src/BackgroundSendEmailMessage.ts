import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type {
  BackgroundSendEmailResponse as BackgroundSendEmailResponseData,
  TypedQueryBase,
} from "./types/index.js";

/**
 * BackgroundSendEmail request message
 *
 * Web API Action: BackgroundSendEmail
 */
export class BackgroundSendEmailRequest
  extends OrganizationRequest
  implements Executable<BackgroundSendEmailResponse>
{
  constructor(public query?: TypedQueryBase) {
    super("BackgroundSendEmail");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/BackgroundSendEmail`;

    const body: Record<string, unknown> = {
      Query: this.query,
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

  async parseResponse(response: Response): Promise<BackgroundSendEmailResponse> {
    const data = await response.json();
    return BackgroundSendEmailResponse.fromResponse(data);
  }
}

/**
 * BackgroundSendEmail response message
 */
export class BackgroundSendEmailResponse extends OrganizationResponse {
  constructor(public result: BackgroundSendEmailResponseData) {
    super("BackgroundSendEmail");
  }

  static fromResponse(data: unknown): BackgroundSendEmailResponse {
    return new BackgroundSendEmailResponse(responseObject<BackgroundSendEmailResponseData>(data));
  }
}
