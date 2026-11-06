import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_GetChildrensForHierarchy message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetChildrensForHierarchyRequestParameters {
  msdyn_AgentGroupRequest: string;
}

/**
 * msdyn_GetChildrensForHierarchy request message
 *
 * Web API Action: msdyn_GetChildrensForHierarchy
 */
export class msdyn_GetChildrensForHierarchyRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetChildrensForHierarchyResponse>
{
  declare readonly Parameters: Readonly<msdyn_GetChildrensForHierarchyRequestParameters>;

  constructor(parameters: msdyn_GetChildrensForHierarchyRequestParameters) {
    super("msdyn_GetChildrensForHierarchy", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetChildrensForHierarchy`;

    const body = requestBody({
      msdyn_AgentGroupRequest: this.Parameters.msdyn_AgentGroupRequest,
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

  async parseResponse(response: Response): Promise<msdyn_GetChildrensForHierarchyResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_GetChildrensForHierarchyResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_GetChildrensForHierarchy action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_GetChildrensForHierarchyResult {
  "@odata.context"?: string;
  msdyn_AgentGroupToHierarchy: string;
}

/**
 * msdyn_GetChildrensForHierarchy response message
 *
 * `result` is the value the msdyn_GetChildrensForHierarchy action returns (see {@link msdyn_GetChildrensForHierarchyResult}).
 */
export class msdyn_GetChildrensForHierarchyResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetChildrensForHierarchyResult) {
    super("msdyn_GetChildrensForHierarchy");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_GetChildrensForHierarchyResponse {
    return new msdyn_GetChildrensForHierarchyResponse(data as msdyn_GetChildrensForHierarchyResult);
  }
}
