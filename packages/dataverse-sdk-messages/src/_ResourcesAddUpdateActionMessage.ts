import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * _ResourcesAddUpdateAction request message
 *
 * Web API Action: _ResourcesAddUpdateAction
 */
export class _ResourcesAddUpdateActionRequest
  extends OrganizationRequest
  implements Executable<_ResourcesAddUpdateActionResponse>
{
  constructor(
    public newlyAddedResources: string,
    public resourceGroupId: string,
    public resourceGroupsToAdd: string
  ) {
    super("_ResourcesAddUpdateAction");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/_ResourcesAddUpdateAction`;

    const body: Record<string, unknown> = {
      NewlyAddedResources: this.newlyAddedResources,
      ResourceGroupId: this.resourceGroupId,
      ResourceGroupsToAdd: this.resourceGroupsToAdd,
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

  async parseResponse(response: Response): Promise<_ResourcesAddUpdateActionResponse> {
    const data = await response.json();
    return _ResourcesAddUpdateActionResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      NewlyAddedResources: this.newlyAddedResources,
      ResourceGroupId: this.resourceGroupId,
      ResourceGroupsToAdd: this.resourceGroupsToAdd,
    };
  }
}

/**
 * _ResourcesAddUpdateAction response message
 */
export class _ResourcesAddUpdateActionResponse extends OrganizationResponse {
  constructor(public result: _ResourcesAddUpdateActionResponse) {
    super("_ResourcesAddUpdateAction");
  }

  static fromResponse(data: unknown): _ResourcesAddUpdateActionResponse {
    return new _ResourcesAddUpdateActionResponse((data as any).value);
  }
}
