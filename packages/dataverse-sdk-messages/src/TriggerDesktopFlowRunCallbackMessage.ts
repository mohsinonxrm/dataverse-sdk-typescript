import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * TriggerDesktopFlowRunCallback request message
 *
 * Web API Action: TriggerDesktopFlowRunCallback
 *
 * The first argument is the id of the flowsession record to call it on.
 */
export class TriggerDesktopFlowRunCallbackRequest
  extends OrganizationRequest
  implements Executable<TriggerDesktopFlowRunCallbackResponse>
{
  constructor(public flowsessionId: string) {
    super("TriggerDesktopFlowRunCallback");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/flowsessions(${this.flowsessionId})/Microsoft.Dynamics.CRM.TriggerDesktopFlowRunCallback`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<TriggerDesktopFlowRunCallbackResponse> {
    // The body is the complex value, with its @odata.context
    return TriggerDesktopFlowRunCallbackResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the TriggerDesktopFlowRunCallback action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface TriggerDesktopFlowRunCallbackResult {
  "@odata.context"?: string;
  callbackHttpResponseCode: number;
}

/**
 * TriggerDesktopFlowRunCallback response message
 *
 * `result` is the value the TriggerDesktopFlowRunCallback action returns (see {@link TriggerDesktopFlowRunCallbackResult}).
 */
export class TriggerDesktopFlowRunCallbackResponse extends OrganizationResponse {
  constructor(public result: TriggerDesktopFlowRunCallbackResult) {
    super("TriggerDesktopFlowRunCallback");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): TriggerDesktopFlowRunCallbackResponse {
    return new TriggerDesktopFlowRunCallbackResponse(data as TriggerDesktopFlowRunCallbackResult);
  }
}
