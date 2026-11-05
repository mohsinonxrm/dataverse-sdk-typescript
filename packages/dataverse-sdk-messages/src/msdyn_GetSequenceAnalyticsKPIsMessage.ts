import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_GetSequenceAnalyticsKPIs request message
 *
 * Web API Action: msdyn_GetSequenceAnalyticsKPIs
 */
export class msdyn_GetSequenceAnalyticsKPIsRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetSequenceAnalyticsKPIsResponse>
{
  constructor(
    public sequenceId: string,
    public sequenceStepId: string,
    public startDate: string,
    public endDate: string,
    public configuration: number
  ) {
    super("msdyn_GetSequenceAnalyticsKPIs");
  }

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
    return msdyn_GetSequenceAnalyticsKPIsResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      SequenceId: this.sequenceId,
      SequenceStepId: this.sequenceStepId,
      StartDate: this.startDate,
      EndDate: this.endDate,
      Configuration: this.configuration,
    };
  }
}

/**
 * msdyn_GetSequenceAnalyticsKPIs response message
 */
export class msdyn_GetSequenceAnalyticsKPIsResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetSequenceAnalyticsKPIsResponse) {
    super("msdyn_GetSequenceAnalyticsKPIs");
  }

  static fromResponse(data: unknown): msdyn_GetSequenceAnalyticsKPIsResponse {
    return new msdyn_GetSequenceAnalyticsKPIsResponse((data as any).value);
  }
}
