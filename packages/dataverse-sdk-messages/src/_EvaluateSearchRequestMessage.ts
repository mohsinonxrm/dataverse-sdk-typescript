import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseValue } from "./internal/responseData.js";

/**
 * _EvaluateSearchRequest request message
 *
 * Web API Action: _EvaluateSearchRequest
 */
export class _EvaluateSearchRequestRequest
  extends OrganizationRequest
  implements Executable<_EvaluateSearchRequestResponse>
{
  constructor(
    public serviceAppointmentId: string,
    public serviceId: string,
    public dateOptionSet: number,
    public timeOptionSet: number,
    public dayList: string,
    public requiredResources: Record<string, unknown>[],
    public searchWindowStart: string,
    public searchWindowEnd: string,
    public searchRecurrenceStart: number,
    public timeRangeEnd: number,
    public duration: number,
    public direction: number,
    public sites: Record<string, unknown>[],
    public numberOfResults: number,
    public _SearchWindowStart: string,
    public _SearchWindowEnd: string
  ) {
    super("_EvaluateSearchRequest");
  }

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
    return _EvaluateSearchRequestResponse.fromResponse(data);
  }
}

/**
 * _EvaluateSearchRequest response message
 */
export class _EvaluateSearchRequestResponse extends OrganizationResponse {
  constructor(public result: Record<string, unknown>[]) {
    super("_EvaluateSearchRequest");
  }

  static fromResponse(data: unknown): _EvaluateSearchRequestResponse {
    return new _EvaluateSearchRequestResponse(responseValue<Record<string, unknown>[]>(data));
  }
}
