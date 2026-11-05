import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * _ResourcesRemoveUpdateAction request message
 *
 * Web API Action: _ResourcesRemoveUpdateAction
 */
export class _ResourcesRemoveUpdateActionRequest
  extends OrganizationRequest
  implements Executable<_ResourcesRemoveUpdateActionResponse>
{
  constructor(
    public resourcesToBeRemoved: string,
    public resourceGroupId: string
  ) {
    super("_ResourcesRemoveUpdateAction");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/_ResourcesRemoveUpdateAction`;

    const body: Record<string, unknown> = {
      ResourcesToBeRemoved: this.resourcesToBeRemoved,
      ResourceGroupId: this.resourceGroupId,
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

  async parseResponse(response: Response): Promise<_ResourcesRemoveUpdateActionResponse> {
    // No return value (204 No Content)
    return new _ResourcesRemoveUpdateActionResponse();
  }

  toRequestBody(): Record<string, unknown> {
    return {
      ResourcesToBeRemoved: this.resourcesToBeRemoved,
      ResourceGroupId: this.resourceGroupId,
    };
  }
}

/**
 * _ResourcesRemoveUpdateAction response message
 */
export class _ResourcesRemoveUpdateActionResponse extends OrganizationResponse {
  constructor() {
    super("_ResourcesRemoveUpdateAction");
  }

  static fromResponse(_data: unknown): _ResourcesRemoveUpdateActionResponse {
    return new _ResourcesRemoveUpdateActionResponse();
  }
}
