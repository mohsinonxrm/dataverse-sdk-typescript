import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_GetChildrensForHierarchy request message
 *
 * Web API Action: msdyn_GetChildrensForHierarchy
 */
export class msdyn_GetChildrensForHierarchyRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetChildrensForHierarchyResponse>
{
  constructor(public msdyn_AgentGroupRequest: string) {
    super("msdyn_GetChildrensForHierarchy");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetChildrensForHierarchy`;

    const body: Record<string, unknown> = {
      msdyn_AgentGroupRequest: this.msdyn_AgentGroupRequest,
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

  async parseResponse(response: Response): Promise<msdyn_GetChildrensForHierarchyResponse> {
    const data = await response.json();
    return msdyn_GetChildrensForHierarchyResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      msdyn_AgentGroupRequest: this.msdyn_AgentGroupRequest,
    };
  }
}

/**
 * msdyn_GetChildrensForHierarchy response message
 */
export class msdyn_GetChildrensForHierarchyResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetChildrensForHierarchyResponse) {
    super("msdyn_GetChildrensForHierarchy");
  }

  static fromResponse(data: unknown): msdyn_GetChildrensForHierarchyResponse {
    return new msdyn_GetChildrensForHierarchyResponse((data as any).value);
  }
}
