import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import {
  odataLiteral,
  type Executable,
  type RequestInformation,
} from "@mohsinonxrm/dataverse-sdk-core";
import { formatParameterAlias } from "./internal/odataLiteral.js";
import type { resourcegroup } from "./types/index.js";

/**
 * Parameters of the FindParentResourceGroup message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface FindParentResourceGroupRequestParameters {
  Children: resourcegroup[];
}

/**
 * FindParentResourceGroup request message
 *
 * Web API Function: FindParentResourceGroup
 *
 * The first argument is the id of the resourcegroup record to call it on.
 */
export class FindParentResourceGroupRequest
  extends OrganizationRequest
  implements Executable<FindParentResourceGroupResponse>
{
  declare readonly Parameters: Readonly<FindParentResourceGroupRequestParameters>;

  constructor(
    public resourcegroupId: string,
    parameters: FindParentResourceGroupRequestParameters
  ) {
    super("FindParentResourceGroup", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound function
    let url = `${baseUrl}/resourcegroups(${odataLiteral.guid(this.resourcegroupId)})/Microsoft.Dynamics.CRM.FindParentResourceGroup`;

    // Build query parameters using parameter aliases
    const params = new URLSearchParams();
    const aliases: string[] = [];
    if (this.Parameters.Children !== undefined) {
      aliases.push(`Children=@p1`);
      params.append(
        "@p1",
        formatParameterAlias(
          this.Parameters.Children,
          "Collection(mscrm.resourcegroup)",
          "Collection"
        )
      );
    }
    if (aliases.length > 0) {
      url += `(${aliases.join(",")})?${params.toString()}`;
    }

    return {
      method: "GET",
      url,
      headers: {
        Accept: "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<FindParentResourceGroupResponse> {
    // The body is the complex value, with its @odata.context
    return FindParentResourceGroupResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the FindParentResourceGroup function.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface FindParentResourceGroupResult {
  "@odata.context"?: string;
  result: boolean;
}

/**
 * FindParentResourceGroup response message
 *
 * `result` is the value the FindParentResourceGroup function returns (see {@link FindParentResourceGroupResult}).
 */
export class FindParentResourceGroupResponse extends OrganizationResponse {
  constructor(public result: FindParentResourceGroupResult) {
    super("FindParentResourceGroup");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): FindParentResourceGroupResponse {
    return new FindParentResourceGroupResponse(data as FindParentResourceGroupResult);
  }
}
