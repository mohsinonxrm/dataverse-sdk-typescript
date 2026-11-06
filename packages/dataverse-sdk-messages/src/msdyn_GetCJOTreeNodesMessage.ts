import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_GetCJOTreeNodesResponse as msdyn_GetCJOTreeNodesResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_GetCJOTreeNodes message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetCJOTreeNodesRequestParameters {
  msdyn_startingnodeid: string;
  msdyn_cjodefinition: string;
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
      msdyn_startingnodeid: this.Parameters.msdyn_startingnodeid,
      msdyn_cjodefinition: this.Parameters.msdyn_cjodefinition,
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
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return msdyn_GetCJOTreeNodesResponse.fromResponse(text ? JSON.parse(text) : {});
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
