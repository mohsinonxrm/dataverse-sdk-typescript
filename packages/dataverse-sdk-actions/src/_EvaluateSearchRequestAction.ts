import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";

/**
 * Response from _EvaluateSearchRequest action
 */
export interface _EvaluateSearchRequestResponse {
  value: EntityReference[];
}

/**
 * _EvaluateSearchRequest action
 *
 * Unbound action
 */
export class _EvaluateSearchRequestAction implements Executable<_EvaluateSearchRequestResponse> {
  constructor(
    public readonly serviceAppointmentId: string,
    public readonly serviceId: string,
    public readonly dateOptionSet: number,
    public readonly timeOptionSet: number,
    public readonly dayList: string,
    public readonly requiredResources: Record<string, unknown>[],
    public readonly searchWindowStart: string,
    public readonly searchWindowEnd: string,
    public readonly searchRecurrenceStart: number,
    public readonly timeRangeEnd: number,
    public readonly duration: number,
    public readonly direction: number,
    public readonly sites: Record<string, unknown>[],
    public readonly numberOfResults: number,
    public readonly _SearchWindowStart: string,
    public readonly _SearchWindowEnd: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/_EvaluateSearchRequest`;

    const body: Record<string, unknown> = {
      ServiceAppointmentId: this.serviceAppointmentId,
      ServiceId: this.serviceId,
      DateOptionSet: this.dateOptionSet,
      TimeOptionSet: this.timeOptionSet,
      DayList: this.dayList,
      RequiredResources: this.requiredResources,
      SearchWindowStart: this.searchWindowStart,
      SearchWindowEnd: this.searchWindowEnd,
      SearchRecurrenceStart: this.searchRecurrenceStart,
      TimeRangeEnd: this.timeRangeEnd,
      Duration: this.duration,
      Direction: this.direction,
      Sites: this.sites,
      NumberOfResults: this.numberOfResults,
      _SearchWindowStart: this._SearchWindowStart,
      _SearchWindowEnd: this._SearchWindowEnd,
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

  async parseResponse(response: Response): Promise<_EvaluateSearchRequestResponse> {
    const data = await response.json();
    return data as _EvaluateSearchRequestResponse;
  }
}
