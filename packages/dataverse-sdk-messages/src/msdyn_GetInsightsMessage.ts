import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_GetInsights request message
 *
 * Web API Action: msdyn_GetInsights
 */
export class msdyn_GetInsightsRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetInsightsResponse>
{
  constructor(
    public msdyn_payload: string,
    public msdyn_insighttype: string,
    public msdyn_responseFormat: string
  ) {
    super("msdyn_GetInsights");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetInsights`;

    const body: Record<string, unknown> = {
      msdyn_payload: this.msdyn_payload,
      msdyn_insighttype: this.msdyn_insighttype,
      msdyn_responseFormat: this.msdyn_responseFormat,
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

  async parseResponse(response: Response): Promise<msdyn_GetInsightsResponse> {
    const data = await response.json();
    return msdyn_GetInsightsResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      msdyn_payload: this.msdyn_payload,
      msdyn_insighttype: this.msdyn_insighttype,
      msdyn_responseFormat: this.msdyn_responseFormat,
    };
  }
}

/**
 * msdyn_GetInsights response message
 */
export class msdyn_GetInsightsResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetInsightsResponse) {
    super("msdyn_GetInsights");
  }

  static fromResponse(data: unknown): msdyn_GetInsightsResponse {
    return new msdyn_GetInsightsResponse((data as any).value);
  }
}
