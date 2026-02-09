import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./EntityReference.js";

/**
 * OnExternalUpdated request message
 *
 * Web API Action: OnExternalUpdated
 */
export class OnExternalUpdatedRequest
  extends OrganizationRequest
  implements Executable<OnExternalUpdatedResponse>
{
  constructor(
    public target: EntityReference,
    public preImage: EntityReference,
    public changedFields: string[]
  ) {
    super("OnExternalUpdated");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/OnExternalUpdated`;

    const body: Record<string, unknown> = {
      Target: this.target,
      PreImage: this.preImage,
      ChangedFields: this.changedFields,
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

  async parseResponse(response: Response): Promise<OnExternalUpdatedResponse> {
    // No return value (204 No Content)
    return new OnExternalUpdatedResponse();
  }

  toRequestBody(): Record<string, unknown> {
    return {
      Target: this.target,
      PreImage: this.preImage,
      ChangedFields: this.changedFields,
    };
  }
}

/**
 * OnExternalUpdated response message
 */
export class OnExternalUpdatedResponse extends OrganizationResponse {
  constructor() {
    super("OnExternalUpdated");
  }

  static fromResponse(_data: unknown): OnExternalUpdatedResponse {
    return new OnExternalUpdatedResponse();
  }
}
