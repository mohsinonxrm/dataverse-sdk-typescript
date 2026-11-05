import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./EntityReference.js";

/**
 * OnExternalDeleted request message
 *
 * Web API Action: OnExternalDeleted
 */
export class OnExternalDeletedRequest
  extends OrganizationRequest
  implements Executable<OnExternalDeletedResponse>
{
  constructor(public target: EntityReference) {
    super("OnExternalDeleted");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/OnExternalDeleted`;

    const body: Record<string, unknown> = {
      Target: this.target,
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

  async parseResponse(response: Response): Promise<OnExternalDeletedResponse> {
    // No return value (204 No Content)
    return new OnExternalDeletedResponse();
  }

  toRequestBody(): Record<string, unknown> {
    return {
      Target: this.target,
    };
  }
}

/**
 * OnExternalDeleted response message
 */
export class OnExternalDeletedResponse extends OrganizationResponse {
  constructor() {
    super("OnExternalDeleted");
  }

  static fromResponse(_data: unknown): OnExternalDeletedResponse {
    return new OnExternalDeletedResponse();
  }
}
