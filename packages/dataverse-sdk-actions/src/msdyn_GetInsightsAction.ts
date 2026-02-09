import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_GetInsights action
 */
export interface msdyn_GetInsightsResponse {
  msdyn_insight: string;
  msdyn_status: number;
}

/**
 * msdyn_GetInsights action
 *
 * Unbound action
 */
export class msdyn_GetInsightsAction implements Executable<msdyn_GetInsightsResponse> {
  constructor(
    public readonly msdyn_payload: string,
    public readonly msdyn_insighttype: string,
    public readonly msdyn_responseFormat: string
  ) {}

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
        "Content-Type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<msdyn_GetInsightsResponse> {
    const data = await response.json();
    return data as msdyn_GetInsightsResponse;
  }
}
