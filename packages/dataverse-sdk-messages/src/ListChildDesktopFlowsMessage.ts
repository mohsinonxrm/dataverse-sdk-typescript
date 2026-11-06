import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { ListChildDesktopFlowsResponse as ListChildDesktopFlowsResponseData } from "./types/index.js";

/**
 * ListChildDesktopFlows request message
 *
 * Web API Action: ListChildDesktopFlows
 *
 * The first argument is the id of the workflow record to call it on.
 */
export class ListChildDesktopFlowsRequest
  extends OrganizationRequest
  implements Executable<ListChildDesktopFlowsResponse>
{
  constructor(public workflowId: string) {
    super("ListChildDesktopFlows");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/workflows(${this.workflowId})/Microsoft.Dynamics.CRM.ListChildDesktopFlows`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<ListChildDesktopFlowsResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return ListChildDesktopFlowsResponse.fromResponse({});
    return ListChildDesktopFlowsResponse.fromResponse(await response.json());
  }
}

/**
 * ListChildDesktopFlows response message
 */
export class ListChildDesktopFlowsResponse extends OrganizationResponse {
  constructor(public result: ListChildDesktopFlowsResponseData) {
    super("ListChildDesktopFlows");
  }

  static fromResponse(data: unknown): ListChildDesktopFlowsResponse {
    return new ListChildDesktopFlowsResponse(
      responseObject<ListChildDesktopFlowsResponseData>(data)
    );
  }
}
