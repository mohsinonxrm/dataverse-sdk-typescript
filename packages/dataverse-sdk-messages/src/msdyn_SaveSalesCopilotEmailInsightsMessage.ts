import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_SaveSalesCopilotEmailInsights message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_SaveSalesCopilotEmailInsightsRequestParameters {
  msdyn_extractedquestions?: Record<string, unknown>[];
  msdyn_activityid?: string;
  msdyn_salescopilotemailinsights: Record<string, unknown>[];
}

/**
 * msdyn_SaveSalesCopilotEmailInsights request message
 *
 * Web API Action: msdyn_SaveSalesCopilotEmailInsights
 */
export class msdyn_SaveSalesCopilotEmailInsightsRequest
  extends OrganizationRequest
  implements Executable<msdyn_SaveSalesCopilotEmailInsightsResponse>
{
  declare readonly Parameters: Readonly<msdyn_SaveSalesCopilotEmailInsightsRequestParameters>;

  constructor(parameters: msdyn_SaveSalesCopilotEmailInsightsRequestParameters) {
    super("msdyn_SaveSalesCopilotEmailInsights", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SaveSalesCopilotEmailInsights`;

    const body = requestBody({
      msdyn_extractedquestions: this.Parameters.msdyn_extractedquestions,
      msdyn_activityid: this.Parameters.msdyn_activityid,
      msdyn_salescopilotemailinsights: this.Parameters.msdyn_salescopilotemailinsights,
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
