import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_GetResourceGroupMemberships request message
 *
 * Web API Action: msdyn_GetResourceGroupMemberships
 */
export class msdyn_GetResourceGroupMembershipsRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetResourceGroupMembershipsResponse>
{
  constructor(
    public start: string,
    public end: string,
    public resourceIds: string
  ) {
    super("msdyn_GetResourceGroupMemberships");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetResourceGroupMemberships`;

    const body: Record<string, unknown> = {
      Start: this.start,
      End: this.end,
      ResourceIds: this.resourceIds,
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

  async parseResponse(response: Response): Promise<msdyn_GetResourceGroupMembershipsResponse> {
    const data = await response.json();
    return msdyn_GetResourceGroupMembershipsResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      Start: this.start,
      End: this.end,
      ResourceIds: this.resourceIds,
    };
  }
}

/**
 * msdyn_GetResourceGroupMemberships response message
 */
export class msdyn_GetResourceGroupMembershipsResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetResourceGroupMembershipsResponse) {
    super("msdyn_GetResourceGroupMemberships");
  }

  static fromResponse(data: unknown): msdyn_GetResourceGroupMembershipsResponse {
    return new msdyn_GetResourceGroupMembershipsResponse((data as any).value);
  }
}
