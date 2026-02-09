import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * ListChildDesktopFlows request message
 *
 * Web API Action: ListChildDesktopFlows
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
        "Content-Type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<ListChildDesktopFlowsResponse> {
    const data = await response.json();
    return ListChildDesktopFlowsResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      entity: this.workflowId,
    };
  }
}

/**
 * ListChildDesktopFlows response message
 */
export class ListChildDesktopFlowsResponse extends OrganizationResponse {
  constructor(public result: ListChildDesktopFlowsResponse) {
    super("ListChildDesktopFlows");
  }

  static fromResponse(data: unknown): ListChildDesktopFlowsResponse {
    return new ListChildDesktopFlowsResponse((data as any).value);
  }
}
