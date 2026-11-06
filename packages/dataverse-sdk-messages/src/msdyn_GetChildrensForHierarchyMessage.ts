import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_GetChildrensForHierarchyResponse as msdyn_GetChildrensForHierarchyResponseData } from "./types/index.js";

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
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return msdyn_GetChildrensForHierarchyResponse.fromResponse(text ? JSON.parse(text) : {});
  }
}

/**
 * msdyn_GetChildrensForHierarchy response message
 */
export class msdyn_GetChildrensForHierarchyResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetChildrensForHierarchyResponseData) {
    super("msdyn_GetChildrensForHierarchy");
  }

  static fromResponse(data: unknown): msdyn_GetChildrensForHierarchyResponse {
    return new msdyn_GetChildrensForHierarchyResponse(
      responseObject<msdyn_GetChildrensForHierarchyResponseData>(data)
    );
  }
}
