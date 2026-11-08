import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { formatParameterAlias } from "./internal/odataLiteral.js";
import type { resourcegroup } from "./types/index.js";

/**
 * Parameters of the RetrieveParentGroupsResourceGroup message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface RetrieveParentGroupsResourceGroupRequestParameters {
  ResourceGroupId: string;
}

/**
 * RetrieveParentGroupsResourceGroup request message
 *
 * Web API Function: RetrieveParentGroupsResourceGroup
 */
export class RetrieveParentGroupsResourceGroupRequest
  extends OrganizationRequest
  implements Executable<RetrieveParentGroupsResourceGroupResponse>
{
  declare readonly Parameters: Readonly<RetrieveParentGroupsResourceGroupRequestParameters>;

  constructor(parameters: RetrieveParentGroupsResourceGroupRequestParameters) {
    super("RetrieveParentGroupsResourceGroup", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/RetrieveParentGroupsResourceGroup`;

    // Build query parameters using parameter aliases
    const params = new URLSearchParams();
    const aliases: string[] = [];
    if (this.Parameters.ResourceGroupId !== undefined) {
      aliases.push(`ResourceGroupId=@p1`);
      params.append("@p1", formatParameterAlias(this.Parameters.ResourceGroupId, "Edm.Guid"));
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

  async parseResponse(response: Response): Promise<RetrieveParentGroupsResourceGroupResponse> {
    // An output that wasn't set answers 204 No Content: an empty collection
    if (response.status === 204)
      return RetrieveParentGroupsResourceGroupResponse.fromResponse(undefined);
    // A collection comes wrapped: { "@odata.context": "…", "value": [ … ] }
    return RetrieveParentGroupsResourceGroupResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the RetrieveParentGroupsResourceGroup function.
 *
 * The collection, read from the `value` of the response body.
 * Each record keeps its annotations. A 204 (an output that wasn't set) is `[]`.
 */
export type RetrieveParentGroupsResourceGroupResult = Array<
  resourcegroup & { "@odata.etag"?: string; "@odata.type"?: string }
>;

/**
 * RetrieveParentGroupsResourceGroup response message
 *
 * `result` is the value the RetrieveParentGroupsResourceGroup function returns (see {@link RetrieveParentGroupsResourceGroupResult}).
 */
export class RetrieveParentGroupsResourceGroupResponse extends OrganizationResponse {
  constructor(public result: RetrieveParentGroupsResourceGroupResult) {
    super("RetrieveParentGroupsResourceGroup");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): RetrieveParentGroupsResourceGroupResponse {
    return new RetrieveParentGroupsResourceGroupResponse(
      data === undefined ? [] : (data as { value: RetrieveParentGroupsResourceGroupResult }).value
    );
  }
}
