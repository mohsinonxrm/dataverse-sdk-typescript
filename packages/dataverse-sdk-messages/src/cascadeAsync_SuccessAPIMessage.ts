import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * cascadeAsync_SuccessAPI request message
 *
 * Web API Action: cascadeAsync_SuccessAPI
 */
export class cascadeAsync_SuccessAPIRequest
  extends OrganizationRequest
  implements Executable<cascadeAsync_SuccessAPIResponse>
{
  constructor(public casadeAsync_JobName: string) {
    super("cascadeAsync_SuccessAPI");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/cascadeAsync_SuccessAPI`;

    const body: Record<string, unknown> = {
      casadeAsync_JobName: this.casadeAsync_JobName,
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

  async parseResponse(response: Response): Promise<cascadeAsync_SuccessAPIResponse> {
    // No return value (204 No Content)
    return new cascadeAsync_SuccessAPIResponse();
  }
}

/**
 * cascadeAsync_SuccessAPI response message
 */
export class cascadeAsync_SuccessAPIResponse extends OrganizationResponse {
  constructor() {
    super("cascadeAsync_SuccessAPI");
  }

  static fromResponse(_data: unknown): cascadeAsync_SuccessAPIResponse {
    return new cascadeAsync_SuccessAPIResponse();
  }
}
