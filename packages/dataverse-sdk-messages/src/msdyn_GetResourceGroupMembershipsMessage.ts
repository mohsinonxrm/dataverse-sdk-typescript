import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_GetResourceGroupMemberships message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetResourceGroupMembershipsRequestParameters {
  Start: string;
  End: string;
  ResourceIds: string;
}

/**
 * msdyn_GetResourceGroupMemberships request message
 *
 * Web API Action: msdyn_GetResourceGroupMemberships
 */
export class msdyn_GetResourceGroupMembershipsRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetResourceGroupMembershipsResponse>
{
  declare readonly Parameters: Readonly<msdyn_GetResourceGroupMembershipsRequestParameters>;

  constructor(parameters: msdyn_GetResourceGroupMembershipsRequestParameters) {
    super("msdyn_GetResourceGroupMemberships", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetResourceGroupMemberships`;

    const body = requestBody({
      Start: this.Parameters.Start,
      End: this.Parameters.End,
      ResourceIds: this.Parameters.ResourceIds,
    });

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
    // The body is the complex value, with its @odata.context
    return msdyn_GetResourceGroupMembershipsResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_GetResourceGroupMemberships action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_GetResourceGroupMembershipsResult {
  "@odata.context"?: string;
  GroupMemberships: string;
}

/**
 * msdyn_GetResourceGroupMemberships response message
 *
 * `result` is the value the msdyn_GetResourceGroupMemberships action returns (see {@link msdyn_GetResourceGroupMembershipsResult}).
 */
export class msdyn_GetResourceGroupMembershipsResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetResourceGroupMembershipsResult) {
    super("msdyn_GetResourceGroupMemberships");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_GetResourceGroupMembershipsResponse {
    return new msdyn_GetResourceGroupMembershipsResponse(
      data as msdyn_GetResourceGroupMembershipsResult
    );
  }
}
