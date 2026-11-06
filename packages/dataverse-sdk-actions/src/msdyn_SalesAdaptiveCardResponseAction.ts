import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_SalesAdaptiveCardResponse action
 */
export interface msdyn_SalesAdaptiveCardResponseResponse {
  msdyn_additionalDetails: string;
  msdyn_summary: string;
  msdyn_version: string;
  msdyn_summary_raw: string;
}

/**
 * msdyn_SalesAdaptiveCardResponse action
 *
 * Unbound action
 */
export class msdyn_SalesAdaptiveCardResponseAction implements Executable<msdyn_SalesAdaptiveCardResponseResponse> {
  constructor(
    public readonly msdyn_query: string | undefined,
    public readonly msdyn_id: string | undefined,
    public readonly msdyn_scenario: number
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SalesAdaptiveCardResponse`;

    const body: Record<string, unknown> = {
      msdyn_query: this.msdyn_query,
      msdyn_id: this.msdyn_id,
      msdyn_scenario: this.msdyn_scenario,
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

  async parseResponse(response: Response): Promise<msdyn_SalesAdaptiveCardResponseResponse> {
    const data = await response.json();
    return data as msdyn_SalesAdaptiveCardResponseResponse;
  }
}
