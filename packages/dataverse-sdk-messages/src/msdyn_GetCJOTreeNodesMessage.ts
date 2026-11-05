import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_GetCJOTreeNodesResponse as msdyn_GetCJOTreeNodesResponseData } from "./types/index.js";

/**
 * msdyn_GetCJOTreeNodes request message
 *
 * Web API Action: msdyn_GetCJOTreeNodes
 */
export class msdyn_GetCJOTreeNodesRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetCJOTreeNodesResponse>
{
  constructor(
    public msdyn_startingnodeid: string,
    public msdyn_cjodefinition: string
  ) {
    super("msdyn_GetCJOTreeNodes");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetCJOTreeNodes`;

    const body: Record<string, unknown> = {
      msdyn_startingnodeid: this.msdyn_startingnodeid,
      msdyn_cjodefinition: this.msdyn_cjodefinition,
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

  async parseResponse(response: Response): Promise<msdyn_GetCJOTreeNodesResponse> {
    const data = await response.json();
    return msdyn_GetCJOTreeNodesResponse.fromResponse(data);
  }
}

/**
 * msdyn_GetCJOTreeNodes response message
 */
export class msdyn_GetCJOTreeNodesResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetCJOTreeNodesResponseData) {
    super("msdyn_GetCJOTreeNodes");
  }

  static fromResponse(data: unknown): msdyn_GetCJOTreeNodesResponse {
    return new msdyn_GetCJOTreeNodesResponse(
      responseObject<msdyn_GetCJOTreeNodesResponseData>(data)
    );
  }
}
