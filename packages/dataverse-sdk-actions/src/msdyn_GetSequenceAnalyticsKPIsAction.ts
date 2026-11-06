import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_GetSequenceAnalyticsKPIs action
 */
export interface msdyn_GetSequenceAnalyticsKPIsResponse {
  SequenceAnalyticsKPIs: string;
}

/**
 * msdyn_GetSequenceAnalyticsKPIs action
 *
 * Unbound action
 */
export class msdyn_GetSequenceAnalyticsKPIsAction implements Executable<msdyn_GetSequenceAnalyticsKPIsResponse> {
  constructor(
    public readonly sequenceId: string,
    public readonly sequenceStepId: string | undefined,
    public readonly startDate: string,
    public readonly endDate: string,
    public readonly configuration: number
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetSequenceAnalyticsKPIs`;

    const body: Record<string, unknown> = {
      SequenceId: this.sequenceId,
      SequenceStepId: this.sequenceStepId,
      StartDate: this.startDate,
      EndDate: this.endDate,
      Configuration: this.configuration,
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

  async parseResponse(response: Response): Promise<msdyn_GetSequenceAnalyticsKPIsResponse> {
    const data = await response.json();
    return data as msdyn_GetSequenceAnalyticsKPIsResponse;
  }
}
