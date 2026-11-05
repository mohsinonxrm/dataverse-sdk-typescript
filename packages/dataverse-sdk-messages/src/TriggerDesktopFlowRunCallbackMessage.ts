import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * TriggerDesktopFlowRunCallback request message
 *
 * Web API Action: TriggerDesktopFlowRunCallback
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
    const data = await response.json();
    return TriggerDesktopFlowRunCallbackResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      entity: this.flowsessionId,
    };
  }
}

/**
 * TriggerDesktopFlowRunCallback response message
 */
export class TriggerDesktopFlowRunCallbackResponse extends OrganizationResponse {
  constructor(public result: TriggerDesktopFlowRunCallbackResponse) {
    super("TriggerDesktopFlowRunCallback");
  }

  static fromResponse(data: unknown): TriggerDesktopFlowRunCallbackResponse {
    return new TriggerDesktopFlowRunCallbackResponse((data as any).value);
  }
}
