import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import {
  odataLiteral,
  type Executable,
  type RequestInformation,
} from "@mohsinonxrm/dataverse-sdk-core";

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
    const url = `${baseUrl}/workflows(${odataLiteral.guid(this.workflowId)})/Microsoft.Dynamics.CRM.ListChildDesktopFlows`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<ListChildDesktopFlowsResponse> {
    // The body is the complex value, with its @odata.context
    return ListChildDesktopFlowsResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the ListChildDesktopFlows action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface ListChildDesktopFlowsResult {
  "@odata.context"?: string;
  childFlows: string;
}

/**
 * ListChildDesktopFlows response message
 *
 * `result` is the value the ListChildDesktopFlows action returns (see {@link ListChildDesktopFlowsResult}).
 */
export class ListChildDesktopFlowsResponse extends OrganizationResponse {
  constructor(public result: ListChildDesktopFlowsResult) {
    super("ListChildDesktopFlows");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): ListChildDesktopFlowsResponse {
    return new ListChildDesktopFlowsResponse(data as ListChildDesktopFlowsResult);
  }
}
