import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the _EvaluateSearchRequest action.
 *
 * The collection, read from the `value` of the response body.
 * Each record keeps its annotations. A 204 (an output that wasn't set) is `[]`.
 */
export type _EvaluateSearchRequestResponse = Array<{
  "@odata.etag"?: string;
  "@odata.type"?: string;
  [column: string]: unknown;
}>;

/**
 * Parameters of the _EvaluateSearchRequest action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface _EvaluateSearchRequestActionParameters {
  ServiceAppointmentId?: string;
  ServiceId: string;
  DateOptionSet?: number;
  TimeOptionSet?: number;
  DayList?: string;
  RequiredResources?: Record<string, unknown>[];
  SearchWindowStart?: string;
  SearchWindowEnd?: string;
  SearchRecurrenceStart?: number;
  TimeRangeEnd?: number;
  Duration: number;
  Direction?: number;
  Sites?: Record<string, unknown>[];
  NumberOfResults?: number;
  _SearchWindowStart?: string;
  _SearchWindowEnd?: string;
}

/**
 * _EvaluateSearchRequest action
 *
 * Unbound action
 */
export class _EvaluateSearchRequestAction implements Executable<_EvaluateSearchRequestResponse> {
  constructor(public readonly parameters: _EvaluateSearchRequestActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/_EvaluateSearchRequest`;

    const body = requestBody({
      ServiceAppointmentId: this.parameters.ServiceAppointmentId,
      ServiceId: this.parameters.ServiceId,
      DateOptionSet: this.parameters.DateOptionSet,
      TimeOptionSet: this.parameters.TimeOptionSet,
      DayList: this.parameters.DayList,
      RequiredResources: this.parameters.RequiredResources,
      SearchWindowStart: this.parameters.SearchWindowStart,
      SearchWindowEnd: this.parameters.SearchWindowEnd,
      SearchRecurrenceStart: this.parameters.SearchRecurrenceStart,
      TimeRangeEnd: this.parameters.TimeRangeEnd,
      Duration: this.parameters.Duration,
      Direction: this.parameters.Direction,
      Sites: this.parameters.Sites,
      NumberOfResults: this.parameters.NumberOfResults,
      _SearchWindowStart: this.parameters._SearchWindowStart,
      _SearchWindowEnd: this.parameters._SearchWindowEnd,
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

  async parseResponse(response: Response): Promise<_EvaluateSearchRequestResponse> {
    // An output that wasn't set answers 204 No Content: an empty collection
    if (response.status === 204) return [];
    // A collection comes wrapped: { "@odata.context": "…", "value": [ … ] }
    return ((await response.json()) as { value: _EvaluateSearchRequestResponse }).value;
  }
}
