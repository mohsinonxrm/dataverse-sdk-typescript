import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_SaveSalesCopilotEmailInsights request message
 *
 * Web API Action: msdyn_SaveSalesCopilotEmailInsights
 */
export class msdyn_SaveSalesCopilotEmailInsightsRequest
  extends OrganizationRequest
  implements Executable<msdyn_SaveSalesCopilotEmailInsightsResponse>
{
  constructor(
    public msdyn_extractedquestions: Record<string, unknown>[],
    public msdyn_activityid: string,
    public msdyn_salescopilotemailinsights: Record<string, unknown>[]
  ) {
    super("msdyn_SaveSalesCopilotEmailInsights");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SaveSalesCopilotEmailInsights`;

    const body: Record<string, unknown> = {
      msdyn_extractedquestions: this.msdyn_extractedquestions,
      msdyn_activityid: this.msdyn_activityid,
      msdyn_salescopilotemailinsights: this.msdyn_salescopilotemailinsights,
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

  async parseResponse(response: Response): Promise<msdyn_SaveSalesCopilotEmailInsightsResponse> {
    // No return value (204 No Content)
    return new msdyn_SaveSalesCopilotEmailInsightsResponse();
  }
}

/**
 * msdyn_SaveSalesCopilotEmailInsights response message
 */
export class msdyn_SaveSalesCopilotEmailInsightsResponse extends OrganizationResponse {
  constructor() {
    super("msdyn_SaveSalesCopilotEmailInsights");
  }

  static fromResponse(_data: unknown): msdyn_SaveSalesCopilotEmailInsightsResponse {
    return new msdyn_SaveSalesCopilotEmailInsightsResponse();
  }
}
