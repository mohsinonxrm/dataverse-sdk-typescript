import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./EntityReference.js";

/**
 * OnExternalCreated request message
 *
 * Web API Action: OnExternalCreated
 */
export class OnExternalCreatedRequest
  extends OrganizationRequest
  implements Executable<OnExternalCreatedResponse>
{
  constructor(public target: EntityReference) {
    super("OnExternalCreated");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/OnExternalCreated`;

    const body: Record<string, unknown> = {
      Target: this.target,
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

  async parseResponse(response: Response): Promise<OnExternalCreatedResponse> {
    // No return value (204 No Content)
    return new OnExternalCreatedResponse();
  }

  toRequestBody(): Record<string, unknown> {
    return {
      Target: this.target,
    };
  }
}

/**
 * OnExternalCreated response message
 */
export class OnExternalCreatedResponse extends OrganizationResponse {
  constructor() {
    super("OnExternalCreated");
  }

  static fromResponse(_data: unknown): OnExternalCreatedResponse {
    return new OnExternalCreatedResponse();
  }
}
