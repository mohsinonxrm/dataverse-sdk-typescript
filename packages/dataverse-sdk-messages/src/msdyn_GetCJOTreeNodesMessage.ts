import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_GetCJOTreeNodes message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetCJOTreeNodesRequestParameters {
  msdyn_cjodefinition: string;
  msdyn_startingnodeid: string;
}

/**
 * msdyn_GetCJOTreeNodes request message
 *
 * Web API Action: msdyn_GetCJOTreeNodes
 */
export class msdyn_GetCJOTreeNodesRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetCJOTreeNodesResponse>
{
  declare readonly Parameters: Readonly<msdyn_GetCJOTreeNodesRequestParameters>;

  constructor(parameters: msdyn_GetCJOTreeNodesRequestParameters) {
    super("msdyn_GetCJOTreeNodes", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetCJOTreeNodes`;

    const body = requestBody({
      msdyn_cjodefinition: this.Parameters.msdyn_cjodefinition,
      msdyn_startingnodeid: this.Parameters.msdyn_startingnodeid,
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

  async parseResponse(response: Response): Promise<msdyn_GetCJOTreeNodesResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_GetCJOTreeNodesResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_GetCJOTreeNodes action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_GetCJOTreeNodesResult {
  "@odata.context"?: string;
  msdyn_nodes: string;
}

/**
 * msdyn_GetCJOTreeNodes response message
 *
 * `result` is the value the msdyn_GetCJOTreeNodes action returns (see {@link msdyn_GetCJOTreeNodesResult}).
 */
export class msdyn_GetCJOTreeNodesResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetCJOTreeNodesResult) {
    super("msdyn_GetCJOTreeNodes");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_GetCJOTreeNodesResponse {
    return new msdyn_GetCJOTreeNodesResponse(data as msdyn_GetCJOTreeNodesResult);
  }
}
