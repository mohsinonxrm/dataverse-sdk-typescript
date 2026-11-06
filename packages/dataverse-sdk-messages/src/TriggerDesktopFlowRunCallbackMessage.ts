import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { TriggerDesktopFlowRunCallbackResponse as TriggerDesktopFlowRunCallbackResponseData } from "./types/index.js";

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
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return TriggerDesktopFlowRunCallbackResponse.fromResponse(text ? JSON.parse(text) : {});
  }
}

/**
 * TriggerDesktopFlowRunCallback response message
 */
export class TriggerDesktopFlowRunCallbackResponse extends OrganizationResponse {
  constructor(public result: TriggerDesktopFlowRunCallbackResponseData) {
    super("TriggerDesktopFlowRunCallback");
  }

  static fromResponse(data: unknown): TriggerDesktopFlowRunCallbackResponse {
    return new TriggerDesktopFlowRunCallbackResponse(
      responseObject<TriggerDesktopFlowRunCallbackResponseData>(data)
    );
  }
}
